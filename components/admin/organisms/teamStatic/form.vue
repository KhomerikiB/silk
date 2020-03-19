<template>
  <div>
    <no-ssr>
      <tabs :options="{ useUrlFragment: false }">
        <tab name="Georgian">
          <textarea
            v-model="geoForm.description"
            placeholder="Enter Description"
            class="main-textarea"
            rows="4"
          ></textarea>
        </tab>
        <tab name="English">
          <textarea
            v-model="engForm.description"
            class="main-textarea"
            placeholder="Enter Description"
            rows="4"
          ></textarea>
        </tab>
        <tab name="Russian">
          <textarea
            v-model="ruForm.description"
            placeholder="Enter Description"
            class="main-textarea"
            rows="4"
          ></textarea>
        </tab>
      </tabs>
    </no-ssr>
    <button class="primary" @click="editForm">Edit</button>
  </div>
</template>
<script>
export default {
  name: 'NeighbourhoodForm',
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
    }
  },
  methods: {
    editForm() {
      this.$emit('editForm')
    }
  }
}
</script>
