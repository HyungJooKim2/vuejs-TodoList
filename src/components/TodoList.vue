<template>
  <List :items="todos">
    <template #default="{ item, index }">
      <div
        class="card-body p-2 d-flex align-items-center"
        style="cursor: pointer"
        @click="moveToPage(item.id)"
      >
        <div class="flex-grow-1">
          <!--왜 안먹지?.. ml-2 mr-2...-->
          <input
            class="ml-2 mr-2"
            type="checkbox"
            :checked="item.completed"
            @change="toggleTodo(index, $event)"
            @click.stop
          />
          <span :class="{ todo: item.completed }">
            <!--class 바인딩 : :class="{ todo: todo.completed}" 
            style 바인딩 : :style="todo.completed ? todoStyle : {}-->
            {{ item.subject }}
          </span>
        </div>
        <div>
          <!--이벤트 버블링이 되지 않고 멈춤 -->
          <button
            class="btn btn-danger btn-sm"
            @click.stop="openModal(item.id)"
          >
            Delete
          </button>
        </div>
      </div>
    </template>
  </List>
  <teleport to="#modal">
    <!--slot 활용 Title 지정-->
    <DeleteModal v-if="showModal" @close="closeModal" @delete="deleteTodo" />
  </teleport>
</template>

<script>
import { useRouter } from "vue-router";
import DeleteModal from "@/components/DeleteModal.vue";
import { ref } from "vue";
import List from "@/components/List.vue";

export default {
  components: {
    DeleteModal,
    List,
  },
  props: {
    todos: {
      type: Array,
      required: true,
    },
  },
  //vue.js3 부터 부모로 보내는 데이터를 image option으로 등록을 해주어야 한다.
  emits: ["toggle-todo", "delete-todo"],

  setup(props, { emit }) {
    const router = useRouter();
    const showModal = ref(false);
    const todoDeleteId = ref(null);

    //부모 컴포넌트에 index값 전달
    const toggleTodo = (index, event) => {
      emit("toggle-todo", index, event.target.checked);
    };

    const openModal = (id) => {
      todoDeleteId.value = id;
      showModal.value = true;
    };

    const closeModal = () => {
      todoDeleteId.value = null;
      showModal.value = false;
    };

    const deleteTodo = () => {
      emit("delete-todo", todoDeleteId.value);

      showModal.value = false;
      todoDeleteId.value = null;
    };

    const moveToPage = (todoId) => {
      console.log(todoId);
      //router.push('/todos/' + todoId); //둘다 같은 방법이나 아래 방식이 관리가 편하다.
      router.push({
        name: "Todo",
        params: {
          id: todoId,
        },
      });
    };

    return {
      toggleTodo,
      deleteTodo,
      moveToPage,
      showModal,
      openModal,
      closeModal,
    };
  },
};
</script>

<style>
</style>