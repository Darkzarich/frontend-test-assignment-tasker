<template>
  <div class="container">
    <task-list v-if="!loadingTasks" :tasks="tasks" />
    <div v-else class="loading">
      <circular-loader />
    </div>
  </div>
</template>

<script>
import TaskList from "@/components/TaskList/TaskList";
import circularLoader from "@/library/svg/animations/circularLoader.vue";
import localStorageHandler from "@/api/localStorageHandler";

export default {
  components: {
    TaskList,
    circularLoader
  },
  data() {
    return {
      tasks: [],
      loadingTasks: false
    };
  },
  created() {
    // Here we could call our API but since we don't have it, we use localStorageHandler
    // which acts like a Model and Database

    this.loadingTasks = true;
    let res = localStorageHandler.getTasks();

    if (res) {
      if (res.length > 0) {
        this.tasks = res;
      }
    } else {
      console.info("No tasks found. Loaded and set mock data...");

      // mock data
      const data = [
        {
          id: "0",
          title: "Some test task",
          dateCreated: "2019-09-11T09:00:12.979Z",
          dateDeadline: "2019-10-23T09:00:00.979Z",
          description:
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum itaque, saepe neque veniam minus asperiores eius assumenda rem consequatur accusamus modi laboriosam, praesentium, blanditiis non qui obcaecati eveniet est cupiditate quis voluptate natus. Maiores iusto assumenda magni quibusdam deserunt, laudantium voluptas ratione sunt minima eaque eum, praesentium possimus nihil at.",
          status: 0
        },
        {
          id: "1",
          title: "Test task",
          dateCreated: "2019-08-23T14:00:00.979Z",
          dateDeadline: "2019-11-26T11:00:00.979Z",
          description:
            "Lorem ipsum dolor sit amet consectetur, . Rerum itaqimus nihil at. Rerum itaqimus nihil at. ",
          status: 1
        },
        {
          id: "2",
          title: "Task with a long title",
          dateCreated: "2019-10-02T10:00:00.979Z",
          dateDeadline: "2019-12-10T18:00:00.979Z",
          description:
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum itaqimus nihil at. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam, ut!",
          status: 0
        },
        {
          id: "3",
          title: "Short",
          dateCreated: "2019-06-11T14:18:12.979Z",
          dateDeadline: "2019-08-11T14:18:12.979Z",
          description: "Lorem ipsum dolor sit amet consectetur",
          status: 2
        },
        {
          id: "4",
          title: "Expired task",
          dateCreated: "2019-10-01T09:00:00.979Z",
          dateDeadline: "2019-08-15T21:00:00.979Z",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum itaqimus nihil at. Lorem ipsum dolor sit,  adipisicing elit. Rerum itaqimus nihil at. Lorem ipsum dolor sit",
          status: 0
        }
      ];

      this.tasks = data;

      localStorageHandler.setTasks(data);
    }

    this.loadingTasks = false;
  }
};
</script>

<style lang="scss">
@import "@/styles/colors.scss";

.loading {
  svg path {
    fill: $firm;
  }
}

.container {
  width: 100%;
  justify-content: center;
}
</style>
