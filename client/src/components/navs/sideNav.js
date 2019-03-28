import React from 'react';
import {Nav, NavItem, NavLink} from 'reactstrap';
import {NavLink as RRNavLink} from 'react-router-dom';
import {useGlobal} from 'reactn';
import Swal from 'sweetalert2';
import Can from '../utils/can';

const SideNav = () => {
    const[user] = useGlobal('currentUser');
    const[categories, setCategories] = useGlobal('categories');
    const[showUpdateMealsButton, setShowUpdatMealsButton] = useGlobal('showUpdateMealsButton');
    const[showDeleteMealsButton, setShowDeleteMealsButton] = useGlobal('showDeleteMealsButton');

    const addCategory = () => {
        Swal.fire({
            title: 'Add a new meal category',
            input: 'text',
            inputAttributes: {
              autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Add',
            showLoaderOnConfirm: true,
            preConfirm: title => {
              return fetch(`api/categories`, {
                  method: 'POST',
                  headers: {
                      'Content-type': 'application/json',
                      'Authorization': `Bearer ${localStorage.userToken}`
                    },
                    body: JSON.stringify({title})
              })
                .then(response => {
                  if (!response.ok) {
                    throw new Error(response.statusText)
                  }
                  return response.json()
                })
                .catch(error => {
                  Swal.showValidationMessage(
                    `Request failed: ${error}`
                  )
                })
            },
            allowOutsideClick: () => !Swal.isLoading()
          }).then((result) => {
            if (result.value) {
              Swal.fire({
                title: `${result.value.message}`
              })
              const categCopy = Object.assign([], categories);
              categCopy.push(result.value.category);
              setCategories(categCopy);
            }
          })
    }

    return(
        <div className= 'sideNav'> 
            <Nav vertical >
                <NavItem> 
                    <NavLink to= '/cart' tag= {RRNavLink} className = 'navlink'> My cart </NavLink>
                </NavItem>
                {
                    user ?
                    <div>
                
                    <NavItem> 
                        <NavLink to= '/orders' tag= {RRNavLink} className = 'navlink' > My Orders </NavLink>
                    </NavItem>
                    <Can 
                    role = {user.isAdmin}
                    perform = "admin-board:visit"
                    yes = {() => 
                        <div> 
                            <NavItem> 
                                <NavLink to= '/addMeals' tag= {RRNavLink} className = 'navlink'> Add meals </NavLink>
                            </NavItem>
                            <NavItem> 
                                <NavLink to= '/' tag= {RRNavLink} onClick= { () => addCategory() } className = 'navlink'> Add meal Category</NavLink>
                            </NavItem>
                            <NavItem> 
                                <NavLink to= '/' tag= {RRNavLink} onClick = {() => setShowUpdatMealsButton(true)} className = 'navlink'> Update meals </NavLink>
                            </NavItem>
                            <NavItem> 
                                <NavLink to= '/' tag= {RRNavLink} onClick = {() => setShowDeleteMealsButton(true)} className = 'navlink' > Delete meals </NavLink>
                            </NavItem>
                        </div>
                    }
                    />
                    
                    </div>
                    : null
                }
                <NavItem> 
                    <NavLink to= '/about' tag= {RRNavLink} className = 'navlink'>About </NavLink>
                </NavItem>
            </Nav>
        </div>
    )
}
export default SideNav;