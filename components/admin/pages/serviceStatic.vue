<template>
  <div class=" [ flex-center full ] ">
    <div class=" [inner-shadow scrollable ] ">
      <AddSlide
        :geo-form="geoForm"
        :eng-form="englishForm"
        :ru-form="russianForm"
        :crop="true"
        :image-name="imageName"
        :x="551"
        :y="570"
        @submitForm="submitForm"
        @updateImage="updateImage"
      />
    </div>
  </div>
</template>

<script>
import AddSlide from '@/components/admin/organisms/service/staticSlideForm'

export default {
  name: 'Welcome',
  components: {
    AddSlide
  },
  data() {
    return {
      imageName: '',
      geoForm: {
        description: '',
        alt: '',
        languageCode: 'ka'
      },
      englishForm: {
        description: '',
        alt: '',
        languageCode: 'en'
      },
      russianForm: {
        description: '',
        alt: '',
        languageCode: 'ru'
      }
    }
  },
  computed: {
    getSlides() {
      return this.$store.state.serviceStatic.item
    }
  },
  watch: {
    getSlides(val) {
      console.log(val)
      this.imageName = val.image.name
      this.setAltTags(val.image.translations)
      this.setEditableDataToForm(val.translations)
    }
  },
  async created() {
    try {
      await this.$store.dispatch('serviceStatic/GET_DATA')
    } catch (err) {
      console.log(err)
    }
  },
  methods: {
    updateImage(url) {
      this.imageName = url
    },
    async submitForm() {
      const finalData = {
        image: {
          name: this.imageName,
          translations: [
            { languageCode: 'ka', alt: this.geoForm.alt },
            { languageCode: 'en', alt: this.englishForm.alt },
            { languageCode: 'ru', alt: this.russianForm.alt }
          ]
        },
        translations: [
          { languageCode: 'ka', description: this.geoForm.description },
          { languageCode: 'en', description: this.englishForm.description },
          { languageCode: 'ru', description: this.russianForm.description }
        ]
      }
      try {
        await this.$store.dispatch('serviceStatic/UPDATE_SLIDER', finalData)
      } catch (e) {
        console.log(e)
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
    setEditableDataToForm(array) {
      array.forEach((item) => {
        if (item.languageCode === 'ka') {
          this.geoForm.description = item.description
        } else if (item.languageCode === 'ru') {
          this.russianForm.description = item.description
        } else if (item.languageCode === 'en') {
          this.englishForm.description = item.description
        }
      })
    }
  }
}
</script>
