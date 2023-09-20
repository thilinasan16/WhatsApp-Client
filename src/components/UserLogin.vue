<script setup lang="ts">
import { useStore } from 'vuex'
const store = useStore()
function signInWithGoogle() {
  store.dispatch('SET_USER')
}
</script>

<template>
  <div class="login-view">
    <div class="login-view__container">
      <div class="login-view__image"><img src="/whatsAppIcon.jpg" /></div>
      <div class="login-view__text">WhatsApp Client</div>
      <div class="login-view__button">
        <v-btn
          data-button="signInGoogle"
          size="x-large"
          rounded="lg"
          prepend-icon="mdi-google-plus"
          variant="outlined"
          @click="signInWithGoogle"
        >
          <template v-slot:prepend>
            <v-icon color="red"></v-icon>
          </template>
          Sign In with Google
        </v-btn>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-view {
  background-image: url('/LoginBackground.jpg');
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-repeat: repeat;
  $login: &;
  #{$login}__container {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    width: 600px;
    min-height: 458px;
    border-radius: 5px;
    padding: 80px;
    background-color: white;
    #{$login}__text {
      color: black;
      font-size: 25px;
      font-weight: 600;
    }
    #{$login}__image {
      img {
        width: 60px;
      }
    }
  }
}
</style>
