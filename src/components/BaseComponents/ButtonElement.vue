<template>
  <div class="button" :class="loading ? 'button_loading' : ''">
    <button
      class="button__element"
      @click="callback(argument)"
      :disabled="disabled"
    >
      <span class="button__element-content">
        <slot> </slot>
      </span>
      <div v-if="loading" class="button__element-loader">
        <circular-loader />
      </div>
    </button>
  </div>
</template>

<script>
import circularLoader from "../../library/svg/animations/circularLoader.vue";
export default {
  components: {
    circularLoader
  },
  props: {
    callback: {
      type: Function,
      default: () => {}
    },
    argument: {
      type: [String, Object]
    },
    disabled: {
      type: [Boolean, String],
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss">
@import "@/styles/colors";
@import "@/styles/mixins";

.button {
  margin: 1rem;
  justify-content: center;
  @include flex-row();
  &__element {
    width: 95%;
    padding: 0.5rem;
    border: 2px solid $firm;
    border-radius: 2px;
    background: transparent;
    font-weight: bold;
    color: $firm;
    outline: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    &[disabled] {
      pointer-events: none;
      border: 2px solid $light-gray;
      color: $light-gray;
    }
  }
  &__element-loader {
    position: absolute;
    svg {
      width: 1rem;
      height: 1rem;
    }
  }
  &_loading {
    pointer-events: none;
    .button__element {
      border: 2px solid rgba($firm, 0.5);
    }
    .button__element-content {
      opacity: 0.5;
      user-select: none;
    }
  }
}
</style>
