import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import {
  Grid,
  Container,
  Typography,
  Divider,
  ToggleButton,
  ToggleButtonGroup,
  Box,
  TextField,
  Button
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
// components
import { CarouselPopular } from '../components/carousel';
import Page from '../components/Page';
import mockData from '../utils/mock-data';
import RecentCard from '../components/RecentCard';
import { varFadeInUp, MotionInView } from '../components/animate';

// ----------------------------------------------------------------------

const recentSaleData = mockData.recent_sale;

const popularPostData = mockData.PopularPost;

const Data = popularPostData.metadata.map((card) =>
  card.images.map((url) => ({
    price: card.price,
    bedRoom: card.bedRoom,
    bathRoom: card.bathRoom,
    floor: card.floor,
    size: card.size,
    postName: card.postName,
    lastModified: card.lastModified,
    views: card.views,
    icon: card.icon,
    NameL1: card.NameL1,
    NameL2: card.NameL2,
    image: url
  }))
);

console.log(Data);

const RootStyle = styled(Page)(({ theme }) => ({
  paddingTop: theme.spacing(11),
  paddingBottom: theme.spacing(15)
}));

function toObject(array) {
  return { array };
}

export default function Carousel() {
  const [type, setType] = useState('เช่า');
  const [PopularData, setPopularData] = useState([]);
  const [RecentRentData, setRecentRentData] = useState([]);
  const [RecentSellData] = useState([]);
  const [values, setValues] = useState({
    text: '',
    result: ''
  });

  useEffect(() => {
    fetchPopular();
    fetchRecentRent();
  }, []);

  const handleChange = () => (event) => {
    console.log('HANDLE CHANGE');
    setValues({ ...values, text: event.target.value });
  };

  function fetchPopular() {
    axios.get(`https://api.everium.online/posts/popular-publish`).then((respond) => {
      const pd = respond.data.metaData.map((card) =>
        card.images.map((url) => ({
          image: url,
          ...card
        }))
      );
      setPopularData(pd);
    });
  }

  function fetchRecentRent() {
    axios.get(`https://api.everium.online/posts/publish?contractType=เช่า`).then((respond) => {
      console.log(respond.data.metaData);
      setRecentRentData(respond.data.metaData);
    });
  }

  const handleAlignment = (event, newType) => {
    setType(newType);
  };

  return (
    <RootStyle title="EVERIUM">
      <Container maxWidth="lg">
        <Divider orientation="horizontal" sx={{ my: 2, mx: 'auto', width: 2, height: 20 }} />
        <MotionInView variants={varFadeInUp}>
          <Grid container>
            <Grid item md={0.2} />
            <Grid item md={0.5}>
              <Box paddingY={1.5}>
                <SearchIcon fontSize="large" />
              </Box>
            </Grid>
            <Grid item md={0.1} />
            <Grid item md={9.5}>
              <TextField fullWidth defaultValue={values.text} onChange={handleChange()} />
            </Grid>
            <Grid item md={0.2} />
            <Grid item md={1.5} paddingY={0.4}>
              <Link to={`/post/search/home/${values.text}`} style={{ textDecoration: 'none' }}>
                <Button variant="contained" color="primary" size="large">
                  Search
                </Button>
              </Link>
            </Grid>
          </Grid>
        </MotionInView>
        <Divider orientation="horizontal" sx={{ my: 2, mx: 'auto', width: 2, height: 20 }} />
        <MotionInView variants={varFadeInUp}>
          <Typography variant="h3">Popular</Typography>
          <Grid container spacing={10}>
            {PopularData.map((card) => (
              <CarouselPopular key={Data.NameL1} card={toObject(card)} />
            ))}
          </Grid>
        </MotionInView>
        <Divider orientation="horizontal" sx={{ my: 10, mx: 'auto', width: 2, height: 40 }} />
        <MotionInView variants={varFadeInUp}>
          <Typography variant="h3">Recent Listing</Typography>
        </MotionInView>
        <MotionInView variants={varFadeInUp}>
          <ToggleButtonGroup value={type} exclusive onChange={handleAlignment}>
            <ToggleButton value="เช่า">
              <Box sx={{ width: 100, height: 30, objectFit: 'cover' }}>
                <Typography variant="h4">Rent</Typography>
              </Box>
            </ToggleButton>
            <ToggleButton value="ขาย">
              <Box sx={{ width: 100, height: 30, objectFit: 'cover' }}>
                <Typography variant="h4">Sale</Typography>
              </Box>
            </ToggleButton>
          </ToggleButtonGroup>
        </MotionInView>
        <Divider orientation="horizontal" sx={{ my: 2, mx: 'auto', width: 2, height: 20 }} />
        {type === 'เช่า' ? (
          <MotionInView variants={varFadeInUp}>
            {RecentRentData.map((cardData) => (
              <RecentCard key={cardData.postName} cardData={cardData} />
            ))}
          </MotionInView>
        ) : (
          <MotionInView variants={varFadeInUp}>
            {RecentSellData.map((cardData) => (
              <RecentCard key={recentSaleData.NameL1} cardData={cardData} />
            ))}
          </MotionInView>
        )}
      </Container>
    </RootStyle>
  );
}
