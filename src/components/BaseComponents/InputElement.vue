<template>
<div class="input">
  <label v-if="label" for="label">
    {{ label }}
  </label>
  <input
    :id="label"
    :type="type"
    v-if="!multiline"
    :name="name"
    @input="setValueAndChanged($event.target.value)"
    @keyup.enter="enterCallback"
    :value="value"
    :placeholder="placeHolder"
    class="input__element"
    :class="(error || errorOnlyStyle) && wasChanged ? 'input__element_error' : ''"
  >
  </input>
  <div @click="iconClickCallback" class="input__icon">
    <component v-if="icon" :is="icon"/>
  </div>
  <textarea
    :id="label"
    v-if="multiline"
    :type="type"
    :name="name"
    @input="setValueAndChanged($event.target.value)"
    :value="value"
    :placeholder="placeHolder"
    class="input__element"
    :class="(error || errorOnlyStyle) && wasChanged ? 'input__element_error' : ''"
  />
  <span
    class="input__error"
    v-if="wasChanged"
  >
    {{ error }}
  </span>
</div>
</template>

<script>

export default {
  data() {
    return {
      wasChanged: false,
    };
  },
  props: {
    value: {
      type: String,
    },
    label: {
      type: String,
    },
    type: {
      type: String,
      default: 'text',
    },
    multiline: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      default: '',
    },
    placeHolder: {
      type: String,
      default: 'Enter any text',
    },
    error: {
      type: String,
    },
    errorOnlyStyle: {
      type: Boolean,
    },
    enterCallback: {
      type: Function,
      default: () => {},
    },
    icon: {
      type: String,
    },
    iconClickCallback: {
      type: Function,
      default: () => {},
    },
  },
  methods: {
    setValueAndChanged(val) {
      this.$emit('input', val);
      this.wasChanged = true;
    },
  },
};
</script>

<style lang="scss">
@import '@/styles/colors';
@import '@/styles/mixins';

.input {
  @include flex-col;
  margin-left: 1rem;
  margin-right: 1rem;
  &__error {
    color: $error;
    font-size: 0.7rem;
  }
  &__icon {
    display: flex;
    align-items: center;
    position: relative;
    left: -2rem;
    svg {
      fill: $light-gray;
      cursor: pointer;
    }
  }
  &__element {
    background: transparent;
    padding: 0.5rem;
    margin-top: 0.5rem;
    width: 95%;
    margin-bottom: 0.5rem;
    color: $text-gray;
    border: 1px solid $firm;
    border-radius: 2px;
    &:focus {
      outline-color: $firm;
    }
    &_error {
      border: 1px solid;
      outline: $error;
    }
  }
}
</style>