<template>
  <div>
    <input
      v-model="formData.emailFirst"
      class="main-input"
      placeholder="Email First"
    />
    <input
      v-model="formData.emailSecond"
      class="main-input"
      placeholder="Email Second"
    />
    <input
      v-model="formData.emailThird"
      class="main-input"
      placeholder="Email Third"
    />
    <input
      v-model="formData.phoneFirst"
      class="main-input"
      placeholder="Phone First"
    />
    <input
      v-model="formData.phoneSecond"
      class="main-input"
      placeholder="Phone Second"
    />
    <input
      v-model="formData.phoneThird"
      class="main-input"
      placeholder="Phone Third"
    />
    <input
      v-model="formData.facebook"
      class="main-input"
      placeholder="Facebook"
    />
    <input
      v-model="formData.instagram"
      class="main-input"
      placeholder="Instagram"
    />
    <input
      v-model="formData.additionalSocial"
      class="main-input"
      placeholder="Additional Social"
    />
  </div>
</template>
<script>
export default {
  name: 'ContactStatic',
  props: {
    formData: {
      type: Object,
      required: true
    }
  }
}
</script>
