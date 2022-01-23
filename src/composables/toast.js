import { ref, onUnmounted } from 'vue';

export const useToast = () => {
   const toastMessage = ref('');
   const toastAlertType = ref('');
   const showToast = ref(false);
   const timeout = ref(null);
   
   const triggerToast = (message,type='success') => {
        toastMessage.value = message;
        toastAlertType.value = type;
        showToast.value = true;
        timeout.value = setTimeout(()=>{
         toastMessage.value = ''; 
         toastAlertType.value = '';
          showToast.value = false;
        },3000)
      }

      onUnmounted(()=>{
        console.log('unmounted'); //component가 빠질때 마다 메모리 정리를 할때 많이 쓰인다.
        clearTimeout(timeout.value); //페이지 이동 시 setTimeout이 정지됨
      });

      return {
          toastMessage,
          toastAlertType,
          showToast,
          triggerToast,
        
      }
}