import React, {useState} from 'react';
import {TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, 
CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import OrderView from './orderView';

const orderss = [
  {_id: '5cc605d27df609258c1dff75', date: '09/05', reference: 'aghasfj', customer: 'Emma', items: '4', total: '2,500', returned: 'true'},
  {_id: '5cc605d27df609258c1dff75', date: '09/05', reference: 'aghfsdj', customer: 'Emma', items: '4', total: '2,500', returned: 'true'},
  {_id: '5cc605d27df609258c1dff75', date: '09/05', reference: 'aghewfj', customer: 'Emma', items: '4', total: '2,500', returned: 'false'}
]

const Orders = () => {
    const[activeTab, setActiveTab] = useState('1')

    const toggle = tab => {
      if (activeTab !== tab) 
        setActiveTab(tab);
    }
    return (
        <div>
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === '1' })}
                onClick={() => toggle('1') }
              >
                Processing
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === '2' })}
                onClick={() => toggle('2') }
              >
                Shipped
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === '3' })}
                onClick={() => toggle('3') }
              >
                Delivered
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === '4' })}
                onClick={() => toggle('4') }
              >
                Cancelled
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              <Row>
                <Col sm="12">
                <OrderView  orders={orderss}/>
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="2">
              <Row>
                <Col sm="12">
                <OrderView  orders={orderss}/>
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="3">
              <Row>
                <Col sm="12">
                <OrderView  orders={orderss}/>
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="4">
              <Row>
                <Col sm="12">
  
                <OrderView  orders={orderss}/>
                </Col>
              </Row>
            </TabPane>
          </TabContent>
        </div>
      );
   
}

export default Orders;