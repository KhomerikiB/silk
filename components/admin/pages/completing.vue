<template>
  <div class=" [ full ] ">
    <div class="[ grid-col-2 full ]">
      <div class=" [ scrollable inner-shadow ] ">
        <List :lists="getList" @editClick="editClick" />
      </div>
      <div class=" [ scrollable inner-shadow ] ">
        <ListEdit :form-data="form" @submitForm="submitForm" />
      </div>
    </div>
  </div>
</template>

<script>
import List from '@/components/admin/organisms/completing/list'
import ListEdit from '@/components/admin/organisms/completing/listEdit'

export default {
  name: 'Welcome',
  components: {
    List,
    ListEdit
  },
  data() {
    return {
      form: {
        geoTitle: '',
        engTitle: '',
        ruTitle: '',
        price: '',
        status: ''
      }
    }
  },
  computed: {
    getList() {
      return this.$store.state.completing.items
    },
    editState() {
      return this.$store.state.completing.editable
    },
    editObject() {
      return this.$store.state.completing.editableItem
    },
    editableKey() {
      return this.$store.state.completing.key
    }
  },
  watch: {
    editObject(val) {
      if (this.editState) {
        this.form.price = val.price
        this.form.status = val.status
        val.translations.forEach((item) => {
          if (item.languageCode === 'ka') this.form.geoTitle = item.title
          else if (item.languageCode === 'en') this.form.engTitle = item.title
          else if (item.languageCode === 'ru') this.form.ruTitle = item.title
        })
      }
    }
  },
  async created() {
    try {
      await this.$store.dispatch('completing/GET_COMPLETING_ITEMS')
    } catch (err) {
      console.log(err)
    }
  },
  methods: {
    async editClick(key) {
      await this.$store.dispatch('completing/GET_BY_ID', key)
    },
    async submitForm() {
      const translations = [
        {
          languageCode: 'ka',
          title: this.form.geoTitle
        },
        {
          languageCode: 'en',
          title: this.form.engTitle
        },
        {
          languageCode: 'ru',
          title: this.form.ruTitle
        }
      ]
      const finalData = {
        key: this.editableKey,
        body: {
          status: this.form.status,
          price: this.form.price,
          translations
        }
      }
      try {
        await this.$store.dispatch('completing/UPDATE_ITEM', finalData)
        this.restoreStoreObject()
        this.resetLocalState()
      } catch (e) {
        console.log(e)
      }
    },
    restoreStoreObject() {
      this.$store.commit('completing/RESET_EDITABLE_ITEM')
    },
    resetLocalState() {
      this.form = {
        geoTitle: '',
        engTitle: '',
        ruTitle: '',
        price: '',
        status: ''
      }
    }
  }
}
</script>
