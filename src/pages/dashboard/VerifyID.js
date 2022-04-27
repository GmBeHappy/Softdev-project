import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import { Container, Grid, Box, Stack, Card, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
// hook
import useAuth from '../../hooks/useAuth';
import useIsMountedRef from '../../hooks/useIsMountedRef';

// ----------------------------------------------------------------------

export default function VerifyID() {
  const { themeStretch } = useSettings();
  const { enqueueSnackbar } = useSnackbar();
  const { verifyID } = useAuth();
  const isMountedRef = useIsMountedRef();

  const VerifyIDSchema = Yup.object().shape({
    firstName: Yup.string().required('กรุณากรอกชื่อจริง'),
    lastName: Yup.string().required('กรุณากรอกนามสกุล'),
    citizenID: Yup.string().required('กรุณากรอกเลขบัตรประชาชน'),
    phoneNumber: Yup.string().required('กรุณากรอกเบอร์โทรศัพท์').max(10, 'กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง')
  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      citizenID: '',
      phoneNumber: ''
    },
    validationSchema: VerifyIDSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        await verifyID(values.firstName, values.lastName, values.citizenID, values.phoneNumber);
        enqueueSnackbar('Request Verify success', { variant: 'success' });
        // clear form
        values.firstName = '';
        values.lastName = '';
        values.citizenID = '';
        if (isMountedRef.current) {
          setSubmitting(false);
        }
      } catch (error) {
        console.log(error.response);
        enqueueSnackbar('Request Fail', { variant: 'error' });
        if (isMountedRef.current) {
          setErrors({ afterSubmit: error.code });
          setSubmitting(false);
        }
      }
    }
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <Page title="User: Verify ID Card | EVERIUM">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <Typography variant="h3" component="h1" gutterBottom>
          ยืนยันตัวตน
        </Typography>
        <Stack spacing={5}>
          <Card sx={{ p: 3 }}>
            <FormikProvider value={formik}>
              <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Grid item xs={12}>
                  <Stack spacing={{ xs: 2, md: 3 }}>
                    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                      <TextField
                        {...getFieldProps('firstName')}
                        fullWidth
                        label="ชื่อจริง"
                        error={Boolean(touched.firstName && errors.firstName)}
                        helperText={touched.firstName && errors.firstName}
                      />
                      <TextField
                        {...getFieldProps('lastName')}
                        fullWidth
                        label="นามสกุล"
                        error={Boolean(touched.lastName && errors.lastName)}
                        helperText={touched.lastName && errors.lastName}
                      />
                    </Stack>

                    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                      <TextField
                        {...getFieldProps('citizenID')}
                        fullWidth
                        label="เลขบัตรประชาชน"
                        error={Boolean(touched.citizenID && errors.citizenID)}
                        helperText={touched.citizenID && errors.citizenID}
                      />
                      <TextField
                        {...getFieldProps('phoneNumber')}
                        fullWidth
                        label="เบอร์โทรศัพท์"
                        error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                        helperText={touched.phoneNumber && errors.phoneNumber}
                      />
                    </Stack>
                  </Stack>
                </Grid>
                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                  <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                    บันทึกข้อมูล
                  </LoadingButton>
                </Box>
                <Typography variant="body2" color="textSecondary">
                  การกดบันทึกจะยืนยันตัวตนจะถือว่าคุณยินยอมให้เราทำการตรวจสอบข้อมูลของคุณ
                </Typography>
              </Form>
            </FormikProvider>
          </Card>
        </Stack>
      </Container>
    </Page>
  );
}
