const wcfmmpPrefix = '/wp-json/wcfmmp/v1';
export default {
  token: '/wp-json/jwt-auth/v1/token/',
  validate: '/wp-json/jwt-auth/v1/token/validate',
  deliveries: `${wcfmmpPrefix}/deliveries`,
  orders: `${wcfmmpPrefix}/orders`,
  notifications: `${wcfmmpPrefix}/notifications`,
  capabilities: `${wcfmmpPrefix}/restricted-capabilities`,
  siteDetails: `${wcfmmpPrefix}/site-details`
}