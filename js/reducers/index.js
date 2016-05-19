'use strict';

import { combineReducers } from 'redux';

import Types from '../constants/types'
import login from './login'
import classitem from './classitem'
import classlist from './classlist'

module.exports = combineReducers({login, classitem, classlist});
