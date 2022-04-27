import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Box, Card, Typography, Grid, Divider, Container } from '@mui/material';

RecentCard.propTypes = {
  cardData: PropTypes.object
};

export default function RecentCard({ cardData }) {
  const details = `/post/details/${cardData.id}`;
  return (
    <Container>
      <Link to={details} style={{ textDecoration: 'none' }}>
        <Card sx={50}>
          <Grid container>
            <Grid item xs={20} md={3}>
              {/* <img src={cardData.img} alt="/" /> */}
              <Card>
                <Box
                  component="img"
                  alt="/"
                  src={`https://api.everium.online/${cardData.images[0]}`}
                  sx={{ width: 300, height: 280, objectFit: 'cover' }}
                />
              </Card>
            </Grid>
            <Grid item xs={20} md={1} />
            <Grid item xs={20} md={8}>
              <Divider orientation="horizontal" sx={{ my: 1, mx: 'auto', width: 2, height: 15 }} />
              <Typography variant="h4">{cardData.postNameTH}</Typography>
              <Divider orientation="horizontal" sx={{ my: 1, mx: 'auto', width: 2, height: 5 }} />
              <Grid container xs={30} md={12}>
                <Grid item xs={1} md={2}>
                  <Box alignContent="center">
                    <Typography variant="h6">{cardData.contractType === 'เช่า' ? 'Rent' : 'Sale'}</Typography>
                    <Typography variant="body1">{cardData.price}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={1} md={1} />
                <Grid item xs={1} md={4}>
                  <Box>
                    <Typography variant="h6">Unit Type</Typography>
                    <Typography variant="body1">
                      {cardData.bedRoom} ห้องนอน {cardData.bathRoom} ห้องนำ้
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={1} md={2}>
                  <Box alignContent="center">
                    <Typography variant="h6">Room size</Typography>
                    <Typography variant="body1">{cardData.size}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={1} md={1} />
                <Grid item xs={1} md={2}>
                  <Box alignContent="center">
                    <Typography variant="h6">Floor</Typography>
                    <Typography variant="body1">{cardData.floor}</Typography>
                  </Box>
                </Grid>
              </Grid>
              <Divider orientation="horizontal" sx={{ my: 1, mx: 'auto', width: 2, height: 5 }} />
              <Box>
                <Grid container>
                  <Grid item sx={1} md={2}>
                    <Box
                      component="img"
                      alt="/"
                      src={`https://api.everium.online/${cardData.author.profileImage}`}
                      sx={{ width: 85, height: 85, objectFit: 'cover' }}
                    />
                  </Grid>
                  <Grid item sx={1} md={4}>
                    <Divider orientation="horizontal" sx={{ my: 1, mx: 'auto', width: 0, height: 2 }} />
                    <Typography variant="body1">ผู้ลงประกาศ</Typography>
                    {/* <Divider orientation="horizontal" sx={{ my: 1, mx: 'auto', width: 2, height: 2 }} /> */}
                    <Typography variant="h5">
                      {cardData.author.firstName} {cardData.author.lastName}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
              <Divider orientation="horizontal" sx={{ my: 1, mx: 'auto', width: 2, height: 5 }} />
            </Grid>
          </Grid>
        </Card>
        <Divider orientation="horizontal" sx={{ my: 2, mx: 'auto', width: 2, height: 20 }} />
      </Link>
    </Container>
  );
}
