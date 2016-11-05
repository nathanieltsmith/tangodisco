import React from 'react'
import ReactDOM from 'react-dom'
import RecordingEditor from './components/RecordingEditor'
import store from './store/store'
import { Provider } from 'react-redux'

ReactDOM.render((<Provider store={store}>
					<RecordingEditor/>
				 </Provider>),
  document.getElementById('app'))
