<template>
    <div>
        <vue-horizontal-list :items="columns" class="kanban">
            <template v-slot:default="{item}">
                <Column :headColor="item.color">
                    <template v-slot:head>
                        {{item.name}} ({{item.cards.length}})
                    </template>
                    <template class="kanban__tasks" v-slot:tasks>
                        <draggable :list="item.cards" group="tasks" @move='check(item)'
                                   @change="updateColumn($event, item)">
                            <Task @click.native="showModal(card.id)" @removeCard='removeCard(item.id, card.id)'
                                  :id="card.id" :key="card.id" :text="card.text" v-for="card in item.cards"
                                  class="kanban__task"></Task>
                        </draggable>
                        <AddCardForm @addCard='addCard($event, item.id)'></AddCardForm>
                    </template>
                </Column>
            </template>
        </vue-horizontal-list>
        <modal class="kanban__modal" :name="'modal'" :adaptive='true'>
            <MoveCardForm @close='closeModal' :card-id="cardToMoveId"></MoveCardForm>
        </modal>
    </div>
</template>

<script>
import draggable from 'vuedraggable'
import Column from './Column'
import Task from './Task'
import AddCardForm from './AddCardForm'
import { mapState } from 'vuex'
import store from '../store'
import Vue from 'vue'
import MoveCardForm from './MoveCardForm'
import VueHorizontalList from 'vue-horizontal-list'

export default {
  components: {
    AddCardForm,
    Task,
    draggable,
    Column,
    VueHorizontalList,
    MoveCardForm
  },
  data () {
    return {
      options: {
        responsive: [
          { end: 576, size: 1 },
          { start: 576, end: 768, size: 2 },
          { start: 768, end: 992, size: 3 },
          { size: 4 }
        ],
        list: {
          windowed: 1200,
          padding: 24
        }
      },
      cardToMoveId: ''
    }
  },
  async mounted () {
    Vue.axios.defaults.baseURL = 'https://trello.backend.tests.nekidaem.ru/api/v1/'
    const data = {
      username: 'user',
      password: 'user123123'
    }
    const response = await Vue.axios.post('users/login/', data)
    const newToken = response.data.token
    Vue.axios.defaults.headers.common.Authorization = 'JWT ' + newToken
    store.dispatch('getCards')
  },
  methods: {
    addCard () {
      const text = arguments[0]
      const columnIndex = arguments[1]
      this.$store.dispatch('addCard', { text, columnIndex })
    },
    removeCard (index, cardId) {
      const payload = { columnIndex: index, cardId }
      this.$store.dispatch('removeCard', payload)
    },
    updateColumn: function () {
      const columnId = arguments[1].id
      this.$store.dispatch('updateColumn', { columnId })
    },
    showModal (cardId) {
      this.cardToMoveId = cardId
      this.$modal.show('modal')
    },
    closeModal () {
      this.$modal.hide('modal')
    }

  },
  computed: mapState(
    [
      'columns'
    ]
  )
}
</script>

<style scoped>
    .kanban {

        overflow: hidden;
    }

    .kanban__task {
        width: 95%;
        margin-left: 0.25em;
        margin-top: 1em;
        margin-bottom: 1em;
    }

    .kanban__modal {
        z-index: 2;
    }

</style>
