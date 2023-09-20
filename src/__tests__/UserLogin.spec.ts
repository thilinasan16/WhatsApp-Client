import { createStore } from 'vuex'
import { mount } from '@vue/test-utils'
import UserLogin from '../components/UserLogin.vue'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { describe, it, expect, beforeEach, vi } from 'vitest'

describe('UserLogin', () => {
  const vuetify = createVuetify({ components, directives })
  let wrapper
  let store
  beforeEach(() => {
    store = createStore({
      modules: {
        User: {
          state: {
            currentUser: null,
            isLoggedIn: false
          },
          actions: {
            SET_USER: vi.fn()
          }
        }
      }
    })
    store.dispatch = vi.fn()
    wrapper = mount(UserLogin, {
      global: {
        plugins: [store, vuetify]
      }
    })
  })

  it('renders properly', () => {
    expect(wrapper.find('.login-view').exists()).toBe(true)
  })

  it('dispatches "SET_USER" when sign in button is clicked', async () => {
    await wrapper.find('[data-button="signInGoogle"]').trigger('click')
    expect(store.dispatch).toHaveBeenCalledWith('SET_USER')
  })
})
