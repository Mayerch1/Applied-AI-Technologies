import React from 'react';
import axios, { AxiosResponse } from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup'

type FormControlElement =
  | HTMLInputElement
  | HTMLSelectElement
  | HTMLTextAreaElement;
interface IPackageState {
  packageId: number,
}

class Pricing extends React.Component<{}, IPackageState> {
  /* handle binds und Variablen fÃ¼r Settingsscreen */
  constructor(props: Readonly<IPackageState>) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      packageId: 3,
    };

    axios.get("/users/get", { withCredentials: true }).then((res: AxiosResponse) => {
      this.setState(res.data);
    });

  }

  /* Xurl code generieren */
  createXurlcodeFromObject(obj: any) {
    var formBody = [];
    for (var property in obj) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(obj[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    return formBody.join("&");
  }

  /**
   * submit
   * @param {event} event 
   */
  handleSubmit(id:number) {

    axios.put('/users/updatePackage', {packageId: id}, { withCredentials: true }).then((data) => {
      this.setState({packageId: id})
    }).catch(res => console.log(res))
  }


  /* SettingScreen */
  render() {
    return (
      <div>
        <h1>Change HEPHAISTOS subscription:</h1>
        <CardGroup>
        <Card>
          <Card.Header>
            Free
          </Card.Header>
          <Card.Body>
            1 000 Images per day.
          </Card.Body>

          <Card.Footer>
          {this.state.packageId === 0 ? 
            <Button type="submit" variant="success">Deactivate</Button>
            :        
            <Button type="submit" onClick={this.handleSubmit.bind(this, 0)}>Activate</Button>
           }
               </Card.Footer>
        </Card>
        <Card>
          <Card.Header>
            39.99 &euro;/Month
          </Card.Header>
          <Card.Body>
            <Card.Text>
              7 200 Images per day. This corresponds to a picture every 5 seconds.
              <p>With this subscription it is possible to connect one camera. </p>
            </Card.Text>
          </Card.Body>
          <Card.Footer>
          {this.state.packageId === 1 ? 
            <Button type="submit" variant="success">Deactivate</Button>
            :    
          <Button type="submit" onClick={this.handleSubmit.bind(this, 1)}>Activate</Button>
  }
          </Card.Footer>
        </Card>
        <Card>
          <Card.Header>
            59.99 &euro;/Month
          </Card.Header>
          <Card.Body>
            50 000 Images per day.
          </Card.Body>
          <Card.Footer>
          {this.state.packageId === 2 ? 
            <Button type="submit" variant="success">Deactivate</Button>
            :    
          <Button type="submit" onClick={this.handleSubmit.bind(this, 2)}>Activate</Button>
  }
          </Card.Footer>
        </Card>
        </CardGroup>
      </div>
    );
  }

}

export default Pricing;
