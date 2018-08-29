import 'whatwg-fetch';
import configService from '../services/config.service';

const getComponentsApiService = {

    makeApiUrl() {
        let url = configService.getApiUrl();
        return url + '/api/components/';
    },

    makeApiUrlEdit() {
        return configService.getApiUrl();
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
