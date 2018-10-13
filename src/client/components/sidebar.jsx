import React, { Component } from "react";
import CalendarEvents from './calendar.jsx';
import Ticket from './ticket.jsx';
import Attendance from './attendance.jsx';

class SideBar extends Component {

  render() {
    return (
      <div className= "col-md-2">
        <div className="rowLine">
          <CalendarEvents />
          <Ticket />
          <Attendance />
          <button className="makerpass col-md-12"><a href="https://learn.makerpass.com/">Makerpass</a></button>
          <button className="udacity col-md-12"><a href="https://www.udacity.com/">Udacity</a></button>
          <button className="mozilla col-md-12"><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference'">Mozilla</a></button>
          <button className="github col-md-12"><a href="https://github.com/">Github</a></button>
          <button className="stackoverflow col-md-12"><a href="https://stackoverflow.com/">Stack</a></button>
          <button className="repl col-md-12"><a href="https://repl.it/@belinda_domaga/ImportantFirebrickCore">Repl</a></button>
        </div>
      </div>
    )
  }
}

export default SideBar;
