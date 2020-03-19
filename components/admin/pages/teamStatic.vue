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
import Form from '@/components/admin/organisms/teamStatic/form'
export default {
  name: 'Neighbourhood',
  components: {
    Form
  },
  data() {
    return {
      geoForm: {
        languageCode: 'ka',
        description: ''
      },
      engForm: {
        languageCode: 'en',
        description: ''
      },
      ruForm: {
        languageCode: 'ru',
        description: ''
      }
    }
  },
  computed: {
    translations() {
      return this.$store.state.teamStatic.item
    }
  },
  watch: {
    translations(val) {
      val.forEach((item) => {
        if (item.languageCode === 'ka') {
          this.geoForm.description = item.description
        } else if (item.languageCode === 'en') {
          this.engForm.description = item.description
        } else if (item.languageCode === 'ru') {
          this.ruForm.description = item.description
        }
      })
    }
  },
  async created() {
    try {
      await this.$store.dispatch('teamStatic/GET_DATA')
    } catch (e) {
      console.log(e)
    }
  },
  methods: {
    async editForm() {
      const translations = [this.geoForm, this.engForm, this.ruForm]
      try {
        await this.$store.dispatch('teamStatic/UPDATE_DATA', translations)
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
