import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
// hooks
import useAuth from '../hooks/useAuth';
// routes
import { PATH_DASHBOARD } from '../routes/paths';

// ----------------------------------------------------------------------

SellerGuard.propTypes = {
  children: PropTypes.node
};

export default function SellerGuard({ children }) {
  const { user } = useAuth();

  if (user.role !== 'seller') {
    return <Navigate to={PATH_DASHBOARD.verifyIdentity} />;
  }

  return <>{children}</>;
}
