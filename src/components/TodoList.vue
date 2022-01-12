<template>

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
              @change="toggleTodo(index)"   
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
</template>

<script>
export default {
    props: {
        todos: {
            type: Array,
            required: true 
        }
    },
    //vue.js3 부터 부모로 보내는 데이터를 image option으로 등록을 해주어야 한다.
    emits: ['toggle-todo', 'delete-todo'], 

    setup(props, { emit }){         //부모 컴포넌트에 index값 전달
        const toggleTodo = (index) => {
            emit('toggle-todo', index);
        };

        const deleteTodo = (index) => {
           emit('delete-todo', index);  
        };

        return {
            toggleTodo,
            deleteTodo,
        }
    }
}
</script>

<style>

</style>