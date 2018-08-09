<template>
    <div class="editor"
         :class="{'is-open': getIsOpen}"
         v-if="isEditMode">

        <h2>
            Vuga eD
        </h2>

        <h6 v-if="parameters">
            Personalization: {{parameters}}
        </h6>

        <div v-if="getIsOpen">
            <div v-if="getCurrentElements.length > 0">

                <h5>Multiple keys element</h5>
                <div v-for="(element, index) in elementsArray"
                     :key="index">
                    {{element.key}}:<br>
                    <input v-model="element.value"
                           class="input"/>
                </div>

                <Button @click="saveElements"
                        class="button">save
                </Button>

                <Button @click="closeEditor"
                        variant="secondary"
                        class="button close">close
                </Button>
            </div>

            <div v-if="getCurrentElement.key">

                <Button @click="closeEditor"
                        variant="secondary"
                        class="button close">close
                </Button>

                <Button @click="saveElement"
                        :disabled="htmlData === getCurrentElement.value"
                        class="button">save
                </Button>

                <h6>
                    Element key: {{getCurrentElement.key}}
                </h6>

                <div>
                    <label for="elements">
                        Add Element
                    </label>
                    <select v-model="currentElementAdded"
                            id="elements">
                        <option disabled value="">Select</option>
                        <option v-for="(element, index) in elementMap"
                                :key="index"
                                :value="element.name">{{element.name}}
                        </option>
                    </select>

                    <div v-if="currentElementAdded==='Image'"
                         class="block">
                        url: <input v-model="imageUrl"/>
                    </div>

                    <Button @click="addElement"
                            :disabled="!currentElementAdded">add
                    </Button>
                </div>

                <Button @click="editHtml"
                        variant="secondary">
                    <span v-show="!showHtml">show html</span>
                    <span v-show="showHtml">hide html</span>
                </Button>

                <Button @click="showHtmlEditor = !showHtmlEditor"
                        variant="secondary">
                    <span v-show="!showHtmlEditor">show editor</span>
                    <span v-show="showHtmlEditor">hide editor</span>
                </Button>

                <div class="code-markup">
                    <textarea v-model="htmlData"
                              rows="20"
                              cols="60"
                              v-if="showHtml">
                    </textarea>

                    <vue-editor v-model="htmlData"
                                v-if="showHtmlEditor"
                                :editorToolbar="customToolbar"></vue-editor>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import { VueEditor } from 'vue2-editor';
    import { mapGetters, mapActions } from 'vuex';
    import store from '../../../store';
    import NewContentService from '../services/content.api.service';
    import Button from './Button';
    import _cloneDeep from 'lodash/cloneDeep';

    export default {
        name: 'vuga-editor',
        components: {
            VueEditor,
            Button
        },
        computed: {
            ...mapGetters([
                'getIsOpen',
                'getCurrentElement',
                'getCurrentElements',
                'getContentByKey'
            ]),
            parameters () {
                return store.state.route.query.actie;
            },
            isEditMode () {
                return store.state.route.query.edit;
            }
        },
        mounted () {
            this.htmlData = this.getCurrentElement.value;
            this.elementsArray = [];
            this.mountElements();
        },
        methods: {
            mountElements () {
                this.getCurrentElements.forEach(data => {
                    this.addInputKey(this.getContentByKey(data));
                });
            },
            ...mapActions([
                'updateIsOpen',
                'updateCurrentElement',
                'updateCurrentElements',
                'updateSaveCurrentElement'
            ]),
            closeEditor () {
                this.updateIsOpen(false);
                this.updateCurrentElement({});
                this.updateCurrentElements([]);
                this.elementsArray = [];
            },
            makeImageUrl (value) {
                return value.replace('REPLACE', this.imageUrl);
            },
            addElement () {
                let currentElementContent = this.getCurrentElement.value;
                let currentElement = this.getCurrentElement;
                let content = this.elementMap.filter(element => element.name === this.currentElementAdded)[0];
                content.type === 'image' ? currentElementContent += this.makeImageUrl(content.value) : currentElementContent += content.value;
                this.updateCurrentElement({key: currentElement.key, value: currentElementContent});
                this.htmlData = currentElementContent;

                let contentConfig = {
                    id: currentElement.id,
                    key: currentElement.key,
                    resource_uri: currentElement.resource_uri,
                    value: currentElementContent,
                    type: store.state.route.query.actie
                };
                NewContentService.editContent(contentConfig);
                store.dispatch('editContentKey', contentConfig);
            },
            saveElement () {
                let currentElementContent = this.htmlData;
                let currentElement = this.getCurrentElement;
                let contentConfig = {
                    id: currentElement.id,
                    key: currentElement.key,
                    resource_uri: currentElement.resource_uri,
                    value: currentElementContent,
                    type: store.state.route.query.actie
                };
                NewContentService.editContent(contentConfig);
                store.dispatch('editContentKey', contentConfig);
                this.updateCurrentElement({key: contentConfig.key, value: contentConfig.value});
            },
            saveElements () {
                this.elementsArray.forEach(element => {
                    let newElement = _cloneDeep(element);
                    NewContentService.editContent(newElement);
                    store.dispatch('editContentKey', newElement);
                });
            },
            editHtml () {
                this.showHtml = !this.showHtml;
            },
            addInputKey (elementKey) {
                const newElement = _cloneDeep(elementKey);
                this.elementsArray.push(newElement);
            }
        },
        watch: {
            'getCurrentElement': function (data) {
                this.htmlData = data.value;
            },
            'getCurrentElements': function (data) {
                this.mountElements();
            }
        },
        data () {
            return {
                elementsArray: [],
                imageUrl: '',
                htmlData: this.getCurrentElement,
                currentElementAdded: '',
                showHtml: false,
                showHtmlEditor: true,
                customToolbar: [
                    [{'header': [false, 1, 2, 3, 4, 5, 6]}],
                    ['bold', 'italic', 'underline', 'strike'],
                    [{'color': []}, {'background': []}],
                    [{'list': 'bullet'}],
                    ['image'],
                    ['link']
                ],
                elementMap: [
                    {
                        value: '<h1>EditMe h1</h1>',
                        name: 'H1',
                        type: 'text'
                    },
                    {
                        value: '<h2>EditMe h2</h2>',
                        name: 'H2',
                        type: 'text'
                    },
                    {
                        value: '<ul class="ordered-list"><li>EditMe list</li></ul>',
                        name: 'Ordered list',
                        type: 'list'
                    },
                    {
                        value: '<img src="REPLACE"/>',
                        name: 'Image',
                        type: 'image'
                    }
                ]
            };
        }
    };
</script>

<style scoped lang="scss">

    $font-size-base: 1rem;

    h1, h2, h3, h4, h5, h6 {
        margin: 10px 0;
    }

    .input {
        padding: 4px;
        width: 100%;
        margin-bottom: 10px;
    }

    .code-markup {
        display: block;
    }

    .editor {
        width: 500px;
        z-index: 999;
        background: rgba(255, 255, 255, .95);
        position: fixed;
        right: 0;
        top: 25px;
        overflow: auto;
        padding: 10px 20px;
        box-shadow: 0 0 10px rgba(0, 0, 0, .4);
        transform: translateX(60%);
        transition: all 0.3s ease;

        &.is-open {
            transform: none;
            height: 80%;
        }

        .button {
            padding: 6px 10px;
            font-size: $font-size-base;
            display: inline-block;
        }

    }

    label {
        display: block;
    }

    .button {
        display: block;
        margin: 20px 0;
    }

    .block {
        display: block;
    }

    .close {
        float: right;
    }

</style>
