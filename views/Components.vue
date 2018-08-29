<template>
    <div class="page container">
        <button @click="saveData()" class="btn btn-primary">save</button>

        <ul>
            <draggable v-model="components">
                <transition-group>

                    <li v-for="(element, index) in components"
                        :key="index">
                        {{element}}
                    </li>
                </transition-group>
            </draggable>
        </ul>
    </div>
</template>

<script>
    import getComponentsService from '../services/get-components.service';
    import draggable from 'vuedraggable';

    export default {
        name: 'Components',
        data() {
            return {
                components: [],
                data: {}
            };
        },
        methods: {
            saveData() {
                let data = {
                    url: this.data.resource_uri,
                    value: this.components.toString()
                };
                getComponentsService.saveComponents(data);
            }
        },
        created() {
            getComponentsService.getCatPageArray().then(data => {
                this.data = data.objects[0];
                this.components = this.data.value.replace(/\s/g, '').split(',');
            });
        },
        components: {
            draggable
        }
    };
</script>

<style scoped lang="scss">
    @import "../../../styles/imports";

    .container {
        display: flex;
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
