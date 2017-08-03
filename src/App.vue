<template>
  <div id="app">
    <p>
      <router-link to="/">用户统计</router-link>
      <router-link to="/ClockDetails">打卡明细统计</router-link>
      <router-link to="/TeacherRank">老师打卡排名</router-link>
      <router-link to="/StudentRank">学生打卡排名</router-link>
    </p>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
