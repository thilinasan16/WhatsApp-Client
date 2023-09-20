<script setup lang="ts">
import { onMounted } from 'vue'
import { useStore } from 'vuex'
import { computed } from 'vue'
import { onAuthStateChanged, getAuth } from 'firebase/auth'
import UserLogin from '@/components/UserLogin.vue'
import ChatList from '@/components/ChatList.vue'
import ChatWindow from '@/components/ChatWindow.vue'
import UserProfile from '@/components/UserProfile.vue'

const store = useStore()
const isLoggedIn = computed(() => store.state.User.isLoggedIn)

function logOut() {
  store.dispatch('LOGOUT')
}

onMounted(() => {
  const auth = getAuth()
  onAuthStateChanged(auth, (user: any) => {
    if (user) {
      const currentUser = {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        phoneNumber: user.phoneNumber
      }
      store.commit('SET_USER', currentUser)
      store.commit('SET_LOGGED_IN', true)
      store.dispatch('SET_CHAT_USERS')
    }
  })
})
</script>

<template>
  <UserLogin v-if="!isLoggedIn" />
  <div class="chat-container" v-else>
    <div class="chat-container__left-section">
      <div class="chat-container__left-section__wrapper">
        <UserProfile />

        <v-btn
          data-button="signInGoogle"
          size="x-large"
          rounded="lg"
          prepend-icon="mdi-logout"
          variant="outlined"
          @click="logOut"
        >
          <template v-slot:prepend>
            <v-icon color="red"></v-icon>
          </template>
          Log Out
        </v-btn>
      </div>
      <ChatList />
    </div>
    <div class="chat-container__right-section">
      <ChatWindow />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: auto;
  width: 100vw;
  padding: 20px;
  &__left-section {
    flex: 1;
    &__wrapper {
      display: flex;
      justify-content: space-between;
      padding: 0 10px;
      .v-btn {
        display: flex;
        align-self: center;
      }
    }
  }
  &__right-section {
    flex: 1;
    height: calc(100vh - 200px);
  }
}

@media only screen and (min-width: 768px) {
  .chat-container {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    height: 100vh;
    width: 96vw;
    &__left-section {
      flex: 0.35;
      max-height: none;
      overflow: none;
      &__wrapper {
        display: flex;
        justify-content: space-between;
      }
    }
    &__right-section {
      flex: 0.65;
    }
  }
}
</style>
