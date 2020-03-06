import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from "reactstrap";
// import logo from '../../../assets/img/brand/logo.png'
import axios from "axios";
import { Label } from "reactstrap";
import { login, authed } from "./loginData";
import logo from "../assets/img/logo.png";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auzenticated: { token: "", phone: "" },
      user: { phone: "", password: "" },
      submitDisabled: true,
      err: "",
      loading: false
    };

    authed();
  }

  handleChange = e => {
    let user = this.state.user;
    user[e.target.name] = e.target.value;
    let otherField = e.target.name == "phone" ? "password" : "phone";

    this.setState({
      user,
      submitDisabled: !(e.target.value && user[otherField]) || false
    });
  };

  handleKeyDown = e => {
    if (e.key === "Enter") {
      e.preventDefault();
      this.handleLogin();
    }
  };

  handleLogin = async e => {
    // e.preventDefault();

    let data = this.state.user;
    const response = await login(data);
    let id = response.data.id;
    if (response.data.roles.includes("admin")) {
      localStorage.setItem(
        "AnnatLogin",
        JSON.stringify({ token: response.data.token, id })
      );

      this.props.history.push("/");
      console.log(JSON.parse(localStorage.getItem("AnnatLogin")));
    } else if (response.status != 200) {
      this.setState({ err: "ادخل مره اخري", loading: false });
      return;
    }

  }
 

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <CardGroup>
                <Card className="p-4">
                  <img
                    src={logo}
                    style={{
                      maxWidth: "200px",
                      maxHeight: "170px",
                      marginRight: "auto",
                      marginLeft: "auto"
                    }}
                  />
                  <CardBody>
                    <Form
                      onSubmit={this.handleLogin}
                      onKeyDown={this.handleKeyDown}
                    >
                      <h1 style={{ textAlign: "center" }}>تسجيل الدخول</h1>
                      <p className="text-muted">الدخول للحساب</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="text"
                          name="phone"
                          onChange={this.handleChange}
                          placeholder="أدخل رقم الجوال"
                          autoComplete="username"
                        />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="password"
                          name="password"
                          onChange={this.handleChange}
                          placeholder="كلمة السر"
                        />
                      </InputGroup>

                      <InputGroup className="mb-4">
                        <span>{this.state.err}</span>
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button
                            id="submit"
                            disabled={this.state.submitDisabled}
                            color="primary"
                            onClick={this.handleLogin}
                          >
                            دخول
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
