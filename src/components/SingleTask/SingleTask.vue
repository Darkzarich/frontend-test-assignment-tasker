<template>
  <div class="task">
    <div class="task__meta">
      <div class="task__status" :class="getStatusClass(data.status)">
        {{ getStatusText(data.status) }}
      </div>
      <div class="task__title">
        {{ data.title }}
        <div class="task__date-created">
          {{ data.dateCreated | formatDate }}
        </div>
        <div class="task__date-deadline">
          {{ data.dateDeadline | formatDate }}
        </div>
        <div v-if="!editMode" @click="editMode = true" class="task__edit">
          <edit-icon />
        </div>
        <div v-else class="task__save">
          Save changes
        </div>
      </div>
    </div>
    <div class="task__description">
      {{ data.description }}
    </div>
  </div>
</template>

<script>
import taskDisplayMixin from "../TaskDisplayMixin";
import editIcon from "@/library/svg/edit";

export default {
  components: {
    editIcon
  },
  mixins: [taskDisplayMixin],
  props: ["data"],
  data() {
    return {
      editMode: false
    };
  },
  filters: {
    formatDate(dateString) {
      const date = new Date(dateString);
      return (
        ("0" + date.getDate()).slice(-2) +
        "." +
        ("0" + (date.getMonth() + 1)).slice(-2) +
        "." +
        date.getFullYear() +
        " " +
        ("0" + date.getHours()).slice(-2) +
        ":" +
        ("0" + date.getMinutes()).slice(-2)
      );
    }
  }
};
</script>

<style lang="scss">
@import "@/styles/colors.scss";
@import "@/styles/mixins.scss";

.task {
  @include flex-col;
  margin-top: 1rem;
  width: 60%;

  &__status {
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
    display: flex;
    align-items: center;
  }
  &__meta {
    @include flex-row;
    flex-wrap: wrap;
  }
  &__title {
    @include flex-row;
    font-size: 1.5rem;
    font-family: sans-serif;
    align-items: center;
    white-space: nowrap;
    flex-wrap: wrap;
  }
  &__date-created,
  &__date-deadline {
    margin-left: 0.5rem;
    font-size: 0.9rem;
    color: $text-gray;
  }
  &__description {
    border: 1px solid $firm;
    border-radius: 5px;
    padding: 1rem;
    margin-top: 1rem;
    font-family: sans-serif;
    line-height: 20px;
    color: $text-gray;
  }
  &__edit svg {
    fill: gray;
    cursor: pointer;
    margin-left: 0.5rem;
  }
}
</style>
