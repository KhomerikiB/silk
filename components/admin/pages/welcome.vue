<template>
  <div class=" [ full ] ">
    <div class="[ grid-col-2 full ]">
      <div class=" [ scrollable inner-shadow ] ">
        <Slides
          :slides="getSlides"
          :sort-items="sortItems"
          @editClick="editClick"
          @removeClick="removeClick"
        />
      </div>
      <div class=" [ scrollable inner-shadow ] ">
        <AddSlides />
      </div>
    </div>
  </div>
</template>

<script>
import Slides from '@/components/admin/organisms/welcome/Slides'
import AddSlides from '@/components/admin/organisms/welcome/addSlides'

export default {
  name: 'Welcome',
  components: {
    Slides,
    AddSlides
  },
  computed: {
    getSlides() {
      return this.$store.state.welcome.items
    }
  },
  async created() {
    try {
      await this.$store.dispatch('welcome/GET_WELCOME_SLIDES')
    } catch (err) {
      console.log(err)
    }
  },
  methods: {
    editClick(id) {
      this.$store.commit('welcome/SET_EDITABLE_ITEM', id)
    },
    async removeClick(id) {
      try {
        const conf = confirm('Are you sure to delete a slide?')
        if (!conf) return false
        await this.$store.dispatch('welcome/REMOVE_SLIDER', id)
      } catch (e) {
        console.log(e)
      }
    },
    async sortItems(value) {
      const sortIds = []
      value.map((item) => {
        sortIds.push(item.id)
      })
      try {
        await this.$store.dispatch('welcome/UPDATE_SORT', sortIds)
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
