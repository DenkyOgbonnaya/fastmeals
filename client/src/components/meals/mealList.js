import React, {useState, useEffect} from 'react';
import {useGlobal} from 'reactn';
import {withRouter, Link} from 'react-router-dom';
import { Card, CardImg, CardText, CardBody, 
        CardTitle, CardSubtitle, Button, Container, Row, Col,
        Pagination, PaginationItem, PaginationLink, } from 'reactstrap';
import addToCart from '../cart/addToCart';
import mealsApi from './meals_api';
import SearchMeal from './searchMeal';
import NavLinks from '../navs/navLinks';

const MealList = (props) => {
    const[searchedMeal] = useGlobal('searchedMeal');
    const[meals, setMeals] = useState([]);
    const[meal, setMeal] = useState({});
    const[currentPage, setCurrentPage] = useState(1);
    const[pages, setPages] = useState(1);
    
    useEffect( () => {
        mealsApi.getMeals(props.api)
        .then(data => {
            setMeals(data.meals);
            setPages(data.pages);
            setCurrentPage(data.currentPage)
        })
    }, [props.api])
    
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
        if(pages > 1)
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
        mealsApi.getMeals(`${props.api}?page=${pageNum}`)
        .then(data => {
            setMeals(data.meals);
            setCurrentPage(data.currentPage);
        })
    }
    
    return(
        <div> 
             <SearchMeal />
            <br />
            <NavLinks />
            <Container> 
                <Row>
                {meals.map((meal) =>
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