<template>
  <div>
    <select-element @change="setFilter" :list="options" v-model="value" />
  </div>
</template>

<script>
import consts from "@/const/const";
import SelectElement from "@/components/BaseComponents/SelectElement";

export default {
  props: ["value"],
  components: {
    SelectElement
  },
  data() {
    return {
      options: [
        {
          id: consts.TASK_STATUS.ALL,
          title: "All"
        },
        {
          id: consts.TASK_STATUS.NEW,
          title: "New"
        },
        {
          id: consts.TASK_STATUS.IN_PROGRESS,
          title: "In Progress"
        },
        {
          id: consts.TASK_STATUS.DONE,
          title: "Done"
        },
        {
          id: consts.TASK_STATUS.EXPIRED_DEADLINE,
          title: "Expired Deadline"
        }
      ]
    };
  },
  methods: {
    setFilter(mode) {
      this.$emit("input", mode);
    }
  }
};
</script>

<style></style>
