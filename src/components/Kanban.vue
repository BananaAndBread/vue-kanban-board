<template>
    <div class="kanban">
        <div :key="index" v-for="(column, index) in columns" class="kanban__column">
            <Column :headColor="column.color">
                <template v-slot:head>
                    {{column.name}} ({{column.cards.length}})
                </template>
                <template class="kanban__tasks" v-slot:tasks>
                    <draggable :list="column.cards" group="tasks" :move="checkMove">
                    <Task @removeCard='removeCard(index, card.id)' :id="card.id" :key="card.id" :text="card.text" v-for="card in column.cards" class="kanban__task"></Task>
                    </draggable>
                    <AddCardForm @addCard = 'addCard($event, index)'></AddCardForm>
                </template>

            </Column>
        </div>
        </div>
</template>

<script>
    import draggable from "vuedraggable"
    import Column from "./Column";
    import Task from "./Task";
    import AddCardForm from "./AddCardForm";
    import { mapState } from 'vuex';
    import store from "../store";
    import Vue from "vue";
    export default {
        components: {
            AddCardForm,
            Task,
            draggable,
            Column
        },
        data() {
            return {
            }
        },
        async mounted() {
            Vue.axios.defaults.baseURL = 'https://trello.backend.tests.nekidaem.ru/api/v1/';
            const data = {
                username: 'user',
                password: 'user123123'
            };
            let response = await Vue.axios.post('users/login/', data);
            const newToken = response.data.token;
            console.log(newToken)
            Vue.axios.defaults.headers.common['Authorization'] = "JWT "+ newToken;
            console.log(response)
            store.dispatch('getCards')
        },
        methods: {
            addCard () {
                const text = arguments[0];
                const columnIndex = arguments[1]
                this.$store.dispatch("addCard", {text, columnIndex})
            },
            removeCard(index, cardId){
                console.log(cardId + " to remove")
                let payload = {columnIndex: index, cardId}
                this.$store.dispatch('removeCard', payload)
            },
            checkMove: function(){
                console.log(arguments)
                // this.$store.dispatch('updateCard', payload)
            }
        },
        computed: mapState(
            [
                'columns'
            ]
        )
    }
</script>

<style>
    .kanban{
        display: flex;
        justify-content: space-evenly;
    }
    .kanban__task{
        width: 95%;
        margin-left: 0.25em;
        margin-top: 1em;
        margin-bottom: 1em;
    }

</style>
