<template>
  <div class=" [ full ] ">
    <div class="[ grid-col-2 full ]">
      <div class=" [ scrollable inner-shadow ] ">
        <FormTable
          :lists="getList"
          @editClick="editItem"
          @removeClick="removeItem"
        />
      </div>
      <div class=" [ scrollable inner-shadow ] ">
        <EditTab
          :geo-form="geoForm"
          :eng-form="engForm"
          :ru-form="ruForm"
          :link="link"
          :show-reset="editState"
          @saveForm="saveForm"
          @restoreStore="restoreStoreObject"
        />
      </div>
    </div>
  </div>
</template>

<script>
import FormTable from '@/components/admin/organisms/press/table'
import EditTab from '@/components/admin/organisms/press/editTab'
export default {
  name: 'Advantage',
  components: {
    FormTable,
    EditTab
  },
  data() {
    return {
      link: {
        value: ''
      },
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
      return this.$store.state.offer.items
    },
    editState() {
      return this.$store.state.offer.editable
    },
    editObject() {
      return this.$store.state.offer.editableItem
    }
  },
  watch: {
    editObject(val) {
      this.link.value = val.link
      if (this.editState) {
        this.setEditableDataToForm(val.translations)
      }
    }
  },
  async created() {
    try {
      await this.$store.dispatch('offer/GET_DATA')
    } catch (e) {
      console.log(e)
    }
  },
  methods: {
    editItem(id) {
      this.$store.dispatch('offer/GET_BY_ID', id)
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
        await this.$store.dispatch('offer/REMOVE_ITEM', id)
      } catch (e) {
        console.log(e)
      }
    },
    async saveForm() {
      const translations = [this.geoForm, this.engForm, this.ruForm]
      const data = {
        link: this.link.value,
        translations
      }
      if (this.editState) {
        const finalData = {
          id: this.editObject.id,
          body: data
        }
        try {
          await this.$store.dispatch('offer/UPDATE_ITEM', finalData)
          this.restoreStoreObject()
        } catch (e) {
          console.log(e)
        }
      } else {
        try {
          await this.$store.dispatch('offer/ADD_ITEM', data)
          this.restoreLocaleState()
        } catch (e) {
          console.log(e)
        }
      }
    },
    restoreStoreObject() {
      this.$store.commit('offer/RESET_EDITABLE_ITEM')
      this.restoreLocaleState()
    },
    restoreLocaleState() {
      this.link.vaue = ''
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
