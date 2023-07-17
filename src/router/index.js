import { createRouter, createWebHistory } from "vue-router";
import Register from "../views/Register.vue";
import Login from "../views/Login.vue";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Doctors from "../views/Doctors.vue";
import Services from "../views/Services.vue";
import Appointment from "../views/Appointment.vue";
import UpdateProfile from "../views/UpdateProfile.vue";
import Patients from "../views/Patients.vue";
import History from "../views/History.vue";
import { useUserStore } from "../store/users";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/services",
      name: "Services",
      component: Services,
    },

    {
      path: "/about",
      name: "About",
      component: About,
    },

    {
      path: "/doctors",
      name: "Doctors",
      component: Doctors,
    },
    {
      path: "/patients",
      name: "Patients",
      component: Patients,
    },
    {
      path: "/history",
      name: "History",
      component: History,
    },
    {
      path: "/appoinment",
      name: "Appointment",
      component: Appointment,
      meta: { requiredAuth: true },
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
    },
    {
      path: "/register",
      name: "Register",
      component: Register,
    },
    {
      path: "/me",
      name: "UpdateProfile",
      component: UpdateProfile,
      meta: { requiredAuth: true },
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    return { top: 0, behavior: "smooth" };
  },
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = useUserStore().user; // Check if the user is authenticated, e.g., by checking if user info exists
  // ... your authentication logic here

  if (to.matched.some((route) => route.meta.requiredAuth)) {
    // The route requires authentication
    if (isLoggedIn) {
      // User is authenticated, proceed to the route
      next();
    } else {
      // User is not authenticated, redirect to the login page or another route
      next({ name: "Login" });
    }
  } else {
    // The route does not require authentication
    next();
  }
});

export default router;
