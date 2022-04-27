import Slider from 'react-slick';
import PropTypes from 'prop-types';
import { useState, useRef } from 'react';
// material
import { useTheme } from '@mui/material/styles';
import { Box, Card, Grid } from '@mui/material';
//
import { CarouselControlsArrowsIndex } from './controls';

// ----------------------------------------------------------------------

CarouselCard.propTypes = {
  image: PropTypes.string
};

function CarouselCard({ image }) {
  return (
    <>
      <Box sx={{ width: '100%', height: '100%', objectFit: 'fill' }}>
        <img src={`https://api.everium.online/${image}`} alt="/" />
      </Box>
    </>
  );
}

CarouselDetails.propTypes = {
  images: PropTypes.array
};

export default function CarouselDetails({ images }) {
  const theme = useTheme();
  const carouselRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);

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

  return (
    <Grid item md={8}>
      <Card>
        <Slider ref={carouselRef} {...settings}>
          {images.map((pic) => (
            <CarouselCard key={pic} image={pic} />
          ))}
        </Slider>
        <CarouselControlsArrowsIndex
          index={currentIndex}
          total={images.length}
          onNext={handleNext}
          onPrevious={handlePrevious}
          sx={{ bottom: 10 }}
        />
      </Card>
    </Grid>
  );
}
