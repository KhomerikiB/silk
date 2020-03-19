<template>
  <div class="list-container[ inner-padding ] ">
    <no-ssr>
      <table class="default-table">
        <tr>
          <th>Description</th>
          <th>Nav</th>
        </tr>
        <tr v-for="(list, index) in lists" :key="index">
          <td class="first-col">
            <p class="key">Title:</p>
            <p>{{ list.title }}</p>
            <p class="key">Description:</p>
            <p>{{ list.description }}</p>
            <p class="key">Link:</p>
            <a :href="list.link" class="link">{{ list.link }}</a>
          </td>
          <td class="second-col">
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
    },
    removeItem(id) {
      this.$emit('removeClick', id)
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
  width: 190px;
}
</style>
