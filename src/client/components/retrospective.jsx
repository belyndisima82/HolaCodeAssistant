import React, { Component } from "react";
import Modal from 'react-responsive-modal';
import Survey from './survey.jsx'

class Retrospective extends Component {

  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
    this.onOpenModal = this.onOpenModal.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
  }

  onOpenModal() {
    this.setState({ open: true });
  }

  onCloseModal() {
    this.setState({ open: false });
  }

  render() {
    const { open } = this.state;

    return (
      <div>
        <button onClick={this.onOpenModal}>Retrospective</button>
        <Modal open={open} onClose={this.onCloseModal} center>
      <Survey />
        </Modal>
      </div>
    )}
}


export default Retrospective;
