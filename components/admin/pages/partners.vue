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
          :image-name="imageName"
          :image-url="imageUrl"
          :show-reset="editState"
          @restoreStore="restoreStoreObject"
          @saveForm="submitForm"
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
      },
      imageUrl: {
        value: ''
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
        this.imageUrl.value = val.url
        this.imageName = val.image.name
        this.setAltTags(val.image.translations)
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
        await this.$store.dispatch('partners/GET_BY_ID', id)
      } catch (e) {
        console.log(e)
      }
    },
    async removeClick(id) {
      const conf = confirm('Are you sure to delete a slide?')
      if (!conf) return false
      try {
        await this.$store.dispatch('partners/DELETE_SLIDE', id)
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
      const finalData = {}
      if (this.editState) {
        const data = {
          id: this.editObject.id,
          body: {
            url: this.imageUrl.value,
            image: {
              name: this.imageName,
              translations
            }
          }
        }
        try {
          await this.$store.dispatch('partners/UPDATE_SLIDER', data)
          console.log(data)
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
      this.$store.commit('partners/RESET_EDITABLE_ITEM')
      this.resetLocalState()
    },
    resetLocalState() {
      this.upImage = ''
      this.imageName = ''
      this.geoForm = {
        alt: '',
        languageCode: 'ka'
      }
      this.englishForm = {
        alt: '',
        languageCode: 'en'
      }
      this.russianForm = {
        alt: '',
        languageCode: 'ru'
      }
      this.imageUrl = {
        value: ''
      }
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
    readFile(e) {
      this.upImage = e.target.files[0]
      console.log(this.upImage)
    }
  }
}
</script>
