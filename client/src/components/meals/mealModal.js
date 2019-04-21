import React, {useState, useEffect} from 'react';
import {useGlobal} from 'reactn';
import '../../styles/order.css'
import { 
     Modal, ModalHeader, ModalBody, ModalFooter,
    Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
    import mealsApi from './meals_api';

const UpdateMeal = (props) => {
    const[name, setName] = useState(props.meal.name || '');
    const[price, setPrice] = useState(props.meal.price || '');
    const[quantity, setQuantity] = useState(props.meal.quantity || '');
    const[category, setCategory] = useState(props.meal.category || '');
    const[description, setDescription] = useState(props.meal.description || '');
    const[image, setImage] = useState(null);
    const[categories] = useGlobal('categories');
    const[meals, setMeals] = useGlobal('meals');

    const[showMealmodal, setShowMealModal] = useGlobal('showMealModal');

    const submitForm = (e) => {
      e.preventDefault();
      
      if(props.meal){
        const data = {name, price, quantity, description, category}
        setMeals(meals.map(meal => meal._id === props.meal._id ? Object.assign({}, meal, data) : meal ));
        setShowMealModal(false);
        mealsApi.updateMeal(props.meal._id, data);
      }else{
        const addMealForm = document.forms.mealForm;
        const data = new FormData(addMealForm);

        mealsApi.createMeal(data)
        .then(data => {
          setMeals(meals.concat(data.meal));
          setShowMealModal(false);
          //props.history.push(`category/${data.meal.category}`);
        });
      }
      
    }
    return (
        <div> 
          <Modal isOpen={showMealmodal}  >
            <ModalHeader className= 'modalHeader'>{props.meal? 'Update meal details' : 'Add new meal'}</ModalHeader>
            <ModalBody>
              
        <Form onSubmit ={submitForm} encType = "multipart/form-data"  name= 'mealForm' >
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
            disabled = {props.meal ? true : false }/>
        </FormGroup>
        
        <Button id = 'actionBtn' > {props.meal? 'Save' : 'Add'} </Button>
      </Form>
        
              </ModalBody>
              <ModalFooter>
                <Button color="warning" onClick={() => setShowMealModal(!showMealmodal)}>Cancel</Button>{' '}
              </ModalFooter>
            </Modal>
            </div>
    )
}
export default UpdateMeal;