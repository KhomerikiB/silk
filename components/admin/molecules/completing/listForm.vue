<template>
  <div class="">
    <input
      v-model="formData.title"
      class="main-input"
      placeholder="Enter title"
    />
    <input
      v-model="formData.price"
      class="main-input"
      placeholder="Enter Price"
    />
  </div>
</template>

<script>
export default {
  name: 'ListForm',
  props: {
    formData: {
      type: Object,
      required: true
    }
  }
}
</script>
