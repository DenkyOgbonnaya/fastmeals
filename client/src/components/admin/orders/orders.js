import React, {useState, useEffect} from 'react';
import {TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, 
CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import OrderView from './orderView';
import dataProvider from '../../order/order_api';

const Orders = () => {
    const[activeTab, setActiveTab] = useState('Pending');
    const[orders, setOrders] = useState([]);

    useEffect( () => {
      dataProvider.getOrderInStatus('Pending')
      .then(data => setOrders(data.orders));
    }, [])

    const toggle = tab => {
      if (activeTab !== tab) {
        dataProvider.getOrderInStatus(tab)
        .then(data => {
          setOrders(data.orders);
          setActiveTab(tab);
        })
        
      }
    }
    return (
        <div>
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === 'Pending' })}
                onClick={() => toggle('Pending') }
              >
                Pending
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === 'Processing' })}
                onClick={() => toggle('Processing') }
              >
                Processing
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === 'Shipped' })}
                onClick={() => toggle('Shipped') }
              >
                Shipped
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === 'Delivered' })}
                onClick={() => toggle('Delivered') }
              >
                Delivered
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === 'Cancelled' })}
                onClick={() => toggle('Cancelled') }
              >
                Cancelled
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={activeTab}>
            <TabPane tabId="Pending">
              <Row>
                <Col sm="12">
                <OrderView  orders={orders}/>
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="Processing">
              <Row>
                <Col sm="12">
                <OrderView  orders={orders}/>
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="Shipped">
              <Row>
                <Col sm="12">
                <OrderView  orders={orders}/>
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="Delivered">
              <Row>
                <Col sm="12">
  
                <OrderView  orders={orders}/>
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="Cancelled">
              <Row>
                <Col sm="12">
  
                <OrderView  orders={orders}/>
                </Col>
              </Row>
            </TabPane>
          </TabContent>
        </div>
      );
   
}

export default Orders;