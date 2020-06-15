import React, { MouseEvent, FormEvent } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormGroup from 'react-bootstrap/FormGroup';

interface IUserState {
    email: string,
    settings: boolean,
    password: string,
    firstname: string,
    surname: string,
    telegram: string,
    apiToken: string,
}

class Login extends React.Component<{},IUserState> {
  /* handle binds und Variablen für Benutzername Passwort und Loginscreen */
  constructor(props: Readonly<IUserState>) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      email: '',
      settings: false,
      password: '',
      firstname: '',
      surname: '',
      telegram: '',
      apiToken: ''
    };

  }

  /* Xurl code generieren */
  createXurlcodeFromObject(obj:any) {
    var formBody = [];
    for (var property in obj) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(obj[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    return formBody.join("&");
  }

  /* Benutzernamen updaten */
  updateInputValue(evt:any) {
    this.setState({ email: evt.currentTarget.value });
  }

  /* Passwort updaten */
  updatePasswortValue(evt: React.ChangeEvent<any>) {
    this.setState({ password: evt.currentTarget.value });
  }

  /**
   * login
   * @param {event} event 
   */
  handleSubmit(event:any) {
    event.preventDefault();
    console.log(event);
    var form = {
      password: this.state.password
    }

    var formBody = this.createXurlcodeFromObject(form);

    axios.post('/auth/login', formBody, {withCredentials: true}).then((data) => {
    }).catch(res => console.log(res))
  }

  /* LoginScreen mit "Login" und "Passwort vergessen?" rendern, falls nicht eingeloggt, sonst Logout und Hilfe anzeigen */
  render() {
    if (this.state.settings === true) {
      return (
          <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                <label htmlFor="username"></label>

              <Form.Control type="text" placeholder="username" value={this.state.email} onChange={evt => this.updateInputValue(evt)} />

              </FormGroup>

              <Form.Control type="password" placeholder="password" value={this.state.password} onChange={evt => this.updatePasswortValue(evt)} />
          </Form>
      );
    }
    else {
      return (
        ""
      );
    }
  }
}

export default Login;
