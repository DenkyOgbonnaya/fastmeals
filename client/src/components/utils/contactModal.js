import React, {useState} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {useGlobal} from 'reactn';
import ContactForm from './contactForm';

const ContactModal = ({cart}) => {
  const [showNestedModal, setShowNestedModal] = useState(false);
  const[showContactModal, setShowContactModal] = useGlobal('showContactModal');
  const[currentUser] = useGlobal('currentUser');
  const {contact, _id} = currentUser;

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
      setShowContactModal(!showContactModal)
      }
    })
    .catch(err => console.log(err))
  }
  
    return (
      <div>
        <Modal isOpen={showContactModal} >
          <ModalHeader >Contact</ModalHeader>
          <ModalBody>
          Your order will be sent to
            <br />
              {`${contact.firstName} ${contact.lastName} `}
            <br />
            {`${contact.street} ${contact.town}, ${contact.state} state`}
            <br />
            {`${contact.phone}`}
            <br />
            <Button color="success" onClick={() => setShowNestedModal(!showNestedModal)}>Change</Button>
            <Modal isOpen={showNestedModal}  >
              <ModalHeader>Edit contact details</ModalHeader>
              <ModalBody>
              <ContactForm userContact = {contact} userId = {_id} />
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={() => setShowNestedModal(!showNestedModal)}>Done</Button>{' '}
              </ModalFooter>
            </Modal>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => saveOrder()}>Continue</Button>{' '}
            <Button color="secondary" onClick={() => setShowContactModal(!showContactModal)}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
}
export default ContactModal;