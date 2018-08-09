import ContentApi from '../services/content.api.service';

const state = {
    apiData: {},
    contentKeys: [],
    pages: [],
    page: {}
};

const getters = {
    getPage: state => state.page,
    getPages: state => state.pages,
    getValueForKey: state => {
        return key => {
            return state.apiData[key];
        };
    },
    getContentByKey: state => key => state.contentKeys.find(content => content.key === key),
    getPageByKey: state => key => state.pages.find(content => content.key === key),
    getContentKeys: state => state.contentKeys
};

const actions = {
    updateKey({commit}, data) {
        commit('updateKey', data);
    },
    updatePage({commit}, data) {
        commit('updatePage', data);
    },
    getPagesFromApi({commit, state, rootState}) {
        let type = rootState.route.query.actie;
        return ContentApi.getPages(type).then(data => {
            commit('updatePages', data.objects);
            return data;
        });
    },
    getPageBySlugFromApi({commit}, config) {
        return ContentApi.getPageBySlug(config.param, config.slug).then(data => {
            if (data.objects.length === 0) return;
            commit('updatePage', data.objects[0]);
            return data;
        });
    },
    getContentFromApi({commit, state, rootState}) {
        let type = rootState.route.query.actie;
        ContentApi.getContent(type).then(data => {
            commit('updateContentKeys', data.objects);
        });
    },
    addContentKey({commit}, object) {
        commit('addContentKeys', object);
    },
    editContentKey({commit}, object) {
        commit('editContentKeys', object);
    },
    editPageKey({commit}, object) {
        commit('editPageKey', object);
    }
};

const mutations = {
    updatePage(state, data) {
        state.page = Object.assign(data);
    },
    updatePages(state, data) {
        state.pages = data;
    },
    updateContent(state, data) {
        state.apiData = data;
    },
    updateKey(state, data) {
        state.apiData[data.key] = data.value;
    },
    updateContentKeys(state, data) {
        state.contentKeys = data;
    },
    addContentKeys(state, data) {
        state.contentKeys.push(data);
    },
    editContentKeys(state, newContent) {
        let newObject = state.contentKeys.filter(content => content.key !== newContent.key);
        newObject.push(newContent);
        state.contentKeys = newObject;
    },
    editPageKey(state, newPage) {
        let selectedPage = state.pages.find(page => page.key === newPage.key);
        if (!selectedPage) return;
        selectedPage.value = newPage.value;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
