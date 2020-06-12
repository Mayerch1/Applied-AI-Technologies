import React, { Component } from "react";
import './Dropzone.css';
class Dropzone extends Component {
  constructor(props) {
    super(props);
    this.state = { hightlight: false };
    this.fileInputRef = React.createRef();

    this.openFileDialog = this.openFileDialog.bind(this);
    this.onFilesAdded = this.onFilesAdded.bind(this);
    this.onDragOver = this.onDragOver.bind(this);
    this.onDragLeave = this.onDragLeave.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }

  /**
   * Öffnet den FIledialog
   */
  openFileDialog() {
    if (this.props.disabled) return;
    this.fileInputRef.current.click();
  }

  /**
   * Fügt eine Datei der Liste hinzu
   * @param {event} evt 
   */
  onFilesAdded(evt) {
    if (this.props.disabled) return;
    const files = evt.target.files;
    if (this.props.onFilesAdded) {
      const array = this.fileListToArray(files);
      this.props.onFilesAdded(array);
    }
  }

  /**
   * Drag and drop Event für den Upload
   * @param {event} event 
   */
  onDragOver(event) {
    event.preventDefault();
    if (this.props.disabed) return;
    this.setState({ hightlight: true });
  }

  /**
   * Wenn die Dropzone verlassen wird
   */
  onDragLeave(event) {
    this.setState({ hightlight: false });
  }

  /**
   * Wenn eine Datei über der Dropzone losgelassen wird
   * @param {event} event 
   */
  onDrop(event) {
    event.preventDefault();
    if (this.props.disabed) return;
    const files = event.dataTransfer.files;
    if (this.props.onFilesAdded) {
      const array = this.fileListToArray(files);
      this.props.onFilesAdded(array);
    }
    this.setState({ hightlight: false });
  }

  /**
   * Wandelt die Liste in ein Array um
   */
  fileListToArray(list) {
    const array = [];
    for (var i = 0; i < list.length; i++) {
      array.push(list.item(i));
    }
    return array;
  }

  /**
   * Rendert die Dropzone
   */
  render() {
    return (
      <div
        className={`Dropzone ${this.state.hightlight ? "Highlight" : ""}`}
        onDragOver={this.onDragOver}
        onDragLeave={this.onDragLeave}
        onDrop={this.onDrop}
        onClick={this.openFileDialog}
        style={{ cursor: this.props.disabled ? "default" : "pointer" }}
      >
        <input
          ref={this.fileInputRef}
          className="FileInput"
          type="file"
          multiple
          onChange={this.onFilesAdded}
        />
        <img alt="File" src="https://img.icons8.com/ios/50/000000/file-filled.png"></ img>
        <span>Dateien hochladen</span>
      </div>
    );
  }
}

export default Dropzone;