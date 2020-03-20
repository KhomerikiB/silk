<template>
  <div>
    <no-ssr>
      <tabs :options="{ useUrlFragment: false }">
        <tab name="Georgian">
          <input
            v-model="geoForm.title"
            class="main-input"
            placeholder="Enter Title"
          />
          <input
            v-model="geoForm.alt"
            class="main-input"
            placeholder="Enter Alt"
          />
        </tab>
        <tab name="English">
          <input
            v-model="engForm.title"
            class="main-input"
            placeholder="Enter Title"
          />
          <input
            v-model="engForm.alt"
            class="main-input"
            placeholder="Enter Alt"
          />
        </tab>
        <tab name="Russian">
          <input
            v-model="ruForm.title"
            class="main-input"
            placeholder="Enter Title"
          />
          <input
            v-model="ruForm.alt"
            class="main-input"
            placeholder="Enter Alt"
          />
        </tab>
      </tabs>
    </no-ssr>
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
