const state = {
  newCardsText: Array(4).fill({ isOpen: false, text: '' }),
  moveCardFormState: {
    prevColumnIndex: '',
    prevSeqNum: '',
    selectedColumnName: '',
    selectedPlace: '1'
  },
  modalState: {
    isOpen: false
  }
}
const mutations = {
  setNewCardText (state, { index, text, isOpen }) {
    console.log('I saved this  shit')
    state.newCardsText[index].text = text
    state.newCardsText[index].isOpen = isOpen
  },
  setMoveCardFormState (state, payload) {
    state.moveCardFormState = payload
  },
  setModalState (state, isOpen) {
    state.moveCardFormState = isOpen
  }
}
export default {
  namespaced: true,
  state,
  mutations
}
