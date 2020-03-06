import React, { useState } from "react";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  Button,
  CardTitle,
  CardText,
  Row,
  Col
} from "reactstrap";
import classnames from "classnames";
import ChildDetailes from "./Child";
import ParentDetailes from "./ParentDetailes";
import OrderList from "./OrderList";
import ParentPayment from "./ParentPayment";
import Tabs from "./Request";
import Example from "./Request";
import ParentPocket from "./ParentPocket";

const ParentChild = props => {
  const [activeTab, setActiveTab] = useState("1");

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const id = props.match.params.id;

  return (
    <div>
      <Nav tabs>
        <NavItem>
          <NavLink
            style={{
              fontSize: "25px"
            }}
            className={classnames({ active: activeTab === "1" })}
            onClick={() => {
              toggle("1");
            }}
          >
            بيانات الاب
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            style={{
              fontSize: "25px"
            }}
            className={classnames({ active: activeTab === "2" })}
            onClick={() => {
              toggle("2");
            }}
          >
            بيانات الابناء
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            style={{
              fontSize: "25px"
            }}
            className={classnames({ active: activeTab === "3" })}
            onClick={() => {
              toggle("3");
            }}
          >
            الطلب{" "}
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            style={{
              fontSize: "25px"
            }}
            className={classnames({ active: activeTab === "4" })}
            onClick={() => {
              toggle("4");
            }}
          >
            المحفظه
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            style={{
              fontSize: "25px"
            }}
            className={classnames({ active: activeTab === "5" })}
            onClick={() => {
              toggle("5");
            }}
          >
            بيانات الدفع
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Row>
            <Col sm="12">
              <h4>
                <ParentDetailes parentId={id} />
              </h4>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="2">
          <Row>
            <Col sm="12">
              <h4>
                <ChildDetailes parentId={id} />
              </h4>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="3">
          <Row>
            <Col sm="12">
              <h4>
                <OrderList parentId={id} />
              </h4>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="4">
          <Row>
            <Col sm="12">
              <React.Fragment>
                <ParentPocket parentId={id} />
              </React.Fragment>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="5">
          <Row>
            <Col sm="12">
              <h4>
                <ParentPayment parentId={id} />
              </h4>
            </Col>
          </Row>
        </TabPane>
      </TabContent>
    </div>
  );
};

export default ParentChild;
