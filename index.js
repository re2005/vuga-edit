import Editor from './components/Editor';
import LinkEditor from './components/Link';
import ContentStore from './store/content';
import EditorStore from './store/editor';
import {Edit} from './directives/edit.directive';
import {EditContent} from './directives/edit-content.directive';
import {EditCustom} from './directives/edit-custom.directive';
import {EditImage} from './directives/edit-image.directive';
import routes from './routes';

export default function install(Vue, options = {}, router = null, store = null) {
    options = {...options};

    Vue.component('vugaEditor', Editor);
    Vue.component('linkEditor', LinkEditor);
    Vue.directive('edit', Edit);
    Vue.directive('content', EditContent);
    Vue.directive('editCustom', EditCustom);
    Vue.directive('editImage', EditImage);

    if (store) {
        store.registerModule('contentNew', ContentStore);
        store.registerModule('editorNew', EditorStore);
        // store.dispatch('getPagesFromApi');
    }

    if (router) {
        router.addRoutes(routes);
    }

    if (typeof window !== 'undefined' && typeof window.Vue !== 'undefined') {
        window.Vue.use(install);
    }
}
