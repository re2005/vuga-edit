import store from '../../../store';
import ContentService from '../services/content.api.service';

const onClick = function (elementData) {
    store.dispatch('updateCurrentElement', elementData);
    store.dispatch('updateIsOpen', true);
};

const makeElementData = function (content, el, binding) {
    return {
        id: content.id,
        key: binding.value,
        resource_uri: content.resource_uri,
        value: el.innerHTML
    };
};

const applyElementContent = function (el, binding, content) {
    if (content === undefined && store.state.route.query.edit === 'true') {
        let contentConfig = {
            value: el.innerHTML,
            key: binding.value,
            type: store.state.route.query.actie || 'default'
        };
        ContentService.addContent(contentConfig).then(data => {
            store.dispatch('getContentFromApi');
        });
    } else {
        if (!content) return;
        let regex = / target="_blank/g;
        el.innerHTML = content.value.replace(regex, '');
    }
};

export const Edit = {
    bind: function (el, binding, vnode) {
        let content = store.getters.getContentByKey(binding.value);

        let previousContent;

        store.subscribe((mutation, state) => {
            if (mutation.type === 'updateContentKeys') {
                content = store.getters.getContentByKey(binding.value);
                previousContent = content;
                applyElementContent(el, binding, content);
            }

            if (mutation.type === 'updateCurrentElement') {
                if (mutation.payload.key === content.key) {
                    if (el.innerHTML !== mutation.payload.value) {
                        el.innerHTML = mutation.payload.value;
                        previousContent = mutation.payload;
                    }
                }
            }
        });

        if (store.state.route.query.edit === 'true') {
            el.setAttribute('contenteditable', 'true');

            el.addEventListener('click', () => {
                let elementData = makeElementData(content, el, binding);
                onClick(elementData);
            });

            el.addEventListener('blur', () => {
                let elementData = makeElementData(content, el, binding);
                if (previousContent.value !== elementData.value) {
                    previousContent = elementData;
                    ContentService.editContent(elementData);
                    store.dispatch('editContentKey', elementData);
                }
            });
        }
    }
};
