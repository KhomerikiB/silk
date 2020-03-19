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
            v-model="geoForm.alt"
            class="main-input"
            placeholder="Enter Title"
          />
        </tab>
        <tab name="English">
          <input
            v-model="engForm.alt"
            class="main-input"
            placeholder="Enter Title"
          />
        </tab>
        <tab name="Russian">
          <input
            v-model="engForm.alt"
            class="main-input"
            placeholder="Enter Title"
          />
        </tab>
      </tabs>
    </no-ssr>
    <div class="custom-upload [ relative ] ">
      <button class="primary">
        Upload Image
        <input
          class="custom-upload__input"
          type="file"
          @change="onChange"
          @click="$event.target.value = ''"
        />
      </button>
    </div>
    <button class="primary" @click="saveForm">Save</button>
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
    showReset: {
      type: Boolean,
      default: false
    },
    onChange: {
      type: Function,
      default: () => {}
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
}
</style>
