<template>
  <div class="response-alert" :class="error ? 'error' : 'success'">
    <span v-if="error">{{ errorMessage }}</span>
    <span v-else>{{ successMessage }}</span>
  </div>
</template>
<script>
export default {
  name: 'ResponsePopup',
  props: {
    error: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      successMessage: 'You have successfully added a item',
      errorMessage: 'Something went wrong'
    }
  }
}
</script>
<style lang="scss" scoped>
.response-alert {
  font-size: 14px;
  pointer-events: none;
  transition: all 0.3s ease;
  opacity: 0;
  &.show {
    transform: translate(-50%, 0);
    opacity: 1;
  }
  &.success {
    color: #270;
    background-color: #dff2bf;
  }
  &.error {
    color: #d8000c;
    background-color: #ffbaba;
  }
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translate(-50%, -40px);
  padding: 15px;
  max-width: 500px;
  z-index: 10;
  width: 100%;
}
</style>
