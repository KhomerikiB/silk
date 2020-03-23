<template>
  <div class="slider-items-container [ inner-padding ] ">
    <no-ssr>
      <draggable v-model="clonedSlides" draggable=".slider-item">
        <div
          v-for="(slide, slideIndex) in clonedSlides"
          :key="slideIndex"
          class="slider-item"
        >
          <span class="sort">sort</span>
          <div class="slider-item__imagebox">
            <img :src="`${slide.image.name}`" />
          </div>
          <div class="slider-item__body">
            <div class="slider-item__content">
              <p class="slider-item__content__key">Fullname:</p>
              <p class="slider-item__content__title">
                {{ slide.fullname }}
              </p>
            </div>
            <div class="slider-item__content">
              <p class="slider-item__content__key">Status:</p>
              <p class="slider-item__content__title">
                {{ slide.status }}
              </p>
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
  .slider-item {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-gap: 2rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.15);
    margin: 1.5rem;
    padding: 1.5rem;
    position: relative;
    .sort {
      position: absolute;
      top: 0;
      right: 0;
      cursor: pointer;
    }
    &__content {
      display: grid;
      grid-template-columns: 100px 1fr;
      grid-column-gap: 1rem;
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
