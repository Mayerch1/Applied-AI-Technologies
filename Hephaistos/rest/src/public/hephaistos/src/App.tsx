import React from 'react';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';
import Login from './login';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import './bootstrap.min.css';
import Upload from './upload/Upload'

interface IAppState {
  LogInScreen: boolean,
  token: string
  showPopup: boolean
}


class App extends React.Component<{},IAppState> {

  /* binden um Zugriff zu bekommen*/
  constructor(props:Readonly<IAppState>) {
    super(props);
    this.state = {
      LogInScreen: true,
      token: '',
      showPopup: false
    };  
    this.LogIn = this.LogIn.bind(this);
    window.addEventListener('LogIn', this.LogIn, false);

  }
  /**
   * Token event
   */
  LogIn(e:any) {
    this.setState({ LogInScreen: false})
  }

/*Popup Window anzeigen*/
  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

/* Eingegebene Informationen speichern, umwandeln, in console schreiben und einloggen */

 /**
  * Rendert das Ã¤uÃŸer der Anwendung
  */
  render() {
    return (
      <div className="App">
        <script src="https://unpkg.com/react/umd/react.production.min.js" crossOrigin="true"  />
        <script
          src="https://unpkg.com/react-dom/umd/react-dom.production.min.js"
          crossOrigin="true"
        />
        <script
          src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js"
          crossOrigin="true"
        />
            <script
          src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
          crossOrigin="true"
        />
        <header className="App-header">
          <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand href="#home"> <img src={logo} width="50px" height="50px" className="App-logo" alt="logo" /></Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link href="#home">Home</Nav.Link>
            </Nav>
            <Login />
          </Navbar>
          <h1>Hephaistos</h1>
        </header>
        <Row>
          <Col></Col>
          <Col xs={6}>
            <main>
            {this.state.LogInScreen ? '': <Upload token={this.state} path='' /> }
            </main>

          </Col>
          <Col>
          </Col>
        </Row>
      </div>
    );
  }
};

export default App;
