import { Injectable } from '@angular/core';

import { environment } from './environment';

@Injectable()
export class EnvironmentService {

  constructor() { }

  isDev(): boolean {
    if (['mac', 'linux', 'devremote', 'stage'].includes(environment.envName)) {
      return true;
    } else {
      return false;
    }
  }

  getRootApiUrl(component: string) {
    if (component in environment) {
      const apiUrl: string = environment[component]['apiUrl'];
      return apiUrl.substring(0, apiUrl.length - 1);
    }
    console.error(`Unable to find component ${component}.`);
    return '';
  }

  getApiUrl(component: string, resource: string): string {
    if (component in environment) {
      if (resource in environment[component]['resources']) {
        return environment[component]['apiUrl'] + environment[component]['resources'][resource];
      }
    }
    console.error(`Unable to find resource ${resource} in component ${component}.`);
    return '';
  }

  getResourceUri(microservice: string, resource: string): string {
    if (microservice in environment) {
      if (resource in environment[microservice]['resources']) {
        return environment[microservice]['resources'][resource];
      }
    }
    console.error(`Unable to find resource ${resource} in component ${microservice}.`);
    return '';
  }

}