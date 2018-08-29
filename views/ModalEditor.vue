<template>
    <div class="page-editor container">
        <div v-if="!this.pageData.key">
            <h2>
                This page "{{parameters.params.slug}}" does not exist
            </h2>
            <h3>
                Type: {{parameters.query.actie || 'Default'}}
            </h3>
            <Button @click="createPage">Create</Button>
        </div>
        <div v-if="this.pageData.key"
             class="page-content">
            <h1>Editing page: {{this.parameters.params.slug}}</h1>

            <h3>
                Type: {{parameters.query.actie || 'Default'}}
            </h3>

            <Button @click="savePage"
                    :disabled="hasChanges">Save
            </Button>

            <vue-editor v-if="pageData"
                        v-model="pageData.value"
                        :editorToolbar="customToolbar"
                        class="content"></vue-editor>
        </div>
    </div>
</template>

<script>
    import {VueEditor} from 'vue2-editor';
    import store from '@/store/store';
    import {mapGetters, mapActions, mapState} from 'vuex';
    import Button from '@/components/Generic/Button/Button';
    import ContentService from '../services/content.api.service';
    import _cloneDeep from 'lodash/cloneDeep';

    export default {
        name: 'ModalEditor',
        components: {
            VueEditor,
            Button
        },
        data() {
            return {
                pages: [],
                pageData: {},
                customToolbar: [
                    [{'header': [false, 1, 2, 3, 4, 5, 6]}],
                    ['bold', 'italic', 'underline', 'strike'],
                    [{'color': []}, {'background': []}],
                    [{'list': 'ordered'}, {'list': 'bullet'}],
                    ['image'],
                    ['link']
                ],
                initialContent: undefined
            };
        },
        created() {
            this.getPageFromAPi();
        },
        watch: {
            getPage(data) {
                this.pageData = _cloneDeep(data);
                this.initialContent = _cloneDeep(data);
            }
        },
        methods: {
            ...mapActions(['editPageKey']),
            savePage() {
                let newPage = _cloneDeep(this.pageData);
                this.editPageKey(newPage);
                this.initialContent = newPage;
                ContentService.editContent(newPage).then(data => {
                    // TODO Implement saved success
                    this.getPageFromAPi();
                });
            },
            createPage() {
                let page = {
                    key: this.parameters.params.slug,
                    value: this.htmlData,
                    type: store.state.route.query.actie
                };
                ContentService.addPage(page).then(() => {
                    this.getPageFromAPi();
                });
            },
            getPageFromAPi() {
                let data = {
                    param: store.state.route.query.actie,
                    slug: this.parameters.params.slug
                };
                store.dispatch('getPageBySlugFromApi', data);
            }
        },
        computed: {
            ...mapGetters([
                'getPageByKey',
                'getPages',
                'getPage'
            ]),
            ...mapState(['content']),
            parameters() {
                return store.state.route;
            },
            pageContent() {
                return this.getPageByKey(this.parameters.params.slug);
            },
            hasChanges() {
                return this.pageData.value === this.initialContent.value;
            }
        }
    };
</script>

<style scoped lang="scss">
    .page-content {
        width: 80%;
        height: 80%;

        Button {
            margin: 20px 0;
        }
    }

</style>
