const state = {
    isOpen: false,
    currentElement: '<p>Ranatex</p>',
    currentElements: [],
    saveCurrentElement: false,
    elements: {}
};

const getters = {
    getIsOpen: state => state.isOpen,
    getCurrentElement: state => state.currentElement,
    getCurrentElements: state => state.currentElements,
    saveCurrentElement: state => state.saveCurrentElement
};

const actions = {
    updateIsOpen({commit}, value) {
        commit('updateIsOpen', value);
    },
    updateCurrentElement({commit}, value) {
        commit('updateCurrentElement', value);
        commit('updateElementByKey', value);
    },
    updateCurrentElements({commit}, value) {
        commit('updateCurrentElements', value);
    },
    updateSaveCurrentElement({commit}, value) {
        commit('updateSaveCurrentElement', value);
    },
    updateElementByKey({commit}, data) {
        commit('updateElementByKey', data);
    }
};

const mutations = {
    updateIsOpen(state, value) {
        state.isOpen = value;
    },
    updateCurrentElement(state, value) {
        state.currentElement = value;
    },
    updateCurrentElements(state, value) {
        state.currentElements = value;
    },
    updateSaveCurrentElement(state, value) {
        state.saveCurrentElement = value;
    },
    updateElementByKey(state, data) {
        state.elements[data.key] = data.value;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
