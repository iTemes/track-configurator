<script setup>
import { computed } from "vue";

const props = defineProps(["modelValue", "type", "value", "name", "id"]);
const emit = defineEmits(["update:modelValue"]);

const valueFromStore = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});
</script>

<template>
  <label class="d-flex align-items-center" :for="id">
    <input
      tabindex="1"
      class="visually-hidden"
      :type="type"
      :name="name"
      :id="id"
      :value="value"
      v-model="valueFromStore"
    />
    <span class="custom-checkbox" />
    <span>{{ $t(`message.${value}`) }}</span>
  </label>
</template>

<style scoped lang="scss">
label {
  cursor: pointer;

  &:hover .custom-checkbox {
    border-color: #000;
  }
}

.custom-checkbox {
  position: relative;

  display: flex;
  height: 22px;
  width: 22px;
  margin-right: 15px;

  background-color: #fff;
  border: 1px solid #c4c4c4;
  border-radius: 50%;

  &::after {
    position: absolute;
    content: "";
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #000;
    left: 6px;
    top: 6px;
    z-index: 2;
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
  }
}

input:checked + .custom-checkbox::after {
  opacity: 1;
}
input:checked + .custom-checkbox {
  opacity: 1;
  border-color: #000;
}
input:disabled + .custom-checkbox,
input:disabled ~ span {
  opacity: 0.4;
}
input:focus + .custom-checkbox {
  outline: 1px solid #222;
}
</style>
