import React from 'react'
import ReactDOM from 'react-dom'
import RecordingEditor from './components/RecordingEditor'
import SearchPage from './components/SearchPage'
import SignUp from './components/SignUp'
import LogOut from './components/LogOut'
import store from './store/store'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import Header from './components/Header'

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
              <Route path="/" component={Header}>
                <IndexRoute component={SearchPage} />
                  <Route path="add" component={RecordingEditor} />
                  <Route path="edit/:recordingId" component={RecordingEditor} />
                  <Route path="search/:query" component={SearchPage} />
                  <Route path="user/:userId" component={PlaceHolder} />
                  <Route path="signup" component={SignUp} />
                  <Route path="logout" component={LogOut} />
                  <Route path='log/:startDate/:endDate' component={PlaceHolder} />
              </Route>
                <Route path="*" component={NoMatch}/>
            </Router>
         </Provider>),
  document.getElementById('app'))
