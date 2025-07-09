export const API = {
  domain: 'http://localhost:3060', //DEV
  //   domain: "https://prod.api.beyondseed.com", //PRO

  endPoint: {
    // Auth routes
    login: '/api/auth/login',
    register: '/api/auth/register',

    // File conversion routes
    convertAndUpload: '/api/file/convertAndUpload',
    fetchAllPreviousConversions: '/api/file/fetchAllPreviousConversions',
    fetchAllStats: '/api/file/fetchAllStats',
  },
};
