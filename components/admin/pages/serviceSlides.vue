<template>
  <div class=" [ full ] ">
    <div class="[ grid-col-2 full ]">
      <div class=" [ scrollable inner-shadow ] ">
        <SlidesTable
          :lists="getList"
          @editClick="editSlide"
          @removeClick="removeItem"
        />
      </div>
      <div class=" [ scrollable inner-shadow ] ">
        <SlidesForm
          :geo-form="geoForm"
          :eng-form="engForm"
          :ru-form="ruForm"
          :show-reset="editState"
          @restoreStore="restoreStoreObject"
          @submitForm="saveForm"
        />
      </div>
    </div>
  </div>
</template>

<script>
import SlidesTable from '@/components/admin/organisms/service/slidesTable'
import SlidesForm from '@/components/admin/organisms/service/slidesForm'

export default {
  name: 'Advantage',
  components: {
    SlidesTable,
    SlidesForm
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
        languageCode: 'ru',
        title: '',
        description: ''
      }
    }
  },
  computed: {
    getList() {
      return this.$store.state.serviceSlides.items
    },
    editState() {
      return this.$store.state.serviceSlides.editable
    },
    editObject() {
      return this.$store.state.serviceSlides.editableItem
    }
  },
  watch: {
    editObject(val) {
      if (this.editState) {
        this.setEditableDataToForm(val.translations)
      }
    }
  },
  async created() {
    try {
      await this.$store.dispatch('serviceSlides/GET_SLIDES')
    } catch (e) {
      console.log(e)
    }
  },
  methods: {
    async editSlide(id) {
      try {
        await this.$store.dispatch('serviceSlides/GET_SLIDE_BY_ID', id)
      } catch (e) {
        console.log(e)
      }
    },
    setEditableDataToForm(translations) {
      translations.forEach((item) => {
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
    },
    async removeItem(id) {
      const conf = confirm('Are you sure to delete a item?')
      if (!conf) return false
      try {
        await this.$store.dispatch('serviceSlides/REMOVE_ITEM', id)
      } catch (e) {
        console.log(e)
      }
    },
    async saveForm() {
      const translations = [this.geoForm, this.engForm, this.ruForm]
      if (this.editState) {
        const finalData = {
          id: this.editObject.id,
          translations
        }
        try {
          await this.$store.dispatch('serviceSlides/UPDATE_ITEM', finalData)
          this.restoreStoreObject()
        } catch (e) {
          console.log(e)
        }
      } else {
        try {
          await this.$store.dispatch('serviceSlides/ADD_ITEM', translations)
          this.restoreStoreObject()
        } catch (e) {
          console.log(e)
        }
      }
    },
    restoreStoreObject() {
      this.$store.commit('serviceSlides/RESET_EDITABLE_ITEM')
      this.restoreLocaleState()
    },
    restoreLocaleState() {
      this.geoForm = {
        languageCode: 'ka',
        title: '',
        description: ''
      }
      this.engForm = {
        languageCode: 'en',
        title: '',
        description: ''
      }
      this.ruForm = {
        languageCode: 'ru',
        title: '',
        description: ''
      }
    }
  }
}
</script>
