import React, { MouseEvent, FormEvent } from 'react';
import axios, { AxiosResponse } from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormGroup from 'react-bootstrap/FormGroup';

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
}

class Settings extends React.Component<{},IUserState> {
  /* handle binds und Variablen für Settingsscreen */
  constructor(props: Readonly<IUserState>) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.NewApiKey = this.NewApiKey.bind(this);
    this.state = {
      email: '',
      password: '',
      passwordConfirm: '',
      name: '',
      surname: '',
      chatID: '',
      apiToken: ''
    };

    axios.get("/users/get", {withCredentials: true}).then((res:AxiosResponse) => {
      console.log(res.data);
      this.setState( res.data);
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
  
  /**
   * submit
   * @param {event} event 
   */
  NewApiKey(event:any) {
    event.preventDefault();

    axios.get('/users/NewApiToken', {withCredentials: true}).then((res:AxiosResponse) => {
      this.setState(res.data)
    }).catch(res => console.log(res))
  }

  /**
   * submit
   * @param {event} event 
   */
  handleSubmit(event:any) {
    event.preventDefault();
    console.log(event);

    var formBody = this.createXurlcodeFromObject(this.state);

    axios.put('/users/update', formBody, {withCredentials: true}).then((data) => {
    }).catch(res => console.log(res))
  }

  /* SettingScreen */
  render() {
      return (
          <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                  <label htmlFor="email">E-Mail-Adresse</label>
                  <Form.Control type="email" id="email" placeholder="email" value={this.state.email}  disabled={true} />
              </FormGroup>
              <FormGroup>
                <label htmlFor="password">New Password</label>
                <Form.Control id="password" type="password" placeholder="Password" value={this.state.password} onChange={evt => this.setState({password: evt.currentTarget.value})} />
              </FormGroup>
              <FormGroup>
                <label htmlFor="password">Password confirm</label>
                <Form.Control id="password_confirm" type="password" placeholder="Password confirm" value={this.state.passwordConfirm} onChange={evt => this.setState({passwordConfirm: evt.currentTarget.value})} />
              </FormGroup>
              <FormGroup>
                  <label htmlFor="name">Name</label>
                  <Form.Control id="name" placeholder="Name" value={this.state.name} required onChange={evt => this.setState({name: evt.currentTarget.value})}/>
              </FormGroup>
              <FormGroup>
                <label htmlFor="surname">Surname</label>
                <Form.Control id="surname" placeholder="Surname" value={this.state.surname} required onChange={evt => this.setState({surname: evt.currentTarget.value})} />
              </FormGroup>
              <FormGroup>
                <label htmlFor="chatId">Telegram Chat Id</label>
                <Form.Control id="chatId" type="token" placeholder="Telegram Chat Id" value={this.state.chatID} onChange={evt => this.setState({chatID: evt.currentTarget.value})} />
              </FormGroup>
              <FormGroup>
              <label htmlFor="token">Api-Token</label>
              <InputGroup>
                <Form.Control id="token" type="text" placeholder="Api-Token" value={this.state.apiToken} disabled={true} />
                <div className="input-group-append">
                    <Button onClick={this.NewApiKey}>New Api-Token</Button>
                </div>    
              </InputGroup>
              </FormGroup>
              <FormGroup>
              <Button type="submit">Submit</Button>
              </FormGroup>
          </Form>
      );
    }
  
}

export default Settings;
