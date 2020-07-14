import React, { Component } from "react";
import Dropzone from "./Dropzone";
import passed from '../res/passed.png';
import Progress from "./Progress";
import axios from 'axios';
import './upload.css';

class Upload extends Component {
  constructor(props) {
    super(props);
    console.log(props)
    this.state = {
      files: [],
      uploading: false,
      uploadProgress: {},
      successfullUploaded: false,
      showMaskPopup: false,
      mask: false
    };

    this.onFilesAdded = this.onFilesAdded.bind(this);
    this.uploadFiles = this.uploadFiles.bind(this);
    this.sendRequest = this.sendRequest.bind(this);
    this.renderActions = this.renderActions.bind(this);
  }

  /**
   * Fügt ein hinzugefügte Datei der Liste hinzu
   * @param {event} files 
   */
  onFilesAdded(files) {
    this.setState(prevState => ({
      files: prevState.files.concat(files)
    }));
  }

  /**
   * Lädt die Dateien hoch
   */
  async uploadFiles() {
    this.setState({ uploadProgress: {}, uploading: true });
    const promises = [];
    this.state.files.forEach(file => {
      promises.push(this.sendRequest(file));
    });
    try {
      await Promise.all(promises);

      var event = new CustomEvent(
        "filesUploaded",
        {
          bubbles: true,
          cancelable: true
        }
      );
      document.dispatchEvent(event);
      this.setState({ successfullUploaded: false, uploading: false, files: [] });
    } catch (e) {
      // Not Production ready! Do some error handling here instead...
      this.setState({ successfullUploaded: true, uploading: false });
    }
  }
  /**
   * Sendet den Request zum Server
   * @param {file} file 
   */
  sendRequest(file) {
    return new Promise((resolve, reject) => {

      const formData = new FormData();
      formData.append("file", file, file.name);
      axios.post(this.props.url, formData, {withCredentials: true}).then((res) => {
  

        const copy = { ...this.state.uploadProgress };

        copy[file.name] = { state: "done", percentage: 100 };

        this.setState({ uploadProgress: copy, showMaskPopup: true, mask: res.data.mask });

        resolve(res);
      }
      ).catch((req) => {
        const copy = { ...this.state.uploadProgress };
        copy[file.name] = { state: "error", percentage: 0 };
        this.setState({ uploadProgress: copy });
        reject(req);
      });
    });
  }

  /**
   * Rendert die Progressbar
   * @param {file} file 
   */
  renderProgress(file) {
    const uploadProgress = this.state.uploadProgress[file.name];
    if (this.state.uploading || this.state.successfullUploaded) {
      return (
        <div className="ProgressWrapper">
          <Progress progress={uploadProgress ? uploadProgress.percentage : 0} />
          <img
            className="CheckIcon"
            alt="done"
            src="baseline-check_circle_outline-24px.svg"
            style={{
              opacity:
                uploadProgress && uploadProgress.state === "done" ? 0.5 : 0
            }}
          />
        </div>
      );
    }
  }

  /**
   * Rendert die Aktionen
   */
  renderActions() {
    if (this.state.successfullUploaded) {
      return (
        <button
          onClick={() =>
            this.setState({ files: [], successfullUploaded: false })
          }
        >
          Clear
        </button>
      );
    } else {
      return (
        <button
          disabled={this.state.uploading}
          onClick={this.uploadFiles}
        >
          Upload
        </button>
      );
    }
  }

  /**
   * Rendert den Upload
   */
  render() {
    return (
      <div className="Upload">
        <span className="Title">{this.props.title}</span>
        <div className="Content">
          <div>
            <Dropzone
              onFilesAdded={this.onFilesAdded}
              disabled={this.state.uploading || this.state.successfullUploaded}
            />
          </div>
          <div className="Files">
            {this.state.files.map(file => {
              return (
                <div key={file.name} className="Row">
                  <span className="Filename">{file.name}</span>
                  {this.renderProgress(file)}
                </div>
              );
            })}
          </div>
        </div>
        <div className="Actions">{this.renderActions()}</div>
        {this.state.showMaskPopup && !this.state.mask ? 
                <img src="https://slm-assets.secondlife.com/assets/7285225/view_large/andreas.jpg" alt="Not Passed" />
          :''}
        {this.state.showMaskPopup && this.state.mask ? 
                <img src={passed}  alt="passed"/> :''}
      </div>
    );
  }
}

export default Upload;