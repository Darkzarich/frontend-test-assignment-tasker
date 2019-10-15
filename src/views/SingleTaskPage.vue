<template>
  <single-task v-if="task" :data="task" />
</template>

<script>
import SingleTask from "@/components/SingleTask/SingleTask";
import localStorageHandler from "@/api/localStorageHandler";

export default {
  data() {
    return {
      task: null
    };
  },
  components: {
    SingleTask
  },
  beforeRouteEnter(to, from, next) {
    // preload our task to pass it in SingleTask component

    const task = localStorageHandler.getTaskById(to.params.id);

    // if task is not found then move to 404 page
    if (!task) {
      next({
        name: "404"
      });
    } else {
      // if the task we ask for exist then we resolve router hook allowing to move
      next(vm => vm.setTask(task));
    }
  },
  methods: {
    setTask(task) {
      this.task = task;
    }
  }
};
</script>

<style></style>
