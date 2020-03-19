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
            v-model="geoForm.fullname"
            class="main-input"
            placeholder="Enter Fullname"
          />
          <input
            v-model="geoForm.status"
            class="main-input"
            placeholder="Enter Status"
          />
          <input
            v-model="geoForm.alt"
            class="main-input"
            placeholder="Enter Alt Tag"
          />
        </tab>
        <tab name="English">
          <input
            v-model="englishForm.fullname"
            class="main-input"
            placeholder="Enter Fullname"
          />
          <input
            v-model="englishForm.status"
            class="main-input"
            placeholder="Enter Status"
          />
          <input
            v-model="englishForm.alt"
            class="main-input"
            placeholder="Enter Alt Tag"
          />
        </tab>
        <tab name="Russian">
          <input
            v-model="russianForm.fullname"
            class="main-input"
            placeholder="Enter Fullname"
          />
          <input
            v-model="russianForm.status"
            class="main-input"
            placeholder="Enter Status"
          />
          <input
            v-model="russianForm.alt"
            class="main-input"
            placeholder="Enter Alt Tag"
          />
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
import Cropper from '@/components/admin/molecules/cropper'
export default {
  name: 'AddWelcomeSlides',
  components: {
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
