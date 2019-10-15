import Vue from "vue";
import Router from "vue-router";
import TaskListPage from "./views/TaskListPage.vue";
import TaskCreatePage from "./views/TaskCreatePage";
import SingleTaskPage from "./views/SingleTaskPage";
import NotFound from "./views/NotFound";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "TaskListPage",
      component: TaskListPage
    },
    {
      path: "/create",
      name: "TaskCreatePage",
      component: TaskCreatePage
    },
    {
      path: "/TASK-:id",
      name: "SingleTaskPage",
      component: SingleTaskPage
    },
    {
      path: "/404",
      name: "404",
      component: NotFound
    }
  ]
});

// guard if someone tried to go the page which doesn't exist
router.beforeEach((to, from, next) => {
  const mathed = router.options.routes.find(el => el.name === to.name);

  if (mathed) {
    next();
  } else {
    next({
      name: "404"
    });
  }
});

export default router;
