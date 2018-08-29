<template>
    <div class="page">

        <div class="edit">
            <h1>Template</h1>
            <button @click="saveData()"
                    class="btn btn-primary"
                    :disabled="hasChanges">save
            </button>
        </div>

        <div class="body">
            <ul>
                <draggable v-model="components">
                    <transition-group>

                        <li v-for="(element, index) in components"
                            :key="index">

                            <component :is="element"
                                       :key="index">
                            </component>
                        </li>
                    </transition-group>
                </draggable>
            </ul>
        </div>

    </div>
</template>

<script>
    import getComponentsService from '../services/get-components.service';
    import draggable from 'vuedraggable';
    import store from '@/store/store';
    import {mapActions} from 'vuex';

    export default {
        name: 'Components',
        data() {
            return {
                components: [],
                initialComponents: [],
                data: {}
            };
        },
        computed: {
            hasChanges() {
                return this.initialComponents === this.components;
            }
        },
        methods: {
            ...mapActions(['getDefaultOffer']),
            saveData() {
                let value = this.components.map(component => component.name).join(',');
                let data = {
                    url: this.data.resource_uri,
                    value: value,
                    key: store.state.route.params.slug
                };
                getComponentsService.saveComponents(data);
                this.initialComponents = this.components;
            }
        },
        created() {
            getComponentsService.getCatPageArray().then(data => {
                this.data = data.objects[0];
                let componentsArray = this.data.value.replace(/\s/g, '').split(',');
                this.components = getComponentsService.getCatPageComponents(componentsArray);
                this.initialComponents = this.components;
            });
        },
        components: {
            draggable
        }
    };
</script>

<style scoped lang="scss">
    @import "../../../styles/imports";

    .edit {
        float: right;
        width: 600px;
        background: $color-gray-10;
        padding: 20px;
        margin-top: 110px;

    }

    .body {
        width: 900px;
        height: 100%;
        overflow: scroll;
        position: absolute;
        left: 0;
    }

    .container {
        height: 100%;
        position: relative;
    }

    li {
        background: $color-blue-20;
        margin: 10px 0;
        padding: 10px;
        cursor: move;
    }

    button {
        margin-right: 20px;
    }
</style>
