import { getAuth, signOut, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { firebaseDB } from '@/firebase'
import { type User } from '@/Interfaces/user'

const provider = new GoogleAuthProvider()

const User = {
  state: {
    currentUser: null,
    isLoggedIn: false
  },
  mutations: {
    SET_USER(state: { currentUser: User | null }, payload: any | null) {
      state.currentUser = payload
    },
    SET_LOGGED_IN(state: { isLoggedIn: boolean }, payload: boolean) {
      state.isLoggedIn = payload
    }
  },
  actions: {
    async SET_USER(context: any) {
      try {
        const auth = getAuth()
        const db = firebaseDB
        const result = await signInWithPopup(auth, provider)
        const user = result.user
        const currentUser = {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          phoneNumber: user.phoneNumber
        }
        await setDoc(doc(db, 'users', user.uid), currentUser)
        context.commit('SET_USER', currentUser)
        context.commit('SET_LOGGED_IN', true)
      } catch (error) {
        console.error('Error setting a chat user:', error)
      }
    },
    async LOGOUT(context: any) {
      try {
        const auth = getAuth()
        await signOut(auth)
        context.commit('SET_USER', null)
        context.commit('SET_LOGGED_IN', false)
      } catch (error) {
        console.error('Error while log out:', error)
      }
    }
  }
}

export default User
