import React, {useState, useEffect} from 'react';
import {useGlobal} from 'reactn';
import {withRouter, Link} from 'react-router-dom';
import { Card, CardImg, CardText, CardBody, 
        CardTitle, CardSubtitle, Button, Container, Row, Col,
        Pagination, PaginationItem, PaginationLink, } from 'reactstrap';
import filterHof from './filterHof';
import UpdateMeal from './updateMeal';
import addToCart from '../cart/addToCart';
import mealsApi from './meals_api';

const MealList = (props) => {
    const[searchedMeal] = useGlobal('searchedMeal');
    const[meals, setMeals] = useGlobal('meals');
    const[meal, setMeal] = useState({});
    const[currentPage, setCurrentPage] = useState(1);
    const[pages, setPages] = useState(1);
    const[renderUpdateMealModal, setRenderUpdateMealModal] = useGlobal('renderUpdateMealModal');
    const[showUpdateMealsButton, setShowUpdatMealsButton] = useGlobal('showUpdateMealsButton');
    const[showDeleteMealsButton, setShowDeleteMealsButton] = useGlobal('showDeleteMealsButton');
    
    useEffect( () => {
        mealsApi.getMeals(props.api)
        .then(data => {
            setMeals(data.meals);
            setPages(data.pages);
            setCurrentPage(data.currentPage);
        })
    }, [props.api]);
    
    const deleteMeal = (id) => {
        setMeals(meals.filter(meal => meal._id !== id));
        mealsApi.deleteMeal(id)
    }
    const updateMeal = (meal) => {
        setMeal(meal);
        setRenderUpdateMealModal(true);
    }
    async function pushToCart(meal){
        try{
            await addToCart(meal);
            props.history.push('/cart');
        } catch(err) {
            console.log(err);
        }
    }
    const displayPageNums = () => {
        const pageNumbers = [];

        for(let number = 1; number <= pages; number++){
            pageNumbers.push(number);
        }
        return (
            <Pagination>
                <PaginationItem> 
                    <PaginationLink previous onClick = { () => {if(currentPage > 1) handlePageChange(currentPage -1)}} />
                </PaginationItem>
                {pageNumbers.map(number =>
                <PaginationItem key = {number}>
                    <PaginationLink  
                    onClick = { ()=> handlePageChange(number)}>   {number}  
                    </PaginationLink>
                </PaginationItem>
                )}
                <PaginationItem> 
                    <PaginationLink next onClick = { () => {if(currentPage < pages) handlePageChange(currentPage +1)}} />
                </PaginationItem>
            </Pagination>
        )
    }
    const handlePageChange = (pageNum) => {
        mealsApi.getMeals(`api/meals?page=${pageNum}`)
        .then(data => {
            setMeals(data.meals);
            setCurrentPage(data.currentPage);
        })
    }
    
    return(
        <div> 
            {renderUpdateMealModal ? <UpdateMeal meal= {meal}/> : null }
            
            <Container> 
                <Row>
                {meals.filter(filterHof(searchedMeal)).map((meal, index) =>
                <Col  md = '3' key ={meal._id}> 
                    <Card >
                        <CardImg top width="100%" height="150px" src= {meal.image} alt="Card image cap" />
                        <CardBody >
                            <CardTitle> {meal.name} </CardTitle>
                            <CardSubtitle>N{meal.price} </CardSubtitle>
                            <CardText> <small className='text-muted'> {meal.description.substring(0, 20)} 
                            ...<Link to = {`/meal/${meal._id}`} >more </Link> </small>
                             </CardText>
                            <Button onClick= {() => pushToCart(meal)}  >Buy</Button>{" "}
                            {showUpdateMealsButton ? <img className= "option" onClick = {() => updateMeal(meal)} src = "/images/icons/edit_ic.png" alt="edit" /> : null} {" "}
                            {showDeleteMealsButton ? <img className= "option" onClick = {() => deleteMeal(meal._id)} src = "/images/icons/delete_ic.png" alt="edit" />  : null}
                            
                        </CardBody>
                    </Card>
                    <br />
                </Col>
                )} 
            </Row>
            </Container>
            {displayPageNums()}
        </div>
    )
}
export default withRouter(MealList);