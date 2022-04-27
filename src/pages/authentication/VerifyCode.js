import { Icon } from '@iconify/react';
import { Link as RouterLink, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { useParams } from 'react-router';
import arrowIosBackFill from '@iconify/icons-eva/arrow-ios-back-fill';
import { useSnackbar } from 'notistack';
// material
import { styled } from '@mui/material/styles';
import { Box, Button, Container, Typography } from '@mui/material';
// layouts
import LogoOnlyLayout from '../../layouts/LogoOnlyLayout';
// routes
import { PATH_AUTH } from '../../routes/paths';
// components
import Page from '../../components/Page';
// hook
import useAuth from '../../hooks/useAuth';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

export default function VerifyCode() {
  const { token } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const { verifyEmail } = useAuth();

  const [isVerify, setIsVerified] = useState(false);

  const handleVerify = async () => {
    try {
      await verifyEmail(token);
      enqueueSnackbar('ยืนยันอีเมล์เรียบร้อยแล้ว', { variant: 'success' });
      setIsVerified(true);
    } catch (error) {
      console.error(error.response);
      setIsVerified(false);
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  return (
    <RootStyle title="Verify | EVERIUM">
      <LogoOnlyLayout />

      <Container>
        <Box sx={{ maxWidth: 480, mx: 'auto' }}>
          <Button
            size="small"
            component={RouterLink}
            to={PATH_AUTH.login}
            startIcon={<Icon icon={arrowIosBackFill} width={20} height={20} />}
            sx={{ mb: 3 }}
          >
            Back
          </Button>
          {/* {token && handleVerify()} */}
          <Typography variant="h3" paragraph>
            กำลังยืนยันอีเมล
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>รหัสยืนยันของคุณคือ {token}</Typography>
          <Button variant="contained" color="primary" disabled={isVerify} onClick={handleVerify}>
            ยืนยันอีเมล
          </Button>
        </Box>
        {isVerify && <Navigate to={PATH_AUTH.login} />}
      </Container>
    </RootStyle>
  );
}
