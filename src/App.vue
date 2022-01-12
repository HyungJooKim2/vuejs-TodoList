<!-- 
v-bind: == :
v-on: == @
v-show 는 랜더링 할때 비용이 많이 들고, v-if 는 토글 할때 비용이 많이 든다. 
 -->
<template>
<div class="container"> <!--왼쪽 오른쪽 여백을 준다.-->
 <h2>To-do List </h2>   <!--template에선 .value를 해줄필요가 없다.-->
      <input
        class="form-control"
        type="text"
        v-model="searchText"
        placeholder="Search"
      >

      <hr />
 <TodoSimpleForm @add-todo="addTodo"/>

  <div v-if="!filteredTodos.length">
    There is nothing to display
    </div>
    <TodoList :todos="filteredTodos"
     @toggle-todo="toggleTodoMain" 
     @delete-todo="deleteTodoMain"
     /> <!--props로 자식 컴포넌트 에게 데이터를 보냄-->
</div>
</template>

<script>
/*
template에서는 값의 변경을 일반 변수로는 적용할 수 없다.
method는 인자로 값을 받아와서 함수 안에서 사용 가능
computed는 함수안에 들어있는 reactive status가 있을때만 값을 가져와서 다룰 수 있으며 
값을 저장함 (2번 출력해도 1번만 출력됨)
*/
import { ref, computed } from 'vue';
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
    
    const searchText = ref('');

    const filteredTodos = computed(()=>{
        if(searchText.value){
            return todos.value.filter(todo =>{
              //우리가 검색한 값이 포함이 되면 return
              return todo.subject.includes(searchText.value);
            });
        }
        return todos.value;
    });


    return {//template 안에서 접근 가능하게 함
      addTodo,
      todos,
      todoStyle,
      deleteTodoMain,
      toggleTodoMain,
      searchText,
      filteredTodos,
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