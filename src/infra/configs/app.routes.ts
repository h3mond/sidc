const accountRoot = '/account';
const authRoot = '/auth';
const projectRoot = '/project';

export const routes = {
  account: {
    root: accountRoot,
    create: `${accountRoot}/create`,
    verify: `${accountRoot}/verify`,
  },
  auth: {
    root: authRoot,
    login: `${authRoot}/login`,
  },
  project: {
    root: projectRoot,
    create: `${projectRoot}/create`,
    all: `${projectRoot}/all`,
  },
};
