import PropTypes from 'prop-types';
// material
// import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
import logo from './logo EVERIUM.png';

// ----------------------------------------------------------------------

Logo.propTypes = {
  sx: PropTypes.object
};

export default function Logo({ sx }) {
  // const theme = useTheme();
  // const PRIMARY_LIGHT = theme.palette.primary.light;
  // const PRIMARY_MAIN = theme.palette.primary.main;
  // const PRIMARY_DARK = theme.palette.primary.dark;

  return (
    <Box sx={{ width: 50, height: 50, ...sx }}>
      <img src={logo} alt="/" />
    </Box>
  );
}
