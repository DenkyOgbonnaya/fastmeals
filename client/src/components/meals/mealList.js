import React, {useState, useEffect} from 'react';
import {useGlobal} from 'reactn';
import {withRouter, Link} from 'react-router-dom';
import { Card, CardImg, CardText, CardBody, 
        CardTitle, CardSubtitle, Button, Container, Row, Col,
        Pagination, PaginationItem, PaginationLink, } from 'reactstrap';
import addToCart from '../cart/addToCart';
import mealsApi from './meals_api';
import SearchMeal from './searchMeal';
import Category from '../navs/category';
import formatter from '../utils/formatter';
import Department from '../navs/department';
import { loadavg } from 'os';
import Spinner from '../utils/spinner';

const MealList = (props) => {
    const[cart, setCart] = useGlobal('cart');
    const[meals, setMeals] = useState([]);
    const[currentPage, setCurrentPage] = useState(1);
    const[pages, setPages] = useState(1);
    const[loading, setLoading] = useState(true);
    
    useEffect( () => {
        mealsApi.getMeals(props.api)
        .then(data => {
            if(data.meals.length > 0){
                setMeals(data.meals);
                setPages(data.pages);
                setCurrentPage(data.page);
                setLoading(false);
            }
        })
    }, [props.api])
    
    const pushToCart = meal =>{
            setCart(cart.concat(meal));
            addToCart(meal);
            props.history.push('/cart');
         
    }
    const handlePageChange = (pageNum) => {
        mealsApi.getMeals(`${props.api}?page=${pageNum}`)
        .then(data => {
            setMeals(data.meals);
            setCurrentPage(data.page);
        })
    }
    const displayPageNums = () => {
        const pageNumbers = [];

        for(let number = 1; number <= pages; number++){
            pageNumbers.push(number);
        }
        if(pages > 1)
        return (
            <Pagination>
                <PaginationItem disabled = {currentPage === 1 ? true : false} > 
                    <PaginationLink previous onClick = { () => {if(currentPage > 1) handlePageChange(currentPage -1)}} />
                </PaginationItem>
                {pageNumbers.map(number =>
                <PaginationItem key = {number} active = {currentPage === number ? true : false}>
                    <PaginationLink  
                    onClick = { ()=> handlePageChange(number)}>   {number}  
                    </PaginationLink>
                </PaginationItem>
                )}
                <PaginationItem disabled = {currentPage === pages ? true : false} > 
                    <PaginationLink next onClick = { () => {if(currentPage < pages) handlePageChange(currentPage +1)}} />
                </PaginationItem>
            </Pagination>
        )
    }
    
    return(
        <div> 
             <SearchMeal search = 'user' />
             <Department />
            <Category />
            {
                loading ? <Spinner /> :
            <Container> 
                <Row>
                {meals.map((meal) =>
                <Col  md = '3' xs='6' key ={meal._id}> 
                    <Card >
                        <CardImg top width="100%" height="150px" src= {meal.image} alt="Card image cap" />
                        <CardBody >
                            <CardTitle> {meal.name} </CardTitle>
                            <CardSubtitle>{formatter.format(Number(meal.price))} </CardSubtitle>
                            <CardText> <small className='text-muted'> {meal.description ? meal.description.substring(0, 20) : ''} 
                            ...<Link to = {`/meal/${meal._id}`} >more </Link> </small>
                             </CardText>
                            <Button style = {{background:'firebrick'}} onClick= {() => pushToCart(meal)}  >Buy Now </Button>{" "}
                        </CardBody>
                    </Card>
                    <br />
                </Col>
                )} 
            </Row>
            </Container>
            }
            {displayPageNums()}
            
        </div>
    )
}
export default withRouter(MealList);