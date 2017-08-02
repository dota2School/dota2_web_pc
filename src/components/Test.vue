<template>
  <div>
    <Hello :message="mess" :test="mess2"></Hello>
  </div>
</template>

<script>


  import Hello from "./Hello";


  export default {
    components: {Hello},
    name: 'Test',
    data () {
      return {
        mess:'哈组件哈哈',
        mess2:'mess2'
      }
    }
  }
</script>

