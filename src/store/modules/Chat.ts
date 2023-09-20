import { collection, addDoc, doc, setDoc, getDocs, query, orderBy } from 'firebase/firestore'
import { firebaseDB } from '@/firebase'
import { type User } from '@/Interfaces/user'
import { type Chat } from '@/Interfaces/chat'

const Chat = {
  state: {
    chatUsers: [],
    chatMessages: [],
    currentChat: null,
    ChatId: null
  },
  mutations: {
    SET_CHAT_USERS(state: { chatUsers: User[] }, payload: User[]) {
      state.chatUsers = payload
    },

    SET_CURRENT_CHAT(state: { currentChat: Chat }, payload: any) {
      state.currentChat = payload
    },

    SET_CHAT_MESSAGES(
      state: { chatMessages: Chat[]; ChatId: string },
      payload: { messages: []; ChatId: string }
    ) {
      state.chatMessages = []
      state.chatMessages = payload.messages
      state.ChatId = payload.ChatId
    },

    UPDATE_CHAT_MESSAGES(state: { chatMessages: Chat[] }, payload: Chat) {
      state.chatMessages.push(payload)
    }
  },
  actions: {
    async SET_CHAT_USERS(context: any) {
      try {
        const db = firebaseDB
        const querySnapshot = await getDocs(collection(db, 'users'))
        const allUsers: any = []
        querySnapshot.forEach((doc) => {
          allUsers.push(doc.data())
        })
        context.commit('SET_CHAT_USERS', allUsers)
      } catch (error) {
        console.error('Error fetching chat users:', error)
      }
    },

    SET_CURRENT_CHAT(context: any, payload: Chat) {
      context.commit('SET_CURRENT_CHAT', payload)
    },

    async SET_CHAT_MESSAGES(context: any, chatId: string) {
      try {
        const db = firebaseDB
        const querySnapshot = await getDocs(
          collection(db, 'chats', chatId, 'messages'),
          orderBy('timestamp', 'desc')
        )
        const messages: any = []
        if (querySnapshot.size === 0) {
          context.commit('SET_CHAT_MESSAGES', {
            messages: messages,
            ChatId: chatId
          })
        } else {
          querySnapshot.forEach((doc) => {
            messages.push(doc.data())
            context.commit('SET_CHAT_MESSAGES', {
              messages: messages,
              ChatId: chatId
            })
          })
        }
      } catch (error) {
        console.error('Error fetching chat messages:', error)
      }
    },

    async UPDATE_CHAT_MESSAGES(context: any, payload: { chat: Chat; id: string }) {
      try {
        const db = firebaseDB
        const chatRef = await doc(db, 'chats', payload.id)
        const messagesCollectionRef = collection(chatRef, 'messages')
        await addDoc(messagesCollectionRef, payload.chat)
        context.commit('UPDATE_CHAT_MESSAGES', payload.chat)
      } catch (error) {
        console.error('Error updating chat messages:', error)
      }
    }
  }
}

export default Chat
