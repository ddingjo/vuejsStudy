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
  <transition name="slide">
    <Toast 
      v-if="isShowToast" 
      :message="toastMessage" 
      :type="toastAlertType"
    />
</transition>
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
<style scoped>
    .slide-enter-active,
    .slide-leave-active{
        transition: all 0.5s ease;
    }

    .slide-enter-from,
    .slide-leave-to {
        opacity: 0;
        transform: translateY(-30px);
    }

    .slide-enter-to,
    .slide-leave-from {
        opacity: 1;
        transform: translateY(0px);
    }
    /* .fade-enter-active,
    .fade-leave-active{
        transition: opacity 0.5s ease;
    }

    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
    }

    .fade-enter-to,
    .fade-leave-from {
        opacity: 1;
    } */
</style>
