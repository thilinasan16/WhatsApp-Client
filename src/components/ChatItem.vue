<script setup lang="ts">
import { defineProps } from 'vue'
import { useStore } from 'vuex'
import { computed } from 'vue'
import { type User } from '@/Interfaces/user'

const store = useStore()
const currentUser = computed(() => store.state.User.currentUser)

const props = defineProps({
  chatItemData: {
    type: Object as () => User
  }
})

function getCurrentChat(user: any) {
  store.dispatch('SET_CURRENT_CHAT', user)

  // Generate chat ID based on current user and current chat
  const ChatId =
    store.state.User.currentUser?.uid > store.state.Chat.currentChat?.uid
      ? store.state.User.currentUser?.uid + store.state.Chat.currentChat?.uid
      : store.state.Chat.currentChat?.uid + store.state.User.currentUser?.uid
  store.dispatch('SET_CHAT_MESSAGES', ChatId)
}
</script>

<template>
  <div
    class="chat-item"
    v-if="chatItemData?.uid !== currentUser.uid"
    @click="getCurrentChat(chatItemData)"
  >
    <div class="chat-item__profile"><img :src="chatItemData?.photoURL" /></div>
    <div class="chat-item__details">
      <div class="chat-item__name">{{ chatItemData?.displayName }}</div>
      <div class="chat-item__status">Hey there ! I'm using Whatsapp!!</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.chat-item {
  display: flex;
  justify-content: flex-start;
  padding: 5px 10px;
  min-width: 210px;
  margin: 5px 5px;
  cursor: pointer;
  $chat-item: &;
  &__profile {
    img {
      width: 48px;
      border-radius: 50%;
    }
  }
  &__details {
    display: flex;
    flex-direction: column;
    margin-left: 20px;
    justify-content: flex-start;
    #{$chat-item}__name {
      font-size: 16px;
      font-weight: 400;
      color: black;
    }
    #{$chat-item}__status {
      font-size: 10px;
      font-weight: 400;
      color: grey;
    }
  }
}
</style>
