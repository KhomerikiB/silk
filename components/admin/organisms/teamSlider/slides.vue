<template>
  <div class="slider-items-container [ inner-padding ] ">
    <div
      v-for="(slide, slideIndex) in slides"
      :key="slideIndex"
      class="slider-item"
    >
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
