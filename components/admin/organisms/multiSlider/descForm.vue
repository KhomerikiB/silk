<template>
  <div style="margin-bottom:2rem;">
    <no-ssr>
      <tabs :options="{ useUrlFragment: false }">
        <tab name="Georgian">
          <input
            v-model="geoForm.title"
            class="main-input"
            placeholder="Enter Title"
          />
          <textarea
            v-model="geoForm.description"
            class="main-textarea"
            rows="4"
            placeholder="Enter Description"
          ></textarea>
        </tab>
        <tab name="English">
          <input
            v-model="engForm.title"
            class="main-input"
            placeholder="Enter Title"
          />
          <textarea
            v-model="engForm.description"
            class="main-textarea"
            rows="4"
            placeholder="Enter Description"
          ></textarea>
        </tab>
        <tab name="Russian">
          <input
            v-model="ruForm.title"
            class="main-input"
            placeholder="Enter Title"
          />
          <textarea
            v-model="ruForm.description"
            class="main-textarea"
            rows="4"
            placeholder="Enter Description"
          ></textarea>
        </tab>
      </tabs>
    </no-ssr>
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
    }
  },
  data() {
    return {
      error: false
    }
  }
}
</script>
