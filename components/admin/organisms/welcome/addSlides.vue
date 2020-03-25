<template>
  <div class=" [ inner-padding ]  ">
    <div
      v-if="Object.keys(editableItem).length > 0"
      class="add-item-container [ flex-center flex-end ] "
    >
      <button class="edit " @click="restoreEditableItem">
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
    <Cropper :x="1920" :y="1080" :on-crop="imageSrc" />
    <template v-if="imageName">
      <img :src="staticUrl + imageName" alt="" class="uploaded-image" />
    </template>
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
  data() {
    return {
      error: false,
      imageName: '',
      geoForm: {
        title: '',
        description: '',
        alt: '',
        languageCode: 'ka'
      },
      englishForm: {
        title: '',
        description: '',
        alt: '',
        languageCode: 'en'
      },
      russianForm: {
        title: '',
        description: '',
        alt: '',
        languageCode: 'ru'
      }
    }
  },
  computed: {
    editableItem() {
      return this.$store.state.welcome.editableItem
    }
  },
  watch: {
    editableItem(val) {
      if (Object.keys(val).length === 0) {
        this.resetLocalState()
      } else {
        this.imageName = val.image.name
        val.image.translations.forEach((translation) => {
          if (translation.languageCode === 'ka') {
            this.geoForm.title = translation.title
            this.geoForm.description = translation.description
            this.geoForm.alt = translation.alt
          } else if (translation.languageCode === 'ru') {
            this.russianForm.title = translation.title
            this.russianForm.description = translation.description
            this.russianForm.alt = translation.alt
          } else if (translation.languageCode === 'en') {
            this.englishForm.title = translation.title
            this.englishForm.description = translation.description
            this.englishForm.alt = translation.alt
          }
        })
      }
    }
  },
  methods: {
    imageSrc(url) {
      this.imageName = url
    },
    async submitForm() {
      if (this.imageName.length === 0) {
        this.error = true
        return false
      } else this.error = false
      const translations = []
      translations.push(this.geoForm)
      translations.push(this.englishForm)
      translations.push(this.russianForm)
      const finalData = {
        image: {
          name: this.imageName,
          translations
        }
      }
      try {
        await this.$store.dispatch('welcome/ADD_SLIDER', finalData)
        this.$notify({
          type: 'success',
          text: 'You have successfully added an item'
        })
      } catch (e) {
        this.$notify({
          type: 'error',
          text: 'Something went wrong'
        })
      }
      this.resetLocalState()
      this.restoreEditableItem()
    },
    resetLocalState() {
      this.geoForm = {
        title: '',
        description: '',
        alt: '',
        languageCode: 'ka'
      }
      this.englishForm = {
        title: '',
        description: '',
        alt: '',
        languageCode: 'en'
      }
      this.russianForm = {
        title: '',
        description: '',
        alt: '',
        languageCode: 'ru'
      }
      this.imageName = ''
    },
    restoreEditableItem() {
      this.$store.commit('welcome/REMOVE_EDITABLE_ITEM')
    }
  }
}
</script>

<style lang="scss" scoped>
.uploaded-image {
  max-width: 100%;
  object-fit: cover;
}
.add-item-btn {
}
</style>
