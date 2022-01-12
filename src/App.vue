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
 <div style="color: red">{{ errorMessage }}</div>

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
import axios from 'axios';
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

    const errorMessage = ref('');

    const todoStyle = {
      textDecoration: 'line-through',
      color: 'gray'
    };

    const addTodo = (todo) => {
      /*
      Todo 데이터베이스에 투두를 저장 id는 자동으로 추가됨
      요청을 보냄 -> 요청이 끝나고 오기 전에 다음으로 넘어감 (비동기) then 키워드 활용
      하여 요청이 끝났을때 (응답이 왔을때) 실행되게
      */
     errorMessage.value = '';
      axios.post('http://localhost:3000/todos', {
        subject: todo.subject,
        completed: todo.completed,
      }).then(res =>{
        console.log(res); 
        todos.value.push(res.data);
      }).catch(err =>{
        console.log(err);
        errorMessage.value = 'Something went wrong.';
      }); 
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
      errorMessage
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