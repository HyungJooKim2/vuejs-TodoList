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
   <!--key는 v-for을 사용할때 각각의 node를 추적하기 위해 사용한다.-->
   <div 
   v-for="(todo, index) in todos"
   :key="todo.id"
   class="card mt-2"> 
   <div class="card-body p-2 d-flex align-items-center">  
     <div class="form-check flex-grow-1">
       <input class="form-check-input" 
              type="checkbox"
              v-model="todo.completed" 
              >
      <label class="form-check-label"
        :class="{ todo: todo.completed}"  
      > <!--class 바인딩 : :class="{ todo: todo.completed}" 
            style 바인딩 : :style="todo.completed ? todoStyle : {}-->
           {{ todo.subject }}
      </label>
       </div>
        <div>
          <button class="btn btn-danger btn-sm"
          @click="deleteTodo(index)"
          >Delete</button>
        </div>
   </div>
   </div>
</div>
</template>

<script>
//template에서는 값의 변경을 일반 변수로는 적용할 수 없다.
import { ref } from 'vue';
import TodoSimpleForm from './components/TodoSimpleForm.vue';

export default {
  components: {
    TodoSimpleForm    //component 등록 
  },

  setup() { 
    const deleteTodo = (index) => {
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


    return {//template 안에서 접근 가능하게 함
      addTodo,
      todos,
      todoStyle,
      deleteTodo
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