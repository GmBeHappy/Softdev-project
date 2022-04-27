import PropTypes from 'prop-types';
import { Box, Card, Typography, Grid, Divider, Container } from '@mui/material';
import Checklist from './Checklist';
import { CarouselDetails } from './carousel';
import { varFadeInUp, MotionInView, varFadeInLeft, varFadeInRight } from './animate';

// ----------------------------------------------------------------------

const featureList = [
  'เฟอร์นิเจอร์',
  'โทรศัพท์บ้าน',
  'เครื่องปรับอากาศ',
  'เครื่องทำน้ำร้อน/น้ำอุ่น',
  'ประตูดิจิตอล Door lock',
  'อ่างอาบน้ำ',
  'TV',
  'เตาปรุงอาหาร',
  'ตู้เย็น',
  'เครื่องดูดควัน',
  'Wi-fi ภายในห้อง',
  'เครื่องซักผ้า'
];

PostDetails.propTypes = {
  details: PropTypes.object
};

export default function PostDetails({ details }) {
  function included(item) {
    // console.log(Array.from(details.detail));
    return Array.from(details.detail).includes(item);
  }
  return (
    <Container>
      <MotionInView variants={varFadeInUp}>
        <center>
          <CarouselDetails images={details.images} />
        </center>
      </MotionInView>
      <Divider orientation="horizontal" sx={{ my: 2, mx: 'auto', width: 2, height: 50 }} />
      <MotionInView variants={varFadeInLeft}>
        <Typography variant="h4">รายละเอียด</Typography>
      </MotionInView>
      <Divider orientation="horizontal" sx={{ my: 2, mx: 'auto', width: 2, height: 2 }} />
      <Grid container>
        <Grid item md={6.5}>
          <MotionInView variants={varFadeInLeft}>
            <Card>
              <Box paddingX={4} paddingY={4}>
                <Typography>{details.moreDetailTH}</Typography>
              </Box>
            </Card>
          </MotionInView>
        </Grid>
        <Grid item md={0.5} />
        <Grid item md={5}>
          <MotionInView variants={varFadeInRight}>
            <Card>
              <Box paddingX={4} paddingY={4}>
                <Grid container>
                  <Grid item md={4}>
                    <Typography variant="h3">ราคา</Typography>
                  </Grid>
                  <Grid item md={8}>
                    <Typography variant="h3" align="right">
                      {details.price}
                    </Typography>
                  </Grid>
                </Grid>
                <Divider orientation="horizontal" sx={{ my: 2, mx: 'auto', width: 2, height: 2 }} />
                <Grid container>
                  <Grid item md={4}>
                    <Typography variant="h5">ประเภท</Typography>
                  </Grid>
                  <Grid item md={8}>
                    <Typography variant="h5" align="right">
                      {details.type}
                    </Typography>
                  </Grid>
                </Grid>
                <Divider orientation="horizontal" sx={{ my: 1, mx: 'auto', width: 2, height: 2 }} />
                <Grid container>
                  <Grid item md={4}>
                    <Typography variant="h5">จำนวนห้องนอน</Typography>
                  </Grid>
                  <Grid item md={8}>
                    <Typography variant="h5" align="right">
                      {details.bedRoom}
                    </Typography>
                  </Grid>
                </Grid>
                <Divider orientation="horizontal" sx={{ my: 1, mx: 'auto', width: 2, height: 2 }} />
                <Grid container>
                  <Grid item md={4}>
                    <Typography variant="h5">จำนวนห้องน้ำ</Typography>
                  </Grid>
                  <Grid item md={8}>
                    <Typography variant="h5" align="right">
                      {details.bathRoom}
                    </Typography>
                  </Grid>
                </Grid>
                <Divider orientation="horizontal" sx={{ my: 1, mx: 'auto', width: 2, height: 2 }} />
                <Grid container>
                  <Grid item md={4}>
                    <Typography variant="h5">ชั้น</Typography>
                  </Grid>
                  <Grid item md={8}>
                    <Typography variant="h5" align="right">
                      {details.floor}
                    </Typography>
                  </Grid>
                </Grid>
                <Divider orientation="horizontal" sx={{ my: 1, mx: 'auto', width: 2, height: 2 }} />
                <Grid container>
                  <Grid item md={8}>
                    <Typography variant="h5">ขนาดพื้นที่ใช้สอย</Typography>
                  </Grid>
                  <Grid item md={4}>
                    <Typography variant="h5" align="right">
                      {details.size}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Card>
          </MotionInView>
        </Grid>
      </Grid>
      <MotionInView variants={varFadeInUp}>
        <Divider orientation="horizontal" sx={{ my: 2, mx: 'auto', width: 2, height: 2 }} />
        <Typography variant="h4">สิ่งอำนวยความสะดวก</Typography>
        <Divider orientation="horizontal" sx={{ my: 2, mx: 'auto', width: 2, height: 2 }} />
        <Grid container>
          {featureList.map((d) => (
            <Checklist key={d} data={{ text: d, color: included(d) ? 'success' : 'error' }} />
          ))}
        </Grid>
      </MotionInView>
    </Container>
  );
}
