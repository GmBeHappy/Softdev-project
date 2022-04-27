import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import {
  Grid,
  Container,
  Typography,
  Divider,
  Card,
  ToggleButton,
  ToggleButtonGroup,
  Box,
  Rating
} from '@mui/material';
// components
import Page from '../components/Page';
import ImgGallery from '../components/ImgGallery';
import PostDetails from '../components/PostDetails';
import RelatedPost from '../components/RelatedPost';
import { varFadeInUp, MotionInView, varFadeInLeft } from '../components/animate';

// ----------------------------------------------------------------------

const notFoundImg = 'https://m.media-amazon.com/images/I/51UW1849rJL._AC_SS450_.jpg';
const backendURL = 'https://api.everium.online';
const RootStyle = styled(Page)(({ theme }) => ({
  paddingTop: theme.spacing(11),
  paddingBottom: theme.spacing(15)
}));

export default function Details() {
  const { id } = useParams();
  const [postData, setPostData] = useState({ detail: [], images: [], realEstate: { averageStar: 0 } });
  const [rsID, setrsID] = useState('');
  const [rsName, setrsName] = useState('');
  const [author, setauthor] = useState({});
  const [imgurl, setimgurl] = useState([notFoundImg]);
  const [tab, setTab] = useState('details');

  useEffect(() => {
    const fetchPostData = () => {
      axios
        .get(`${backendURL}/posts/publish/${id}`)
        .then((respond) => {
          setPostData(respond.data.metaData);
          setauthor(respond.data.metaData.author);
          setimgurl(respond.data.metaData.images.map((url) => `${backendURL}/${url}`));
          setrsID(respond.data.metaData.realEstate.id);
          setrsName(respond.data.metaData.realEstate.name);
        })
        .catch((error) => {
          console.log(`Error : ${error}`);
        });
    };
    fetchPostData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAlignment = (event, newType) => {
    setTab(newType);
  };

  // console.log(`https://api.everium.online/posts/publish/${id}`);
  //   console.log(`https://api.everium.online/${postData.images[0]}`);

  // console.log(postData);
  // console.log(imgurl);
  return (
    <>
      {postData === {} ? (
        <RootStyle title="EVERIUM">
          <img src="../../public/static/media/logo%20EVERIUM.ede85e0f.png" alt="/" />
        </RootStyle>
      ) : (
        <RootStyle title="EVERIUM">
          <Container maxWidth="xl">
            <Divider orientation="horizontal" sx={{ my: 2, mx: 'auto', width: 2, height: 20 }} />
            <Typography variant="h3">{postData.postNameTH}</Typography>
            <Divider orientation="horizontal" sx={{ my: 2, mx: 'auto', width: 2, height: 20 }} />
            <MotionInView variants={varFadeInUp}>
              <Grid container>
                <Grid item md={4}>
                  <Card>
                    <Box sx={{ width: '100%', height: '100%', objectFit: 'cover' }}>
                      <img src={imgurl[0]} alt="/" />
                    </Box>
                  </Card>
                </Grid>
                <Grid item md={0.5} />
                <Grid item md={3}>
                  <Rating name="simple-controlled" value={postData.realEstate.averageStar} precision={0.1} readOnly />
                  <Typography variant="h4">ราคา</Typography>
                  <Box paddingTop={2} />
                  <Typography variant="h3">{postData.price}</Typography>
                  <Box paddingTop={2} />
                  <Grid container>
                    <Grid item md={3}>
                      <Card>
                        <center>
                          <Box sx={{ width: 100, height: 30, objectFit: 'cover' }} paddingTop={0.5}>
                            <Typography>{postData.bedRoom} ห้องนอน</Typography>
                          </Box>
                        </center>
                      </Card>
                    </Grid>
                    <Grid item md={0.5} />
                    <Grid item md={3}>
                      <Card>
                        <center>
                          <Box sx={{ width: 100, height: 30, objectFit: 'cover' }} paddingTop={0.5}>
                            <Typography>{postData.size}</Typography>
                          </Box>
                        </center>
                      </Card>
                    </Grid>
                    <Grid item md={0.5} />
                    <Grid item md={3}>
                      <Card>
                        <center>
                          <Box sx={{ width: 100, height: 30, objectFit: 'cover' }} paddingTop={0.5}>
                            <Typography>ชั้น {postData.floor}</Typography>
                          </Box>
                        </center>
                      </Card>
                    </Grid>
                  </Grid>
                  <Divider orientation="horizontal" sx={{ my: 2, mx: 'auto', width: 2, height: 20 }} />
                  <RelatedPost realEstateID={rsID} realEstateName={rsName} />
                </Grid>
                <Grid item md={0.5} />
                <Grid item md={4}>
                  <Card>
                    <Box paddingX={3} paddingY={3}>
                      <center>
                        <Typography variant="h4">ผู้ลงประกาศ</Typography>
                      </center>
                      <Divider orientation="horizontal" sx={{ my: 1, mx: 'auto', width: 2, height: 1 }} />
                      <Grid container>
                        <Grid item md={3}>
                          <Card>
                            <Box sx={{ width: '80', height: '80', objectFit: 'cover' }}>
                              {/* <img src={`${backendURL}/${postData.author.profileImage}`} alt="/" /> */}
                              <img src={`${backendURL}/${author.profileImage}`} alt="/" />
                            </Box>
                          </Card>
                        </Grid>
                        <Grid item md={1} />
                        <Grid item md={4}>
                          <Divider orientation="horizontal" sx={{ my: 1, mx: 'auto', width: 2, height: 5 }} />
                          <Typography variant="h6">
                            {author.firstName} {author.lastName}
                          </Typography>
                          <Divider orientation="horizontal" sx={{ my: 1, mx: 'auto', width: 2, height: 5 }} />
                          <Typography variant="body1">Tel: {author.phoneNumber}</Typography>
                        </Grid>
                      </Grid>
                    </Box>
                  </Card>
                </Grid>
              </Grid>
            </MotionInView>
            <Divider orientation="horizontal" sx={{ my: 2, mx: 'auto', width: 2, height: 20 }} />
            <MotionInView variants={varFadeInLeft}>
              <ToggleButtonGroup value={tab} exclusive onChange={handleAlignment}>
                <ToggleButton value="details">
                  <Box sx={{ width: 100, height: 30, objectFit: 'cover' }}>
                    <Typography>ข้อมูลโครงการ</Typography>
                  </Box>
                </ToggleButton>
                <ToggleButton value="imgs">
                  <Box sx={{ width: 100, height: 30, objectFit: 'cover' }}>
                    <Typography>รูปภาพ</Typography>
                  </Box>
                </ToggleButton>
              </ToggleButtonGroup>
            </MotionInView>
            <Divider orientation="horizontal" sx={{ my: 2, mx: 'auto', width: 2, height: 50 }} />
            {tab === 'imgs' ? <ImgGallery images={imgurl} /> : <></>}
            {tab === 'details' && postData !== {} ? <PostDetails details={postData} /> : <></>}
          </Container>
        </RootStyle>
      )}
    </>
  );
}
