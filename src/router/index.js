import Vue from 'vue'
import Router from 'vue-router'
import TransactionView from '@/components/TransactionView/TransactionView.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: TransactionView
    }
  ]
})
