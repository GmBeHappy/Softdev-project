import Brightness1Icon from '@mui/icons-material/Brightness1';
import { Typography, Grid, Box } from '@mui/material';
import PropTypes from 'prop-types';

Checklist.propTypes = {
  data: PropTypes.object
};

export default function Checklist({ data }) {
  return (
    <>
      <Grid item md={6} paddingTop={2}>
        <Grid container>
          <Grid item md={0.5}>
            <Box>
              <Brightness1Icon color={data.color} />
            </Box>
          </Grid>
          <Grid item md={8}>
            <Typography variant="h5">{data.text}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
