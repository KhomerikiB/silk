<template>
  <div class=" [ inner-padding ] ">
    <div class="[ flex-center flex-end ]">
      <button v-if="showReset" class="edit " @click="restoreEditableItem">
        Add New Item
      </button>
    </div>
    <no-ssr>
      <tabs :options="{ useUrlFragment: false }">
        <tab name="Georgian">
          <input
            v-model="geoForm.title"
            class="main-input"
            placeholder="Enter Title"
          />
          <input
            v-model="geoForm.description"
            class="main-input"
            placeholder="Enter Description"
          />
        </tab>
        <tab name="English">
          <input
            v-model="engForm.title"
            class="main-input"
            placeholder="Enter Title"
          />
          <input
            v-model="engForm.description"
            class="main-input"
            placeholder="Enter Description"
          />
        </tab>
        <tab name="Russian">
          <input
            v-model="ruForm.title"
            class="main-input"
            placeholder="Enter Title"
          />
          <input
            v-model="ruForm.description"
            class="main-input"
            placeholder="Enter Description"
          />
        </tab>
      </tabs>
    </no-ssr>
    <button class="primary" @click="submitForm">Save</button>
  </div>
</template>

<script>
export default {
  name: 'ServiceSlideForm',
  props: {
    geoForm: {
      type: Object,
      required: true
    },
    engForm: {
      type: Object,
      required: true
    },
    ruForm: {
      type: Object,
      required: true
    },
    showReset: {
      type: Boolean,
      default: false
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
    },
    restoreEditableItem() {
      this.$emit('restoreStore')
    }
  }
}
</script>

<style lang="scss" scoped></style>
