import * as Yup from 'yup';
import { paramCase } from 'change-case';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useMemo } from 'react';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { styled } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';
import { Container, Card, Grid, Stack, TextField, Typography, Autocomplete, InputAdornment } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// axios
import axios from '../../utils/axios';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import {
  FormProvider,
  RHFSelect,
  RHFEditor,
  RHFTextField,
  RHFRadioGroup,
  RHFUploadMultiFile,
  RHFMultiCheckbox,
  RHFCheckbox
} from '../../components/hook-form';

// ----------------------------------------------------------------------
const CONTRACT_TYPE_OPTION = [
  { label: 'ขาย', value: 'ขาย' },
  { label: 'เช่า', value: 'เช่า' },
  { label: 'ขาย/เช่า', value: 'ขาย/เช่า' }
];

const CATEGORY_OPTION = [
  { label: 'บ้านเดี่ยว', value: 'บ้านเดี่ยว' },
  { label: 'บ้านแฝด', value: 'บ้านแฝด' },
  { label: 'ทาวน์เฮ้าส์', value: 'ทาวน์เฮ้าส์' },
  { label: 'คอนโด', value: 'คอนโด' },
  { label: 'อพาร์ทเม้นท์', value: 'อพาร์ทเม้นท์' },
  { label: 'หอพัก', value: 'หอพัก' },
  { label: 'อาคารพาณิชย์', value: 'อาคารพาณิชย์' },
  { label: 'อาคารชุด', value: 'อาคารชุด' }
];

const FEATURES_OPTION1 = [
  { label: 'เฟอนิเจอร์', value: 'เฟอนิเจอร์' },
  { label: 'เครื่องปรับอากาศ', value: 'เครื่องปรับอากาศ' },
  { label: 'ตู้เย็น', value: 'ตู้เย็น' },
  { label: 'ทีวี', value: 'ทีวี' },
  { label: 'ประตูดิจิตอลล็อค', value: 'ประตูดิจิตอลล็อค' },
  { label: 'อินเทอร์เน็ต', value: 'อินเทอร์เน็ต' }
];

const FEATURES_OPTION2 = [
  { label: 'กล้องวงจรปิด', value: 'กล้องวงจรปิด' },
  { label: 'เครื่องทำน้ำอุ่น', value: 'เครื่องทำน้ำอุ่น' },
  { label: 'อ่างอาบน้ำ', value: 'อ่างอาบน้ำ' },
  { label: 'เครื่องครัว', value: 'เครื่องครัว' },
  { label: 'เครื่องดูดควัน', value: 'เครื่องดูดควัน' },
  { label: 'เครื่องซักผ้า', value: 'เครื่องซักผ้า' }
];

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1)
}));

