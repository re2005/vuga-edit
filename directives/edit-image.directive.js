import store from '../../../store';
import NewContentService from '../services/content.api.service';

const onClick = function (binding) {
    store.dispatch('updateCurrentElements', [binding.value]);
    store.dispatch('updateIsOpen', true);
};

export const EditImage = {
    bind: function (el, binding, vnode) {
        let content = store.getters.getContentByKey(binding.value);

        store.subscribe((mutation, state) => {
            if (mutation.type === 'updateContentKeys') {
                content = store.getters.getContentByKey(binding.value);
                if (content === undefined && store.state.route.query.edit === 'true') {
                    let contentConfig = {
                        value: el.src,
                        key: binding.value,
                        type: store.state.route.query.actie || 'default'
                    };
                    NewContentService.addContent(contentConfig).then(data => {
                        store.dispatch('getContentFromApi');
                    });
                } else {
                    if (!content) return;
                    el.src = content.value;
                }
            }
        });

        if (store.state.route.query.edit === 'true') {
            el.setAttribute('class', 'v-edit-custom');

            el.addEventListener('click', () => {
                onClick(binding);
            });

            store.subscribe((mutation) => {
                if (mutation.type === 'editContentKeys') {
                    if (mutation.payload.key === content.key) {
                        el.src = mutation.payload.value;
                    }
                }
            });
        }
    }
};
