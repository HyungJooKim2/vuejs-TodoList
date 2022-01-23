<template>
  <!--key는 v-for을 사용할때 각각의 node를 추적하기 위해 사용한다.-->
  <div v-for="(todo, index) in todos" :key="todo.id" class="card mt-2">
    <div 
      class="card-body p-2 d-flex align-items-center"
      style="cursor: pointer"
       @click="moveToPage(todo.id)"
      >
     
      <div class="flex-grow-1">
        <!--왜 안먹지?.. ml-2 mr-2...-->
        <input
          class="ml-2 mr-2"
          type="checkbox"
          :checked="todo.completed"
          @change="toggleTodo(index, $event)"
          @click.stop
        />
        <span :class="{ todo: todo.completed }">
          <!--class 바인딩 : :class="{ todo: todo.completed}" 
            style 바인딩 : :style="todo.completed ? todoStyle : {}-->
          {{ todo.subject }}
        </span>
      </div>
      <div>                                   <!--이벤트 버블링이 되지 않고 멈춤 -->
        <button class="btn btn-danger btn-sm" @click.stop ="deleteTodo(index)">
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
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

    //부모 컴포넌트에 index값 전달
    const toggleTodo = (index, event) => { 
      emit("toggle-todo", index, event.target.checked);
    };
  
    const deleteTodo = (index) => {
      emit("delete-todo", index);
    };

    const moveToPage = (todoId) => {
      console.log(todoId);
      //router.push('/todos/' + todoId); //둘다 같은 방법이나 아래 방식이 관리가 편하다.
      router.push({
        name: 'Todo',
        params: {
          id: todoId
        }
      });
    };

    return {
      toggleTodo,
      deleteTodo,
      moveToPage,
    };
  },
};
</script>

<style>
</style>