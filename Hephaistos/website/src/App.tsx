import React from 'react';
import logosmall from './res/logo_small.png';
import './App.css';
import Login from './login';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import './bootstrap.min.css';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies, ReactCookieProps } from 'react-cookie';
import Navigation from './Navigation';

interface IAppState {
  LogInScreen: boolean,
  showPopup: boolean

}

class App extends React.Component<ReactCookieProps,IAppState> {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };


  /* binden um Zugriff zu bekommen*/
  constructor(props:Readonly<ReactCookieProps>) {
    super(props);

    window.addEventListener('popstate', () => this.forceUpdate());

    this.state = {
      LogInScreen: true,
      showPopup: false
    };  
    this.LogIn = this.LogIn.bind(this);
    window.addEventListener('LogIn', this.LogIn, false);

  }


  /**
   * Token event
   */
  LogIn(e:any) {
    this.setState({ LogInScreen: !e.detail.LogIn})
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
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand href="#home"> <img src={logosmall} width="50px" height="50px" className="App-logo" alt="logo" />          </Navbar.Brand>
 
  
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">


              <Nav.Link href="#home" >Home</Nav.Link>
              {!this.state.LogInScreen ? <Nav.Link href="#settings">Settings</Nav.Link>:""}
              {!this.state.LogInScreen ? <Nav.Link href="#packages">Pricing</Nav.Link>:""}
              <Nav.Link  href="#AboutUs">About Us</Nav.Link>
              <Nav.Link href="#privacy" >Privacy</Nav.Link>
              {!this.state.LogInScreen ?  <Nav.Link href="#provide_data" >Provide Dataset</Nav.Link>:""}

          </Nav>
          <div >
              <Login  />
          </div>
          </Navbar.Collapse>

          </Navbar>

        </header>
        <Row>
          <Col></Col>
          <Col xs={6}>
            <main>         
            <Navigation />
            </main>

          </Col>
          <Col>
          </Col>
        </Row>
      </div>
    );
  }
};

export default withCookies(App);
