<template>
  <div>
    <no-ssr>
      <tabs :options="{ useUrlFragment: false }">
        <tab name="Georgian">
          <input
            v-model="geoForm.text"
            placeholder="Enter Text"
            class="main-textarea"
          />
        </tab>
        <tab name="English">
          <input
            v-model="engForm.text"
            class="main-textarea"
            placeholder="Enter Text"
          />
        </tab>
        <tab name="Russian">
          <input
            v-model="ruForm.text"
            placeholder="Enter Text"
            class="main-input"
          />
        </tab>
      </tabs>
    </no-ssr>
    <button class="primary" @click="editForm">Edit Form</button>
    <div class="pdf-wrapper">
      <span>Current Pdf File </span>
      <a :href="additional.filePath" class="pdf-link">{{
        additional.filePath
      }}</a>
    </div>
    <!-- <input
      v-model="additional.filePath"
      type="text"
      placeholder="Uploaded File"
      class="main-input"
      style="margin-top:15px;"
    /> -->
    <div class="custom-upload [ relative ] ">
      <button class="primary">
        Upload Pdf
        <input
          class="custom-upload__input"
          type="file"
          @change="onChange"
          @click="$event.target.value = ''"
        />
      </button>
    </div>
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
    },
    additional: {
      type: Object,
      required: true
    },
    onChange: {
      type: Function,
      default: () => {}
    }
  },
  methods: {
    editForm() {
      this.$emit('editForm')
    }
  }
}
</script>
<style lang="scss" scoped>
.custom-upload {
  &__input {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0;
    z-index: 1;
  }
  .primary {
    margin: 0;
  }
}
.pdf-wrapper {
  margin: 15px 0;
  span {
    font-size: 14px;
  }
}
.pdf-link {
  margin-top: 4px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  border: 1px solid #dcdfe6;
  height: 40px;
}
</style>
