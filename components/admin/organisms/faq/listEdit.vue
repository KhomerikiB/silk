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
          <textarea
            v-model="geoForm.question"
            class="main-textarea"
            placeholder="Enter Question"
            rows="2"
          ></textarea>
          <textarea
            v-model="geoForm.answer"
            class="main-textarea"
            placeholder="Enter Answer"
            rows="2"
          ></textarea>
        </tab>
        <tab name="English">
          <textarea
            v-model="engForm.question"
            class="main-textarea"
            placeholder="Enter Question"
            rows="2"
          ></textarea>
          <textarea
            v-model="engForm.answer"
            class="main-textarea"
            placeholder="Enter Answer"
            rows="2"
          ></textarea>
        </tab>
        <tab name="Russian">
          <textarea
            v-model="ruForm.question"
            class="main-textarea"
            placeholder="Enter Question"
            rows="2"
          ></textarea>
          <textarea
            v-model="ruForm.answer"
            class="main-textarea"
            placeholder="Enter Answer"
            rows="2"
          ></textarea>
        </tab>
      </tabs>
    </no-ssr>
    <div style="margin:15px 0;">
      <select v-model="additional.categoryId">
        <option
          v-for="(category, index) in categories"
          :key="index"
          :value="category.id"
          >{{ category.title }}</option
        >
      </select>
      <label style="margin-left:10px;">
        published:
        <input v-model="additional.published" type="checkbox" />
      </label>
    </div>
    <button class="primary submit-btn" @click="submitForm">Save</button>
  </div>
</template>

<script>
export default {
  name: 'ListEdit',
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
    categories: {
      type: Array,
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
      this.$emit('resetStore')
    }
  }
}
</script>

<style lang="scss" scoped>
.submit-btn {
  margin-top: 0;
}
</style>
