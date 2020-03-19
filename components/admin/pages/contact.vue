<template>
  <div class="[ flex-center ]">
    <div style="max-width:500px;">
      <StaticForm :form-data="staticForm" />
      <Form
        :geo-form="geoForm"
        :eng-form="engForm"
        :ru-form="ruForm"
        @editForm="editForm"
      />
    </div>
  </div>
</template>

<script>
import Form from '@/components/admin/organisms/contact/form'
import StaticForm from '@/components/admin/molecules/contact/staticForm'
export default {
  name: 'Neighbourhood',
  components: {
    Form,
    StaticForm
  },
  data() {
    return {
      geoForm: {
        languageCode: 'ka',
        addressFirst: '',
        addressSecond: '',
        additionalDescription: ''
      },
      engForm: {
        languageCode: 'en',
        addressFirst: '',
        addressSecond: '',
        additionalDescription: ''
      },
      ruForm: {
        languageCode: 'ru',
        addressFirst: '',
        addressSecond: '',
        additionalDescription: ''
      },
      staticForm: {
        emailFirst: '',
        emailSecond: '',
        emailThird: '',
        phoneFirst: '',
        phoneSecond: '',
        phoneThird: '',
        facebook: '',
        instagram: '',
        additionalSocial: ''
      }
    }
  },
  computed: {
    translations() {
      return this.$store.state.contact.item
    }
  },
  watch: {
    translations(val) {
      this.staticForm = {
        emailFirst: val.emailFirst,
        emailSecond: val.emailSecond,
        emailThird: val.emailThird,
        phoneFirst: val.phoneFirst,
        phoneSecond: val.phoneSecond,
        phoneThird: val.phoneThird,
        facebook: val.facebook,
        instagram: val.instagram,
        additionalSocial: val.additionalSocial
      }
      val.translations.forEach((item) => {
        if (item.languageCode === 'ka') {
          this.geoForm.addressFirst = item.addressFirst
          this.geoForm.addressSecond = item.addressSecond
          this.geoForm.additionalDescription = item.additionalDescription
        } else if (item.languageCode === 'en') {
          this.engForm.addressFirst = item.addressFirst
          this.engForm.addressSecond = item.addressSecond
          this.engForm.additionalDescription = item.additionalDescription
        } else if (item.languageCode === 'ru') {
          this.ruForm.addressFirst = item.addressFirst
          this.ruForm.addressSecond = item.addressSecond
          this.ruForm.additionalDescription = item.additionalDescription
        }
      })
    }
  },
  async created() {
    try {
      await this.$store.dispatch('contact/GET_DATA')
    } catch (e) {
      console.log(e)
    }
  },
  methods: {
    async editForm() {
      const translations = [this.geoForm, this.engForm, this.ruForm]
      const finalData = {
        EmailFirst: this.staticForm.emailFirst,
        EmailSecond: this.staticForm.emailSecond,
        EmailThird: this.staticForm.emailThird,
        phoneFirst: this.staticForm.phoneFirst,
        phoneSecond: this.staticForm.phoneSecond,
        phoneThird: this.staticForm.phoneThird,
        facebook: this.staticForm.facebook,
        instagram: this.staticForm.instagram,
        additionalSocial: this.staticForm.additionalSocial,
        translations
      }
      try {
        await this.$store.dispatch('contact/UPDATE_DATA', finalData)
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
