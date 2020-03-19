<template>
  <div class=" [ inner-padding ] ">
    <no-ssr>
      <tabs :options="{ useUrlFragment: false }">
        <tab name="Georgian">
          <input
            v-model="formData.geoTitle"
            class="main-input"
            placeholder="Enter Title"
          />
        </tab>
        <tab name="English">
          <input
            v-model="formData.engTitle"
            class="main-input"
            placeholder="Enter Title"
          />
        </tab>
        <tab name="Russian">
          <input
            v-model="formData.ruTitle"
            class="main-input"
            placeholder="Enter Title"
          />
        </tab>
      </tabs>
    </no-ssr>
    <input
      v-model="formData.status"
      class="main-input"
      style="margin-top:2rem"
      placeholder="Enter Status"
    />
    <input
      v-model="formData.price"
      class="main-input"
      style="margin-top:2rem"
      placeholder="Enter Price"
    />
    <button class="primary submit-btn" @click="submitForm">Save</button>
  </div>
</template>

<script>
export default {
  name: 'ListEdit',
  props: {
    formData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      error: false
    }
  },
  methods: {
    submitForm() {
      this.$emit('submitForm')
    }
  }
}
</script>

<style lang="scss" scoped>
.submit-btn {
  margin-top: 0;
}
</style>
