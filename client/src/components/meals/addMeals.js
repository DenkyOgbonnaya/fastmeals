import React, {useState, useEffect} from 'react';
import {useGlobal} from 'reactn';
import { Col, Row, Button, Form, FormGroup, Label, Input} from 'reactstrap';
import mealApi from './meals_api';

const AddMeals = (props) => {
    const[name, setName] = useState('');
    const[price, setPrice] = useState('');
    const[quantity, setQuantity] = useState('');
    const[category, setCategory] = useState('');
    const[description, setDescription] = useState('');
    const[image, setImage] = useState('');

    const[categories] = useGlobal('categories');
    const[meals, setMeals] = useGlobal('meals');

    const submitForm = e => {
        e.preventDefault();
        const addMealForm = document.forms.addMealForm;
        const data = new FormData(addMealForm);

        mealApi.createMeal(data)
        .then(data => {
          setMeals(meals.concat(data.meal));
          props.history.push(`category/${data.meal.category}`);
        });
          
    }
    return (
        <div> 
        <h3> Add new meal</h3>
        <Form onSubmit ={submitForm} encType = "multipart/form-data"  name= 'addMealForm' >
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input type="text" name="name"  placeholder="enter meal name" value={name}
              onChange = {e => setName(e.target.value)} />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="price">Price</Label>
              <Input type="text" name="price"  placeholder="enter price" value = {price}
              onChange = {e => setPrice(e.target.value)} />
            </FormGroup>
          </Col>
        </Row>
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label for="quantity">Quantity</Label>
              <Input type="text" name="quantity" value = {quantity} placeholder="enter quantity"
              onChange = {e => setQuantity(e.target.value)} />
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Label for="category">Category</Label>
              <Input type='select'  name="category"  onChange = {e => setCategory(e.target.value)} >
              {categories.map(category =>
              <option value= {category.title} key={category.id} > {category.title} </option>
            )} 
              </Input>
            </FormGroup>
          </Col>
        </Row>
        <FormGroup>
          <Label for="description">Description</Label>
          <Input type="textarea" name="description"  placeholder="A breif description about the meal" value ={description}
          onChange = {e => setDescription(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="image">Image</Label>
          <Input type="file" name="image" accept='image/*'  onChange = { e => setImage(e.target.files[0])}
          />
        </FormGroup>
        
        <Button > Add meal </Button>
      </Form>
        </div>
    )
}
export default AddMeals;