<template>
  <div class="select">
    <select
      :value="value"
      @change="$emit('change', Number($event.target.value))"
    >
      <option :value="toSet(item)" :key="toSet(item)" v-for="item in list">
        {{ toShow(item) }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number
    },
    list: {
      type: Array,
      default: () => []
    },
    toSet: {
      type: Function,
      default: item => {
        return item.id;
      }
    },
    toShow: {
      type: Function,
      default: item => {
        return item.title;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/colors.scss";

select {
  padding: 0.5rem;
  border: 1px solid $firm;
  background: transparent;
  border-radius: 5px;
  color: $firm;
}
</style>
