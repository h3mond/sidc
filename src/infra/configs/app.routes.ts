const accountRoot = '/account';
const authRoot = '/auth';

export const routes = {
  account: {
    root: accountRoot,
    create: `${accountRoot}/create`,
  },
  auth: {
    root: authRoot,
    login: `${authRoot}/login`,
  },
};