// ----------------------------------------------------------------------
export default function CreateNewPostForm() {
  const { themeStretch } = useSettings();
  const { pathname } = useLocation();
  const { name } = useParams();
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const NewPostSchema = Yup.object().shape({
    postNameTH: Yup.string().required('กรุณากรอกหัวข้อประกาศ'),
    postNameEN: Yup.string().required('กรุณากรอกหัวข้อประกาศภาษาอังกฤษ'),
    realEstateName: Yup.string().required('กรุณากรอกชื่อโครงการ'),
    moreDetailTH: Yup.string().required('กรุณากรอกรายละเอียดประกาศ'),
    moreDetailEN: Yup.string().required('กรุณากรอกรายละเอียดประกาศภาษาอังกฤษ'),
    images: Yup.array().min(1, 'กรุณาแนบรูปภาพ'),
    bathrooms: Yup.number().required('กรุณากรอกจำนวนห้องน้ำ').typeError('กรุณากรอกจำนวนห้องน้ำเป็นตัวเลข'),
    bedrooms: Yup.number().required('กรุณากรอกจำนวนห้องนอน').typeError('กรุณากรอกจำนวนห้องนอนเป็นตัวเลข'),
    floor: Yup.number().required('กรุณากรอกจำนวนชั้น').typeError('กรุณากรอกจำนวนชั้นเป็นตัวเลข'),
    size: Yup.number().required('กรุณากรอกจำนวนพื้นที่').typeError('กรุณากรอกจำนวนพื้นที่เป็นตัวเลข'),
    price: Yup.number()
      .when('contractType', {
        is: (contractType) => contractType === 'ขาย' || contractType === 'ขาย/เช่า',
        then: Yup.number().required('กรุณากรอกราคาขาย').typeError('กรุณากรอกราคาขายเป็นตัวเลข')
      })
      .nullable(),
    pricePerMonth: Yup.number()
      .when('contractType', {
        is: (contractType) => contractType === 'เช่า' || contractType === 'ขาย/เช่า',
        then: Yup.number().required('กรุณากรอกราคาเช่า').typeError('กรุณากรอกราคาเช่าเป็นตัวเลข')
      })
      .nullable(),
    contactName: Yup.string().required('กรุณากรอกชื่อผู้ติดต่อ'),
    contactNumber: Yup.string().required('กรุณากรอกเบอร์โทรศัพท์ผู้ติดต่อ'),
    isAccept: Yup.boolean().oneOf([true], 'กรุณายอมรับข้อตกลง')
  });

  const defaultValues = useMemo(
    () => ({
      postNameTH: postNameTH || '',
      postNameEN: postNameEN || '',
      realEstateName: realEstateName || '',
      moreDetailTH: moreDetailTH || '',
      moreDetailEN: moreDetailEN || '',
      images: images || [],
      contractType: currentPost?.contractType || CONTRACT_TYPE_OPTION[2].value,
      category: currentPost?.category || CATEGORY_OPTION[0].value,
      bathrooms: currentPost?.bathrooms || null,
      bedrooms: currentPost?.bedrooms || null,
      floor: currentPost?.floor || null,
      size: currentPost?.size || null,
      price: currentPost?.price || null,
      pricePerMonth: currentPost?.pricePerMonth || null,
      features: currentPost?.features || [],
      contactName: currentPost?.contactName || '',
      contactNumber: currentPost?.contactNumber || '',
      isAccept: currentPost?.isAccept || false
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentPost]
  );

  const methods = useForm({
    resolver: yupResolver(NewPostSchema),
    defaultValues
  });

  const {
    reset,
    watch,
    control,
    setValue,
    getValues,
    handleSubmit,
    formState: { isSubmitting }
  } = methods;

  const values = watch();

  useEffect(() => {
    if (isEdit && currentPost) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentPost]);

  const onSubmit = async () => {
    try {
      console.log('dddd');
      const formValues = getValues();
      // const {
      //   postNameTH,
      //   postNameEN,
      //   realEstateName,
      //   moreDetailTH,
      //   moreDetailEN,
      //   images,
      //   contractType,
      //   category,
      //   bathrooms,
      //   bedrooms,
      //   floor,
      //   size,
      //   price,
      //   pricePerMonth,
      //   features,
      //   contactName,
      //   contactNumber,
      //   isAccept
      // } = formValues;
      console.log(formValues);
      // const response = await axios.post('/posts/publish', {
      //   postNameTH,
      //   postNameEN,
      //   realEstat: realEstateName,
      // }
      // );
      reset();
      enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
      // navigate(PATH_DASHBOARD.eCommerce.list);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const images = values.images || [];

      setValue('images', [
        ...images,
        ...acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      ]);
    },
    [setValue, values.images]
  );

  const handleRemoveAll = () => {
    setValue('images', []);
  };

  const handleRemove = (file) => {
    const filteredItems = values.images?.filter((_file) => _file !== file);
    setValue('images', filteredItems);
  };

  return (
    <Page title="Create a new post | EVERIUM">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <Typography variant="h3" component="h1" gutterBottom>
          สร้างประกาศใหม่
        </Typography>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Card sx={{ p: 3 }}>
                <Stack spacing={3}>
                  <div>
                    <LabelStyle>หัวข้อประกาศ</LabelStyle>
                    <RHFTextField name="postNameTH" label="หัวข้อประกาศ(ภาษาไทย)" />
                  </div>
                  <RHFTextField name="postNameEN" label="หัวข้อประกาศ(English)" />

                  <div>
                    <LabelStyle>รายละเอียดโครงการ</LabelStyle>
                    <Controller
                      name="realEstateName"
                      control={control}
                      render={({ field, fieldState: { error } }) => (
                        <Autocomplete
                          {...field}
                          fullWidth
                          onChange={(event, newValue) => field.onChange(newValue)}
                          options={['1', '2', '3']}
                          renderInput={(params) => (
                            <TextField label="ชื่อโครงการ" {...params} error={!!error} helperText={error?.message} />
                          )}
                        />
                      )}
                    />
                  </div>

                  <RHFEditor simple name="moreDetailTH" label="รายละเอียดเพิ่มเติม (ภาษาไทย)" />
                  <RHFEditor simple name="moreDetailEN" label="รายละเอียดเพิ่มเติม (English)" />

                  <div>
                    <LabelStyle>แนบรูปภาพ</LabelStyle>
                    <RHFUploadMultiFile
                      showPreview
                      name="images"
                      accept="image/*"
                      maxSize={3145728}
                      onDrop={handleDrop}
                      onRemove={handleRemove}
                      onRemoveAll={handleRemoveAll}
                      onUpload={() => console.log('ON UPLOAD')}
                    />
                  </div>
                </Stack>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Stack spacing={3}>
                <Card sx={{ p: 3 }}>
                  <Stack spacing={3} mt={2}>
                    <div>
                      <LabelStyle>ประเภทสัญญา</LabelStyle>
                      <RHFRadioGroup
                        name="contractType"
                        options={CONTRACT_TYPE_OPTION}
                        sx={{
                          '& .MuiFormControlLabel-root': { mr: 4 }
                        }}
                      />
                    </div>

                    <RHFSelect name="category" label="ประเภทอสังหาฯ">
                      {CATEGORY_OPTION.map((category) => (
                        <option key={category.value} label={category.label}>
                          {category.label}
                        </option>
                      ))}
                    </RHFSelect>
                    <RHFTextField
                      name="bedrooms"
                      label="จำนวนห้องนอน"
                      value={getValues('bedrooms') === 0 ? '' : getValues('bedrooms')}
                      onChange={(event) => setValue('bedrooms', Number(event.target.value))}
                      InputProps={{
                        type: 'number'
                      }}
                    />
                    <RHFTextField
                      name="bathrooms"
                      label="จำนวนห้องน้ำ"
                      value={getValues('bathrooms') === 0 ? '' : getValues('bathrooms')}
                      onChange={(event) => setValue('bathrooms', Number(event.target.value))}
                      InputProps={{
                        type: 'number'
                      }}
                    />
                    <RHFTextField
                      name="floor"
                      label="จำนวนชั้น"
                      value={getValues('floor') === 0 ? '' : getValues('floor')}
                      onChange={(event) => setValue('floor', Number(event.target.value))}
                      InputProps={{
                        type: 'number'
                      }}
                    />
                    <RHFTextField
                      name="size"
                      label="ขนาดพื้นที่"
                      value={getValues('size') === 0 ? '' : getValues('size')}
                      onChange={(event) => setValue('size', Number(event.target.value))}
                      InputProps={{
                        type: 'number'
                      }}
                    />
                    <div>
                      <LabelStyle>สิ่งอำนวยความสะดวก</LabelStyle>
                      <Grid container spacing={1} md>
                        <Grid item xs={6}>
                          <RHFMultiCheckbox name="features" options={FEATURES_OPTION1} />
                        </Grid>
                        <Grid item xs={6}>
                          <RHFMultiCheckbox name="features" options={FEATURES_OPTION2} />
                        </Grid>
                      </Grid>
                    </div>
                  </Stack>
                </Card>

                <Card sx={{ p: 3 }}>
                  <Stack spacing={3} mb={2}>
                    <div>
                      <LabelStyle>ราคา</LabelStyle>
                      {getValues('contractType') === 'ขาย' && (
                        <RHFTextField
                          name="price"
                          label="ราคา"
                          value={getValues('price') === 0 ? '' : getValues('price')}
                          onChange={(event) => setValue('price', Number(event.target.value))}
                          InputProps={{
                            endAdornment: <InputAdornment position="end">บาท</InputAdornment>,
                            type: 'number'
                          }}
                        />
                      )}
                      {getValues('contractType') === 'เช่า' && (
                        <RHFTextField
                          name="price"
                          label="ราคา"
                          value={getValues('price') === 0 ? '' : getValues('price')}
                          onChange={(event) => setValue('price', Number(event.target.value))}
                          InputProps={{
                            endAdornment: <InputAdornment position="end">บาท/เดือน</InputAdornment>,
                            type: 'number'
                          }}
                        />
                      )}
                      {getValues('contractType') === 'ขาย/เช่า' && (
                        <RHFTextField
                          name="price"
                          label="ราคา"
                          value={getValues('price') === 0 ? '' : getValues('price')}
                          onChange={(event) => setValue('price', Number(event.target.value))}
                          InputProps={{
                            endAdornment: <InputAdornment position="end">บาท</InputAdornment>,
                            type: 'number'
                          }}
                        />
                      )}
                    </div>
                    {getValues('contractType') === 'ขาย/เช่า' && (
                      <RHFTextField
                        name="pricePerMonth"
                        label="ราคา"
                        value={getValues('pricePerMonth') === 0 ? '' : getValues('pricePerMonth')}
                        onChange={(event) => setValue('pricePerMonth', Number(event.target.value))}
                        InputProps={{
                          endAdornment: <InputAdornment position="end">บาท/เดือน</InputAdornment>,
                          type: 'number'
                        }}
                      />
                    )}
                  </Stack>
                </Card>

                <Card sx={{ p: 3 }}>
                  <Stack spacing={3} mb={2}>
                    <div>
                      <LabelStyle>ช่องทางติดต่อ</LabelStyle>
                      <RHFTextField name="contactName" label="ชื่อผู้ติดต่อ" />
                    </div>
                    <RHFTextField name="contactNumber" label="เบอร์โทรติดต่อ" />
                  </Stack>
                </Card>
                <Card sx={{ p: 3 }}>
                  <Stack spacing={3} mb={2}>
                    <div>
                      <LabelStyle>ข้อตกลงในการลงประกาศ</LabelStyle>
                      <Typography variant="body2">
                        ในการลงประกาศบนเว็บ Everium คุณยืนยันว่าได้อ่าน ข้อตกลงในการลงประกาศ
                        พร้อมทั้งยอมรับข้อตกลงและจะปฏิบัติตามข้อตกลงดังกล่าวอย่างเคร่งครัด
                        และคุณยอมรับให้ทีมงานลบประกาศที่ผิดกฏโดยไม่แจ้งให้ทราบล่วงหน้า
                      </Typography>
                      <RHFCheckbox name="isActive" label="ยอมรับข้อตกลง" />
                    </div>
                  </Stack>
                </Card>
                <LoadingButton type="button" variant="contained" size="large" color="inherit">
                  บันทึกร่าง
                </LoadingButton>
                <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
                  ลงประกาศ
                </LoadingButton>
              </Stack>
            </Grid>
          </Grid>
        </FormProvider>
      </Container>
    </Page>
  );
}
