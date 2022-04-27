import ReactApexChart from 'react-apexcharts';
// material
import { useTheme } from '@mui/material/styles';
import { Box, Card, Typography } from '@mui/material';
// hooks
import useAuth from '../../../hooks/useAuth';
// utils
import { fNumber } from '../../../utils/formatNumber';

// ----------------------------------------------------------------------
const CHART_DATA = [{ data: [20, 41, 63, 33, 28, 35, 50, 46, 11, 26, 55] }];

export default function MainTotalPostable() {
  const theme = useTheme();
  const { user } = useAuth();

  const chartOptions = {
    colors: [theme.palette.primary.main],
    chart: { sparkline: { enabled: true } },
    plotOptions: { bar: { columnWidth: '68%', borderRadius: 2 } },
    labels: ['1', '2', '3', '4', '5', '6', '7', '8'],
    tooltip: {
      x: { show: false },
      y: {
        formatter: (seriesName) => fNumber(seriesName),
        title: {
          formatter: () => ''
        }
      },
      marker: { show: false }
    }
  };

  return (
    <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle1">จำนวนโพสที่สร้างได้</Typography>
        <Typography variant="h3">{fNumber(user.postLimit ? user.postLimit - user.createdPosts : 5)}</Typography>
      </Box>
      <ReactApexChart type="bar" series={CHART_DATA} options={chartOptions} width={60} height={36} />
    </Card>
  );
}
