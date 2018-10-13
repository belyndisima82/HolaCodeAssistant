import React, { Component } from 'react'
import io from 'socket.io-client'
import Login from './Login'
import Chat from './Chat'
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import SideBar from './sidebar.jsx';

const socket = io.connect();

firebase.initializeApp({
apiKey: "AIzaSyB98qiRdWSgLuxVWPdfJSxJeO7luYrP7ZQ",
authDomain: "holapancho-3bcee.firebaseapp.com"
});

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isSignedIn: false,
            isSmallDevice: this.isSmallDevice()
        }

        this.handleResize = this.handleResize.bind(this)
    }

    componentDidMount() {
      navigator.geolocation.getCurrentPosition(location => {
        this.setState({
          lat: location.coords.latitude,
          lon: location.coords.longitude
        })
      });

      firebase.auth().onAuthStateChanged(user => {
        this.setState({
          isSignedIn : !!user
        });
      });
        //Event listeners
        window.addEventListener('resize', this.handleResize)
    }

    componentWillUnmount() {
        //Remove event listeners
        window.removeEventListener('resize', this.handleResize)
    }

    isSmallDevice() {
        return 768 >= window.innerWidth
    }

    handleResize() {
        const isSmallDevice = this.isSmallDevice()
        if (this.state.isSmallDevice !== isSmallDevice) {
            //Only update if it's necessary
            this.setState({
                isSmallDevice: isSmallDevice
            })
        }
    }

    // setUsername(username) {
    //     this.setState({
    //         username,
    //         isLoggedIn: true
    //     })
    // }

    render() {

      var uiConfig = {
        signInFlow: "popup",
        signInOptions: [

          firebase.auth.GithubAuthProvider.PROVIDER_ID,

        ],
        callbacks: {
          signInSuccess: () => false
        }
      };

          return (
            <div>
            {this.state.isSignedIn ?(
              <span>
              <div>Signed In!</div>
              <button onClick={() => firebase.auth().signOut()}>Sign out!</button>
              <h1>Hola Code {firebase.auth().currentUser.displayName}</h1>
              <img
              alt="profile picture"
              src={firebase.auth().currentUser.photoURL} className="propic"
              />
              <div className="rowNoFlex">
                <Chat className='col-md-10' username={firebase.auth().currentUser.displayName} socket={socket} isSmallDevice={this.state.isSmallDevice} />
                <SideBar className='col-md-2'/>
              </div>
              </span>
            ) : (
              <span>
                <StyledFirebaseAuth
                uiConfig={uiConfig}
                firebaseAuth={firebase.auth()}
                />
              </span>
            )}
            </div>
          );
    }
}

export default App
