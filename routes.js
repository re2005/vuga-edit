import Pages from './views/Pages';
import PageEditor from './views/PageEditor';

const routes = [
    {
        path: '/editor/:slug',
        name: 'Editor',
        component: PageEditor
    },
    {
        path: '/pages/:slug',
        name: 'Pages',
        component: Pages
    }
];

export default routes;
