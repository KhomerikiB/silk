<template>
  <div class=" [ full ] ">
    <div class="[ grid-col-2 full ]">
      <div class=" [ scrollable inner-shadow ] ">
        <Slides
          :slides="getSlides"
          :sort-items="sortItems"
          @editClick="editClick"
          @removeClick="removeClick"
        />
      </div>
      <div class=" [ scrollable inner-shadow ] ">
        <div class="[ inner-padding ]">
          <div class="[ flex-center flex-end ]">
            <button
              v-if="editState"
              class="edit "
              style="margin:2rem;"
              @click="restoreStoreObject"
            >
              Add New Item
            </button>
          </div>
          <DescForm :geo-form="geoForm" :eng-form="engForm" :ru-form="ruForm" />
          <no-ssr>
            <tabs :options="{ useUrlFragment: false }">
              <tab name="Image 1">
                <AddSlide :image-data="image1" :crop="true" :x="413" :y="536" />
              </tab>
              <tab name="Image 2">
                <AddSlide :image-data="image2" :crop="true" :x="413" :y="536" />
              </tab>
              <tab name="Image 3">
                <AddSlide :image-data="image3" :crop="true" :x="413" :y="536" />
              </tab>
            </tabs>
          </no-ssr>
          <div class=" [ inner-padding ] ">
            <button class="primary submit-btn" @click="submitForm">Save</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Slides from '@/components/admin/organisms/multiSlider/Slides'
import AddSlide from '@/components/admin/organisms/multiSlider/addImages'
import DescForm from '@/components/admin/organisms/multiSlider/descForm'

export default {
  name: 'Welcome',
  components: {
    Slides,
    AddSlide,
    DescForm
  },
  data() {
    return {
      geoForm: {
        title: '',
        description: '',
        languageCode: 'ka'
      },
      engForm: {
        title: '',
        description: '',
        languageCode: 'en'
      },
      ruForm: {
        title: '',
        description: '',
        languageCode: 'ru'
      },
      image1: {
        name: '',
        translations: [
          { languageCode: 'ka', alt: '' },
          { languageCode: 'en', alt: '' },
          { languageCode: 'ru', alt: '' }
        ]
      },
      image2: {
        name: '',
        translations: [
          { languageCode: 'ka', alt: '' },
          { languageCode: 'en', alt: '' },
          { languageCode: 'ru', alt: '' }
        ]
      },
      image3: {
        name: '',
        translations: [
          { languageCode: 'ka', alt: '' },
          { languageCode: 'en', alt: '' },
          { languageCode: 'ru', alt: '' }
        ]
      }
    }
  },
  computed: {
    getSlides() {
      return this.$store.state.multiSlider.items
    },
    editState() {
      return this.$store.state.multiSlider.editable
    },
    editObject() {
      return this.$store.state.multiSlider.editableItem
    }
  },
  watch: {
    editObject(val) {
      if (this.editState) {
        this.setImageData(val.gallery)
        this.setTextData(val.translations)
      }
    }
  },
  async created() {
    try {
      await this.$store.dispatch('multiSlider/GET_SLIDES')
    } catch (err) {
      console.log(err)
    }
  },
  methods: {
    async editClick(id) {
      await this.$store.dispatch('multiSlider/GET_BY_ID', id)
    },
    async removeClick(id) {
      const conf = confirm('Are you sure to delete a slide?')
      if (!conf) return false
      try {
        await this.$store.dispatch('multiSlider/DELETE_SLIDE', id)
      } catch (e) {
        console.log(e)
      }
    },
    async sortItems(value) {
      const sortIds = []
      value.map((item) => {
        sortIds.push(item.id)
      })
      try {
        await this.$store.dispatch('multiSlider/UPDATE_SORT', sortIds)
      } catch (e) {
        console.log(e)
      }
    },
    async submitForm() {
      delete this.image1.id
      delete this.image1.createDate
      delete this.image2.id
      delete this.image2.createDate
      delete this.image3.id
      delete this.image3.createDate
      const gallery = [this.image1, this.image2, this.image3]
      const translations = [this.geoForm, this.engForm, this.ruForm]
      const data = {
        body: {
          gallery,
          translations
        }
      }
      if (this.editState) {
        data.id = this.editObject.id
        try {
          await this.$store.dispatch('multiSlider/UPDATE_SLIDER', data)
          this.restoreStoreObject()
        } catch (e) {
          console.log(e)
        }
      } else {
        try {
          await this.$store.dispatch('multiSlider/ADD_SLIDER', data.body)
          this.resetLocalState()
        } catch (e) {
          console.log(e)
        }
      }
    },
    restoreStoreObject() {
      this.$store.commit('multiSlider/RESET_EDITABLE_ITEM')
      this.resetLocalState()
    },
    resetLocalState() {
      this.geoForm = {
        title: '',
        description: '',
        languageCode: 'ka'
      }
      this.engForm = {
        title: '',
        description: '',
        languageCode: 'en'
      }
      this.ruForm = {
        title: '',
        description: '',
        languageCode: 'ru'
      }
      this.image1 = {
        name: '',
        translations: [
          { languageCode: 'ka', alt: '' },
          { languageCode: 'en', alt: '' },
          { languageCode: 'ru', alt: '' }
        ]
      }
      this.image2 = {
        name: '',
        translations: [
          { languageCode: 'ka', alt: '' },
          { languageCode: 'en', alt: '' },
          { languageCode: 'ru', alt: '' }
        ]
      }
      this.image3 = {
        name: '',
        translations: [
          { languageCode: 'ka', alt: '' },
          { languageCode: 'en', alt: '' },
          { languageCode: 'ru', alt: '' }
        ]
      }
    },
    setImageData(array) {
      array.forEach((item, index) => {
        if (index === 0) this.image1 = item
        if (index === 1) this.image2 = item
        if (index === 2) this.image3 = item
      })
    },
    setTextData(array) {
      array.forEach((item) => {
        if (item.languageCode === 'ka') {
          this.geoForm.title = item.title
          this.geoForm.description = item.description
        } else if (item.languageCode === 'ru') {
          this.ruForm.title = item.title
          this.ruForm.description = item.description
        } else if (item.languageCode === 'en') {
          this.engForm.title = item.title
          this.engForm.description = item.description
        }
      })
    }
  }
}
</script>
