import 'whatwg-fetch';

const getComponentsApiService = {

    makeApiUrl() {
        return '//localhost:8000/api/components/';
    },

    makeApiUrlEdit() {
        return '//localhost:8000';
    },

    getComponents() {
        return fetch(this.makeApiUrl()).then(response => response.json());
    },

    saveComponent(data) {
        return fetch(this.makeApiUrlEdit() + data.url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    },

    addComponents(components) {
        return fetch(this.makeApiUrl(), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(components)
        });
    }

};

export default getComponentsApiService;
