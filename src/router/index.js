import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Test from '@/components/Test'
import Left from '@/components/Left'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name:   'Hello'  ,
      component: Hello
    },
    {
      path: '/test',
      name: 'Test',
      component: Test
    },
    {
      path: '/left',
      name: 'left',
      component: Left
    }
  ]
})
