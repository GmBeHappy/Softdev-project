import { Icon } from '@iconify/react';
import homeFill from '@iconify/icons-eva/home-fill';
import fileFill from '@iconify/icons-eva/file-fill';
// routes
import { PATH_AUTH, PATH_PAGE } from '../../routes/paths';

// ----------------------------------------------------------------------

const ICON_SIZE = {
  width: 22,
  height: 22
};

const menuConfig = [
  {
    title: 'Home',
    path: '/',
    icon: <Icon icon={homeFill} {...ICON_SIZE} />
  },
  {
    title: 'Contact',
    icon: <Icon icon={fileFill} {...ICON_SIZE} />,
    path: PATH_PAGE.contact
  },
  {
    title: 'Packages',
    icon: <Icon icon={fileFill} {...ICON_SIZE} />,
    path: PATH_PAGE.packages
  },
  { title: 'Login/Signup', icon: <Icon icon={fileFill} {...ICON_SIZE} />, path: PATH_AUTH.login }
];

export default menuConfig;
