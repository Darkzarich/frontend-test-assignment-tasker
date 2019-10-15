<template>
  <div class="task">
    <div v-if="create" class="task__create">
      Create New Task
    </div>
    <div class="task__meta">
      <div
        class="task__status"
        @click="changeStatus()"
        :class="getStatusClass(data.status)"
      >
        <span :class="editMode ? 'task__status_edit' : ''">{{
          getStatusText(data.status)
        }}</span>
      </div>
      <div class="task__title">
        <template v-if="!editMode">
          {{ data.title }}
        </template>
        <template v-else>
          <input-element v-model="data.title" :error="validation.title" />
        </template>
        <div class="task__date-created">
          from {{ data.dateCreated | formatDate }}
        </div>
        <div class="task__date-deadline">
          <template v-if="!editMode">
            until {{ data.dateDeadline | formatDate }}
          </template>
          <template v-else>
            <datepick-element
              :error="validation.dateDeadline"
              :label="'until'"
              v-model="data.dateDeadline"
            />
          </template>
        </div>
        <div v-if="!editMode" class="task__edit">
          <div @click="editMode = true">
            <edit-icon />
          </div>
          <button-element
            v-if="data.status !== doneStatus"
            :callback="finishTask"
            :argument="data"
          >
            Finish
          </button-element>
        </div>

        <div
          v-else
          @click="save"
          class="task__save"
          :class="isValid ? '' : 'task__save_disabled'"
        >
          {{ create ? "Create task" : "Save changes" }}
        </div>
      </div>
    </div>
    <div>
      <template v-if="editMode || create">
        <single-task-tags :tags="data.tags" />
      </template>
      <template v-else>
        <div class="task__tags" v-if="data.tags.length > 0">
          <div v-for="tag in data.tags" :key="tag" class="task__tags-item">
            {{ tag }}
          </div>
        </div>
      </template>
    </div>
    <div class="task__description">
      <template v-if="!editMode">
        <div v-html="renderMarkdown(data.description)" />
      </template>
      <template v-else>
        <input-element
          :error="validation.description"
          v-model="data.description"
          :multiline="true"
        />
        <div
          class="task__description-limit"
          :class="
            data.description.length > maxDescriptionLength
              ? 'task__description-limit_error'
              : ''
          "
        >
          {{ data.description.length }} /
          {{ maxDescriptionLength }}
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import taskDisplayMixin from "../TaskDisplayMixin";
import TaskValidationMixin from "../TaskValidationMixin";
import localStorageHandler from "@/api/localStorageHandler";
import InputElement from "@/components/BaseComponents/InputElement";
import DatepickElement from "@/components/BaseComponents/DatepickElement";
import SingleTaskTags from "@/components/SingleTask/SingleTaskTags";
import ButtonElement from "@/components/BaseComponents/ButtonElement";
import consts from "@/const/const";
import editIcon from "@/library/svg/edit";
import showdown from "showdown";

export default {
  components: {
    editIcon,
    InputElement,
    DatepickElement,
    SingleTaskTags,
    ButtonElement
  },
  mixins: [taskDisplayMixin, TaskValidationMixin],
  props: ["data", "create"],
  data() {
    return {
      editMode: this.create,
      doneStatus: consts.TASK_STATUS.DONE,
      maxDescriptionLength: consts.TASK_MAX_DESCRIPTION_LENGTH
    };
  },
  methods: {
    save() {
      if (this.isValid) {
        this.editMode = false;
        console.log(this.data);

        // if new task created localStorageHandler returns its id
        const newId = localStorageHandler.setTaskById(
          this.$route.params.id || this.data.id,
          {
            ...this.data
          }
        );

        if (newId) {
          this.$router.push({
            name: "SingleTaskPage",
            params: {
              id: newId
            }
          });
        }
      }
    },
    finishTask(task) {
      task.status = consts.TASK_STATUS.DONE;
      this.save();
    },
    changeStatus() {
      if (this.editMode && !this.create) {
        this.data.status += 1;
        if (this.data.status > consts.TASK_STATUS.DONE) {
          this.data.status = consts.TASK_STATUS.NEW;
        }
      }
    },
    renderMarkdown(markdown) {
      return new showdown.Converter().makeHtml(markdown);
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

  &__tags {
    @include flex-row;
    flex-wrap: wrap;
    margin-bottom: 1rem;
    &-item {
      margin-top: 0.5rem;
      color: $firm;
      font-weight: bold;
      background: transparent;
      font-size: 0.8rem;
      font-family: monospace;
      user-select: none;
      cursor: pointer;
      padding: 0.1rem;
      margin-right: 0.5rem;
      border-radius: 5px;
      border: 1px solid $firm;
    }
  }

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
    justify-content: center;
    &_edit {
      cursor: pointer;
      user-select: none;
    }
  }
  &__create {
    text-align: center;
    font-family: sans-serif;
    font-weight: bold;
    font-size: 1.5rem;
    background: $firm;
    border-radius: 5px;
    color: white;
    margin-bottom: 2rem;
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
    textarea {
      height: 200px;
      resize: vertical;
    }
    &-limit {
      text-align: right;
      &_error {
        color: $error;
      }
    }
  }
  &__edit {
    display: flex;
    align-items: center;
    .button {
      margin: 0;
      margin-left: 0.5rem;
    }
    svg {
      fill: $firm;
      cursor: pointer;
      margin-left: 0.5rem;
    }
  }
  &__save {
    color: $firm;
    font-size: 1rem;
    cursor: pointer;
    font-weight: bold;
    margin-left: 0.5rem;
    &_disabled {
      color: $text-gray;
      cursor: default;
      pointer-events: none;
    }
  }
}
</style>
