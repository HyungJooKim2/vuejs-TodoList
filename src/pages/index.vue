<template>
  <div>Home Page</div>
  <div>{{ count }} </div>
  <button @click="count++">Add</button>
</template>

<script>
import { useCount } from '@/composables/count';


export default {
  setup(){
    //state 객체는 reactive하나 안에 count는 reactive하지 않아서 증가하지 않음
    const { count } = useCount();

    return {
      count
    }
  }

};
</script>

<style>
</style>