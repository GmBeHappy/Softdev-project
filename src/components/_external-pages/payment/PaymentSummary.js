import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import shieldFill from '@iconify/icons-eva/shield-fill';
import { useEffect } from 'react';
import { useSnackbar } from 'notistack';
// material
import { styled } from '@mui/material/styles';
import { Box, Divider, Typography, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
//
import Label from '../../Label';
import { useExternalScript } from '../../../hooks/useExternalScript';
// axios
import axios from '../../../utils/axios';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(3),
  [theme.breakpoints.up('md')]: {
    margin: theme.spacing(1),
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
    borderRadius: theme.shape.borderRadiusMd,
    backgroundColor: theme.palette.background.neutral
  },
  [theme.breakpoints.up('lg')]: {
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5)
  }
}));

// ----------------------------------------------------------------------

PaymentSummary.propTypes = {
  package: PropTypes.shape({
    name: PropTypes.string,
    monthPrice: PropTypes.string,
    yearPrice: PropTypes.string,
    net1year: PropTypes.number
  })
};

let OmiseCard;

export default function PaymentSummary({ package: { name, monthPrice, yearPrice, net1year } }) {
  const state = useExternalScript('https://cdn.omise.co/omise.js');
  const { enqueueSnackbar } = useSnackbar();

  const handleLoadScript = () => {
    OmiseCard = window.OmiseCard;
    OmiseCard.configure({
      publicKey: 'pkey_test_5rj2wn5vvrzxeq19li8', // ต้องใส่ใน .env
      currency: 'THB',
      amount: net1year, // 1000 baht
      frameLabel: `EVERIUM ${name} Package`,
      submitLabel: 'Pay NOW',
      buttonLabel: 'Pay with Omise'
    });
  };

  const creditCardConfigure = () => {
    OmiseCard.configure({
      defaultPaymentMethod: 'credit_card',
      otherPaymentMethods: ['truemoney', 'rabbit_linepay']
    });
    OmiseCard.configureButton('#payment');
    OmiseCard.attach();
  };
  const omiseCardHandler = () => {
    OmiseCard.open({
      amount: net1year,
      onCreateTokenSuccess: async (token) => {
        console.log('SUCCESS');
        console.log(token);
        try {
          const res = await axios.post('packages/purchase', {
            amount: net1year,
            token,
            packageType: name
          });
          enqueueSnackbar('Payment success', { variant: 'success' });
          console.log(res);
        } catch (error) {
          console.log(error.response);
          enqueueSnackbar(error.response.message, { variant: 'error' });
          console.log(error);
        }
      },
      onFormClosed: () => {}
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    creditCardConfigure();
    omiseCardHandler();
  };

  useEffect(() => {
    if (state === 'ready') {
      handleLoadScript();
      console.log('RUN HANDLE SCRIPT');
    }
    // eslint-disable-next-line
  }, [state]);

  return (
    <RootStyle>
      <Typography variant="subtitle1" sx={{ mb: 5 }}>
        รายการที่ต้องชำระ
      </Typography>

      <Stack spacing={1.5}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="subtitle1" component="p" sx={{ color: 'text.secondary' }}>
            แพ็กเกจ
          </Typography>
          <Label color="error" variant="filled">
            {name}
          </Label>
        </Stack>

        <Stack direction="row" justifyContent="space-between">
          <Typography component="p" variant="subtitle2" sx={{ color: 'text.secondary' }}>
            Billed Monthly
          </Typography>
        </Stack>

        <Stack direction="row" justifyContent="flex-end">
          <Typography sx={{ color: 'text.secondary' }}>$</Typography>
          <Typography variant="h2" sx={{ mx: 1 }}>
            {monthPrice}
          </Typography>
          <Typography component="span" variant="body2" sx={{ mb: 1, alignSelf: 'flex-end', color: 'text.secondary' }}>
            /เดือน
          </Typography>
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h6" component="p">
            ยอดชำระ
          </Typography>
          <Typography variant="h6" component="p">
            {yearPrice}
          </Typography>
        </Stack>

        <Divider sx={{ borderStyle: 'dashed', mb: 1 }} />
      </Stack>
      <form>
        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          onClick={handleClick}
          id="payment"
          sx={{ mt: 5, mb: 3 }}
        >
          ชำระเงิน
        </LoadingButton>
      </form>

      <Stack alignItems="center" spacing={1}>
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <Box component={Icon} icon={shieldFill} sx={{ width: 20, height: 20, color: 'primary.main' }} />
          <Typography variant="subtitle2">ชำระเงินอย่างปลอดภัยด้วย Omise</Typography>
        </Stack>
        <Typography variant="caption" sx={{ color: 'text.secondary', textAlign: 'center' }}>
          ไม่มีการเก็บข้อมูลบัตรเครดิตของคุณ
        </Typography>
      </Stack>
    </RootStyle>
  );
}
