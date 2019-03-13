import React, {useState} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {useGlobal} from 'reactn';
import ContactForm from './contactForm';

const ContactModal = ({cart}) => {
  const[showContactModal, setShowContactModal] = useGlobal('showContactModal');
  const[currentUser] = useGlobal('currentUser');

    return (
      <div>
        <Modal isOpen={showContactModal} >
          <ModalHeader >Contact Address</ModalHeader>
          <ModalBody>
              <ContactForm user = {currentUser} cart = {cart} />
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={() => setShowContactModal(!showContactModal)}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
}
export default ContactModal;