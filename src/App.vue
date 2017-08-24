<template>
  <div id="app">
    <div class = "leftPanel">
      <ul>
        <li><router-link to="/">用户统计</router-link></li>
        <li><router-link to="/ClockDetails">打卡明细统计</router-link></li>
        <li><router-link to="/TeacherRank">老师打卡排名</router-link></li>
        <li><router-link to="/StudentRank">学生打卡排名</router-link></li>
      </ul>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>
<style>

</style>
