<template>
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
</template>

<script>
import { ref } from 'vue';
 export default {
    emits: ['add-todo'],

   setup(props, context) { 
       const todo = ref('');

       const hasError = ref(false);

       const onSubmit = () =>{
      if(todo.value ===''){
        hasError.value = true;
      } else{
          //emit 함수를 통해서 자식 컴포넌트 -> 부모 컴포넌트로 데이터(이벤트)를 보낸다.
          context.emit('add-todo',{ //이벤트 이름, 올려주고 싶은 데이터 
            id: Date.now(),
            subject: todo.value,
            completed: false,
          });   
        hasError.value = false;
        todo.value = ''; //추가가 되면 empty로 
    }
      };
       return{
         todo,
         hasError,
         onSubmit
       };
   }
 }
</script>


<style>

</style>