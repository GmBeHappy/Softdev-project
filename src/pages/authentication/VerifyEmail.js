import { Icon } from '@iconify/react';
import { Link as RouterLink } from 'react-router-dom';
import arrowIosBackFill from '@iconify/icons-eva/arrow-ios-back-fill';
// material
import { styled } from '@mui/material/styles';
import { Box, Button, Container, Typography } from '@mui/material';
// layouts
import LogoOnlyLayout from '../../layouts/LogoOnlyLayout';
// routes
import { PATH_AUTH } from '../../routes/paths';
// components
import Page from '../../components/Page';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

export default function VerifyEmail() {
  return (
    <RootStyle title="Verify Email| EVERIUM">
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

          <Typography variant="h3" paragraph>
            กรุณาเช็คอีเมลของคุณ
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            เราได้ส่งอีเมลยืนยันการสมัครสมาชิกไปยังอีเมลของคุณ
            <br />
            หากไม่พบอีเมลให้ลองเช็คกล่องข้อความขยะของอีเมลของคุณ <br />
            หรือติดต่อผู้ดูแลระบบ
          </Typography>
        </Box>
      </Container>
    </RootStyle>
  );
}
