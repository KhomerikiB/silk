<template>
  <div class="image-browser">
    <label>
      <button class="primary">Choose Image</button>
      <input
        id="file"
        type="file"
        @change="onChange"
        @click="$event.target.value = ''"
      />
    </label>
  </div>
</template>

<script>
export default {
  name: 'ImagrBrowser',
  props: {
    onChange: {
      type: Function,
      default: () => {}
    }
  }
}
</script>

<style lang="scss" scoped>
.image-browser {
  width: max-content;
  position: relative;
  input {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0;
  }
}
</style>
