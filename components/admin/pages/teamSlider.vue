<template>
  <div class=" [ full ] ">
    <div class="[ grid-col-2 full ]">
      <div class=" [ scrollable inner-shadow ] ">
        <Slides
          :slides="getSlides"
          :sort-items="sortItems"
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
          :x="490"
          :y="385"
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
import Slides from '@/components/admin/organisms/teamSlider/Slides'
import AddSlide from '@/components/admin/organisms/teamSlider/addSlide'

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
        fullname: '',
        status: '',
        alt: '',
        languageCode: 'ka'
      },
      englishForm: {
        fullname: '',
        status: '',
        alt: '',
        languageCode: 'en'
      },
      russianForm: {
        fullname: '',
        status: '',
        alt: '',
        languageCode: 'ru'
      }
    }
  },
  computed: {
    getSlides() {
      return this.$store.state.teamSlider.items
    },
    editState() {
      return this.$store.state.teamSlider.editable
    },
    editObject() {
      return this.$store.state.teamSlider.editableItem
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
      await this.$store.dispatch('teamSlider/GET_TEAM_SLIDES')
    } catch (err) {
      console.log(err)
    }
  },
  methods: {
    async editClick(id) {
      try {
        await this.$store.dispatch('teamSlider/GET_BY_ID', id)
      } catch (e) {
        console.log(e)
      }
    },
    async sortItems(value) {
      const sortIds = []
      value.map((item) => {
        sortIds.push(item.id)
      })
      try {
        await this.$store.dispatch('teamSlider/UPDATE_SORT', sortIds)
      } catch (e) {
        console.log(e)
      }
    },
    async removeClick(id) {
      const conf = confirm('Are you sure to delete a slide?')
      if (!conf) return false
      try {
        await this.$store.dispatch('teamSlider/DELETE_SLIDE', id)
        this.$notify({
          type: 'success',
          text: 'You have successfully deleted an item'
        })
      } catch (e) {
        this.$notify({
          type: 'error',
          text: 'Something went wrong'
        })
        console.log(e)
      }
    },
    updateImage(url) {
      this.imageName = url
    },
    async submitForm() {
      if (!this.imageName) {
        this.$notify({
          type: 'warn',
          text: 'Please update,crop the image'
        })
        return false
      }
      const translations = [
        {
          languageCode: 'ka',
          fullname: this.geoForm.fullname,
          status: this.geoForm.status
        },
        {
          languageCode: 'en',
          fullname: this.englishForm.fullname,
          status: this.englishForm.status
        },
        {
          languageCode: 'ru',
          fullname: this.russianForm.fullname,
          status: this.russianForm.status
        }
      ]
      const imageTranslations = [
        {
          languageCode: 'ka',
          alt: this.geoForm.alt
        },
        {
          languageCode: 'en',
          alt: this.englishForm.alt
        },
        {
          languageCode: 'ru',
          alt: this.russianForm.alt
        }
      ]
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
          await this.$store.dispatch('teamSlider/UPDATE_SLIDER', data)
          this.$notify({
            type: 'success',
            text: 'You have successfully updated an item'
          })
          this.resetLocalState()
          this.restoreStoreObject()
        } catch (e) {
          this.$notify({
            type: 'error',
            text: 'Something went wrong'
          })
          console.log(e)
        }
      } else {
        try {
          await this.$store.dispatch('teamSlider/ADD_SLIDER', finalData)
          this.$notify({
            type: 'success',
            text: 'You have successfully added an item'
          })

          this.resetLocalState()
        } catch (e) {
          this.$notify({
            type: 'error',
            text: 'Something went wrong'
          })
          console.log(e)
        }
      }
    },
    restoreStoreObject() {
      this.$store.commit('teamSlider/RESET_EDITABLE_ITEM')
      this.resetLocalState()
    },
    resetLocalState() {
      this.geoForm = {
        fullname: '',
        status: '',
        alt: '',
        languageCode: 'ka'
      }
      this.englishForm = {
        fullname: '',
        status: '',
        alt: '',
        languageCode: 'en'
      }
      this.russianForm = {
        fullname: '',
        status: '',
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
          this.geoForm.status = item.status
          this.geoForm.fullname = item.fullname
        } else if (item.languageCode === 'ru') {
          this.russianForm.status = item.status
          this.russianForm.fullname = item.fullname
        } else if (item.languageCode === 'en') {
          this.englishForm.status = item.status
          this.englishForm.fullname = item.fullname
        }
      })
    }
  }
}
</script>
