<template>
  <div class="slider-items-container [ inner-padding ] ">
    <no-ssr>
      <draggable v-model="clonedSlides" draggable=".slider-item">
        <div
          v-for="(slide, slideIndex) in clonedSlides"
          :key="slideIndex"
          class="slider-item"
        >
          <div class="slider-item__col1">
            <div class="slider-item__images">
              <div
                v-for="(gallery, galleryIndex) in slide.gallery"
                :key="galleryIndex"
                class="slider-item__imagebox"
              >
                <img :src="`${gallery.name}`" />
              </div>
            </div>
            <div class="slider-item__body">
              <div class="slider-item__content">
                <p class="slider-item__content__key">title:</p>
                <p class="slider-item__content__title">
                  {{ slide.title }}
                </p>
              </div>
              <div class="slider-item__content">
                <p class="slider-item__content__key">description:</p>
                <p class="slider-item__content__title">
                  {{ slide.description }}
                </p>
              </div>
            </div>
          </div>
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
    // display: grid;
    // grid-template-columns: auto 1fr;
    // grid-gap: 2rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.15);
    margin: 1.5rem;
    padding: 1.5rem;
    position: relative;
    display: flex;
    &__col1 {
      flex: 1;
      margin-right: 20px;
    }
    &__content {
      display: grid;
      grid-template-columns: 100px 1fr;
      grid-column-gap: 1rem;
    }
    &__images {
      display: flex;
    }
    &__imagebox {
      height: 100px;
      &:not(:last-child) {
        margin-right: 20px;
      }
      img {
        height: 100%;
        max-width: 300px;
        object-fit: cover;
      }
    }
  }
}
</style>
