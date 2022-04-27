// material
import { styled } from '@mui/material/styles';
import { Box, Grid, Container, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import { PricingPlanCard } from '../components/_external-pages/pricing';
//
import { PlanFreeIcon, PlanStarterIcon, PlanPremiumIcon } from '../assets';

// ----------------------------------------------------------------------

const PLANS = [
  {
    subscription: 'basic',
    icon: <PlanFreeIcon />,
    price: 0,
    caption: 'ตลอดการใช้งาน',
    lists: [
      { text: 'จำนวนประกาศ 5 ประกาศ', isAvailable: true },
      { text: 'จำนวนการเลื่อนประกาศ 20 ครั้ง/เดือน', isAvailable: true },
      // { text: 'จำกัดจำนวนเบอร์โทรศัพท์ 2 เบอร์', isAvailable: true },
      { text: 'ไม่มีส่วนลด Ad พิเศษ', isAvailable: false }
    ],
    labelAction: 'แพ็กเกจปัจจุบัน'
  },
  {
    subscription: 'เริ่มต้น',
    icon: <PlanStarterIcon />,
    price: 2000,
    caption: 'ประหยัดไป 4,000 บาทต่อปี',
    lists: [
      { text: 'จำนวนประกาศ 60 ประกาศ', isAvailable: true },
      { text: 'จำนวนการเลื่อนประกาศ 200 ครั้ง/เดือน', isAvailable: true },
      // { text: 'จำกัดจำนวนเบอร์โทรศัพท์ 4 เบอร์', isAvailable: true },
      { text: 'ส่วนลด Ad พิเศษ 5 %', isAvailable: true }
    ],
    labelAction: '20,000 บาท/ปี'
  },
  {
    subscription: 'premium',
    icon: <PlanPremiumIcon />,
    price: 3500,
    caption: 'ประหยัดไป 10,000 บาทต่อปี',
    lists: [
      { text: 'จำนวนประกาศ 100 ประกาศ', isAvailable: true },
      { text: 'จำนวนการเลื่อนประกาศ 500 ครั้ง/เดือน', isAvailable: true },
      // { text: 'จำกัดจำนวนเบอร์โทรศัพท์ 4 เบอร์', isAvailable: true },
      { text: 'ส่วนลด Ad พิเศษ 10 %', isAvailable: true }
    ],
    labelAction: '32,000 บาท/ปี'
  }
];

const RootStyle = styled(Page)(({ theme }) => ({
  minHeight: '100%',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10)
}));

// ----------------------------------------------------------------------

export default function Pricing() {
  return (
    <RootStyle title="Pricing | Minimal-UI">
      <Container maxWidth="lg">
        <Typography variant="h3" align="center" paragraph>
          เลือกแพ็กเกจที่เหมาะกับคุณ
        </Typography>
        <Typography align="center" sx={{ color: 'text.secondary' }}>
          เรามีแพ็กเกจและสิทธิพิเศษสำหรับคุณตามนี้
        </Typography>

        <Box sx={{ my: 5 }}>
          {/* <Stack direction="row" alignItems="center" justifyContent="flex-end">
            <Typography variant="overline" sx={{ mr: 1.5 }}>
              MONTHLY
            </Typography>
            <Switch />
            <Typography variant="overline" sx={{ ml: 1.5 }}>
              YEARLY (save 10%)
            </Typography>
          </Stack>
          <Typography variant="caption" align="right" sx={{ color: 'text.secondary', display: 'block' }}>
            * Plus applicable taxes
          </Typography> */}
        </Box>

        <Grid container spacing={3}>
          {PLANS.map((card, index) => (
            <Grid item xs={12} md={4} key={card.subscription}>
              <PricingPlanCard card={card} index={index} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </RootStyle>
  );
}
