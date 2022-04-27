import PropTypes from 'prop-types';
import { Box, Card, Grid, Container } from '@mui/material';
import { varFadeInLeft, varFadeInRight, MotionInView } from './animate';

// ----------------------------------------------------------------------

ImageCard.propTypes = {
  index: PropTypes.number,
  image: PropTypes.array
};

ImgGallery.propTypes = {
  images: PropTypes.array
};

function ImageCard({ image, index }) {
  console.log(index);
  return (
    <>
      <Grid item paddingTop={7}>
        <MotionInView variants={index % 2 === 0 ? varFadeInLeft : varFadeInRight}>
          <Card>
            <Box component="img" alt="/" src={image} sx={{ width: 500, height: 400, objectFit: 'cover' }} />
          </Card>
        </MotionInView>
      </Grid>
      <Grid item md={0.5} />
    </>
  );
}

export default function ImgGallery({ images }) {
  return (
    <Container>
      <Grid container>
        {images.map((image, index) => (
          <ImageCard key={image} image={image} index={index} />
        ))}
      </Grid>
    </Container>
  );
}
