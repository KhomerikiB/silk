<template>
  <div class="[ inner-padding ]">
    <div class="[ flex-center flex-end ]">
      <!-- <button v-if="showReset" class="edit " @click="restoreEditableItem">
        Add New Item
      </button> -->
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
            v-model="geoForm.componentTitle"
            class="main-input"
            placeholder="Enter Component Title"
          />
        </tab>
        <tab name="English">
          <input
            v-model="engForm.title"
            class="main-input"
            placeholder="Enter Title"
          />
          <input
            v-model="engForm.componentTitle"
            class="main-input"
            placeholder="Enter Component Title"
          />
        </tab>
        <tab name="Russian">
          <input
            v-model="ruForm.title"
            class="main-input"
            placeholder="Enter Title"
          />
          <input
            v-model="ruForm.componentTitle"
            class="main-input"
            placeholder="Enter Component Title"
          />
        </tab>
      </tabs>
      <input
        v-model="additional.slug"
        class="main-input"
        placeholder="Enter Slug"
        style="margin-top:15px"
      />
    </no-ssr>
    <button class="primary submit-btn" @click="saveForm">Save</button>
  </div>
</template>
<script>
export default {
  name: 'AdvantageEdit',
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
    additional: {
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

<style lang="scss" scoped>
.submit-btn {
  margin-top: 0;
}
</style>
