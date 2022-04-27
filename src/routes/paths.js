// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------
export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
  register: path(ROOTS_AUTH, '/register'),
  registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  verify: path(ROOTS_AUTH, '/verify'),
  verifyEmail: path(ROOTS_AUTH, '/verify-email')
};

export const PATH_PAGE = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  packages: '/packages',
  payment: '/payment',
  contact: '/contact-us',
  faqs: '/faqs',
  page404: '/404',
  page500: '/500'
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  general: {
    pageMain: path(ROOTS_DASHBOARD, '/main'),
    pageChat: path(ROOTS_DASHBOARD, '/chat'),
    packageManagement: path(ROOTS_DASHBOARD, '/package-management')
  },
  chat: {
    root: path(ROOTS_DASHBOARD, '/chat'),
    new: path(ROOTS_DASHBOARD, '/chat/new'),
    view: (name) => path(ROOTS_DASHBOARD, `/chat/${name}`)
  },
  account: {
    root: path(ROOTS_DASHBOARD, '/account')
  },
  post: {
    root: path(ROOTS_DASHBOARD, '/post/create'),
    edit: (id) => path(ROOTS_DASHBOARD, `/post/${id}/edit`)
  },
  verifyIdentity: path(ROOTS_DASHBOARD, '/verify-identity')
};
