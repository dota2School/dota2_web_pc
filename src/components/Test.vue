<template>
  <div>
    <Datepicker v-on:on-change="test" format="yyyy/MM/dd HH:mm:ss" type="datetimerange" placeholder="选择日期和时间" style="width: 300px"></Datepicker>
    <input v-bind:value="JSON.stringify(value2)"/>

  </div>
</template>

<script>


  import Hello from "./Hello";
  import Datepicker from 'iview/src/components/date-picker'
  import 'iview/dist/styles/iview.css';


  export default {
    components: {Datepicker},
    name: 'Test',
    data () {
      return {
        mess:'哈组件哈哈',
        mess2:'mess2',
        value2:['2016-01-01', '2016-02-15']
      }
    },
    methods:{
      test(data){
        alert(data)
      }
    }
  }
</script>

