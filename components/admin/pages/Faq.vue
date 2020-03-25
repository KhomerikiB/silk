<template>
  <div class=" [ full ] ">
    <div class="[ grid-col-2 full ]">
      <div class=" [ scrollable inner-shadow ] ">
        <List
          :lists="getList"
          @editClick="editClick"
          @removeClick="removeClick"
        />
      </div>
      <div class=" [ scrollable inner-shadow ] ">
        <ListEdit
          :geo-form="geoForm"
          :eng-form="engForm"
          :ru-form="ruForm"
          :categories="getCategories"
          :additional="additional"
          :show-reset="editState"
          @submitForm="submitForm"
          @resetStore="restoreStoreObject"
        />
      </div>
    </div>
  </div>
</template>

<script>
import List from '@/components/admin/organisms/faq/list'
import ListEdit from '@/components/admin/organisms/faq/listEdit'
export default {
  name: 'Welcome',
  components: {
    List,
    ListEdit
  },
  data() {
    return {
      additional: {
        published: false,
        categoryId: undefined
      },
      geoForm: {
        answer: '',
        languageCode: 'ka',
        question: ''
      },
      engForm: {
        answer: '',
        languageCode: 'en',
        question: ''
      },
      ruForm: {
        answer: '',
        languageCode: 'ru',
        question: ''
      }
    }
  },
  computed: {
    getList() {
      return this.$store.state.faq.items
    },
    editState() {
      return this.$store.state.faq.editable
    },
    editObject() {
      return this.$store.state.faq.editableItem
    },
    getCategories() {
      return this.$store.getters['faqCategory/getCategoryTitles']
    }
  },
  watch: {
    editObject(val) {
      this.additional.published = val.published
      this.additional.categoryId = val.categoryId
      if (this.editState) {
        this.setTranslations(val.translations)
      }
    }
  },
  async created() {
    try {
      await this.$store.dispatch('faq/GET_DATA')
      await this.$store.dispatch('faqCategory/GET_DATA')
    } catch (err) {
      console.log(err)
    }
  },
  methods: {
    async editClick(id) {
      await this.$store.dispatch('faq/GET_BY_ID', id)
    },
    async removeClick(id) {
      const conf = confirm('Are you sure to delete a slide?')
      if (!conf) return false
      try {
        await this.$store.dispatch('faq/REMOVE_ITEM', id)
        this.$notify({
          type: 'success',
          text: 'You have successfully deleted an item'
        })
      } catch (e) {
        console.log(e)
      }
    },
    async submitForm() {
      const translations = [
        {
          languageCode: 'ka',
          question: this.geoForm.question,
          answer: this.geoForm.answer
        },
        {
          languageCode: 'en',
          question: this.engForm.question,
          answer: this.engForm.answer
        },
        {
          languageCode: 'ru',
          question: this.ruForm.question,
          answer: this.ruForm.answer
        }
      ]
      const finalData = {
        body: {
          categoryId: this.additional.categoryId,
          published: this.additional.published,
          translations
        }
      }
      if (this.editState) {
        finalData.id = this.editObject.id
        try {
          await this.$store.dispatch('faq/UPDATE_ITEM', finalData)
          this.$notify({
            type: 'success',
            text: 'You have successfully updated an item'
          })
          this.restoreStoreObject()
        } catch (e) {
          this.$notify({
            type: 'error',
            text: 'Something went wrong'
          })
        }
      } else {
        try {
          await this.$store.dispatch('faq/ADD_ITEM', finalData.body)
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
        }
      }
    },
    setTranslations(translations) {
      translations.forEach((item) => {
        if (item.languageCode === 'ka') {
          this.geoForm.question = item.question
          this.geoForm.answer = item.answer
        } else if (item.languageCode === 'en') {
          this.engForm.question = item.question
          this.engForm.answer = item.answer
        } else if (item.languageCode === 'ru') {
          this.ruForm.question = item.question
          this.ruForm.answer = item.answer
        }
      })
    },
    restoreStoreObject() {
      this.$store.commit('faq/RESET_EDITABLE_ITEM')
      this.resetLocalState()
    },
    resetLocalState() {
      this.additional = {
        published: false,
        categoryId: undefined
      }
      this.geoForm = {
        answer: '',
        languageCode: 'ka',
        question: ''
      }
      this.engForm = {
        answer: '',
        languageCode: 'en',
        question: ''
      }
      this.ruForm = {
        answer: '',
        languageCode: 'ru',
        question: ''
      }
    }
  }
}
</script>
