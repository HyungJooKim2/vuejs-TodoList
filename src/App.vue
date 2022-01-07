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
<div class="container"> <!--왼쪽 오른쪽을 띄워줌-->
 <h2>To-Do List </h2>   <!--template에선 .value를 해줄필요가 없다.-->
  <form class ="d-flex">
    <div class="flex-grow-1 mr-5">
      <input
        class="form-control"
        type="text"
        v-model="todo"
        placeholder="Type new to-do"
      >
    </div>
    <div>
    <button class="btn btn-primary"
     @click="onSubmit"
    >Add
    </button>
</div>
   </form> 
</div>
</template>

<script>
//template에서는 값의 변경을 일반 변수로는 적용할 수 없다.
import { ref } from 'vue';
import { reactive } from 'vue';

export default {
  setup() {
    const name = 'Hyungjoo';
    const type = ref('number');
    const nameClass = ref('name')

    const todo = ref('형주');
    const reactName = reactive({
      id : 1
    });

    const greeting = (name) =>{
      return 'Hello' + name;
    };

    const greet = greeting(name);

    const updateName = () => {
      todo.value = "잘생긴 형주";
      reactName.id = 2;
      type.value = 'text';
    };
 
    const onSubmit = () =>{
        console.log(todo.value);
    };

    const updateInfo = (e)=>{ //정보값을 가져옴
        todo.value = e.target.value;
    };

    return {
      name,  //template 안에서 접근 가능하게 함
      greeting,
      greet,
      updateName,
      todo,
      reactName,
      type,
      nameClass,
      onSubmit,
      updateInfo
    };
  }
}
</script>

<style>
  .name {
    color: blue
  }
</style>