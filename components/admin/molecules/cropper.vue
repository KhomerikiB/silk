<template>
  <div class="cropper">
    <div class="row">
      <div class="image-container">
        <ImageBrowser :on-change="readFile" />
        <template v-if="src !== '' && cropped === ''">
          <client-only>
            <vue-cropper
              ref="cropper"
              :aspect-ratio="x / y"
              :src="src"
              alt="Source Image"
              drag-mode="none"
              scalable
              :zoomable="false"
              :view-mode="2"
              :ready="
                () => {
                  const contData = $refs.cropper.getContainerData()
                  $refs.cropper.setCropBoxData({
                    height: contData.height,
                    width: contData.width
                  })
                }
              "
            >
            </vue-cropper>
          </client-only>
          <button class="primary" @click="cropImage">Crop</button>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import ImageBrowser from '@/components/admin/molecules/imageBrowser'
export default {
  name: 'Cropper',
  components: {
    ImageBrowser
  },
  props: {
    x: {
      type: Number,
      default: 1
    },
    y: {
      type: Number,
      default: 1
    },
    onCrop: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      src: '',
      cropped: '',
      upImage: ''
    }
  },
  methods: {
    async cropImage() {
      const data = this.$refs.cropper.getData(true)
      const formData = new FormData()
      formData.append('Image', this.upImage)
      formData.append('X', data.x < 0 ? 0 : data.x)
      formData.append('Y', data.y < 0 ? 0 : data.y)
      formData.append('width', data.width)
      formData.append('height', data.height)
      formData.append('MaxSize', this.x < this.y ? this.y : this.x)
      try {
        const result = await this.$store.dispatch('image/CROP_IMAGE', formData)
        this.cropped = result.data.name
        this.onCrop(this.cropped)
      } catch (e) {}
    },
    readFile(e) {
      this.upImage = e.target.files[0]
      this.cropped = ''
      this.src = ''
      if (e.target.files[0] && e.target.files[0]) {
        const FR = new FileReader()
        FR.addEventListener('load', (e) => {
          this.src = e.target.result
        })
        FR.readAsDataURL(e.target.files[0])
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.cropper {
  .image-container {
    max-width: 500px;
    .image {
      width: 100%;
    }
  }
}
</style>
