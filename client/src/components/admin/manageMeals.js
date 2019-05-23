import React, {useState, useEffect} from 'react';
import {useGlobal} from 'reactn';
import {Pagination, PaginationItem, PaginationLink} from 'reactstrap';
import mealApi from '../meals/meals_api';
import ListMeals from './listMeals';
import SearchMeal from '../meals/searchMeal'
import Spinner from '../utils/spinner';

const ManageMeals = props => {
    const[meals, setMeals] = useGlobal('meals');
    const[currentPage, setCurrentPage] = useState(1);
    const[pages, setPages] = useState(1);
    const[loading, setLoading] = useState(true);
    
    useEffect( () => {
        mealApi.getMeals('/api/meals')
        .then(data => {
            setMeals(data.meals);
            setCurrentPage(data.currentPage);
            setPages(data.pages);
            setLoading(false);
        })
    }, [])
    
    const deleteMeal = (id) => {
        setMeals(meals.filter(meal => meal._id !== id));
        mealApi.deleteMeal(id);
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
        mealApi.getMeals(`/api/meals?page=${pageNum}`)
        .then(data => {
            setMeals(data.meals);
            setCurrentPage(data.currentPage);
        })
    }
    return(
        <div> 
            <div style = {{ padding: '5px'}}>  
                <h3>Manage Meals </h3>
            </div>
            <SearchMeal search = 'admin' />
            {   loading ? <Spinner /> :
                <ListMeals meals = {meals} deleteMeal = {deleteMeal} />
            }
            {displayPageNums()}
        </div>
    )
}

export default ManageMeals;