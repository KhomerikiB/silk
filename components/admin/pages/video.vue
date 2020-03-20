<template>
  <div class="[ flex-center ]">
    <div>
      <Form
        :geo-form="geoForm"
        :eng-form="engForm"
        :ru-form="ruForm"
        @editForm="editForm"
      />
      <input
        v-model="additional.videoUrl"
        type="text"
        class="main-input"
        placeholder="Video url"
        style="margin-top:20px;"
      />
      <Cropper :x="285" :y="196" :on-crop="imageSrc" />
      <div v-if="additional.name" class="thumbnail-box">
        <img :src="staticUrl + additional.name" />
      </div>
      <button class="primary" @click="editForm">Edit</button>
    </div>
  </div>
</template>

<script>
import Cropper from '@/components/admin/molecules/cropper'
import Form from '@/components/admin/organisms/video/form'
export default {
  name: 'Video',
  components: {
    Form,
    Cropper
  },
  data() {
    return {
      additional: {
        videoUrl: '',
        name: ''
      },
      geoForm: {
        languageCode: 'ka',
        title: '',
        alt: ''
      },
      engForm: {
        languageCode: 'en',
        title: '',
        alt: ''
      },
      ruForm: {
        langaugeCode: 'ru',
        title: '',
        alt: ''
      }
    }
  },
  computed: {
    translations() {
      return this.$store.state.video.item
    }
  },
  watch: {
    translations(val) {
      this.additional.videoUrl = val.video
      this.additional.name = val.image.name
      val.translations.forEach((item) => {
        if (item.languageCode === 'ka') {
          this.geoForm.title = item.title
        } else if (item.languageCode === 'en') {
          this.engForm.title = item.title
        } else if (item.languageCode === 'ru') {
          this.ruForm.title = item.title
        }
      })
      val.image.translations.forEach((item) => {
        if (item.languageCode === 'ka') {
          this.geoForm.alt = item.alt
        } else if (item.languageCode === 'en') {
          this.engForm.alt = item.alt
        } else if (item.languageCode === 'ru') {
          this.ruForm.alt = item.alt
        }
      })
    }
  },
  async created() {
    try {
      await this.$store.dispatch('video/GET_DATA')
    } catch (e) {
      console.log(e)
    }
  },
  methods: {
    async editForm() {
      const finalData = {
        video: this.additional.videoUrl,
        image: {
          name: this.additional.name,
          translations: [this.geoForm, this.engForm, this.ruForm]
        },
        translations: [
          {
            languageCode: 'ka',
            title: this.geoForm.title
          },
          {
            languageCode: 'en',
            title: this.engForm.title
          },
          {
            languageCode: 'ru',
            title: this.ruForm.title
          }
        ]
      }
      console.log(finalData.image.translations)
      try {
        await this.$store.dispatch('video/UPDATE_DATA', finalData)
      } catch (e) {
        console.log(e)
      }
    },
    imageSrc(url) {
      this.additional.name = url
    }
  }
}
</script>
<style lang="scss" scoped>
.thumbnail-box {
  margin-top: 20px;
  width: 400px;
  img {
    max-width: 100%;
  }
}
</style>
