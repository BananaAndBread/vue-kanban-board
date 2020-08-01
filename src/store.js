import Vuex from 'vuex'
import Vue from 'vue'
// import cards from "../mocks/cards";
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        newTask: [],
        columns: [
            {
                name: 'on hold',
                cards: [],
                color: 'orange'
            },
            {
                name:'in progress',
                cards: [],
                color: 'blue'
            },
            {
                name:'needs review',
                cards: [],
                color: 'pink',
            },
            {
                name:'approved',
                cards: [],
                color: 'green',
            }
        ]
    },
    mutations: {
        getCards(state, cards){
            console.log("get to start")
            for (const card of cards) {
                const indexCol = card["row"];
                const column = state.columns[indexCol];
                column['cards'].push(card)
            }
            for (const column of state.columns) {
                column['cards'].sort((a, b)=> a["seq_num"] - b["seq_num"])
            }
        },
        addCard(state, card){
            state.columns[card['row']].cards.push(card)
        },
        removeCard(state, payload){
            const columnIndex = payload["columnIndex"];
            const cardId = payload["cardId"];
            state.columns[columnIndex].cards = state.columns[columnIndex].cards.filter(value => value.id!==cardId)
        }
    },
    actions: {
        async getCards({commit}){
            let cards = (await Vue.axios.get('cards/')).data
            commit("getCards", cards)
        },
        // eslint-disable-next-line no-unused-vars
        async addCard({commit}, payload){
            const  data = {
                    "row": payload.columnIndex,
                    "text": payload.text
                };
            let card = (await Vue.axios.post('cards/', data)).data
            commit("addCard", card)

        },
        async removeCard({commit}, payload){
            (await Vue.axios.delete(`cards/${payload['cardId']}/`)).data
            commit("removeCard", payload)
        },
        // eslint-disable-next-line no-unused-vars
        updateCard({commit}) {

        }

    },
    getters: {

    }
})

