<!--
view component는 아래 3가지 부분으로 구성되어 있다.
1.template
html 코드가 들어간다.

2.scrpit
javascrpit 코드가 들어간다. 

3.style
css 코드가 들어간다.
-->

<!-- 
v-bind: == :
v-on: == @
v-show 는 랜더링 할때 비용이 많이 들고, v-if 는 토글 할때 비용이 많이 든다. 
 -->
<template>
<div v-show="toggle">true</div>
<div v-show="!toggle">flase</div>
<button @click="onToggle">Toggle</button>
<div class="container"> <!--왼쪽 오른쪽 여백을 준다.-->
 <h2>To-do List </h2>   <!--template에선 .value를 해줄필요가 없다.-->
 <!--submit 버튼이 눌려졌을때 onSubmit 함수 호출 
     prevent : refresh 되는 속성 제거 -->
  <form @submit.prevent="onSubmit">
  <div class ="d-flex">
   <div class="flex-grow-1 mr-2">
      <input
        class="form-control"
        type="text"
        v-model="todo"
        placeholder="Type new to-do"
      >
    </div>
    <div>
    <button class="btn btn-primary"
    type="submit"
    >Add
    </button> 
</div>
  </div>
 
<div v-show="hasError" style="color: red">This field cannot be empty</div>
   </form> 
   <!--key는 v-for을 사용할때 각각의 node를 추적하기 위해 사용한다.-->
   <div 
   v-for="todo in todos"
   :key="todo.id"
   class="card mt-2"> 
   <div class="card-body p-2">  
     {{ todo.subject }}
   </div>
   </div>
</div>
</template>

<script>
//template에서는 값의 변경을 일반 변수로는 적용할 수 없다.
import { ref } from 'vue';

export default {
  setup() {
    const toggle = ref(false);
    const todo = ref('');
    const todos = ref([
      {id: 1, subject: '휴대폰 사기'},
      {id: 2, subject: '장보기'},
    ]); 

    const hasError = ref(false);
 
    const onSubmit = () =>{
      if(todo.value ===''){
        hasError.value = true;
      } else{
          todos.value.push({  //ref이기 떄문에 value 필요
          id: Date.now(),   //id에 고유성을 최대한 주기 위해 
          subject: todo.value
        });
        hasError.value = false;
    }
      };
    
    const onToggle = () =>{
      toggle.value = !toggle.value;
    }

    return {//template 안에서 접근 가능하게 함
      todo,
      onSubmit,
      todos,
      toggle,
      onToggle,
      hasError
    };
  }
}
</script>

<style>
  .name {
    color: red
  }
</style>