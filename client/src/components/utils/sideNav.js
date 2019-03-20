import React from 'react';
import {Nav, NavItem, NavLink} from 'reactstrap';
import {NavLink as RRNavLink} from 'react-router-dom';
import {useGlobal} from 'reactn';
import Swal from 'sweetalert2';
import Can from './can';

const SideNav = () => {
    const[user] = useGlobal('currentUser');
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
            }
          })
    }

    return(
        <div> 
            <Nav vertical >
                <NavItem> 
                    <NavLink to= '/cart' tag= {RRNavLink}> My cart </NavLink>
                </NavItem>
                {
                    user ?
                    <div>
                
                    <NavItem> 
                        <NavLink to= '/profile' tag= {RRNavLink}> My Orders </NavLink>
                    </NavItem>
                    <Can 
                    role = {user.isAdmin}
                    perform = "admin-board:visit"
                    yes = {() => 
                        <div> 
                            <NavItem> 
                                <NavLink to= '/addMeals' tag= {RRNavLink}> Add meals </NavLink>
                            </NavItem>
                            <NavItem> 
                                <NavLink to= '/' tag= {RRNavLink} onClick= { () => addCategory() } > Add meal Category</NavLink>
                            </NavItem>
                            <NavItem> 
                                <NavLink to= '/' tag= {RRNavLink} onClick = {() => setShowUpdatMealsButton(true)} > Update meals </NavLink>
                            </NavItem>
                            <NavItem> 
                                <NavLink to= '/' tag= {RRNavLink} onClick = {() => setShowDeleteMealsButton(true)}  > Delete meals </NavLink>
                            </NavItem>
                        </div>
                    }
                    />
                    
                    </div>
                    : null
                }
            </Nav>
        </div>
    )
}
export default SideNav;