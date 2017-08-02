<template>
  <div class="leftPanel">
    <ul>
      <router-link to="/userCount">用户统计</router-link>
      <router-link to="/userCount">打卡明细统计</router-link>
      <router-link to="/userCount">老师打卡排名</router-link>
      <router-link to="/userCount">学生打卡排名</router-link>
    </ul>
  </div>
  <>
</template>

<script>
  export default {
    name:'Left',
    data(){
      me:'hehe'
    }
  }
</script>

<style>
  .main .leftPanel {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 120px;
    background: #FFFFFF;
    border: 1px solid #d5d5d5;
  }
</style>
