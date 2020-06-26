import React from 'react';
import axios, { AxiosResponse } from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormGroup from 'react-bootstrap/FormGroup';
import QRCode from 'qrcode.react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';

type FormControlElement =
  | HTMLInputElement
  | HTMLSelectElement
  | HTMLTextAreaElement;
interface IUserState {
  email: string,
  password: string,
  passwordConfirm: string,
  name: string,
  surname: string,
  chatID: string,
  apiToken: string,
  telegramUrl: string
}

class Settings extends React.Component<{}, IUserState> {
  /* handle binds und Variablen für Settingsscreen */
  constructor(props: Readonly<IUserState>) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.NewApiKey = this.NewApiKey.bind(this);
    this.deleteChatId = this.deleteChatId.bind(this);
    this.state = {
      email: '',
      password: '',
      passwordConfirm: '',
      name: '',
      surname: '',
      chatID: '',
      apiToken: '',
      telegramUrl: ''
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
  NewApiKey(event: any) {
    event.preventDefault();

    axios.get('/users/NewApiToken', { withCredentials: true }).then((res: AxiosResponse) => {
      this.setState(res.data)
    }).catch(res => console.log(res))
  }

  /**
   * submit
   * @param {event} event 
   */
  handleSubmit(event: any) {
    event.preventDefault();

    var formBody = this.createXurlcodeFromObject(this.state);

    axios.put('/users/update', formBody, { withCredentials: true }).then((data) => {
    }).catch(res => console.log(res))
  }

  /**
   * submit
   * @param {event} event 
   */
  changePassword(event: any) {
    event.preventDefault();

    var formBody = this.createXurlcodeFromObject({password: this.state.password, passwordConfirm: this.state.passwordConfirm});

    
    axios.put('/users/changePassword', formBody, { withCredentials: true }).then((data) => {
    }).catch(res => console.log(res))
  }

  /**
   * submit
   * @param {event} event 
   */
  deleteChatId(event: any) {
    event.preventDefault();

    axios.delete('/users/ChatId', { withCredentials: true }).then((data) => {
      this.setState({chatID: ""})
      this.forceUpdate();
    }).catch(res => console.log(res))
  }

  /* SettingScreen */
  render() {
    return (
      <div>
        <Card>
          <Card.Header>
            Settings
          </Card.Header>
          <Card.Body>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                <label htmlFor="email">E-Mail-Adresse</label>
                <Form.Control type="email" id="email" placeholder="email" value={this.state.email} disabled={true} />
              </FormGroup>
              <Form.Row>
                <Col>
                  <FormGroup>
                    <label htmlFor="name">Name</label>
                    <Form.Control id="name" placeholder="Name" value={this.state.name} required onChange={evt => this.setState({ name: evt.currentTarget.value })} />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <label htmlFor="surname">Surname</label>
                    <Form.Control id="surname" placeholder="Surname" value={this.state.surname} required onChange={evt => this.setState({ surname: evt.currentTarget.value })} />
                  </FormGroup>
                </Col>
              </Form.Row>
              <FormGroup>
                <Button type="submit">Submit</Button>
              </FormGroup>
            </Form>
          </Card.Body>
        </Card>
        <Card>
          <Card.Header>
            Change password
          </Card.Header>
          <Card.Body>
            <Form onSubmit={this.changePassword}>
              <Form.Row>
                <Col>
                  <FormGroup>
                    <label htmlFor="password">New Password</label>
                    <Form.Control id="password" type="password" placeholder="Password" value={this.state.password} onChange={evt => this.setState({ password: evt.currentTarget.value })} />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <label htmlFor="password">Password confirm</label>
                    <Form.Control id="password_confirm" type="password" placeholder="Password confirm" value={this.state.passwordConfirm} onChange={evt => this.setState({ passwordConfirm: evt.currentTarget.value })} />
                  </FormGroup>
                </Col>
              </Form.Row>
              <FormGroup>
                <Button type="submit">Submit</Button>
              </FormGroup>
            </Form>
          </Card.Body>
        </Card>
        <Card>
          <Card.Header>
            API Token
          </Card.Header>
          <Card.Body>
            <InputGroup>
              <Form.Control id="token" type="text" placeholder="Api-Token" value={this.state.apiToken} disabled={true} />
              <div className="input-group-append">
                <Button onClick={this.NewApiKey}>New Api-Token</Button>
              </div>
            </InputGroup>
          </Card.Body>
        </Card>
        <Card>
          <Card.Header>
            Telegram
          </Card.Header>
          <Card.Body>
            <Form >
              <Form.Row>
                <Col>
                  <label htmlFor="chatId">Telegram Chat Id</label>
                  <InputGroup>
                    <Form.Control id="chatId" type="password" readOnly placeholder="Telegram Chat Id" value={this.state.chatID} />
                    <div className="input-group-append">
                      <Button onClick={this.deleteChatId} className="btn btn-danger">X</Button>
                    </div>
                  </InputGroup>
                </Col>
                <Col>
                  <label htmlFor="chatId">Telegram Url</label>
                  <InputGroup>
                    <Form.Control id="token" type="text" placeholder="Telegram-Url" value={this.state.telegramUrl} disabled={true} />
                    <div className="input-group-append">
                      <a href={this.state.telegramUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">open link</a>
                    </div>
                  </InputGroup>
                </Col>
              </Form.Row>
              <FormGroup className="home">
                <QRCode value={this.state.telegramUrl} />
              </FormGroup>
            </Form>
          </Card.Body>
        </Card>
      </div>
    );
  }

}

export default Settings;
