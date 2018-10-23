import React, { Component } from "react";
import {Container} from "mdbreact";


const BookMarkList = props => (


        <div>
          {
            <center><ul>
              {props.bookmarks.map((bookmark, i) => (
                <li>{bookmark.bookmark}</li>
              ))}
            </ul></center>
        }
      </div>

)

export default BookMarkList;
