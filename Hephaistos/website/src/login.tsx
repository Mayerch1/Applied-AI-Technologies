import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

interface ILoginState {
    benutzername: string,
    passwort: string,
    LogInScreen: boolean,
    showPopup: boolean
}




class Login extends React.Component<{},ILoginState, {}> {
  /* handle binds und Variablen für Benutzername Passwort und Loginscreen */
  constructor(props: React.ElementType) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.state = {
      benutzername: '',
      passwort: '',
      LogInScreen: true,
      showPopup: false
    };

    // Add a response interceptor
  axios.interceptors.response.use((response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, error => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log(error)
    if(error.toString().includes("401"))
    {
      this.handleLogout()
    }
    return Promise.reject(error);
  });
  

  }

  /* Benutzernamen updaten */
  updateInputValue(evt:any) {
    this.setState({ benutzername: evt.currentTarget.value });
  }

  /* Passwort updaten */
  updatePasswortValue(evt: React.ChangeEvent<any>) {
    this.setState({ passwort: evt.currentTarget.value });
  }

  /* Popup anzeige ändern */
  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
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

  /* Logout - Token löschen, Passwort löschen und Login Screen zeigen - Benutzername bleibt gespeichert */
  handleLogout() {
    var event = new CustomEvent(
      "LogIn",
      {
        detail: {
          LogIn: false
        },
        bubbles: true,
        cancelable: true
      }
    );
    document.dispatchEvent(event);

    this.setState({ LogInScreen: true })
    this.setState({ passwort: '' })
  }

  /**
   * login
   * @param {event} event 
   */
  handleSubmit(event:any) {
    event.preventDefault();
    var form = {
      email: this.state.benutzername,
      password: this.state.passwort
    }

    var formBody = this.createXurlcodeFromObject(form);

    axios.post('/auth/login', formBody, {withCredentials: true}).then((data) => {
      this.setState({ LogInScreen: false });
      event = new CustomEvent(
        "LogIn",
        {
          detail: {
            LogIn: true
          },
          bubbles: true,
          cancelable: true
        }
      );
      document.dispatchEvent(event);
    }).catch(res => {
      this.setState({passwort: ""})
    })
  }

  /* LoginScreen mit "Login" und "Passwort vergessen?" rendern, falls nicht eingeloggt, sonst Logout und Hilfe anzeigen */
  render() {
    if (this.state.LogInScreen === true) {
      return (
        <div className="Login justify-content-end" >
          <Form inline onSubmit={this.handleSubmit}>
            <InputGroup>
              <Form.Control type="text" placeholder="username" value={this.state.benutzername} onChange={evt => this.updateInputValue(evt)} />
              <Form.Control type="password" placeholder="password" value={this.state.passwort} onChange={evt => this.updatePasswortValue(evt)} />
              <InputGroup.Append>
                <ButtonGroup>
                  <Button variant="outline-secondary" type="submit">Login</Button>
                  <Button variant="outline-secondary" onClick={() => { alert("Please contact Github (https://github.com/Mayerch1/Applied-AI-Technologies) maintainer to recover your password."); }}>recover password</Button>
                </ButtonGroup>
              </InputGroup.Append>
            </InputGroup>
          </Form>
        </div>
      );
    }
    else {
      return (
        <div className="Login">
          <span className="white">You are logged in.</span>
          <ButtonGroup>
            <Button variant="outline-secondary" onClick={() => { alert("Please contact Github (https://github.com/Mayerch1/Applied-AI-Technologies) maintainer to recover your password."); }}>Do you have trouble?</Button>
            <Button variant="outline-secondary" onClick={this.handleLogout} >Logout</Button>
          </ButtonGroup>
        </div>
      );
    }
  }

}

export default Login;
