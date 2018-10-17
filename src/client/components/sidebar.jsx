import React, { Component } from "react";
import CalendarEvents from './calendar.jsx';
import Ticket from './ticket.jsx';
import Attendance from './attendance.jsx';
import {Container} from "mdbreact";


class SideBar extends Component {

  render() {
    return (
      <div className="drawer">
      <Container>
      <div className= "col-md-2">
        <div className="rowLine">
        <h2> TOOLS</h2>
          <iframe className='calendar' src="https://calendar.google.com/calendar/embed?showTitle=0&amp;showNav=0&amp;showDate=0&amp;showPrint=0&amp;showTabs=0&amp;showCalendars=0&amp;showTz=0&amp;mode=AGENDA&amp;height=600&amp;wkst=1&amp;bgcolor=%2342104A&amp;src=holacode.com_49297h4c9415iuq3nrnm62sk8g%40group.calendar.google.com&amp;color=%2342104A&amp;ctz=America%2FMexico_City"></iframe>
          <iframe className='tickets' src="https://helpdesk.makerpass.com/groups/hc2/tickets"></iframe>

          <button className="makerpass col-md-12"><a href="https://learn.makerpass.com/">Makerpass</a></button>
          <button className="udacity col-md-12"><a href="https://www.udacity.com/">Udacity</a></button>
          <button className="mozilla col-md-12"><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference'">Mozilla</a></button>
          <button className="github col-md-12"><a href="https://github.com/">Github</a></button>
          <button className="stackoverflow col-md-12"><a href="https://stackoverflow.com/">Stack</a></button>
          <button className="repl col-md-12"><a href="https://repl.it/@belinda_domaga/ImportantFirebrickCore">Repl</a></button>
        </div>
      </div>

      </Container>
      </div>
    )
  }
}

export default SideBar;
