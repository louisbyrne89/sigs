// Default environment

export const baseEnvironment: { [index: string]: any } = {
    envName: 'base',
    production: false,
    sigs: {
      apiUrl: 'http://172.25.0.21:8000',
      resources: {
        daily_global_irradiance: '/api/daily_global_irradiance/',
      }
    },
  };
  
  export const API_URLS = ['172.25.0.21:8000'];
  