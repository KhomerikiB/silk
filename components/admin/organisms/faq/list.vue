<template>
  <div class="list-container[ inner-padding ] ">
    <no-ssr>
      <table class="default-table">
        <tr>
          <th>QA</th>
          <th>Nav</th>
        </tr>
        <tr v-for="(list, listIndex) in lists" :key="listIndex">
          <td>
            <p>{{ list.question }}</p>
            <p>{{ list.answer }}</p>
          </td>
          <td style="width:190px">
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
