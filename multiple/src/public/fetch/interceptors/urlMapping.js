import { urlDictionary } from '../data/urlDictionary';

export function requestInterceptor(config) {
    const url = urlDictionary[config.url];
    config.url = url || config.url;
    return config;
}

