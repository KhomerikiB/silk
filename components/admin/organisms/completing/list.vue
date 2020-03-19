<template>
  <div class="list-container[ inner-padding ] ">
    <no-ssr>
      <table class="default-table">
        <tr>
          <th>Title</th>
          <th>Price</th>
          <th>Status</th>
          <th>Nav</th>
        </tr>
        <tr v-for="(list, index) in lists" :key="index">
          <td>{{ list.title }}</td>
          <td>{{ list.price }}</td>
          <td>{{ list.status }}</td>
          <td>
            <button class="edit" @click="editItem(list.key)">edit</button>
          </td>
        </tr>
      </table>
    </no-ssr>
  </div>
</template>
<script>
export default {
  name: 'WelcomeSlides',
  props: {
    lists: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  methods: {
    editItem(key) {
      this.$emit('editClick', key)
    }
  }
}
</script>
<style lang="scss" scoped></style>
