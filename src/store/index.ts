import { createStore } from 'vuex'
import Chat from './modules/Chat'
import User from './modules/User'

const store = createStore({
  state: {},
  modules: {
    User,
    Chat
  }
})

export default store
