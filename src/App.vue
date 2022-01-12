<!-- 
v-bind: == :
v-on: == @
v-show 는 랜더링 할때 비용이 많이 들고, v-if 는 토글 할때 비용이 많이 든다. 
 -->
<template>
<div class="container"> <!--왼쪽 오른쪽 여백을 준다.-->
 <h2>To-do List </h2>   <!--template에선 .value를 해줄필요가 없다.-->
 <TodoSimpleForm @add-todo="addTodo"/>

  <div v-if="!todos.length">
    추가된 Todo가 없습니다.
    </div>
    <TodoList :todos="todos"
     @toggle-todo="toggleTodoMain" 
     @delete-todo="deleteTodoMain"
     /> <!--props로 자식 컴포넌트 에게 데이터를 보냄-->
</div>
</template>

<script>
//template에서는 값의 변경을 일반 변수로는 적용할 수 없다.
import { ref } from 'vue';
import TodoSimpleForm from './components/TodoSimpleForm.vue';
import TodoList from './components/TodoList.vue';
export default {
  components: {
    TodoSimpleForm,    //component 등록 
    TodoList,
  },

  setup() { 
    const deleteTodoMain = (index) => {
       todos.value.splice(index, 1);
    };

    const todos = ref([]); 

    const todoStyle = {
      textDecoration: 'line-through',
      color: 'gray'
    };

    const addTodo = (todo) => {
      todos.value.push(todo);
    };

    const toggleTodoMain = (index) =>{
      todos.value[index].completed = !todos.value[index].completed
    };

    return {//template 안에서 접근 가능하게 함
      addTodo,
      todos,
      todoStyle,
      deleteTodoMain,
      toggleTodoMain,
    };
  }
}
</script>

<style>
  .todo {
    color: gray;
    text-decoration: line-through;
  }
</style>