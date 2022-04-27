// material
import { Container, Grid } from '@mui/material';
// hocks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import {
  MainTotalPost,
  MainTotalPostable,
  MainTotalPromotePost,
  MainTotalAllPost
} from '../../components/_dashboard/general-app';

// ----------------------------------------------------------------------

export default function GeneralApp() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Dashboard | EVERIUM">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <MainTotalPostable />
          </Grid>

          <Grid item xs={12} md={4}>
            <MainTotalPromotePost />
          </Grid>

          <Grid item xs={12} md={4}>
            <MainTotalAllPost />
          </Grid>

          <Grid item xs={12}>
            <MainTotalPost />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
