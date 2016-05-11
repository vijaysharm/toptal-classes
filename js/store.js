import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import reducers from './reducers'

const createStoreWithMW = applyMiddleware(thunk)(createStore)
const store = createStoreWithMW(reducers)

export default store