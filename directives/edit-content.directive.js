import store from '@/store/store';
import NewContentService from '../services/content.api.service';
import _cloneDeep from 'lodash/cloneDeep';
import _clone from 'lodash/clone';

export const EditContent = {
    inserted: function (el, binding, vnode) {
        let content = store.getters.getContentByKey(binding.value);
        let previousContent = _clone(content);

        store.subscribe((mutation, state) => {
            if (mutation.type === 'updateContentKeys') {
                content = store.getters.getContentByKey(binding.value);
                previousContent = _clone(content);

                if (content === undefined && store.state.route.query.edit === 'true') {
                    let contentConfig = {
                        value: el.innerHTML,
                        key: binding.value,
                        type: store.state.route.query.actie || 'default'
                    };
                    NewContentService.addContent(contentConfig).then(data => {
                        store.dispatch('getContentFromApi');
                    });
                } else {
                    if (!content) return;
                    el.innerHTML = content.value;
                }
            }
        });

        if (store.state.route.query.edit === 'true') {
            el.setAttribute('contenteditable', 'true');
            el.removeAttribute('disabled');

            el.addEventListener('mouseover', function () {
                el.focus();
            });

            el.addEventListener('blur', function (event) {
                let contentConfig = {
                    id: content.id,
                    key: binding.value,
                    resource_uri: content.resource_uri,
                    value: el.innerHTML,
                    type: store.state.route.query.actie || 'default'
                };

                if (previousContent.value !== el.innerHTML) {
                    previousContent.value = _cloneDeep(el.innerHTML);
                    NewContentService.editContent(contentConfig);
                    store.dispatch('editContentKey', contentConfig);
                }
            });

            el.addEventListener('click', function (event) {
                event.preventDefault();
                event.stopImmediatePropagation();
                event.stopPropagation();
                store.dispatch('updateIsOpen', false);
            });

            // if (binding.value === undefined) Logger.info('Content directive missing value:', el);
        }
    }
};
