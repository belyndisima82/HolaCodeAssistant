import React, { Component } from "react";
import Modal from 'react-responsive-modal';

class CalendarEvents extends Component {

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
        <button onClick={this.onOpenModal}>Calendar</button>
        <Modal open={open} onClose={this.onCloseModal} center>
          <iframe className='calendar' src="https://calendar.google.com/calendar/embed?mode=AGENDA&amp;height=600&amp;wkst=1&amp;bgcolor=%23ffffff&amp;src=holacode.com_49297h4c9415iuq3nrnm62sk8g%40group.calendar.google.com&amp;color=%2342104A&amp;ctz=America%2FMexico_City"></iframe>
        </Modal>
      </div>
    )}
}


export default CalendarEvents;
