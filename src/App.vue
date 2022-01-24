 <!-- 
  router-link : reloading 방지
 -->
<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <router-link class="navbar-brand" :to="{ name: 'Home' }"
      >HyungJoo</router-link
    >
    <ul class="navbar-nav me-auto">
      <li class="nav-item active">
        <router-link class="nav-link" :to="{ name: 'Todos' }"
          >Todos</router-link
        >
      </li>
    </ul>
  </nav>
  <div class="container">
    <!--공백 추가-->
    <router-view />
  </div>
  <transition name="fade">
 <Toast v-if="showToast" :message="toastMessage" :type="toastAlertType" />
  </transition>
</template> 

<script>
import Toast from "@/components/Toast.vue";
import { useToast } from "@/composables/toast";
export default {
  components: {
    Toast,
  },
  setup() {
    const { toastMessage, toastAlertType, showToast, triggerToast } =
      useToast();

    return {
      toastMessage,
      toastAlertType,
      showToast,
      triggerToast,
    };
  },
};
</script>

<style scoped>
  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.5s ease;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
    transform: translateY(-30px);
  }
  .fade-enter-to,
  .fade-leave-from {
    opacity: 1;
    transform: translateY(0px);
  }
</style>