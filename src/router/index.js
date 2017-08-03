import Vue from 'vue'
import Router from 'vue-router'
import TeacherRank from '@/components/TeacherRank'
import ClockDetails from '@/components/ClockDetails'
import UserCount from '@/components/UserCount'
import StudentRank from '@/components/StudentRank'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name:'UserCount',
      component: UserCount
    },
    {
      path: '/ClockDetails',
      name:'ClockDetails',
      component: ClockDetails
    },
    {
      path: '/TeacherRank',
      name:'TeacherRank',
      component: TeacherRank
    },
    {
      path: '/StudentRank',
      name:'StudentRank',
      component: StudentRank
    }
  ]
})
