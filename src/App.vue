<template>
  <div id="app">
    <NavBar/>
    <Error v-if="$store.state.error.error"/>
    <router-view />
  </div>
</template>

<script>
import Error from './components/Error'
import NavBar from './components/NavBar'
export default {
  name: 'App',
  data () {
    return {
    }
  },
  async mounted () {
    if (this.$store.getters['auth/authenticated']) {
      this.$store.dispatch('auth/refreshToken')
    } else {
      this.$router.replace({ name: 'login' })
    }
  },
  methods: {
  },
  components: {
    Error,
    NavBar
  }
}
</script>

<style scoped>
  body {
    background-color: #F0F0F0;
  }
  #app {
    margin: auto;
  }
</style>
