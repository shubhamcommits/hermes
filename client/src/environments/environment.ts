// DNS Details
const url = {
  protocol: `http`, // standard protocol
  domain: `localhost`, // your domain name where application is supposed to be visible
  websocket: `ws` // wss in case of https protocol, else pass ws here
}

export const environment = {
  production: false,
  BASE_URL: `${url.protocol}://${url.domain}:3000`,
  BASE_API_URL: `${url.protocol}://${url.domain}:3000/api/v1`,
  CD_BASE_HOST: `172.26.38.126`,
  CG_BASE_HOST: `172.25.64.209`,
  GA_BASE_HOST: `172.25.118.125`,
  KE_BASE_HOST: `172.23.7.102`,
  MG_BASE_HOST: `172.25.128.181`,
  MW_BASE_HOST: `172.26.128.101`,
  NE_BASE_HOST: `172.26.193.149`,
  NG_BASE_HOST: `172.24.6.215`,
  NGPSB_BASE_HOST: `172.24.30.11`,
  RW_BASE_HOST: `172.27.193.85`,
  SC_BASE_HOST: `172.25.192.170`,
  TD_BASE_HOST: `172.25.49.170`,
  TZ_BASE_HOST: `172.27.0.142`,
  UG_BASE_HOST: `172.27.98.166`,
  ZM_BASE_HOST: `172.27.128.119`,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
