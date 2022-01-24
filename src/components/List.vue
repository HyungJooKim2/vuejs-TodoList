<template>
  <!--key는 v-for을 사용할때 각각의 node를 추적하기 위해 사용한다.-->
  <div v-for="(item, index) in items" :key="item.id" class="card mt-2">
    <slot :item="item" :index="index"></slot>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style>
</style>
