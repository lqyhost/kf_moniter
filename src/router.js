import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

import Login from '@/components/Login'
import Index from '@/components/Index'

import StrategyMoniter from '@/components/StrategyMoniter'
import AccountMoniter from '@/components/AccountMoniter'
import SystemManager from '@/components/SystemManager'
import Help from '@/components/Help'

export default new Router({
    routes: [
        { 
            path: '/',
            redirect: '/login', 
        },
        {
            path: '/login',
            name: 'Login',
            component: Login,
        },
        {
            path: '/index',
            name: 'Index',
            component: Index,
            redirect: '/strategy_moniter', 
            children:[
                { path: '/strategy_moniter', name:"strategy_moniter", component:StrategyMoniter},
                { path: '/account_moniter', name:"account_moniter", component:AccountMoniter},
                { path: '/system_manager', name:"system_manager", component:SystemManager},
                { path: '/help', name:"help", component:Help}
            ]
        }
    ]
})
