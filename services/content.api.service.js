import 'whatwg-fetch';
import configService from '../services/config.service';

const NewContentApi = {

    makeContentApiUrl() {
        let url = configService.getApiUrl();
        return url + '/api/content/';
    },

    makePageApiUrl() {
        let url = configService.getApiUrl();
        return url + '/api/page/';
    },

    makeFetchCallWithParameter(url, type = null, slug) {
        if (type) url.searchParams.append('type', type);
        if (slug) url.searchParams.append('key', slug);
        return fetch(url).then(response => response.json());
    },

    getPages(type) {
        let url = new URL(this.makePageApiUrl());
        return this.makeFetchCallWithParameter(url, type);
    },

    getPageBySlug(parameter = 'default', slug) {
        let url = new URL(this.makePageApiUrl());
        return this.makeFetchCallWithParameter(url, parameter, slug);
    },

    getContent(type) {
        let url = new URL(this.makeContentApiUrl());
        return this.makeFetchCallWithParameter(url, type);
    },

    addContent(content) {
        return fetch(this.makeContentApiUrl(), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(content)
        });
    },

    addPage(page) {
        return fetch(this.makePageApiUrl(), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(page)
        });
    },

    editContent(content) {
        return fetch('http://127.0.0.1:8000' + content.resource_uri, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(content)
        });
    }
};

export default NewContentApi;
