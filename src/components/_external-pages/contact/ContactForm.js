import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import { Typography, TextField, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// axios
import axios from '../../../utils/axios';
// hook
import useIsMountedRef from '../../../hooks/useIsMountedRef';
//
import { varFadeInUp, MotionInView } from '../../animate';

// ----------------------------------------------------------------------

export default function ContactForm() {
  const { enqueueSnackbar } = useSnackbar();
  const isMountedRef = useIsMountedRef();

  const ContactFormSchema = Yup.object().shape({
    name: Yup.string().required('กรุณากรอกชื่อ'),
    email: Yup.string().required('กรุณากรอกอีเมล'),
    topic: Yup.string().required('กรุณากรอกหัวข้อ'),
    message: Yup.string().required('กรุณากรอกข้อความ')
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      topic: '',
      message: ''
    },
    validationSchema: ContactFormSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        await axios.post('/email/contact-staff', {
          senderName: values.name,
          email: values.email,
          topic: values.topic,
          message: values.message
        });
        enqueueSnackbar('Send success', { variant: 'success' });
        // clear form
        values.name = '';
        values.email = '';
        values.topic = '';
        values.message = '';
        if (isMountedRef.current) {
          setSubmitting(false);
        }
      } catch (error) {
        console.log(error);
        enqueueSnackbar('Send Fail', { variant: 'error' });
        if (isMountedRef.current) {
          setErrors({ afterSubmit: error.code });
          setSubmitting(false);
        }
      }
    }
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={5}>
          <MotionInView variants={varFadeInUp}>
            <Typography variant="h3">ติดต่อทีมงาน EVERIUM</Typography>
          </MotionInView>

          <Stack spacing={3}>
            <MotionInView variants={varFadeInUp}>
              <TextField
                {...getFieldProps('name')}
                fullWidth
                label="ชื่อ"
                error={Boolean(touched.name && errors.name)}
                helperText={touched.name && errors.name}
              />
            </MotionInView>

            <MotionInView variants={varFadeInUp}>
              <TextField
                {...getFieldProps('email')}
                fullWidth
                label="Email"
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email}
              />
            </MotionInView>

            <MotionInView variants={varFadeInUp}>
              <TextField
                {...getFieldProps('topic')}
                fullWidth
                label="หัวข้อ"
                error={Boolean(touched.topic && errors.topic)}
                helperText={touched.topic && errors.topic}
              />
            </MotionInView>

            <MotionInView variants={varFadeInUp}>
              <TextField
                {...getFieldProps('message')}
                fullWidth
                label="ข้อความที่ต้องการติดต่อ"
                multiline
                rows={4}
                error={Boolean(touched.message && errors.message)}
                helperText={touched.message && errors.message}
              />
            </MotionInView>
          </Stack>

          <MotionInView variants={varFadeInUp}>
            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
              ส่งข้อความ
            </LoadingButton>
          </MotionInView>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
