<template>
    <div class="page container">

        <div v-if="!getPage.key">
            <h2>
                This page "{{parameters.params.slug}}" does not exist.
            </h2>
            <h3>
                Type: {{parameters.query.actie || 'Default'}}
            </h3>
            <a :href="'editor/'+parameters.params.slug+'?actie='+parameters.query.actie">
                Go to the Editor to create it...</a>
        </div>

        <div v-if="getPage"
             v-html="getPage.value">
        </div>
    </div>
</template>

<script>
    import store from '../../../store';
    import { mapGetters, mapActions } from 'vuex';

    export default {
        name: 'Page',
        data () {
            return {
                pageData: undefined
            };
        },
        computed: {
            ...mapGetters(['getPageByKey', 'getPage']),
            ...mapActions(['getPageBySlugFromApi']),
            parameters () {
                return store.state.route;
            },
            pageContent () {
                return this.getPageByKey(this.parameters.params.slug);
            }
        },
        created () {
            let data = {
                param: store.state.route.query.actie,
                slug: this.parameters.params.slug
            };
            store.dispatch('getPageBySlugFromApi', data);
        }
    };
</script>
