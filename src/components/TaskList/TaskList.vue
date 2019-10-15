<template>
  <div class="tasks">
    <task-list-filter v-model="filter.status" />
    <div class="tasks__item" v-for="task in filterTasksStatus" :key="task.id">
      <div class="tasks__item-status" :class="getStatusClass(task.status)">
        {{ getStatusText(task.status) }}
      </div>
      <div
        class="tasks__item-until"
        :class="isExpired(task) ? 'tasks__item-until_expired' : ''"
      >
        until {{ task.dateDeadline | formatDate }}
      </div>
      <div class="tasks__item-title">
        <router-link :to="{ name: 'SingleTaskPage', params: { id: task.id } }">
          {{ task.title }}
        </router-link>
      </div>
      <div class="tasks__item-description">
        {{ task.description }}
      </div>
    </div>
  </div>
</template>

<script>
import consts from "@/const/const";
import TaskListFilter from "./TaskListFilter";

import taskDisplayMixin from "../TaskDisplayMixin";

export default {
  mixins: [taskDisplayMixin],
  components: {
    TaskListFilter
  },
  props: ["tasks"],
  data() {
    return {
      filter: {
        status: consts.TASK_STATUS.ALL
      }
    };
  },
  computed: {
    filterTasksStatus() {
      if (this.filter.status === consts.TASK_STATUS.ALL) {
        return this.tasks;
      } else if (this.filter.status === consts.TASK_STATUS.EXPIRED_DEADLINE) {
        return this.tasks.filter(el => this.isExpired(el));
      }
      return this.tasks.filter(el => el.status === this.filter.status);
    }
  }
};
</script>

<style lang="scss">
@import "@/styles/colors.scss";
@import "@/styles/mixins.scss";

.tasks {
  @include flex-col;
  font-family: sans-serif;
  align-items: center;
  margin-top: 1rem;
  padding: 1rem;
  width: 100%;

  &__item-status {
    display: inline-block;
    color: white;
    border-radius: 5px;
    font-size: 0.8rem;
    font-family: sans-serif;
    font-weight: bold;
    padding: 0.3rem;
    margin-right: 0.5rem;
    min-width: 90px;
    text-align: center;

    &_blue {
      background: $firm;
    }

    &_yellow {
      background: #ff8f03;
    }

    &_green {
      background: #3bb509;
    }
  }

  &__item {
    display: flex;
    border: 1px solid $firm;
    border-radius: 5px;
    padding: 0.5rem;
    width: 100%;
    margin-top: 0.4rem;
    align-items: center;
    &-title,
    &-until {
      white-space: nowrap;
      margin-right: 0.5rem;
      font-family: sans-serif;
      a {
        text-decoration: none;
        color: $firm;
      }
    }
    &-until {
      font-size: 0.9rem;
      font-family: monospace;
      color: $text-gray;
      &_expired {
        color: red;
      }
    }
    &-description {
      white-space: nowrap;
      text-overflow: ellipsis;
      display: block;
      overflow: hidden;
      color: $text-gray;
    }
  }
}
</style>
