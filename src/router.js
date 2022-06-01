import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

import Login from '@/components/Login'
import Index from '@/components/Index'

import StrategyMoniter from '@/components/StrategyMoniter'
import AccountMoniter from '@/components/AccountMoniter'
import SystemManager from '@/components/SystemManager'
import Help from '@/components/Help'
import AccountManager from '@/components/system/AccountManager'
import StrategyManager from '@/components/system/StrategyManager'
import RiskManager from '@/components/system/RiskManager'

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
                // { path: '/system_manager', name:"system_manager", component:SystemManager},
                {
                    path: '/system_manager', 
                    name:"system_manager", 
                    component:SystemManager,
                    redirect: '/system_manager/account_manager', 
                    children:
                    [
                        { path: '/system_manager/account_manager', name:"account_manager", component:AccountManager},
                        { path: '/system_manager/strategy_manager', name:"strategy_manager", component:StrategyManager},
                        { path: '/system_manager/risk_manager', name:"risk_manager", component:RiskManager}
                    ]
                },
                { path: '/help', name:"help", component:Help}
            ]
        }
    ]
})
