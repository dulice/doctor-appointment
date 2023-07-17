import Home from './views/Home.vue'
import Doctors from './views/Doctors.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue';

export const routes = [
    {
      path: "/",
      name: "Home",
      component: Home,
      icon: "mdi-home",
    },
    {
      path: "/doctors",
      name: "Doctors",
      component: Doctors,
      icon: "mdi-heart-pulse",
    }
  ]