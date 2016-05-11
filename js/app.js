'use strict';

import React from 'react-native'

import { Provider } from 'react-redux'

import Main from './main'
import actions from './actions'
import store from './store'

setTimeout(() => {
	store.dispatch(actions.user.watchLogin())
})

module.exports = React.createClass({
  render: function () {
    return (
      <Provider store={store}>
          <Main />
      </Provider>
    );
  }
});
