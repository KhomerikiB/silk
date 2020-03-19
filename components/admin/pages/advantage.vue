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
          :form-data="formData"
          :show-reset="editState"
          @saveForm="saveForm"
          @restoreStore="restoreStoreObject"
        />
      </div>
    </div>
  </div>
</template>

<script>
import FormTable from '@/components/admin/organisms/advantage/table'
import EditTab from '@/components/admin/organisms/advantage/editTab'
export default {
  name: 'Advantage',
  components: {
    FormTable,
    EditTab
  },
  data() {
    return {
      formData: {
        geoText: '',
        engText: '',
        ruText: ''
      }
    }
  },
  computed: {
    getList() {
      return this.$store.state.advantage.items
    },
    editState() {
      return this.$store.state.advantage.editable
    },
    editObject() {
      return this.$store.state.advantage.editableItem
    }
  },
  watch: {
    editObject(val) {
      if (this.editState) {
        this.setEditableDataToForm(val.translations)
      } else {
        console.log('reset Form')
      }
    }
  },
  async created() {
    try {
      await this.$store.dispatch('advantage/GET_DATA')
    } catch (e) {
      console.log(e)
    }
  },
  methods: {
    editItem(id) {
      this.$store.dispatch('advantage/GET_BY_ID', id)
    },
    setEditableDataToForm(translations) {
      translations.forEach((item) => {
        if (item.languageCode === 'ka') {
          this.formData.geoText = item.text
        } else if (item.languageCode === 'en') {
          this.formData.engText = item.text
        } else if (item.languageCode === 'ru') {
          this.formData.ruText = item.text
        }
      })
    },
    async removeItem(id) {
      const conf = confirm('Are you sure to delete a item?')
      if (!conf) return false
      try {
        await this.$store.dispatch('advantage/REMOVE_ITEM', id)
      } catch (e) {
        console.log(e)
      }
    },
    async saveForm() {
      const translations = [
        {
          languageCode: 'ka',
          text: this.formData.geoText
        },
        {
          languageCode: 'en',
          text: this.formData.engText
        },
        {
          languageCode: 'ru',
          text: this.formData.ruText
        }
      ]
      if (this.editState) {
        const finalData = {
          id: this.editObject.id,
          translations
        }
        try {
          await this.$store.dispatch('advantage/UPDATE_ITEM', finalData)
          this.restoreStoreObject()
        } catch (e) {
          console.log(e)
        }
      } else {
        try {
          await this.$store.dispatch('advantage/ADD_ITEM', translations)
        } catch (e) {
          console.log(e)
        }
      }
    },
    restoreStoreObject() {
      this.$store.commit('advantage/RESET_EDITABLE_ITEM')
      this.restoreLocaleState()
    },
    restoreLocaleState() {
      this.formData = {
        geoText: '',
        engText: '',
        ruText: ''
      }
    }
  }
}
</script>
