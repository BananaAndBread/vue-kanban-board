<template>
  <div id="app">
    <nav>
      <div>
        <b-navbar type="dark" variant="dark">
          <b-navbar-nav>
            <b-navbar-brand>Kanban</b-navbar-brand>
            <b-nav-item v-if="getToken()" to="/login" v-on:click="logout()" replace>Logout</b-nav-item>
        </b-navbar-nav>
        </b-navbar>
      </div>
      <Error v-if="$store.state.error.error"/>
    </nav>
    <router-view />
  </div>
</template>

<script>
import Error from './components/Error'
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
    logout () {
      this.$store.dispatch('auth/logout')
      this.$router.replace({ name: 'login' })
    },
    getToken () {
      return localStorage.token
    }
  },
  components: {
    Error
  }
}
</script>

<style>
  body {
    background-color: #F0F0F0;
  }
  h1 {
    padding: 0;
    margin-top: 0;
  }
  #app {
    margin: auto;
  }
</style>
