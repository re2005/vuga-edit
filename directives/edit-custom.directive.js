import store from '../../../store';
import NewContentService from '../services/content.api.service';

const onClick = function (binding) {
    store.dispatch('updateCurrentElements', binding.value);
    store.dispatch('updateIsOpen', true);
};

export const EditCustom = {
    bind: function (el, binding, vnode) {
        binding.value.forEach(value => {
            let content = store.getters.getContentByKey(value);

            if (content === undefined && store.state.route.query.edit === 'true') {
                let contentConfig = {
                    value: '',
                    key: value,
                    type: store.state.route.query.actie || 'default'
                };

                NewContentService.addContent(contentConfig).then(data => {
                    store.dispatch('getContentFromApi');
                });
            }
        });

        if (store.state.route.query.edit === 'true') {
            el.setAttribute('class', 'v-edit-custom');

            el.addEventListener('click', () => {
                onClick(binding);
            });
        }
    }
};
