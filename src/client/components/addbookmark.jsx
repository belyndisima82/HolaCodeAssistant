import React, { Component } from 'react';

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
    alert(this.state.bookmark)
    e.preventDefault()
     this.props.addBookmark(this.state.bookmark)
     this.setState({
       bookmark: ''
     })
  }

  render(){
    return(
      <div>
       bookmark:
       <input
         value={this.state.bookmark}
         placeholder="Enter a Bookmark"
         onChange={this.handleBookmark}
       />
     <button onClick={this.handleSubmit}>Add New Bookmark</button>
     </div>
    )
  }



};

export default Addbookmark
