<template>
  <div class="slider-items-container [ inner-padding ] ">
    <div
      v-for="(list, listIndex) in lists"
      :key="listIndex"
      class="slider-item"
    >
      <div class="slider-item__imagebox">
        <img :src="`${list.image.name}`" />
      </div>
      <div class="slider-item__body">
        <div class="slider-item__content">
          <p class="slider-item__content__key">alt:</p>
          <p class="slider-item__content__title">
            {{ list.image.alt }}
          </p>
        </div>
        <div class="slider-item__content">
          <p class="slider-item__content__key">url:</p>
          <p class="slider-item__content__title">
            {{ list.url }}
          </p>
        </div>
      </div>
      <div class="slider-item__nav">
        <button class="edit" @click="editItem(list.id)">Edit</button>
        <button class="remove" @click="removeItem(list.id)">Remove</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'WelcomeSlides',
  props: {
    lists: {
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
      &__title {
        white-space: nowrap;
        overflow: hidden;
      }
    }

    &__imagebox {
      height: 100px;
      img {
        height: 100%;
        max-width: 150px;
        object-fit: cover;
      }
    }
  }
}
</style>
