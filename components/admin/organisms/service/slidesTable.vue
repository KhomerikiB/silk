<template>
  <div class="list-container[ inner-padding ] ">
    <no-ssr>
      <table class="default-table">
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Nav</th>
        </tr>
        <tr v-for="(list, index) in lists" :key="index">
          <td>{{ list.title }}</td>
          <td>{{ list.description }}</td>
          <td style="width:190px;">
            <button class="edit" @click="editItem(list.id)">edit</button>
            <button class="remove" @click="removeItem(list.id)">remove</button>
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
    editItem(id) {
      this.$emit('editClick', id)
    },
    removeItem(id) {
      this.$emit('removeClick', id)
    }
  }
}
</script>
<style lang="scss" scoped></style>
