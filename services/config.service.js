class ConfigService {
    constructor() {
        this.components = [];
        this.apiUrl = undefined;
    }

    addComponents(components) {
        this.components = components;
    }

    getComponents() {
        return this.components;
    }

    setApiUrl(apiUrl) {
        this.apiUrl = apiUrl;
    }

    getApiUrl() {
        return this.apiUrl;
    }
}

const componentInstance = new ConfigService();

export default componentInstance;
