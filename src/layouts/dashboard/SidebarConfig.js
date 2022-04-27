// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import SvgIconStyle from '../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name) => (
  <SvgIconStyle src={`/static/icons/navbar/${name}.svg`} sx={{ width: '100%', height: '100%' }} />
);

const ICONS = {
  user: getIcon('ic_user'),
  chat: getIcon('ic_chat'),
  dashboard: getIcon('ic_dashboard'),
  post: getIcon('ic_doc'),
  analytics: getIcon('ic_analytics')
};

const sidebarConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'general',
    items: [
      { title: 'รายการประกาศของคุณ', path: PATH_DASHBOARD.general.pageMain, icon: ICONS.dashboard },
      { title: 'สร้างประกาศใหม่', path: PATH_DASHBOARD.post.root, icon: ICONS.post }
    ]
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'management',
    items: [
      { title: 'แก้ไขโปรไฟล์', path: PATH_DASHBOARD.account.root, icon: ICONS.user },
      { title: 'จัดการแพ็กเกจ', path: PATH_DASHBOARD.general.packageManagement, icon: ICONS.analytics }
    ]
  }
];

export default sidebarConfig;
