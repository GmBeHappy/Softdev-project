import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Card, Box, Grid, Typography } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const backendURL = 'https://api.everium.online';

RelatedPost.propTypes = {
  realEstateID: PropTypes.string,
  realEstateName: PropTypes.string
};

export default function RelatedPost({ realEstateID, realEstateName }) {
  const [postData, setPostData] = useState([]);
  const fetchData = () => {
    axios.get(`${backendURL}/posts/publish?realEstate=${realEstateID}`).then((respond) => {
      setPostData(respond.data.metaData);
    });
  };
  useEffect(() => {
    fetchData();
  });
  return (
    <Card>
      <Box paddingX={2} paddingY={2} color="primary">
        <Grid container xs={12}>
          <Grid item md={8}>
            <Typography variant="h6">{realEstateName}</Typography>
            <Box paddingTop={1} />
            <Typography>{postData.length} Listing</Typography>
          </Grid>
          <Grid item md={2} />
          <Grid item md={2}>
            <Link to={`/post/search/realEstate/${realEstateName}`}>
              <Box paddingX={2} paddingY={2}>
                <ArrowForwardIosIcon />
              </Box>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
}
