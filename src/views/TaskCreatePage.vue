<template>
  <single-task :create="true" :data="task" />
</template>

<script>
import SingleTask from "@/components/SingleTask/SingleTask";
import localStorageHandler from "@/api/localStorageHandler";

export default {
  components: {
    SingleTask
  },
  data() {
    return {
      task: {
        dateCreated: this.dateNow(),
        title: "",
        dateDeadline: new Date().toISOString(),
        description: "",
        status: 0,
        tags: []
      }
    };
  },
  methods: {
    dateNow() {
      const date = new Date();
      return (
        date.getFullYear() +
        "-" +
        ("0" + (date.getMonth() + 1)).slice(-2) +
        "-" +
        ("0" + date.getDate()).slice(-2)
      );
    }
  }
};
</script>

<style></style>
