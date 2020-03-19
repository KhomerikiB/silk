<template>
  <div class="[ flex-center ]">
    <Form
      :geo-form="geoForm"
      :eng-form="engForm"
      :ru-form="ruForm"
      @editForm="editForm"
    />
  </div>
</template>

<script>
import Form from '@/components/admin/organisms/neighbourhood/form'
export default {
  name: 'Neighbourhood',
  components: {
    Form
  },
  data() {
    return {
      geoForm: {
        languageCode: 'ka',
        title: '',
        description: ''
      },
      engForm: {
        languageCode: 'en',
        title: '',
        description: ''
      },
      ruForm: {
        langaugeCode: 'ru',
        title: '',
        description: ''
      }
    }
  },
  computed: {
    translations() {
      return this.$store.state.neighbourhood.item
    }
  },
  watch: {
    translations(val) {
      val.forEach((item) => {
        if (item.languageCode === 'ka') {
          this.geoForm.title = item.title
          this.geoForm.description = item.description
        } else if (item.languageCode === 'en') {
          this.engForm.title = item.title
          this.engForm.description = item.description
        } else if (item.languageCode === 'ru') {
          this.ruForm.title = item.title
          this.ruForm.description = item.description
        }
      })
    }
  },
  async created() {
    try {
      await this.$store.dispatch('neighbourhood/GET_DATA')
    } catch (e) {
      console.log(e)
    }
  },
  methods: {
    async editForm() {
      const translations = [this.geoForm, this.engForm, this.ruForm]
      try {
        await this.$store.dispatch('neighbourhood/UPDATE_DATA', translations)
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
