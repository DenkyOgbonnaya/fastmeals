import React from 'react';
import { Button, Form, Input } from "reactstrap";

const ToggleableReviewForm = ({handleSubmit, setText}) => 
    <Form  onSubmit = {handleSubmit}  >
        <Input type='textarea' placeholder='type a review'  onChange={e => setText(e.target.value)} /> <br />
        <Button color='success'> Send </Button>
    </Form>


export default ToggleableReviewForm;