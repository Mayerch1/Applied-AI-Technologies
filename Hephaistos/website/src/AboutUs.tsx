import React from 'react';
import axios, { AxiosResponse } from 'axios';
import ReactMarkdown from "react-markdown";

interface IAboutState {
  input: string;
}
class AboutUs extends React.Component<{},IAboutState> {
  constructor(props: Readonly<IAboutState>) {
    super(props);
    this.state = {
      input: "Is Loading...",
    };

    axios.get("https://raw.githubusercontent.com/Mayerch1/Applied-AI-Technologies/master/Hephaistos/AboutUS.md").then((res: AxiosResponse) => {
      this.setState({input: res.data});
    });

  }
 
  /* SettingScreen */
 render() {
      return (
          <div>
            <ReactMarkdown source={this.state.input} />
          </div>
      );
    }
}

export default AboutUs;
