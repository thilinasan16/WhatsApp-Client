import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import ChatList from '../components/ChatList.vue'
import { createStore } from 'vuex'

describe('ChatList', () => {
  let wrapper
  let store
  beforeEach(() => {
    store = createStore({
      modules: {
        Chat: {
          state: {
            chatUsers: []
          }
        }
      }
    })
    wrapper = mount(ChatList, {
      global: {
        plugins: [store]
      }
    })
  })

  it('renders properly', () => {
    expect(wrapper.find('.chat-list').exists()).toBe(true)
  })

  it('renders correct number of chat items', () => {
    expect(wrapper.findAll('.chat-item').length).toBe(store.state.Chat.chatUsers.length)
  })
})
