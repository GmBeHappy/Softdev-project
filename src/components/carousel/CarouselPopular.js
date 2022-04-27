import Slider from 'react-slick';
import PropTypes from 'prop-types';
import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
// material
import { useTheme } from '@mui/material/styles';
import { Box, Card, Typography, CardContent, Grid, Divider } from '@mui/material';
//
import { CarouselControlsArrowsIndex } from './controls';

import bedroomlogo from './bedroom.svg';
import bathroomlogo from './bathroom.svg';
import floorlogo from './floor.svg';

// ----------------------------------------------------------------------

CarouselItem.propTypes = {
  item: PropTypes.object
};

function CarouselItem({ item }) {
  return (
    <>
      {/* <Box
        component="img"
        alt={item.postName}
        src={`https://api.everium.online/${item.image}`}
        sx={{ width: '100%', height: 370, objectFit: 'cover' }}
      /> */}
      <Box sx={{ width: '100%', height: 370, objectFit: 'cover' }}>
        <img src={`https://api.everium.online/${item.image}`} alt="/" />
      </Box>
      <CardContent sx={{ textAlign: 'left' }}>
        <Divider orientation="horizontal" sx={{ my: 0, mx: 'auto', width: 2, height: 1 }} />
        <Typography variant="h3" noWrap gutterBottom>
          {item.price}
        </Typography>
        <Grid container>
          <Grid item xs={12} md={1}>
            <Box sx={{ width: 20, height: 20 }}>
              <Typography variant="body1">{item.bedRoom}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={2}>
            <Box sx={{ width: 20, height: 20 }}>
              <img src={bedroomlogo} alt="/" />
            </Box>
          </Grid>
          <Grid item xs={12} md={1}>
            <Box sx={{ width: 20, height: 20 }}>
              <Typography variant="body1">{item.bathRoom}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={2}>
            <Box sx={{ width: 20, height: 20 }}>
              <img src={bathroomlogo} alt="/" />
            </Box>
          </Grid>
          <Grid item xs={12} md={1}>
            <Box sx={{ width: 20, height: 20 }}>
              <Typography variant="body1">{item.floor}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={2}>
            <Box sx={{ width: 20, height: 20 }}>
              <img src={floorlogo} alt="/" />
            </Box>
          </Grid>
          <Grid item xs={12} md={1}>
            <Box sx={{ width: 80, height: 20 }}>
              <Typography variant="body2">{item.size}</Typography>
            </Box>
          </Grid>
        </Grid>
        <Divider orientation="horizontal" sx={{ my: 1, mx: 'auto', width: 2, height: 20 }} />
        <Typography variant="h5" sx={{ color: 'text.secondary' }} noWrap>
          {item.postNameTH}
        </Typography>
        <Divider orientation="horizontal" sx={{ my: 1, mx: 'auto', width: 2, height: 5 }} />
        <Grid container>
          <Grid item xs={12} md={10}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
              อัพเดทล่าสุด {item.lastModified}
            </Typography>
          </Grid>
          <Grid item xs={12} md={2}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
              View : {item.views}
            </Typography>
          </Grid>
        </Grid>
        <Divider orientation="horizontal" sx={{ my: 1, mx: 'auto', width: 2, height: 5 }} />
        <Typography variant="h4">{item.realEstate.name}</Typography>
      </CardContent>
    </>
  );
}

CarouselPopular.propTypes = {
  card: PropTypes.object
};

export default function CarouselPopular({ card }) {
  const theme = useTheme();
  const carouselRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);

  const details = `/post/details/${card.array[0].id}`;

  const settings = {
    dots: false,
    arrows: false,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: currentIndex,
    fade: Boolean(theme.direction !== 'rtl'),
    rtl: Boolean(theme.direction === 'rtl'),
    beforeChange: (current, next) => setCurrentIndex(next)
  };

  const handlePrevious = () => {
    carouselRef.current.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current.slickNext();
  };

  console.log(card);

  return (
    <Grid item xs={12} md={6}>
      <Link to={details} style={{ textDecoration: 'none' }}>
        <Card>
          <Slider ref={carouselRef} {...settings}>
            {card.array.map((slide) => (
              <CarouselItem key={slide.title} item={slide} />
            ))}
          </Slider>
          <CarouselControlsArrowsIndex
            index={currentIndex}
            total={card.array.length}
            onNext={handleNext}
            onPrevious={handlePrevious}
            sx={{ bottom: 320 }}
          />
        </Card>
      </Link>
    </Grid>
  );
}
