<template>
  <div id="secure">
    <Kanban></Kanban>
  </div>
</template>

<script>
import Kanban from '../components/Kanban'

export default {
  name: 'KanbanPage',
  data () {
    return {}
  },
  components: {
    Kanban
  },
  beforeRouteEnter (to, from, next) {
    if (!localStorage.token) {
      next({ name: 'login' })
    } else next()
  },
  mounted () {
  }
}
</script>

<style scoped>
  #secure {
    margin-top: 10px;
  }
</style>
