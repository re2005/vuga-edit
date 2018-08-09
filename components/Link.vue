<template>
    <a :href="url"
       @click="edit"
       data-link="true">
        {{text}}
    </a>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';
    import store from '../../../store';
    import ContentService from '../services/content.api.service';

    export default {
        name: 'linkEditor',
        props: {
            apiKeyText: {
                type: String,
                required: true
            },
            apiKeyUrl: {
                type: String,
                required: true
            }
        },
        computed: {
            ...mapGetters([
                'getContentByKey'
            ]),
            text() {
                return this.getContentByKey(this.apiKeyText).value;
            },
            url() {
                return this.getContentByKey(this.apiKeyUrl).value;
            },
            isEditMode() {
                return store.state.route.query.edit;
            }
        },
        mounted() {
            let text = store.getters.getContentByKey(this.apiKeyText).value;
            let url = store.getters.getContentByKey(this.apiKeyUrl).value;

            if (text) {
                this.createLink(this.apiKeyText);
            }
            if (url) {
                this.createLink(this.apiKeyUrl);
            }
        },
        methods: {
            edit() {
                this.updateCurrentElements([this.apiKeyText, this.apiKeyUrl]);
                store.dispatch('updateIsOpen', true);
            },
            createLink(key) {
                let contentConfig = {
                    value: 'default',
                    key: key,
                    type: store.state.route.query.actie || 'default'
                };

                ContentService.addContent(contentConfig).then(data => {
                    store.dispatch('getContentFromApi');
                });
            },
            ...mapActions([
                'updateIsOpen',
                'updateCurrentElements'
            ])
        }
    };
</script>
