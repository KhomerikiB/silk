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
          <AddSlideForm :form-data="geoForm" />
        </tab>
        <tab name="English">
          <AddSlideForm :form-data="englishForm" />
        </tab>
        <tab name="Russian">
          <AddSlideForm :form-data="russianForm" />
        </tab>
      </tabs>
    </no-ssr>
    <Cropper v-if="crop" :x="x" :y="y" :on-crop="imageSrc" />
    <div v-if="imageName" style="margin-top:2rem;">
      <img :src="staticUrl + imageName" alt="" class="uploaded-image" />
    </div>
    <button class="primary" @click="submitForm">Save</button>
    <p v-if="error" class="danger-text">Please crop the image</p>
  </div>
</template>

<script>
import AddSlideForm from '@/components/admin/molecules/welcome/addSlideForm'
import Cropper from '@/components/admin/molecules/cropper'
export default {
  name: 'AddWelcomeSlides',
  components: {
    AddSlideForm,
    Cropper
  },
  props: {
    geoForm: {
      type: Object,
      required: true
    },
    russianForm: {
      type: Object,
      required: true
    },
    englishForm: {
      type: Object,
      required: true
    },
    x: {
      type: Number,
      default: 0
    },
    y: {
      type: Number,
      default: 0
    },
    crop: {
      type: Boolean,
      default: false
    },
    showReset: {
      type: Boolean,
      default: false
    },
    imageName: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      error: false
    }
  },
  methods: {
    imageSrc(url) {
      this.$emit('updateImage', url)
    },
    submitForm() {
      this.$emit('submitForm')
    },
    restoreEditableItem() {
      this.$emit('restoreStore')
    }
  }
}
</script>

<style lang="scss" scoped>
.uploaded-image {
  max-width: 100%;
  max-height: 400px;
  object-fit: cover;
}
.add-item-btn {
}
</style>
