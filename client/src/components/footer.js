import React from 'react';
import '../styles/footer.css'
import {Container, Row, Col} from 'reactstrap';
const Footer = () => {
    return(
    <div className= 'footer'> 
        <Container> 
            <Row> 
                <Col xs={6}>
                <div className= 'quicklinks'>
                <h4>Quick Links </h4>
                <ul>
                    <li><a href ='/'> Home </a> </li>
                    <li><a href ='/about'  > About </a> </li>
                    <li><a href ='/contact' > Contact </a> </li>
                </ul>
                </div> 
                </Col>
                <Col xs={6}>
                <div className= 'contacts' >
                <h4>Contacts </h4>
                <ul>
                    <li>
                        <a href="https://api.whatsapp.com/send?phone=2347069797882" > <img src='/images/icons/whatsapp.png' alt="" /> Whatsapp </a> 
                    </li>
                    <li>
                        <a href ='https://twitter.com/DenkyOgbonnaya'> <img src= '/images/icons/twitter.png' alt='' /> Twitter </a> 
                    </li>
                    <li>
                        <a href ='https://github.com/DenkyOgbonnaya'>  <img src='/images/icons/github.png' alt='' /> Github </a> 
                    </li>
                    <li>
                        <a href ='https://linkedin.com/in/dennis-ogbonnaya-313148103'> <img src='/images/icons/linkedin.png' alt='' /> LinkedIn </a> 
                    </li>
                </ul>
                </div >
                </Col>
            </Row>
            <Row> 
                <Col>
                    <div className='footer' style= {{textAlign: 'center'}} > 
                    ©{new Date().getFullYear()} Dennis Ogbonnaya
                    </div> 
                </Col>
            </Row>
        </Container>
    </div>
    )

}
export default Footer;