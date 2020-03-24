<template>
  <div class="[ flex-center ]">
    <Form
      :geo-form="geoForm"
      :eng-form="engForm"
      :additional="additional"
      :ru-form="ruForm"
      :on-change="readFile"
      @editForm="editForm"
    />
  </div>
</template>

<script>
import Form from '@/components/admin/organisms/apartmentPdf/form'
export default {
  name: 'Neighbourhood',
  components: {
    Form
  },
  data() {
    return {
      additional: {
        filePath: ''
      },
      geoForm: {
        languageCode: 'ka',
        text: ''
      },
      engForm: {
        languageCode: 'en',
        text: ''
      },
      ruForm: {
        languageCode: 'ru',
        text: ''
      }
    }
  },
  computed: {
    translations() {
      return this.$store.state.apartmentPdf.item
    }
  },
  watch: {
    translations(val) {
      val.translations.forEach((item) => {
        if (item.languageCode === 'ka') {
          this.geoForm.text = item.text
        } else if (item.languageCode === 'en') {
          this.engForm.text = item.text
        } else if (item.languageCode === 'ru') {
          this.ruForm.text = item.text
        }
      })
    }
  },
  async created() {
    try {
      await this.$store.dispatch('apartmentPdf/GET_DATA')
    } catch (e) {
      console.log(e)
    }
  },
  methods: {
    async editForm() {
      const translations = [this.geoForm, this.engForm, this.ruForm]
      try {
        await this.$store.dispatch('apartmentPdf/UPDATE_DATA', translations)
      } catch (e) {
        console.log(e)
      }
    },
    async readFile(e) {
      this.upImage = e.target.files[0]
      const formData = new FormData()
      formData.append('File', this.upImage)
      const result = await this.$store.dispatch('file/UPLOAD_FILE', formData)
      await this.$store.dispatch('apartmentPdf/UPDATE_PDF', result.data.name)
      this.additional.filePath = result.data.fullPath
    }
  }
}
</script>
