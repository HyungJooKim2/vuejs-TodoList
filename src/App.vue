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
 -->
<template>
<div class="container"> <!--왼쪽 오른쪽 여백을 준다.-->
 <h2>To-do List </h2>   <!--template에선 .value를 해줄필요가 없다.-->
 <!--submit 버튼이 눌려졌을때 onSubmit 함수 호출 
     prevent : refresh 되는 속성 제거 -->
  <form                 
  @submit.prevent="onSubmit"  
  class ="d-flex">
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
   </form> 
   <div class="card mt-2"> 
   <div class="card-body p-2">  
     {{ todos[0].subject }}
   </div>
   </div>
      <div class="card mt-2"> 
   <div class="card-body p-2">  
     {{ todos[1].subject }}
   </div>
   </div>
</div>
</template>

<script>
//template에서는 값의 변경을 일반 변수로는 적용할 수 없다.
import { ref } from 'vue';

export default {
  setup() {
    const todo = ref('');
    const todos = ref([
      {id: 1, subject: '휴대폰 사기'},
      {id: 2, subject: '장보기'},
    ]); 
 
    const onSubmit = () =>{
        todos.value.push({  //ref이기 떄문에 value 필요
          id: Date.now(),   //id에 고유성을 최대한 주기 위해 
          subject: todo.value
        }) 
    };

    return {//template 안에서 접근 가능하게 함
      todo,
      onSubmit,
      todos,
    };
  }
}
</script>

<style>
  .name {
    color: red
  }
</style>