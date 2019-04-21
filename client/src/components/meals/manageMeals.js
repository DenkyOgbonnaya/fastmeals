import React, {useState, useEffect} from 'react';
import {useGlobal} from 'reactn';
import {Table, ButtonGroup, Button} from 'reactstrap';
import MealModal from './mealModal';
import {Pagination, PaginationItem, PaginationLink} from 'reactstrap';
import mealApi from './meals_api';

const ManageMeals = props => {
    const[meals, setMeals] = useGlobal('meals');
    const[editableMeal, setEditableMeal] = useState({});
    const[currentPage, setCurrentPage] = useState(1);
    const[pages, setPages] = useState(1);
    const[showMealModal, setShowMealModal] = useGlobal('showMealModal');
    
    useEffect( () => {
        mealApi.getMeals('/api/meals')
        .then(data => {
            setMeals(data.meals);
            setCurrentPage(data.currentPage);
            setPages(data.pages);
        })
    }, [])
    const addMeal = () => {
        setEditableMeal('');
        setShowMealModal(true);
    }
    const updateMeal = (meal) => {
        setEditableMeal(meal);
        setShowMealModal(true);

    }
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
                <Button  onClick = {() => addMeal()} style = {{float: 'right', background:'#8bc34a'}}> +Add Meal </Button>
            </div>
            {showMealModal ? <MealModal meal= {editableMeal}/> : null }
            <Table> 
                <thead>

                    <tr>
                    <th className ='thead'>Meal</th>
                    <th className ='thead'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        meals.map(meal =>
                        <tr key = {meal._id}> 
                            <td><img src= {meal.image} alt='meal' height= '80px' width= '80px'/> {meal.name} </td>
                            <td>
                            <ButtonGroup className = "btnGrp">
                                <Button onClick = {() => props.history.push(`/meal/${meal._id}`)}  className = 'actions'>View</Button> 
                                <Button onClick = {() => updateMeal(meal)}  className = 'actions' >Update</Button> 
                                <Button onClick = {() => deleteMeal(meal._id)}  className = 'actions'>Delete</Button>
                            </ButtonGroup></td>
                        </tr> 
                    )
                }
                </tbody>
            </Table>
            {displayPageNums()}
        </div>
    )
}

export default ManageMeals;