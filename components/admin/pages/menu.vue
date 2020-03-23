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
          v-if="editState"
          :geo-form="geoForm"
          :eng-form="engForm"
          :ru-form="ruForm"
          :additional="additional"
          :show-reset="editState"
          @saveForm="saveForm"
          @restoreStore="restoreStoreObject"
        />
      </div>
    </div>
  </div>
</template>

<script>
import FormTable from '@/components/admin/organisms/menu/list'
import EditTab from '@/components/admin/organisms/press/editTab'
export default {
  name: 'Advantage',
  components: {
    FormTable,
    EditTab
  },
  data() {
    return {
      additional: {
        slug: ''
      },
      geoForm: {
        languageCode: 'ka',
        title: '',
        componentTitle: ''
      },
      engForm: {
        languageCode: 'en',
        title: '',
        componentTitle: ''
      },
      ruForm: {
        languageCode: 'ru',
        title: '',
        componentTitle: ''
      }
    }
  },
  computed: {
    getList() {
      return this.$store.state.menu.items
    },
    editState() {
      return this.$store.state.menu.editable
    },
    editObject() {
      return this.$store.state.menu.editableItem
    }
  },
  watch: {
    editObject(val) {
      this.additional.slug = val.slug
      if (this.editState) {
        this.setEditableDataToForm(val.translations)
      }
    }
  },
  async created() {
    try {
      await this.$store.dispatch('menu/GET_DATA')
    } catch (e) {
      console.log(e)
    }
  },
  methods: {
    editItem(id) {
      this.$store.dispatch('menu/GET_BY_ID', id)
    },
    setEditableDataToForm(translations) {
      translations.forEach((item) => {
        if (item.languageCode === 'ka') {
          this.geoForm.title = item.title
          this.geoForm.componentTitle = item.componentTitle
        } else if (item.languageCode === 'en') {
          this.engForm.title = item.title
          this.engForm.componentTitle = item.componentTitle
        } else if (item.languageCode === 'ru') {
          this.ruForm.title = item.title
          this.ruForm.componentTitle = item.componentTitle
        }
      })
    },
    async removeItem(id) {
      const conf = confirm('Are you sure to delete a item?')
      if (!conf) return false
      try {
        await this.$store.dispatch('press/REMOVE_ITEM', id)
      } catch (e) {
        console.log(e)
      }
    },
    async saveForm() {
      const translations = [this.geoForm, this.engForm, this.ruForm]
      const data = {
        slug: this.additional.slug,
        translations
      }
      if (this.editState) {
        const finalData = {
          id: this.editObject.id,
          body: data
        }
        try {
          await this.$store.dispatch('menu/UPDATE_ITEM', finalData)
          this.restoreStoreObject()
        } catch (e) {
          console.log(e)
        }
      }
    },
    restoreStoreObject() {
      this.$store.commit('menu/RESET_EDITABLE_ITEM')
      this.restoreLocaleState()
    },
    restoreLocaleState() {
      this.additional.slug = ''
      this.geoForm = {
        languageCode: 'ka',
        title: '',
        componentTitle: ''
      }
      this.engForm = {
        languageCode: 'en',
        title: '',
        componentTitle: ''
      }
      this.ruForm = {
        languageCode: 'ru',
        title: '',
        componentTitle: ''
      }
    }
  }
}
</script>
