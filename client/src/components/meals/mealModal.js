import React, {useState, useEffect} from 'react';
import {useGlobal} from 'reactn';
import '../../styles/order.css'
import { 
     Modal, ModalHeader, ModalBody, ModalFooter,
    Col, Row, Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
    import mealsApi from './meals_api';
    import dataProvider from '../admin/categories/dataProvider';
    import Swal from 'sweetalert2';
import Spinnar from '../utils/spinner';

const UpdateMeal = (props) => {
    const[name, setName] = useState(props.meal.name || '');
    const[price, setPrice] = useState(props.meal.price || '');
    const[quantity, setQuantity] = useState(props.meal.quantity || '');
    const[category, setCategory] = useState(props.meal.category || 'soft');
    const[description, setDescription] = useState(props.meal.description || '');
    const[image, setImage] = useState(null);
    const[imageurl, setImageUrl] = useState(props.meal.image || '');
    const[categories, setCategories] = useState([]);
    const[meals, setMeals] = useGlobal('meals');
    const[isError, setIsError] = useState(false);
    const[errorMessage, setErrorMessage] = useState('');
    const[isProcessing, setIsProcessing] = useGlobal('isProcessing');

    const[showMealmodal, setShowMealModal] = useGlobal('showMealModal');

    useEffect( () => {
      dataProvider.getCategories()
      .then(data => setCategories(data.categories))
    }, []);

    const submitForm = (e) => {
      e.preventDefault();
      setIsProcessing(true);
      
      URL.revokeObjectURL(imageurl);
      const formData = new FormData();
        formData.set('name', name);
        formData.set('price', price);
        formData.set('quantity', quantity);
        formData.set('description', description);
        formData.set('category', category);;
        formData.set('image', image);

      if(props.meal){
        const credentials = {name, price, quantity, description, category}
        setMeals(meals.map(meal => meal._id === props.meal._id ? Object.assign({}, meal, credentials) : meal ));

        const data = image ? formData : JSON.stringify(credentials);
        const headers = image ? {
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.userToken}`
        } :
        {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.userToken}`
        }
        mealsApi.updateMeal(props.meal._id, data, headers)
        .then(data => {
          if(data && data.meal){
            setShowMealModal(false);
            setMeals(meals.map(meal => meal._id === data.meal._id ? Object.assign({}, meal, data.meal) : meal ));
            setIsProcessing(false);
            Swal.fire('Update Meal', 'Meal successfully updated');
          }else
          setIsProcessing(false);
          setIsError(true);
            setErrorMessage(data.message);
        })
      }else{
        //const addMealForm = document.forms.mealForm;
        //const data = new FormData(addMealForm);
        
        mealsApi.createMeal(formData)
        .then(data => {
          if(data && data.meal){
            setMeals(meals.concat(data.meal));
            setIsProcessing(false);
            setShowMealModal(false);
            Swal.fire('New Meal', 'Meal successfully added');
          }else
          setIsProcessing(false);
            setIsError(true);
            setErrorMessage(data.message);
        });
      }
      
    }
    const handleFileChange = e => {
      let file = e.target.files[0];
      setImage(file);
      setImageUrl(URL.createObjectURL(file))
    }
    return (
        <div> 
          <Modal isOpen={showMealmodal}  >
            <ModalHeader className= 'modalHeader'>{props.meal? 'Update meal details' : 'Add new meal'}</ModalHeader>
            <ModalBody>
              {isError && <Alert color='danger'>{errorMessage}</Alert>}
              {isProcessing && <Spinnar /> }
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
          <Input type="file" name="image" accept='image/*'  onChange = {handleFileChange} /> {imageurl && <img className='img-preview' src={imageurl} alt='file' /> }
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