<!-- 
v-bind: == :
v-on: == @
v-show 는 랜더링 할때 비용이 많이 들고, v-if 는 토글 할때 비용이 많이 든다. 
 -->
<template>
   <div>
     <div class ="d-flex justify-content-between mb-3">
           <h2>To-do List</h2>
           <button class="btn btn-primary"
                    @click="moveToCreatePage"
           >
             Create Todo
           </button>
       </div>
    <!--template에선 .value를 해줄필요가 없다.
        keyup.enter = enter시 searchTodo 메소드 실행
    -->
    <input
      class="form-control"
      type="text"
      v-model="searchText"
      placeholder="Search"
      @keyup.enter="searchTodo" 
    />

    <hr />


    <div v-if="!todos.length">There is nothing to display</div>
    <!--props로 자식 컴포넌트 에게 데이터를 보냄-->
    <TodoList
      :todos="todos"
      @toggle-todo="toggleTodoMain"
      @delete-todo="deleteTodoMain"
    />
    <!--active : 파란색 표시-->
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li v-if="currentPage !== 1" class="page-item">
          <a
            style="cursor: pointer"
            class="page-link"
            @click="getTodos(currentPage - 1)"
            >Previous</a
          >
        </li>
        <li
          v-for="page in numberOfPages"
          :key="page"
          class="page-item"
          :class="currentPage === page ? 'active' : ''"
        >
          <a
            style="cursor: pointer"
            class="page-link"
            @click="getTodos(page)"
            >{{ page }}</a
          >
        </li>
        <li v-if="numberOfPages !== currentPage" class="page-item">
          <a
            style="cursor: pointer"
            class="page-link"
            @click="getTodos(currentPage + 1)"
            >Next</a
          >
        </li>
      </ul>
    </nav>
    </div>
    <Toast v-if="showToast"
    :message="toastMessage"
    :type="toastAlertType"
    />
</template>

<script>
/*
template에서는 값의 변경을 일반 변수로는 적용할 수 없다.
method는 인자로 값을 받아와서 함수 안에서 사용 가능
computed는 함수안에 들어있는 reactive status가 있을때만 값을 가져와서 다룰 수 있으며 
값을 저장함 (2번 출력해도 1번만 출력됨)
@ -> src 폴더
*/
import { ref, computed, watch } from "vue";
import TodoList from "@/components/TodoList.vue";
import axios from "axios";
import Toast from  '@/components/Toast.vue';
import { useToast } from '@/composables/toast';
import { useRouter } from 'vue-router';

export default {
  components: { //component 등록
    TodoList,
    Toast,
  },

  setup() {
    const router = useRouter();
    const {toastMessage,
          toastAlertType,
          showToast,
          triggerToast} = useToast();

    /*
    안에 값이 바뀔때 마다 실행된다.(live data)
    searchText가 변경이 되면 getTodos가 해당 searchText로 다시 실행
    1(첫페이지) 에 get시켜줌  
    prev : 이전 값
    */
    const searchText = ref("");

   /*
   searchText가 2초 안에 바뀔때 마다 
   clearTimeout을 통해 취소가 됨 
   마지막으로 타입한 텍스트만 getTodos로 요청
   */
    let timeout = null;   
    const searchTodo = () =>{
      clearTimeout(timeout);
      getTodos(1);
    };

    watch(searchText, () => { 
      clearTimeout(timeout); 
      timeout = setTimeout(()=>{
      getTodos(1);  
      }, 2000)  //2초로 time-delay 설정 
    });

    const deleteTodoMain = async (index) => {
      errorMessage.value = "";

      const id = todos.value[index].id;
      try {
        await axios.delete("http://localhost:3000/todos/" + id);
        getTodos(1);
        //todos.value.splice(index, 1);
      } catch (err) {
        console.log(err);
        //errorMessage.value = "Something went wrong";
        triggerToast('Something went wrong','danger')
      }
    };
    const numberOfTodos = ref(0);
    const numberOfPages = computed(() => {
      return Math.ceil(numberOfTodos.value / limit);
    });
    const limit = 5;
    const currentPage = ref(1);
    const todos = ref([]);
    const errorMessage = ref("");
    const todoStyle = {
      textDecoration: "line-through",
      color: "gray",
    };

    const getTodos = async (page = currentPage.value) => {
      currentPage.value = page;
      try {
        const res = await axios.get(
          `http://localhost:3000/todos?_sort=id&_order=desc&subject_like=${searchText.value}&_page=${page}&_limit=${limit}`
        );
        numberOfTodos.value = res.headers["x-total-count"];
        todos.value = res.data;
      } catch (err) {
        //errorMessage.value = 'Something went wrong';
        triggerToast('Something went wrong','danger')
      }
    };
    getTodos();
    const addTodo = async (todo) => {
      /*
      Todo 데이터베이스에 투두를 저장 id는 자동으로 추가됨
      요청을 보냄 -> 요청이 끝나고 오기 전에 다음으로 넘어감 (비동기) 
      하여 요청이 끝났을때 (응답이 왔을때) 실행되게
      */
      errorMessage.value = "";
      try {
          await axios.post("http://localhost:3000/todos", {
          subject: todo.subject,
          completed: todo.completed,
        });
        getTodos(1);
        //todos.value.push(res.data);
      } catch (err) {
        console.log(err);
        //errorMessage.value = "Something went wrong.";
        triggerToast('Something went wrong','danger')
      }
    };

    const toggleTodoMain = async (index, checked) => {
      console.log(checked)
      errorMessage.value = "";
      const id = todos.value[index].id;
      try {
        await axios.patch("http://localhost:3000/todos/" + id, {
          completed: checked
        });
      } catch (err) {
        console.log(err);
        //errorMessage.value = "Something went wrong";
        triggerToast('Something went wrong','danger')
      }
      todos.value[index].completed = checked
    };

    const moveToCreatePage = () =>{
     router.push({
       name: 'TodoCreate',
     })
    };


    return {
      //template 안에서 접근 가능하게 함
      addTodo,
      todos,
      todoStyle,
      deleteTodoMain,
      toggleTodoMain,
      searchText,
      errorMessage,
      numberOfPages,
      currentPage,
      getTodos,
      searchTodo,
      toastMessage,
      toastAlertType,
      showToast,
      moveToCreatePage
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