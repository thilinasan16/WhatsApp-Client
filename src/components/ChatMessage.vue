<script setup lang="ts">
import { defineProps } from 'vue'
import { type Chat } from '@/Interfaces/chat'

const props = defineProps({
  message: {
    type: Object as () => Chat
  },
  isCurrentUser: Boolean
})
</script>

<template>
  <div class="message" :class="isCurrentUser ? 'sender' : 'receiver'">
    <span class="message__content">{{ message?.message }}</span>
    <span class="message__time">{{ message?.time }}</span>
  </div>
</template>

<style lang="scss" scoped>
.message {
  padding: 10px 20px;
  border-radius: 10px;
  margin: 10px;
  width: fit-content;
  &.sender {
    background-color: grey;
    align-self: flex-end;
  }
  &.receiver {
    background-color: green;
    align-self: flex-start;
  }
  &__content {
    font-size: 14px;
    color: white;
  }
  &__time {
    font-size: 8px;
    color: grey;
    margin-left: 10px;
  }
}
</style>
