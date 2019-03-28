import React, {useState, useEffect} from 'react';
import {useGlobal} from 'reactn';
import { 
     Modal, ModalHeader, ModalBody, ModalFooter,
    Col, Row, Button, Form, FormGroup, Label, Input
 } from 'reactstrap';

const UpdateMeal = ({meal}) => {
    const[name, setName] = useState(meal.name);
    const[price, setPrice] = useState(meal.price);
    const[quantity, setQuantity] = useState(meal.quantity);
    const[category, setCategory] = useState(meal.category);
    const[description, setDescription] = useState(meal.description);
    const[image, setImage] = useState(null);
    const[categories, setCategories] = useState([]);

    const[renderUpdateMealModal, setRenderUpdateMealModal] = useGlobal('renderUpdateMealModal');

    useEffect(() => {
      fetch('api/categories')
      .then(res => {
          if(res.status === 200) return res.json()
      })
      .then(data => {
          setCategories(data.categories)
      })
      .catch(err => console.log(err))
  }, [ ])
  
    const submitForm = (e) => {
      e.preventDefault();

      fetch(`api/meals/${meal._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.userToken}`
        },
        body: JSON.stringify({
          name,
          price,
          quantity,
          category,
          description
        })
      })
      .then(res => {
        if(res.status === 200){
          alert('meal added')
        }
      })
      .catch(err => console.log(err))
    }
    return (
        <div> 
    <Modal isOpen={renderUpdateMealModal}  >
              <ModalHeader>Edit meal details</ModalHeader>
              <ModalBody>
              
        <Form onSubmit ={submitForm} encType = "multipart/form-data"  name= 'updateMealForm' >
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
          <Input type="textarea" name="phone"  placeholder="A breif description about the meal" value ={description}
          onChange = {e => setDescription(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="image">Image</Label>
          <Input type="file" name="image" accept='image/*'  onChange = { e => setImage(e.target.files[0])} disabled
          />
        </FormGroup>
        
        <Button > Save </Button>
      </Form>
        
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={() => setRenderUpdateMealModal(!renderUpdateMealModal)}>Done</Button>{' '}
              </ModalFooter>
            </Modal>
            </div>
    )
}
export default UpdateMeal;