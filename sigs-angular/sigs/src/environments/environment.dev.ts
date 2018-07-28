// Environment for linux developers
import { baseEnvironment } from './base-environment';

export const environment = Object.assign({}, baseEnvironment);
environment.envName = 'dev';
environment.sigs.apiUrl = 'http://172.25.0.21:8000';

export const API_URLS = ['172.25.0.21:8000'];
