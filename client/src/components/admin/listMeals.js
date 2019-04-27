import React, {useState, useEffect} from 'react';
import {useGlobal} from 'reactn';
import {Table, ButtonGroup, Button, InputGroup, InputGroupAddon} from 'reactstrap';
import MealModal from '../meals/mealModal';

const ListMeals = (props) => {
    const[editableMeal, setEditableMeal] = useState({});
    const[showMealModal, setShowMealModal] = useGlobal('showMealModal');

    const addMeal = () => {
        setEditableMeal('');
        setShowMealModal(true);
    }
    const updateMeal = (meal) => {
        setEditableMeal(meal);
        setShowMealModal(true);

    }

    return (
        <div>
            <Button  onClick = {() => addMeal()} style = {{float: 'right', background:'#8bc34a'}}> +Add Meal </Button>
        {showMealModal ? <MealModal meal= {editableMeal}/> : null }
            <Table responsive > 
                <thead>

                    <tr>
                    <th className ='thead'>Meal</th>
                    <th className ='thead'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.meals.map(meal =>
                        <tr key = {meal._id}> 
                            <td><img src= {meal.image} alt='meal' height= '80px' width= '80px'/> {meal.name} </td>
                            <td>
                            <ButtonGroup className = "btnGrp">
                                <Button onClick = {() => props.history.push(`/meal/${meal._id}`)}  className = 'actions'>View</Button> 
                                <Button onClick = {() => updateMeal(meal)}  className = 'actions' >Update</Button> 
                                <Button onClick = {() => props.deleteMeal(meal._id)}  className = 'actions'>Delete</Button>
                            </ButtonGroup></td>
                        </tr> 
                    )
                }
                </tbody>
            </Table>
        </div>
    )
}

export default ListMeals;