import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    newTask: [],
    columns: [
      {
        id: '0',
        name: 'on hold',
        cards: [],
        color: 'orange'
      },
      {
        id: '1',
        name: 'in progress',
        cards: [],
        color: 'blue'
      },
      {
        id: '2',
        name: 'needs review',
        cards: [],
        color: 'pink'
      },
      {
        id: '3',
        name: 'approved',
        cards: [],
        color: 'green'
      }
    ]
  },
  mutations: {
    getCards (state, cards) {
      for (const card of cards) {
        const indexCol = card.row
        const column = state.columns[indexCol]
        column.cards.push(card)
      }
      for (const column of state.columns) {
        column.cards.sort((a, b) => a.seq_num - b.seq_num)
      }
    },
    addCard (state, card) {
      state.columns[card.row].cards.push(card)
    },
    removeCard (state, payload) {
      const columnIndex = payload.columnIndex
      const cardId = payload.cardId
      state.columns[columnIndex].cards = state.columns[columnIndex].cards.filter(value => value.id !== cardId)
    },
    moveCard (state, payload) {
      const previous = payload.previous
      const current = payload.current
      const card = state.columns[previous.columnIndex].cards[previous.cardIndex]
      state.columns[previous.columnIndex].cards.splice(previous.cardIndex, 1)
      state.columns[current.columnIndex].cards.splice(current.cardIndex, 0, card)
    }
  },
  actions: {
    async getCards ({ commit }) {
      const cards = (await Vue.axios.get('cards/')).data
      commit('getCards', cards)
    },
    async addCard ({ commit }, payload) {
      const data = {
        row: payload.columnIndex,
        text: payload.text
      }
      const card = (await Vue.axios.post('cards/', data)).data
      commit('addCard', card)
    },
    async removeCard ({ commit }, payload) {
      (await Vue.axios.delete(`cards/${payload.cardId}/`))
      commit('removeCard', payload)
    },
    async updateCard (context, { cardId, column, seqNum }) {
      const data = {
        row: column,
        seq_num: seqNum
      }
      await Vue.axios.patch(`cards/${cardId}/`, data)
    },
    updateColumn ({ dispatch, state }, { columnId }) {
      console.log(columnId)
      for (const [index, card] of state.columns[columnId].cards.entries()) {
        dispatch('updateCard', { seqNum: index, cardId: card.id, column: columnId })
      }
    }

  },
  getters: {

  }
})
