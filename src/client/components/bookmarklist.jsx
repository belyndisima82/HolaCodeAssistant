import React, { Component } from "react";
import {Container} from "mdbreact";


const BookMarkList = props => (


        <div>
          {
            <ul>
              {props.bookmarks.map((bookmark, i) => (
                <li>{bookmark.bookmark}</li>
              ))}
            </ul>
        }
      </div>

)

export default BookMarkList;
