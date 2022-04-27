import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { TextField, Container, Grid, Box, Button, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Page from '../components/Page';
import RecentCard from '../components/RecentCard';
import { varFadeInUp, MotionInView } from '../components/animate';

const backendURL = 'https://api.everium.online';
const notFoundImg = 'https://m.media-amazon.com/images/I/51UW1849rJL._AC_SS450_.jpg';

const RootStyle = styled(Page)(({ theme }) => ({
  paddingTop: theme.spacing(11),
  paddingBottom: theme.spacing(15)
}));

export default function Search(props) {
  const { keyword, searchFor } = useParams();
  const [postDatas, setPostDatas] = useState([
    { realEstate: { name: '', id: '' }, images: [], author: { profileImage: [notFoundImg] } }
  ]);
  const [values, setValues] = useState({
    text: keyword,
    result: ''
  });
  const fetchFilter = async (isFirst = false) => {
    if (isFirst && searchFor === 'realEstate') {
      const response = await axios.get(`${backendURL}/posts/publish`, {
        params: { realEstate: postDatas.realEstate?.id }
      });
      setPostDatas(response.data.metaData);
      setValues({ ...values, result: values.text });
      return;
    }

    console.log('values 1', values);
    const response = await axios.get(`${backendURL}/posts/publish`, {
      params: { postNameTH: values.text, realEstate: postDatas.realEstate?.id }
    });
    console.log('value', values);
    setPostDatas(response.data.metaData);
    setValues({ ...values, result: values.text });
  };
  // const fetchrealestate = async () => {
  //   const response = await axios.get(`${backendURL}/real-estates/${keyword}`);
  //   console.log(values.result);
  //   console.log(response.data);
  //   // setPostDatas(response.data.metaData);
  //   setValues({ ...values, result: response.data.metaData.name });
  //   // if (values.text === '') {
  //   //   setValues({ ...values, text: response.data.metaData.name });
  //   // }
  // };

  const handleChange = () => (event) => {
    console.log('HANDLE CHANGE');
    setValues({ ...values, text: event.target.value });
  };
  const handleClick = async () => {
    await fetchFilter();
  };
  // eslint-disable-next-line
  useEffect(async () => {
    console.log(props);
    console.log(props);
    async function fetch() {
      await fetchFilter(true);
    }
    // setPostDatas(props.realEstates);
    // await fetchrealestate();
    // console.log('effect', values);
    fetch();
    // console.log('Effect');
    // eslint-disable-next-line
  }, []);

  return (
    <RootStyle>
      <Container maxWidth="lg">
        <Box paddingY={5} />
        <center>
          <MotionInView variants={varFadeInUp}>
            <Grid container>
              <Grid item md={1}>
                <Box paddingY={1.5}>
                  <SearchIcon fontSize="large" />
                </Box>
              </Grid>
              <Grid item md={9}>
                <TextField fullWidth defaultValue={values.text} onChange={handleChange()} />
              </Grid>
              <Grid item md={1.5} paddingY={0.4}>
                <Button variant="contained" color="primary" size="large" onClick={() => handleClick()}>
                  Search
                </Button>
              </Grid>
            </Grid>
          </MotionInView>
        </center>
        <Box paddingY={5} />
        <MotionInView variants={varFadeInUp}>
          <Typography variant="h2">
            Search Result {values.result === '' || !values.result ? '' : `for "${values.result}"`}
          </Typography>
        </MotionInView>
        <Box paddingY={5} />
        <MotionInView variants={varFadeInUp}>
          {postDatas.map((data) => (
            <RecentCard key={data} cardData={data} />
          ))}
        </MotionInView>
      </Container>
    </RootStyle>
  );
}
