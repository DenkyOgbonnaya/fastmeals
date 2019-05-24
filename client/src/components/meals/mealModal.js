import React, {useState, useEffect} from 'react';
import {useGlobal} from 'reactn';
import '../../styles/order.css'
import { 
     Modal, ModalHeader, ModalBody, ModalFooter,
    Col, Row, Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
    import mealsApi from './meals_api';
    import dataProvider from '../admin/categories/dataProvider';
    import Swal from 'sweetalert2';

const UpdateMeal = (props) => {
    const[name, setName] = useState(props.meal.name || '');
    const[price, setPrice] = useState(props.meal.price || '');
    const[quantity, setQuantity] = useState(props.meal.quantity || '');
    const[category, setCategory] = useState(props.meal.category || '');
    const[description, setDescription] = useState(props.meal.description || '');
    const[image, setImage] = useState(null);
    const[categories, setCategories] = useState([]);
    const[meals, setMeals] = useGlobal('meals');
    const[isTokenExpired, setIsTokenExpired] = useState(false);

    const[showMealmodal, setShowMealModal] = useGlobal('showMealModal');

    useEffect( () => {
      dataProvider.getCategories()
      .then(data => setCategories(data.categories))
    }, [])
    const submitForm = (e) => {
      e.preventDefault();
      
      if(props.meal){
        const credentials = {name, price, quantity, description, category}
        setMeals(meals.map(meal => meal._id === props.meal._id ? Object.assign({}, meal, credentials) : meal ));
        setShowMealModal(false);
        mealsApi.updateMeal(props.meal._id, credentials)
        .then(data => {
          if(data.meal){
            setMeals(meals.map(meal => meal._id === props.meal._id ? Object.assign({}, meal, data) : meal ));
            Swal.fire('Update Meal', 'Meal successfully updated');
          }else
            setIsTokenExpired(true);
        })
      }else{
        const addMealForm = document.forms.mealForm;
        const data = new FormData(addMealForm);
        
        mealsApi.createMeal(data)
        .then(data => {
          if(data.meal){
            setMeals(meals.concat(data.meal));
            setShowMealModal(false);
            Swal.fire('New Meal', 'Meal successfully added');
          }else
            setIsTokenExpired(true);
        });
      }
      
    }
    return (
        <div> 
          <Modal isOpen={showMealmodal}  >
            <ModalHeader className= 'modalHeader'>{props.meal? 'Update meal details' : 'Add new meal'}</ModalHeader>
            <ModalBody>
              {isTokenExpired ? <Alert color='danger'>Expired access token! re-authenticate to add or edit meals </Alert> : ''}
        <Form onSubmit ={submitForm} encType = "multipart/form-data"  name= 'mealForm' >
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input type="text" name="name"  placeholder="enter meal name" value={name} required
              onChange = {e => setName(e.target.value)} />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="price">Price</Label>
              <Input type="text" name="price"  placeholder="enter price" value = {price} required
              onChange = {e => setPrice(e.target.value)} />
            </FormGroup>
          </Col>
        </Row>
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label for="quantity">Quantity</Label>
              <Input type="text" name="quantity" value = {quantity} placeholder="enter quantity" required
              onChange = {e => setQuantity(e.target.value)} />
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Label for="category">Category</Label>
              <Input type='select'  name="category" value={category}  onChange = {e => setCategory(e.target.value)} >
              {categories.length > 0 ?
                categories.map(category =>
              <option value= {category.name} key={category.id} > {category.name} </option>
            ) : null} 
              </Input>
            </FormGroup>
          </Col>
        </Row>
        <FormGroup>
          <Label for="description">Description</Label>
          <Input type="textarea" name="description"  placeholder="A breif description about the meal" value ={description}
          onChange = {e => setDescription(e.target.value)} required />
        </FormGroup>
        <FormGroup>
        <Label for="image">Image</Label>
          <Input type="file" name="image" accept='image/*'  onChange = { e => setImage(e.target.files[0])} 
            disabled = {props.meal ? true : false } required />
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