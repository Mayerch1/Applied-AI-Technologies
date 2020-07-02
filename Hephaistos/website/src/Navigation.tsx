import React from 'react';
import Privacy from './Privacy';
import AboutUs from './AboutUs';
import Settings from './Settings';
import Upload from './upload/Upload';
import logo from './res/logo.png';
import Pricing from './Pricing';

interface INavigationState{
    LogInScreen: boolean;
}

class Navigation extends React.Component<{},INavigationState> {
    /* handle binds und Variablen für Benutzername Passwort und Loginscreen */
    constructor(props: Readonly<{}>) {
      super(props);
      this.state = {
        LogInScreen: true
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
  /* SettingScreen */
  render() {
    if ( window.location.hash === "#AboutUs") {
        return <AboutUs />;
      }
      if ( window.location.hash === "#privacy") {
        return <Privacy />;
      }
      else if (!this.state.LogInScreen)
      {
        if ( window.location.hash === "#settings") {
          return <Settings />;
        }
        else if (window.location.hash === "#packages"){
          return <Pricing />;
        }
        else{
          return <div><h1>Test us! Upload a picture.</h1><Upload path='' /></div>;
        }       
  
      }
      else {
        return   <div className="home"><h1>Welcome to HEPHAISTOS!</h1><h2>Your digital helper in the Corona era.</h2><img src={logo}  className="App-logo" alt="logo" /></div>
      }
    }
  
}

export default Navigation;
