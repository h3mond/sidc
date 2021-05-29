const accountRoot = '/account';
const authRoot = '/auth';
const projectRoot = '/project';

export const routes = {
  auth: {
    root: authRoot,
    login: `${authRoot}/login`,
  },
  account: {
    root: accountRoot,
    create: `${accountRoot}/create`,
    verify: `${accountRoot}/verify`,
  },
  project: {
    root: projectRoot,
    create: `${projectRoot}/create`,
    all: `${projectRoot}/all`,
    one: `${projectRoot}/one`,
  },
};
