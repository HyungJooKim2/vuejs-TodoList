 <!-- 
  router-link : reloading 방지
 -->
<template>
  <Navbar />
  <div class="container">
    <!--공백 추가-->
    <router-view />
  </div>

 <Toast />

</template> 

<script>
import Toast from "@/components/Toast.vue";
import Navbar from '@/components/Navbar.vue';

export default {
  components: {
    Toast,
    Navbar
  },
};
</script>

<style scoped>

</style>