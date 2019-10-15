<template>
  <div class="date-picker">
    <div clss="date-picket__container">
      <label :for="label">
        {{ label }}
      </label>
      <input
        type="date"
        :id="label"
        :value="value"
        :class="error ? 'date-picker__error' : ''"
        @input="setValueAndChanged($event.target.value)"
      />
    </div>
    <div class="date-picker__error-text" v-if="wasChanged">
      {{ error }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      wasChanged: false
    };
  },
  props: {
    value: {
      type: String
    },
    label: {
      type: String
    },
    error: {
      type: String
    }
  },
  methods: {
    setValueAndChanged(val) {
      this.$emit("input", val);
      this.wasChanged = true;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/colors";

.date-picker {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  input[type="date"] {
    padding: 0.5rem !important;
    color: $firm;
    background: transparent;
    outline: $firm;
    border: 1px solid $firm;
    &::-webkit-inner-spin-button {
      display: none;
    }
    &::-webkit-calendar-picker-indicator {
      background: transparent;
    }
  }
  label {
    min-width: 30px;
    display: inline-block;
    color: $text-gray;
  }
  &__error {
    border: 1px solid $error !important;
    color: $error !important;
    &-text {
      color: $error;
      font-size: 0.7rem;
      position: absolute;
    }
  }
}
</style>
