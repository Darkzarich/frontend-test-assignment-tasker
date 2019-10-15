<template>
  <div class="task-filter">
    <select-element @change="setFilter" :list="options" v-model="value" />
    <router-link class="task-filter__create-new" to="/create">
      <button-element>New task</button-element>
    </router-link>
  </div>
</template>

<script>
import consts from "@/const/const";
import SelectElement from "@/components/BaseComponents/SelectElement";
import ButtonElement from "@/components/BaseComponents/ButtonElement";

export default {
  props: ["value"],
  components: {
    SelectElement,
    ButtonElement
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

<style lang="scss">
.task-filter {
  display: flex;
  align-items: center;
  &__create-new {
    text-decoration: none;
    .button {
      width: 6rem;
    }
  }
}
</style>
