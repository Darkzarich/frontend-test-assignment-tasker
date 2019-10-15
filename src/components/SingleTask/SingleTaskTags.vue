<template>
  <div class="single-task__tags">
    <div class="single-task__tags-container">
      <div v-for="tag in tags" :key="tag" class="single-task__tags-item">
        {{ tag }}
        <span @click="removeTag(tag)" class="single-task__tags-item-remove">
          x
        </span>
      </div>
    </div>
    <div class="single-task__tags-input">
      <input-element
        place-holder="Input tag and press 'enter'"
        v-model="tagInput"
        :enter-callback="addTag"
      />
      <span v-if="tagInput.length > 0" @click="addTag">
        +
      </span>
    </div>
  </div>
</template>

<script>
import InputElement from "../BaseComponents/InputElement.vue";
import consts from "@/const/const";
export default {
  components: {
    InputElement
  },
  data() {
    return {
      tagInput: ""
    };
  },
  props: ["tags"],
  methods: {
    addTag() {
      if (this.tagInput.length > 0) {
        const checkDouble = this.tags.find(el => el === this.tagInput);
        if (!checkDouble && !this.validation) {
          this.tags.push(this.tagInput);
          this.tagInput = "";
        }
      }
    },
    removeTag(tag) {
      this.tags.splice(this.tags.indexOf(tag), 1);
    }
  }
};
</script>

<style lang="scss">
@import "@/styles/mixins.scss";
@import "@/styles/colors.scss";

.single-task__tags {
  @include flex-row;
  flex-wrap: wrap;
  margin-bottom: 0.5rem;
  &-container {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
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
    &-remove {
      color: $error;
    }
  }
  &-input {
    display: flex;
    align-items: center;
    span {
      color: $firm;
      font-weight: bold;
      font-size: 1.5rem;
      cursor: pointer;
      user-select: none;
    }
  }
}
</style>
