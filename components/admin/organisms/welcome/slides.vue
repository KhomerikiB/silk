<template>
  <div class="slider-items-container [ inner-padding ] ">
    <no-ssr>
      <draggable v-model="clonedSlides" draggable=".slider-item">
        <div
          v-for="(slide, slideIndex) in clonedSlides"
          :key="slideIndex"
          class="slider-item"
        >
          <div class="sort-btn">sort</div>
          <div class="slider-item__imagebox">
            <img :src="`${staticUrl}${slide.image.name}`" />
          </div>
          <tabs :options="{ useUrlFragment: false }">
            <tab
              v-for="(translate, translateIndex) in slide.image.translations"
              :key="translateIndex"
              :name="translate.languageCode"
            >
              <div class="slider-item__title">
                <span class="slider-item__key">Title: </span
                ><span>{{ translate.title }}</span>
              </div>
              <div class="slider-item__desc">
                <span class="slider-item__key">Description: </span>
                <span class="slider-item__desc__text">{{
                  translate.description
                }}</span>
              </div>
              <div class="slider-item__alt">
                <span class="slider-item__key">image alt:</span>
                <span>{{ translate.alt }}</span>
              </div>
            </tab>
          </tabs>
          <div class="slider-item__nav">
            <button class="edit" @click="editItem(slide.id)">Edit</button>
            <button class="remove" @click="removeItem(slide.id)">Remove</button>
          </div>
        </div>
      </draggable>
    </no-ssr>
  </div>
</template>
<script>
export default {
  name: 'WelcomeSlides',
  props: {
    slides: {
      type: Array,
      default: () => [],
      required: true
    },
    sortItems: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      clonedSlides: []
    }
  },
  watch: {
    slides(value) {
      this.clonedSlides = value
    },
    clonedSlides(items) {
      if (items !== this.slides) {
        this.sortItems(items)
      }
    }
  },
  methods: {
    removeItem(id) {
      this.$emit('removeClick', id)
    },
    editItem(id) {
      this.$emit('editClick', id)
    }
  }
}
</script>
<style lang="scss" scoped>
.slider-items-container {
  background-color: #fff;
  box-shadow: 0px 3px 7px rgba(0, 0, 0, 0.25);
  .slider-item {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-gap: 2rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.15);
    margin: 1.5rem;
    padding: 1.5rem;
    position: relative;
    &__desc {
      &__text {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }

    &__imagebox {
      height: 100px;
      img {
        height: 100%;
        max-width: 300px;
        object-fit: cover;
      }
    }
  }
}
</style>
