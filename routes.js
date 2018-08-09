import Pages from './views/Pages';
import Components from './views/Components';
import PageEditor from './views/PageEditor';

const routes = [
    {
        path: '/editor/:slug',
        name: 'Editor',
        component: PageEditor
    },
    {
        path: '/components/',
        name: 'Components',
        component: Components
    },
    {
        path: '/pages/:slug',
        name: 'Pages',
        component: Pages
    }
];

export default routes;
