import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import { Stack, Card, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hook
import useAuth from '../../../../hooks/useAuth';
import useIsMountedRef from '../../../../hooks/useIsMountedRef';
// ----------------------------------------------------------------------

export default function AccountChangePassword() {
  const { enqueueSnackbar } = useSnackbar();
  const { changePassword } = useAuth();
  const isMountedRef = useIsMountedRef();

  const ChangePassWordSchema = Yup.object().shape({
    oldPassword: Yup.string().required('กรุณากรอกรหัสผ่านเดิม'),
    newPassword: Yup.string().min(8, 'รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร').required('กรุณากรอกรหัสผ่านใหม่'),
    confirmNewPassword: Yup.string().oneOf([Yup.ref('newPassword'), null], 'รหัสผ่านไม่ตรงกัน')
  });

  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: ''
    },
    validationSchema: ChangePassWordSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        await changePassword(values.oldPassword, values.newPassword);
        enqueueSnackbar('Update success', { variant: 'success' });
        // clear form
        values.oldPassword = '';
        values.newPassword = '';
        values.confirmNewPassword = '';
        if (isMountedRef.current) {
          setSubmitting(false);
        }
      } catch (error) {
        console.log(error.response);
        enqueueSnackbar('Update Fail', { variant: 'error' });
        if (isMountedRef.current) {
          setErrors({ afterSubmit: error.code });
          setSubmitting(false);
        }
      }
    }
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <Card sx={{ p: 3 }}>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={3} alignItems="flex-end">
            <TextField
              {...getFieldProps('oldPassword')}
              fullWidth
              autoComplete="on"
              type="password"
              label="รหัสผ่านเดิม"
              error={Boolean(touched.oldPassword && errors.oldPassword)}
              helperText={touched.oldPassword && errors.oldPassword}
            />

            <TextField
              {...getFieldProps('newPassword')}
              fullWidth
              autoComplete="on"
              type="password"
              label="รหัสผ่านใหม่"
              error={Boolean(touched.newPassword && errors.newPassword)}
            />

            <TextField
              {...getFieldProps('confirmNewPassword')}
              fullWidth
              autoComplete="on"
              type="password"
              label="ยืนยันรหัสผ่านใหม่"
              error={Boolean(touched.confirmNewPassword && errors.confirmNewPassword)}
              helperText={touched.confirmNewPassword && errors.confirmNewPassword}
            />

            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
              ยืนยันการแก้ไข
            </LoadingButton>
          </Stack>
        </Form>
      </FormikProvider>
    </Card>
  );
}
