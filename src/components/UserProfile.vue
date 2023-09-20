<script setup lang="ts">
import { useStore } from 'vuex'
import { computed } from 'vue'

const store = useStore()
const currentUser = computed(() => store.state.User.currentUser)
</script>

<template>
  <div class="profile">
    <div class="profile__image"><img :src="currentUser?.photoURL" /></div>
    <div class="profile__name">{{ currentUser?.displayName }}</div>
    <div class="profile__number">{{ currentUser?.phoneNumber }}</div>
  </div>
</template>

<style lang="scss" scoped>
.profile {
  display: flex;
  justify-content: flex-start;
  padding: 20px 10px;
  color: black;
  &__image {
    img {
      width: 48px;
      border-radius: 50%;
    }
  }
  &__name {
    justify-content: flex-start;
    display: flex;
    align-items: flex-start;
    color: black;
    font-size: 20px;
    font-weight: 400;
    margin-left: 20px;
  }
  &__number {
    justify-content: flex-start;
    display: flex;
    align-items: flex-start;
    color: black;
    font-size: 16px;
    font-weight: 400;
    margin-left: 20px;
  }
}
</style>
