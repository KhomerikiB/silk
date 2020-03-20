<template>
  <div class=" [ full ] ">
    <div class="[ grid-col-2 full ]">
      <div class=" [ scrollable inner-shadow ] ">
        <Slides
          :slides="getSlides"
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
                <AddSlide :image-data="image1" :crop="true" :x="490" :y="667" />
              </tab>
              <tab name="Image 2">
                <AddSlide :image-data="image2" :crop="true" :x="493" :y="372" />
              </tab>
              <tab name="Image 3">
                <AddSlide :image-data="image3" :crop="true" :x="490" :y="667" />
              </tab>
            </tabs>
          </no-ssr>
          <input
            v-model="additional.area"
            type="text"
            class="main-input"
            placeholder="Area"
            style="margin-top:20px;"
          />
          <input
            v-model="additional.room"
            type="text"
            class="main-input"
            placeholder="Room"
          />
          <div>
            <label>
              Type
              <select v-model="additional.type">
                <option
                  v-for="(typeData, index) in staticType"
                  :key="index"
                  :value="typeData"
                  >{{ typeData }}</option
                >
              </select>
            </label>
          </div>
          <div>
            <label>
              Publish:
              <input v-model="additional.published" type="checkbox" />
            </label>
          </div>
          <button class="primary submit-btn" @click="submitForm">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Slides from '@/components/admin/organisms/apartments/Slides'
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
      staticType: ['studio', 'bedroom1', 'bedroom2', 'bedroom3'],
      additional: {
        area: '',
        room: '',
        published: false,
        type: ''
      },
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
      },
      type: ''
    }
  },
  computed: {
    getSlides() {
      return this.$store.state.apartments.items
    },
    editState() {
      return this.$store.state.apartments.editable
    },
    editObject() {
      return this.$store.state.apartments.editableItem
    }
  },
  watch: {
    editObject(val) {
      if (this.editState) {
        this.additional.area = val.area
        this.additional.room = val.room
        this.additional.type = val.type
        this.additional.published = val.published
        this.setImageData(val.images)
        this.setTextData(val.translations)
      }
    }
  },
  async created() {
    try {
      await this.$store.dispatch('apartments/GET_SLIDES')
    } catch (err) {
      console.log(err)
    }
  },
  methods: {
    async editClick(id) {
      await this.$store.dispatch('apartments/GET_BY_ID', id)
    },
    async removeClick(id) {
      const conf = confirm('Are you sure to delete a slide?')
      if (!conf) return false
      try {
        await this.$store.dispatch('apartments/DELETE_SLIDE', id)
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
      const images = [this.image1, this.image2, this.image3]
      const translations = [this.geoForm, this.engForm, this.ruForm]
      const data = {
        body: {
          area: parseFloat(this.additional.area),
          room: parseInt(this.additional.room),
          published: this.additional.published,
          type: this.additional.type,
          gallery: [],
          images,
          translations
        }
      }
      if (this.editState) {
        data.id = this.editObject.id
        try {
          await this.$store.dispatch('apartments/UPDATE_SLIDER', data)
          this.restoreStoreObject()
        } catch (e) {
          console.log(e)
        }
      } else {
        try {
          await this.$store.dispatch('apartments/ADD_SLIDER', data.body)
          this.resetLocalState()
        } catch (e) {
          console.log(e)
        }
      }
    },
    restoreStoreObject() {
      this.$store.commit('apartments/RESET_EDITABLE_ITEM')
      this.resetLocalState()
    },
    resetLocalState() {
      this.additional = {
        area: '',
        room: '',
        published: false,
        type: ''
      }
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
