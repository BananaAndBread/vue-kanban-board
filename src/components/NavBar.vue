<template>
  <div>
    <nav>
      <div>
        <b-navbar type="dark" variant="dark">
          <b-navbar-nav>
            <b-navbar-brand>Kanban</b-navbar-brand>
            <b-nav-item v-if="showLogout" to="/login" v-on:click="logout()" replace>Logout</b-nav-item>
          </b-navbar-nav>
        </b-navbar>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  methods:
    {
      logout () {
        this.$store.dispatch('auth/logout')
        this.$router.replace({ name: 'login' })
      }
    },
  data () {
    return {
      showLogout: Boolean(localStorage.token)
    }
  },
  watch: {
    $route (to, from) {
      this.showLogout = Boolean(localStorage.token)
    }
  }
}
</script>

<style>
</style>
