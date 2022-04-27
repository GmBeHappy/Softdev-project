import { useState } from 'react';
// material
import { useTheme, styled } from '@mui/material/styles';
import { Box, Card, Grid, Container, Typography, useMediaQuery } from '@mui/material';
// components
import Page from '../components/Page';
import { PaymentSummary } from '../components/_external-pages/payment';
import { PricingPlanCard } from '../components/_external-pages/pricing';
//
import { PlanFreeIcon, PlanStarterIcon, PlanPremiumIcon } from '../assets';
//
import useAuth from '../hooks/useAuth';

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
    net1year: 0,
    yearPrice: 0,
    labelAction: 'ฟรี'
  },
  {
    subscription: 'starter',
    icon: <PlanStarterIcon />,
    price: 2000,
    caption: 'ประหยัดไป 4,000 บาทต่อปี',
    lists: [
      { text: 'จำนวนประกาศ 60 ประกาศ', isAvailable: true },
      { text: 'จำนวนการเลื่อนประกาศ 200 ครั้ง/เดือน', isAvailable: true },
      // { text: 'จำกัดจำนวนเบอร์โทรศัพท์ 4 เบอร์', isAvailable: true },
      { text: 'ส่วนลด Ad พิเศษ 5 %', isAvailable: true }
    ],
    net1year: 2000000,
    yearPrice: 20000,
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
    net1year: 3200000,
    yearPrice: 32000,
    labelAction: '32,000 บาท/ปี'
  }
];

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  minHeight: '100%',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10)
}));

// ----------------------------------------------------------------------

export default function Payment() {
  const theme = useTheme();
  const upMd = useMediaQuery(theme.breakpoints.up('md'));
  const { user } = useAuth();
  if (!user.package) {
    PLANS[0].labelAction = 'เพ็กเกจปัจจุบัน';
  } else if (user.package.type === 'starter') {
    PLANS[1].labelAction = 'เพ็กเกจปัจจุบัน';
  } else if (user.package.type === 'premium') {
    PLANS[2].labelAction = 'เพ็กเกจปัจจุบัน';
  }
  const [selectedPlan, setSelectedPlan] = useState(0);

  return (
    <RootStyle title="Package Management | EVERIUM">
      <Container maxWidth="lg">
        <Box sx={{ mb: 5 }}>
          <Typography variant="h3" align="center" paragraph>
            เข้าถึงลูกค้าได้มากขึ้น อัปเกรดเพ็กเกจของคุณ
          </Typography>
          <Typography align="center" sx={{ color: 'text.secondary' }}>
            สามารถเลือกแพ็กเกจที่ต้องการได้ที่นี่
          </Typography>
        </Box>

        <Card>
          <Grid container spacing={upMd ? 2 : 2}>
            {PLANS.map((card, index) => (
              <Grid item xs={12} md={3} key={card.subscription}>
                <PricingPlanCard card={card} index={index} selectPlan={setSelectedPlan} />
              </Grid>
            ))}
            <Grid item xs={12} md={3}>
              <PaymentSummary
                package={{
                  name: PLANS[selectedPlan].subscription,
                  monthPrice: PLANS[selectedPlan].price,
                  yearPrice: PLANS[selectedPlan].yearPrice,
                  net1year: PLANS[selectedPlan].net1year
                }}
              />
            </Grid>
          </Grid>
        </Card>
      </Container>
    </RootStyle>
  );
}
