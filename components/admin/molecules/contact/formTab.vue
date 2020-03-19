<template>
  <div>
    <input
      v-model="formData.addressFirst"
      type="text"
      class="main-input"
      placeholder="Address First"
    />
    <input
      v-model="formData.addressSecond"
      type="text"
      class="main-input"
      placeholder="Address Second"
    />
    <input
      v-model="formData.additionalDescription"
      type="text"
      class="main-input"
      placeholder="Additional Description"
    />
  </div>
</template>

<script>
export default {
  name: 'ContactFormTab',
  props: {
    formData: {
      type: Object,
      required: true
    }
  }
}
</script>
