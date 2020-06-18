import React from 'react';
import logo from './res/logo.png';
import logosmall from './res/logo_small.png';
import './App.css';
import Login from './login';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import './bootstrap.min.css';
import Upload from './upload/Upload';
import  Settings from './Settings';
import axios from 'axios';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies, ReactCookieProps } from 'react-cookie';

interface IAppState {
  LogInScreen: boolean,
  showPopup: boolean

}

interface Props extends ReactCookieProps {

}
class App extends React.Component<Props,IAppState> {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };


  /* binden um Zugriff zu bekommen*/
  constructor(props:Readonly<Props>) {
    super(props);

    window.addEventListener('popstate', () => this.forceUpdate());

    // Add a response interceptor
    axios.interceptors.response.use((response) => {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    }, error => {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      if(error.toString().includes("401"))
      {
        this.setState({LogInScreen: true})
      }
      return Promise.reject(error);
    });


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

  Navigation():JSX.Element{
    if ( window.location.hash === "#settings") {
      return <Settings />;
      } else {
       return <div><h1>Hier können Sie Bilder hochladen.</h1><Upload path='' /></div>;
      }
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
            <Navbar.Brand href="#home"> <img src={logosmall} width="50px" height="50px" className="App-logo" alt="logo" /></Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link href="#home" >Home</Nav.Link>
              <Nav.Link href="#settings">Settings</Nav.Link>
            </Nav>
            <Login />
          </Navbar>

        </header>
        <Row>
          <Col></Col>
          <Col xs={6}>
            <main>
            {this.state.LogInScreen ? 
            <div>
            <h1>Herzlich Willkommen bei HEPHAISTOS!</h1>
            <h2>Ihr digitaler Helfer in der Corona-Zeit.</h2>
            <img src={logo}  className="App-logo" alt="logo" />
            </div>
            :
            <this.Navigation />
            } 
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
