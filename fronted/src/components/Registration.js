
import React, { Component } from "react";
import authContext from "../context/authContext";
import { Form, FormGroup, Label, Button, Input } from "reactstrap";

import "./Registration.css";

class RegistrationPage extends Component {
  state = {
    isLoading: false,
    isLogin: true,
    emailId: "",
    password: "",
    contact:""
  };

  static contextType = authContext;

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  setContact = (event) => {
    event.preventDefault();
    this.setState({ contactId: event.target.value });
  };

  setFirstName = (event) => {
    event.preventDefault();
    this.setState({ nameId: event.target.value });
  };

  setSurname = (event) => {
    event.preventDefault();
    this.setState({ surnameId: event.target.value });
  };

  setUsername = (event) => {
    event.preventDefault();
    this.setState({ emailId: event.target.value });
  };

  setPassword = (event) => {
    event.preventDefault();
    this.setState({ password: event.target.value });
  };

  setContact = (event) => {
    event.preventDefault();
    this.setState({contactId: event.target.value });
  };

onSubmit = (event) => {
    event.preventDefault();
    
    let reqQuery = {
        query: `
                mutation {
                    createUser(userInput: {firstName: "${this.state.nameId}",lastName: "${this.state.surnameId}",contact: "${this.state.contactId}",email: "${this.state.emailId}", password: "${this.state.password}"}) {
                        _id
                        email
                    }
                }
              `,
      };
    

    fetch("http://localhost:3000/graphql", {
      method: "POST",
      body: JSON.stringify(reqQuery),
      headers: {
        "Content-Type": "application/json",
      },
    }) 
     .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("failed");
        }
        return window.location.href="/auth"//res.json();
      }) 
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
  <Form className="login-form" onSubmit={this.onSubmit}>
        <h1>
          <span className="font-weight-bold">Register</span>
        </h1>
        <h2>helo</h2>

        <FormGroup>
          <Label>Email</Label>
          <Input
            type="emailId"
            id="email"
            onChange={(e) => this.setUsername(e)}
            name="email"
            />
        </FormGroup>


        <FormGroup>
          <Label>First Name</Label>
          <Input
            type="nameId"
            id="name"
            onChange={(e) => this.setFirstName(e)}
            name="name"
          />
        </FormGroup>

        <FormGroup>
          <Label>Last Name:</Label>
          <Input
            type="surnameId"
            id="surname"
            onChange={(e) => this.setSurname(e)}
            name="surname"
          />
        </FormGroup>

        <FormGroup>
          <Label>Contact</Label>
          <Input
            type="contactId"
            id="contact"
            onChange={(e) => this.setContact(e)}
            name="contact"
          />
        </FormGroup>

        <FormGroup>
          <Label>password</Label>
          <Input
            type="text"
            id="password"
            onChange={(e) => this.setPassword(e)}
          />
        </FormGroup>

        <Button className="btn-lg btn-dark  btn-block"
         onClick={this.onSubmit}
         >
          Sign Up.
        </Button>              
  </Form>  
    );
  }
}

export default RegistrationPage;