<template>
  <div class=" [ full ] ">
    <div class="[ grid-col-2 full ]">
      <div class=" [ scrollable inner-shadow ] ">
        <List
          :lists="getSlides"
          @editClick="editClick"
          @removeClick="removeClick"
        />
      </div>
      <div class=" [ scrollable inner-shadow ] ">
        <EditForm
          :geo-form="geoForm"
          :eng-form="englishForm"
          :ru-form="russianForm"
          :on-change="readFile"
        />
      </div>
    </div>
  </div>
</template>

<script>
import List from '@/components/admin/organisms/partners/list'
import EditForm from '@/components/admin/organisms/partners/editForm'

export default {
  name: 'Welcome',
  components: {
    List,
    EditForm
  },
  data() {
    return {
      upImage: '',
      imageName: '',
      geoForm: {
        alt: '',
        languageCode: 'ka'
      },
      englishForm: {
        alt: '',
        languageCode: 'en'
      },
      russianForm: {
        alt: '',
        languageCode: 'ru'
      }
    }
  },
  computed: {
    getSlides() {
      return this.$store.state.partners.items
    },
    editState() {
      return this.$store.state.partners.editable
    },
    editObject() {
      return this.$store.state.partners.editableItem
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
      await this.$store.dispatch('partners/GET_SLIDES')
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
    async removeClick(id) {
      const conf = confirm('Are you sure to delete a slide?')
      if (!conf) return false
      try {
        await this.$store.dispatch('teamSlider/DELETE_SLIDE', id)
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
          this.resetLocalState()
          this.restoreStoreObject()
        } catch (e) {
          console.log(e)
        }
      } else {
        try {
          await this.$store.dispatch('teamSlider/ADD_SLIDER', finalData)
          this.resetLocalState()
        } catch (e) {
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
    },
    readFile(e) {
      this.upImage = e.target.files[0]
    }
  }
}
</script>
