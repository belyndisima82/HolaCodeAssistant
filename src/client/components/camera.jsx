import React, { Component } from "react";
import Webcam from "react-webcam";
const axios = require("axios");


class Camera extends Component {

  constructor(props) {
    super(props);
    this.state = {
      screenshot: null,
      tab: 0
    }
    this.handleClick = this.handleClick.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  handleClick(){
        const screenshot = this.webcam.getScreenshot();
        this.setState({ screenshot });
      }

  onFormSubmit(e){
        e.preventDefault();
        const formData = new FormData();
        formData.append('picture',this.state.screenshot);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        axios.post("/upload", formData, config)
            .then((response) => {
                alert(response.data +", your Attendance is recorded");
                console.log(response);
            }).catch((error) => {
              console.log(error);
        });
    }

  render() {
    console.log(this.state.screenshot)

    return (
      <div>
        <Webcam
          ref={node => this.webcam = node}
          audio={false}
          width='212'
          height='160'
          screenshotFormat="image/jpeg"
        />
        <button onClick={this.handleClick}>Capture photo</button>
        {this.state.screenshot ?
          <div>
            <img src={this.state.screenshot} />
            <button onClick={this.onFormSubmit}>Upload</button>
          </div>: null}
      </div>
    )}

}
  export default Camera;
