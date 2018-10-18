import React, { Component } from "react";
import Modal from 'react-responsive-modal';


class Ticket extends Component {

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
        <button className="buttons" onClick={this.onOpenModal}>
        <p className="textcolor">
        Help Desk
        </p>
        </button>
        <Modal open={open} onClose={this.onCloseModal} center>
          <iframe className='tickets' src="https://helpdesk.makerpass.com/groups/hc2/tickets"></iframe>
        </Modal>
      </div>
    )}
}


export default Ticket;
