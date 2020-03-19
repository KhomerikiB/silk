<template>
  <div class="">
    <input
      v-model="formData.title"
      class="main-input"
      placeholder="Enter title"
    />
    <textarea
      v-model="formData.description"
      class="main-textarea"
      rows="4"
      placeholder="Enter Description"
    ></textarea>
    <input
      v-model="formData.alt"
      class="main-input"
      placeholder="Enter image alt tag"
    />
  </div>
</template>

<script>
export default {
  name: 'AddSlideForm',
  props: {
    formData: {
      type: Object,
      required: true
    }
  }
}
</script>
