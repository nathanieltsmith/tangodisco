import React from 'react'
import ReactDOM from 'react-dom'
import RecordingEditor from './components/RecordingEditor'
import SearchPage from './components/SearchPage'
import store from './store/store'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import VideoPlayer from './components/VideoPlayer'

class App extends React.Component {
  render() {
    const nameStyle = {
      position: 'absolute',
      top: '80px',
      left: '250px'
    }
    return (<div>
					<h1><VideoPlayer/><span style={nameStyle}>Tango Discography</span> </h1> 
					{this.props.children}
				</div>)
  }
}

class NoMatch extends React.Component {
  render() {
    return <h1> 404: Not Found </h1>
  }
}

class PlaceHolder extends React.Component {
  render() {
    return <h1> Place Holder </h1>
  }
}

ReactDOM.render((<Provider store={store}>
					<Router history={browserHistory}>
    					<Route path="/" component={App}>
    						<IndexRoute component={SearchPage} />
      						<Route path="add" component={RecordingEditor} />
      						<Route path="edit/:recordingId" component={RecordingEditor} />
        					<Route path="search/:query" component={SearchPage} />
        					<Route path="user/:userId" component={PlaceHolder} />
        					<Route path='log/:startDate/:endDate' component={PlaceHolder} />
     				 	</Route>
      				 	<Route path="*" component={NoMatch}/>
  					</Router>
				 </Provider>),
  document.getElementById('app'))
