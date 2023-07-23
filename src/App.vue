<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light container">
      <router-link class="navbar-brand" to="/">Navbar</router-link>
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <router-link class="nav-link" :to="{name : 'Home'}">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/todos">Todos</router-link>
        </li>
      </ul>
    </nav>
  <div class="container">
    <router-view />
  </div>
  <Toast 
    v-if="isShowToast" 
    :message="toastMessage" 
    :type="toastAlertType"
  />
</template>

<script>
import Toast from '@/components/Toast.vue'
import {useToast} from '@/composables/toast'


export default {
  components: {
    Toast
  },
  setup(){
    const {
        toastMessage,
        toastAlertType,
        isShowToast,
        triggerToast, 
    } = useToast();

    return {
      toastMessage,
      toastAlertType,
      isShowToast,
      triggerToast, 
    }
  }
}
</script>



<style scoped></style>
