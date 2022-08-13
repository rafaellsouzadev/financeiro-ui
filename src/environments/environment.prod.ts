export const environment = {
  production: true,
  apiUrl: 'https://financeiro-api-v2.herokuapp.com',
  tokenAllowedDomains: [ /financeiro-api-v2.herokuapp.com/ ],
  tokenDisallowedRoutes: [/\/oauth\/token/],
};
