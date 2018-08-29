import Pages from './views/Pages';
// import Components from './views/Components';
import ModalEditor from './views/ModalEditor';
import PageEditor from './views/PageEditor';

const routes = [
    {
        path: '/modal-editor/:slug',
        name: 'Editor',
        component: ModalEditor
    },
    {
        path: '/pages/:slug',
        name: 'Pages',
        component: Pages
    },
    {
        path: '/page-editor/:slug',
        name: 'PageEditor',
        component: PageEditor
    }
];

export default routes;
