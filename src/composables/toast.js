import { computed } from 'vue';
import { useStore } from 'vuex';

export const useToast = () => {
  const store = useStore();
  //값만 가져와선 vuex에서 값이 변하는것을 감지하지 못하여 computed로 감싸준다.
  const toastMessage = computed(() => store.getters['toast/toastMessageWithSmile']);
  const toastAlertType = computed(() => store.state.toast.toastAlertType);
  const showToast = computed(() => store.state.toast.showToast);

  const triggerToast = (message, type = 'success') => {
    store.dispatch('toast/triggerToast', message, type);
  }

  return {
    toastMessage,
    toastAlertType,
    showToast,
    triggerToast,

  }
}