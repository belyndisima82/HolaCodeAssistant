import React, { Component } from 'react';
import {Container} from "mdbreact";

class Addbookmark extends Component{
  constructor (props){
    super(props)
    this.state = {
      bookmark: '',
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBookmark = this.handleBookmark.bind(this);

  }

  handleBookmark(e){
    e.preventDefault()
    this.setState({
      bookmark:e.target.value
    })
  }

  handleSubmit(e){
    e.preventDefault()
     this.props.addBookmark(this.state.bookmark)
     this.setState({
       bookmark: ''
     })
  }

  render(){
    return(
      <div>
        <Container>
          <h1 className='bookmark'>Here you can add your Bookmarks ...</h1>
        </Container>
        <div class='bookmarkForm'>
          <input
            className='inputBookmark'
            value={this.state.bookmark}
            placeholder="Enter a new Bookmark"
            onChange={this.handleBookmark}
            />
          <button className='add' onClick={this.handleSubmit}>+</button>
        </div>
     </div>
    )
  }



};

export default Addbookmark
