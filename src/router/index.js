import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EditContact from '../views/EditContact.vue'
import AddContact from '../views/AddContact.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/edit-contact/:id',
    name: 'EditContact',
    component: EditContact
  },
  {
    path: '/add-contact',
    name: 'AddContact',
    component: AddContact
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
