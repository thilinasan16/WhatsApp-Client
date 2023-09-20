<script setup lang="ts">
import ChatMessage from '@/components/ChatMessage.vue'
import { useStore } from 'vuex'
import { computed } from 'vue'
import { ref } from 'vue'
import { type Chat } from '@/Interfaces/chat'

const store = useStore()
const currentChat = computed(() => store.state.Chat.currentChat)

const message = ref('')

function sendMessage() {
  if (message.value) {
    const now = new Date()
    let hours = now.getHours()
    let minutes = now.getMinutes()
    const ampm = hours >= 12 ? 'pm' : 'am'
    hours = hours % 12
    hours = hours ? hours : 12 // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes
    const strTime = hours + ':' + minutes + ' ' + ampm
    const chat: Chat = {
      id: +new Date(),
      date: now.toISOString().substr(0, 10),
      time: strTime,
      timestamp: +new Date(),
      message: message.value,
      senderId: store.state.User.currentUser.uid,
      receiverId: store.state.Chat.currentChat.uid
    }
    store.dispatch('UPDATE_CHAT_MESSAGES', {
      chat: chat,
      id: store.state.Chat.ChatId
    })
    message.value = ''
  }
}
</script>

<template>
  <div class="chat-window--unselected" v-if="!currentChat">
    <div class="info">Start a New Message</div>
  </div>
  <div class="chat-window--selected" v-else>
    <div class="messages-wrapper">
      <template v-for="item in store.state.Chat.chatMessages" :key="item.id">
        <ChatMessage
          :message="item"
          :isCurrentUser="item.senderId === store.state.User.currentUser.uid ? true : false"
        />
      </template>
    </div>
    <div class="chat-window__text-container">
      <v-text-field
        v-model="message"
        :append-icon="'mdi-send'"
        label="Type a Message"
        type="text"
        single-line
        density="compact"
        variant="solo"
        @keyup.enter="sendMessage"
        @click:append="sendMessage"
      ></v-text-field>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.chat-window {
  $chat: &;
  &--selected {
    display: flex;
    flex-direction: column;
    height: 78vh;
    .messages-wrapper {
      flex: 1;
      overflow-y: auto;
      background-image: url('/ChatBackGround.jpg');
      background-repeat: repeat;
      display: flex;
      flex-direction: column;
    }
    #{$chat}__text-container {
      margin-top: 5px;
    }
  }
  &--unselected {
    position: relative;
    .info {
      background-color: white;
      font-size: 24px;
      font-weight: 600;
      border-radius: 10px;
      color: grey;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 70vh;
    }
  }
}
</style>
