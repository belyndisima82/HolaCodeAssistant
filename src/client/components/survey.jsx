import React, { Component } from "react"
const axios = require('axios')

class Survey extends Component{
constructor (props){
   super(props)
   this.state = {
     bookmark: ''
   }

   this.handleSubmit = this.handleSubmit.bind(this);
   this.addItem = this.addItem.bind(this);
   this.handleBookmark = this.handleBookmark.bind(this);

 }

 addItem(bookmark) {
   axios.post('/bookmarks', bookmark)
     .then((response) => {
       console.log(response)
     })
     .catch((error) => {
       console.log(error)
     })

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
    this.addItem(this.state.bookmark)
    this.setState({
      bookmark: ''
    })
 }

 render(){
   return(
     <div>


     <h1>Survey</h1>
     <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSccvjf18kfMxSFAcmi_Nptxhz6ySSd-x_16Nly5XFOf1Ur2IA/viewform?embedded=true" width="640" height="3627" frameborder="0" marginheight="0" marginwidth="0">Loading...</iframe>
    </div>

)}
};


export default Survey
