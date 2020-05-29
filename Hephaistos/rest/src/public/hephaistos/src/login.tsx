import React, { MouseEvent, FormEvent } from 'react';
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

class Login extends React.Component<{},ILoginState> {
  /* handle binds und Variablen für Benutzername Passwort und Loginscreen */
  constructor(props: Readonly<ILoginState>) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.state = {
      benutzername: '',
      passwort: '',
      LogInScreen: true,
      showPopup: false
    };

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
  /* Respnse text in Konsole schreiben */
  handleResponse(response: Response) {
    console.log(response.text());

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
    console.log("Benutzer" + this.state.benutzername + "hat sich ausgeloggt")
    var event = new CustomEvent(
      "token",
      {
        detail: {
          token: null
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
    console.log(event);
    var form = {
      email: this.state.benutzername,
      password: this.state.passwort
    }

    var formBody = this.createXurlcodeFromObject(form);

    console.log("Folgender Benutzer hat versucht sich einzuloggen:   Benutzername: " + this.state.benutzername + " Passwort: " + this.state.passwort)
    axios.post('http://localhost:3000/api/auth/login', formBody).then((data) => {
      this.setState({ LogInScreen: false });
      console.log("test")
      var event = new CustomEvent(
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
    }).catch(res => console.log(res))
  }

  /* LoginScreen mit "Login" und "Passwort vergessen?" rendern, falls nicht eingeloggt, sonst Logout und Hilfe anzeigen */
  render() {
    if (this.state.LogInScreen === true) {
      return (
        <div className="Login" >
          <Form inline onSubmit={this.handleSubmit}>
            <InputGroup>
              <Form.Control type="text" placeholder="username" value={this.state.benutzername} onChange={evt => this.updateInputValue(evt)} />
              <Form.Control type="password" placeholder="password" value={this.state.passwort} onChange={evt => this.updatePasswortValue(evt)} />
              <InputGroup.Append>
                <ButtonGroup>
                  <Button variant="outline-secondary" type="submit">Login</Button>
                  <Button variant="outline-secondary" onClick={() => { alert("Bitte wenden Sie sich an Github Maintainer um Ihr Passwort wiederherzustellen "); }}> Passwort vergessen? </Button>
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
          <span className="white">Sie sind eingeloggt</span>
          <ButtonGroup>
            <Button variant="outline-secondary" onClick={() => { alert("Bitte wenden Sie sich an Github Maintainer um Ihr Passwort wiederherzustellen "); }}>Haben sie Probleme?</Button>
            <Button variant="outline-secondary" onClick={this.handleLogout} >Logout</Button>
          </ButtonGroup>
        </div>
      );
    }
  }

}

export default Login;
