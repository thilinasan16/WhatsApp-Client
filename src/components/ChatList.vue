<script setup lang="ts">
import ChatItem from '@/components/ChatItem.vue'
import { useStore } from 'vuex'
import { computed } from 'vue'
const store = useStore()
const users = computed(() => store.state.Chat.chatUsers)
</script>

<template>
  <div class="chat-list">
    <ChatItem v-for="item in users" :key="item.uid" :chatItemData="item">
      {{ item.message }}
    </ChatItem>
  </div>
</template>

<style lang="scss" scoped>
.chat-list {
  display: flex;
  flex-direction: column;
  overflow: auto;
  max-height: 200px;
  margin-bottom: 20px;
}

@media only screen and (min-width: 768px) {
  .chat-list {
    max-height: 80vh;
  }
}
</style>
