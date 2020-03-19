<template>
  <div>
    <no-ssr>
      <tabs :options="{ useUrlFragment: false }">
        <tab name="Georgian">
          <FormTab :form-data="geoForm" />
        </tab>
        <tab name="English">
          <FormTab :form-data="engForm" />
        </tab>
        <tab name="Russian">
          <FormTab :form-data="ruForm" />
        </tab>
      </tabs>
    </no-ssr>
    <button class="primary" @click="editForm">Edit</button>
  </div>
</template>
<script>
import FormTab from '@/components/admin/molecules/contact/formTab'
export default {
  name: 'NeighbourhoodForm',
  components: {
    FormTab
  },
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
