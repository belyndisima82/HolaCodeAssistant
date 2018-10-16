import React from 'react'
import ReactDOM from 'react-dom'
import './styles/app.css'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import App from './components/App'


ReactDOM.render(<MuiThemeProvider><App /></MuiThemeProvider>, document.getElementById('app'))
