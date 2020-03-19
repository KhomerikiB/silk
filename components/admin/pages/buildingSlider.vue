<template>
  <div class=" [ full ] ">
    <div class="[ grid-col-2 full ]">
      <div class=" [ scrollable inner-shadow ] ">
        <Slides
          :slides="getSlides"
          @editClick="editClick"
          @removeClick="removeClick"
        />
      </div>
      <div class=" [ scrollable inner-shadow ] ">
        <AddSlide
          :geo-form="geoForm"
          :english-form="englishForm"
          :russian-form="russianForm"
          :crop="true"
          :image-name="imageName"
          :x="579"
          :y="787"
          :show-reset="editState"
          @submitForm="submitForm"
          @restoreStore="restoreStoreObject"
          @updateImage="updateImage"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Slides from '@/components/admin/organisms/default/Slides'
import AddSlide from '@/components/admin/organisms/default/addSlide'

export default {
  name: 'Welcome',
  components: {
    Slides,
    AddSlide
  },
  data() {
    return {
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
    getSlides() {
      return this.$store.state.buildingSlider.items
    },
    editState() {
      return this.$store.state.buildingSlider.editable
    },
    editObject() {
      return this.$store.state.buildingSlider.editableItem
    }
  },
  watch: {
    editObject(val) {
      if (this.editState) {
        this.imageName = val.image.name
        this.setAltTags(val.image.translations)
        this.setEditableDataToForm(val.translations)
      }
    }
  },
  async created() {
    try {
      await this.$store.dispatch('buildingSlider/GET_BUILDING_SLIDES')
    } catch (err) {
      console.log(err)
    }
  },
  methods: {
    async editClick(id) {
      await this.$store.dispatch('buildingSlider/GET_BY_ID', id)
    },
    async removeClick(id) {
      const conf = confirm('Are you sure to delete a slide?')
      if (!conf) return false
      try {
        await this.$store.dispatch('buildingSlider/DELETE_SLIDE', id)
      } catch (e) {
        console.log(e)
      }
    },
    updateImage(url) {
      this.imageName = url
    },
    async submitForm() {
      const translations = [
        {
          languageCode: 'ka',
          description: this.geoForm.description,
          title: this.geoForm.title
        },
        {
          languageCode: 'en',
          description: this.englishForm.description,
          title: this.englishForm.title
        },
        {
          languageCode: 'ru',
          description: this.russianForm.description,
          title: this.russianForm.title
        }
      ]
      let imageTranslations = []
      translations.forEach((item) => {
        const newObj = Object.assign({}, item)
        imageTranslations.push(newObj)
      })
      imageTranslations = imageTranslations.map((item) => {
        if (item.languageCode === 'ka') {
          item.alt = this.geoForm.alt
        } else if (item.languageCode === 'en') {
          item.alt = this.englishForm.alt
        } else if (item.languageCode === 'ru') {
          item.alt = this.russianForm.alt
        }
        return item
      })
      const finalData = {
        image: {
          name: this.imageName,
          translations: imageTranslations
        },
        translations
      }
      if (this.editState) {
        const data = {
          id: this.editObject.id,
          body: finalData
        }
        try {
          await this.$store.dispatch('buildingSlider/UPDATE_SLIDER', data)
          this.resetLocalState()
          this.restoreStoreObject()
        } catch (e) {
          console.log(e)
        }
      } else {
        try {
          await this.$store.dispatch('buildingSlider/ADD_SLIDER', finalData)
          this.resetLocalState()
        } catch (e) {
          console.log(e)
        }
      }
    },
    restoreStoreObject() {
      this.$store.commit('buildingSlider/RESET_EDITABLE_ITEM')
      this.resetLocalState()
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
    setAltTags(array) {
      array.forEach((item) => {
        if (item.languageCode === 'ka') {
          this.geoForm.alt = item.alt
        } else if (item.languageCode === 'ru') {
          this.russianForm.alt = item.alt
        } else if (item.languageCode === 'en') {
          this.englishForm.alt = item.alt
        }
      })
    },
    setEditableDataToForm(array) {
      array.forEach((item) => {
        if (item.languageCode === 'ka') {
          this.geoForm.title = item.title
          this.geoForm.description = item.description
        } else if (item.languageCode === 'ru') {
          this.russianForm.title = item.title
          this.russianForm.description = item.description
        } else if (item.languageCode === 'en') {
          this.englishForm.title = item.title
          this.englishForm.description = item.description
        }
      })
    }
  }
}
</script>
