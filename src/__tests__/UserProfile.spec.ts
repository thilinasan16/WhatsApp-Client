import { mount } from '@vue/test-utils'
import UserProfile from '../components/UserProfile.vue'
import { createStore } from 'vuex'
import { describe, it, expect, beforeEach } from 'vitest'

describe('UserProfile.vue', () => {
  let store

  beforeEach(() => {
    store = createStore({
      modules: {
        User: {
          state: {
            currentUser: {
              displayName: 'Test User',
              phoneNumber: '1234567890',
              photoURL: 'https://example.com/photo.jpg'
            }
          },
          actions: {
            SET_USER: vi.fn()
          }
        }
      }
    })
  })

  it('renders user profile correctly', () => {
    const wrapper = mount(UserProfile, {
      global: {
        plugins: [store]
      }
    })
    expect(wrapper.find('.profile__name').text()).toBe('Test User')
    expect(wrapper.find('.profile__number').text()).toBe('1234567890')
    expect(wrapper.find('.profile__image img').attributes('src')).toBe(
      'https://example.com/photo.jpg'
    )
  })
})
