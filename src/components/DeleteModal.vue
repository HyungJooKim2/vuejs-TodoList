<template>
  <Modal>
    <template #title> Delete Todo </template>
    <template #body> 정말로 삭제하시겠습니까? </template>
    <template #footer>
      <button type="button" class="btn btn-secondary" @click="onClose">
        Close
      </button>
      <button type="button" class="btn btn-danger" @click="onDelete">
        Delete
      </button>
    </template>
  </Modal>
</template>

<script>
import Modal from "@/components/Modal.vue";
export default {
  components: {
    Modal,
  },

  setup(props, { emit }) {
    const onDelete = () => {
      emit("delete");
    };

    const onClose = () => {
      emit("close");
    };

    return {
      onDelete,
      onClose,
    };
  },
};
</script>

<style>
</style>