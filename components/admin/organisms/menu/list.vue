<template>
  <div class="list-container[ inner-padding ] ">
    <no-ssr>
      <table class="default-table">
        <tr>
          <th>Title</th>
          <th>Component Title</th>
          <th>Slug</th>
          <th>Nav</th>
        </tr>
        <tr v-for="(list, index) in lists" :key="index">
          <td>
            <p>{{ list.title }}</p>
          </td>
          <td>
            <p>{{ list.componentTitle }}</p>
          </td>
          <td>
            <p>{{ list.slug }}</p>
          </td>
          <td class="second-col">
            <button class="edit" @click="editItem(list.id)">edit</button>
          </td>
        </tr>
      </table>
    </no-ssr>
  </div>
</template>
<script>
export default {
  name: 'AdvantageData',
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
    }
  }
}
</script>
<style lang="scss" scoped>
.first-col {
  width: auto;
  p.key {
    color: #3a3a3a;
    font-size: 14px;
    margin: 5px 0;
  }
  p {
    margin: 0;
    margin-bottom: 20px;
  }
  .link {
    max-width: 500px;
    overflow: hidden;
    display: block;
  }
}
.second-col {
  width: 90px;
}
</style>
