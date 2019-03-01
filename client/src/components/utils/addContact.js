import React from 'react';
import {useGlobal} from 'reactn';
import ContactForm from './contactForm';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const AddContact = ({cart}) => {
    const[currentUser] = useGlobal('currentUser');
    const[showAddContact, setShowAddContact] = useGlobal('showAddContact');

    const userContact = {
        firstName: '',
        lastName: '',
        phone: '',
        street: '',
        town: '',
        state: ''
    }
    const saveOrder = () => {
        fetch(`api/order/${currentUser._id}`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({cart})
        })
        .then(res => {
          if(res.status === 201){
          alert('order placed')
          setShowAddContact(!showAddContact)
          }
        })
        .catch(err => console.log(err))
      }
     return(
        <Modal isOpen={showAddContact}  >
        <ModalHeader>Add contact details</ModalHeader>
        <ModalBody>
        <ContactForm userId = {currentUser._id} userContact = {userContact} />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => saveOrder() }>Done</Button>{' '}
        </ModalFooter>
      </Modal>
     )
}
export default AddContact;