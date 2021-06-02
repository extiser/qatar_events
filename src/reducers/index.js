import { combineReducers } from 'redux'
import user from './user'
import types from './types'
import filters from './filters'
import modals from './modals'
import userChannels from './userChannels'

export default combineReducers({
    user,
    types,
    filters,
    modals,
    userChannels
})