import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'UserCount',
            component: resolve => require(['@/components/UserCount'], resolve)
        },
        {
            path: '/ClockDetails',
            name: 'ClockDetails',
            component: resolve => require(['@/components/ClockDetails'], resolve)
        },
        {
            path: '/TeacherRank',
            name: 'TeacherRank',
            component: resolve => require(['@/components/TeacherRank'], resolve)
        },
        {
            path: '/StudentRank',
            name: 'StudentRank',
            component: resolve => require(['@/components/StudentRank'], resolve)
        }
    ]
})