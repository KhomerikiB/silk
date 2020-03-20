<template>
  <div class=" [ inner-padding ] ">
    <Cropper v-if="crop" :x="x" :y="y" :on-crop="imageSrc" />
    <div v-if="imageData.name" style="margin-top:2rem;">
      <img :src="staticUrl + imageData.name" alt="" class="uploaded-image" />
    </div>
    <div style="margin-top:2rem;">
      <template v-for="(slide, slideIndex) in imageData.translations">
        <input
          v-if="slide.languageCode === 'ka'"
          :key="slideIndex"
          v-model="slide.alt"
          type="text"
          class="main-input"
          placeholder="Enter Georgian alt tag"
        />
        <input
          v-else-if="slide.languageCode === 'en'"
          :key="slideIndex"
          v-model="slide.alt"
          type="text"
          class="main-input"
          placeholder="Enter English alt tag"
        />
        <input
          v-else
          :key="slideIndex"
          v-model="slide.alt"
          type="text"
          class="main-input"
          placeholder="Enter Russian alt tag"
        />
      </template>
    </div>
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
    imageData: {
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
    }
  },
  data() {
    return {
      error: false
    }
  },
  methods: {
    imageSrc(url) {
      //   this.$emit('updateImage', url)
      this.imageData.name = url
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
