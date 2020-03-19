<template>
  <div class="[ inner-padding ]">
    <div class="[ flex-center flex-end ]">
      <button v-if="showReset" class="edit " @click="restoreEditableItem">
        Add New Item
      </button>
    </div>
    <no-ssr>
      <tabs :options="{ useUrlFragment: false }">
        <tab name="Georgian">
          <input
            v-model="formData.geoText"
            class="main-input"
            placeholder="Enter Title"
          />
        </tab>
        <tab name="English">
          <input
            v-model="formData.engText"
            class="main-input"
            placeholder="Enter Title"
          />
        </tab>
        <tab name="Russian">
          <input
            v-model="formData.ruText"
            class="main-input"
            placeholder="Enter Title"
          />
        </tab>
      </tabs>
    </no-ssr>
    <button class="primary" @click="saveForm">Save</button>
  </div>
</template>
<script>
export default {
  name: 'AdvantageEdit',
  props: {
    formData: {
      type: Object,
      required: true
    },
    showReset: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    saveForm() {
      this.$emit('saveForm')
    },
    restoreEditableItem() {
      this.$emit('restoreStore')
    }
  }
}
</script>
