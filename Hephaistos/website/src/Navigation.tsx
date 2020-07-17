import React from 'react';
import Privacy from './Privacy';
import AboutUs from './AboutUs';
import Settings from './Settings';
import Upload from './upload/Upload';
import logo from './res/logo.png';
import Pricing from './Pricing';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';

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
        else if (window.location.hash==="#provide_data"){
          return <div><h1>Provide your data</h1><br /><p>Abuse can lead to suspension  of your account! By uploading your images you grant us all rights to use them internally for our service.</p><Row><Card className="col col-md-6 uploaddata"><div ><Upload  url="/hephaistos/provideDataMask" title="Mask images" /></div></Card><Card className="col col-md-6 uploaddata"><div ><Upload  url="/hephaistos/provideDataNoMask" title="No mask images" /></div></Card></Row></div>;
        }

      else {
        return <div><h1>Test us! Upload a picture.</h1><Upload  url="/hephaistos/detection" title="" /></div>;
      }

    }
    else {
      return <div className="home">
        <h1>Welcome to HEPHAISTOS!</h1>
        <h2>Your digital helper in the Corona era.</h2>
        <div className="logo">
          <img src={logo} className="App-logo col-5" alt="logo" />
        </div>
      </div>
    }
  }
  
}

export default Navigation;
