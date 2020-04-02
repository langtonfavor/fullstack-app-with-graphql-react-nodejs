import React, { Component } from "react";
import authContext from "../context/authContext";

import "./auth.css";

class AuthPage extends Component {
  state = {
    isLogin: true
  };

  static contextType = authContext;

  constructor(props) {
    super(props);

    this.emailEl = React.createRef();
    this.passwordEl = React.createRef();
  }

  switchHandler = () => {
    this.setState(previousState => {
      return { isLogin: !previousState.isLogin };
    });
  };
  submitHandler = event => {
    event.preventDefault();
    const email = this.emailEl.current.value;
    const password = this.passwordEl.current.value;

    if (email.trim().length === 0 || password.trim().length === 0) {
      return;
    }

    let reqQuery = {
      query: `
            query {
                login(email: "${email}", password: "${password}") {
                    userId
                    token
                }
            }
          `
    };
    if (!this.state.isLogin) {
      reqQuery = {
        query: `
                mutation {
                    createUser(userInput: {email: "${email}", password: "${password}"}) {
                        _id
                        email
                    }
                }
              `
      };
    }

    fetch("http://localhost:3000/graphql", {
      method: "POST",
      body: JSON.stringify(reqQuery),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("failed");
        }
        return res.json();
      })
      .then(resBody => {
        if (resBody.data.login.token) {
          this.context.login(
            resBody.data.login.token,
            resBody.data.login.userId
          );
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <form className="auth_form" onSubmit={this.submitHandler}>
        <div className="form-control">
          <label htmlFor="email">E-mail</label>
          <input type="text" id="email" ref={this.emailEl} />
        </div>

        <div className="form-control">
          <label htmlFor="password">password</label>
          <input type="text" id="password" ref={this.passwordEl} />
        </div>

        <div className="form_actions">
          <button type="submit">SignIn</button>
          <button type="button" onClick={this.switchHandler}>
            Switch to {this.state.isLogin ? "signup" : "login"}
          </button>
        </div>
      </form>
    );
  }
}

export default AuthPage;
