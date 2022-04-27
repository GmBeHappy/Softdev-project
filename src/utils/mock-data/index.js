import { sub } from 'date-fns';
//
import { role } from './role';
import { email } from './email';
import { boolean } from './boolean';
import { company } from './company';
import { phoneNumber } from './phoneNumber';
import { fullAddress, country } from './address';
import { firstName, lastName, fullName } from './name';
import { title, sentence, description } from './text';
import { price, rating, age, percent } from './number';

// ----------------------------------------------------------------------

const mockData = {
  id: (index) => `e99f09a7-dd88-49d5-b1c8-1daf80c2d7b${index + 1}`,
  email: (index) => email[index],
  phoneNumber: (index) => phoneNumber[index],
  time: (index) => sub(new Date(), { days: index, hours: index }),
  boolean: (index) => boolean[index],
  role: (index) => role[index],
  company: (index) => company[index],
  address: {
    fullAddress: (index) => fullAddress[index],
    country: (index) => country[index]
  },
  name: {
    firstName: (index) => firstName[index],
    lastName: (index) => lastName[index],
    fullName: (index) => fullName[index]
  },
  text: {
    title: (index) => title[index],
    sentence: (index) => sentence[index],
    description: (index) => description[index]
  },
  number: {
    percent: (index) => percent[index],
    rating: (index) => rating[index],
    age: (index) => age[index],
    price: (index) => price[index]
  },
  image: {
    cover: (index) => `/static/mock-images/covers/cover_${index + 1}.jpg`,
    feed: (index) => `/static/mock-images/feeds/feed_${index + 1}.jpg`,
    product: (index) => `/static/mock-images/products/product_${index + 1}.jpg`,
    avatar: (index) => `/static/mock-images/avatars/avatar_${index + 1}.jpg`,
    url: [
      `https://q-xx.bstatic.com/xdata/images/hotel/840x460/255255228.jpg?k=c85dced828d473b715a509ef0d322399c5153dd3e37cd89d89131d58c49a968c&o=`,
      `https://q-xx.bstatic.com/xdata/images/hotel/840x460/262801657.jpg?k=2a9c22b3900f4f9d0605af4116a5b03ba9a088c4b57145bbe5593dac0fc5a95e&o=`,
      `https://q-xx.bstatic.com/xdata/images/hotel/840x460/264464427.jpg?k=07ed1187f37e6dff3ecdf33d50ee92a9d523ac4eadfa021c083e9265ae692a83&o=`
    ]
  },
  Popular: [
    {
      price: `12,000`,
      bedRoom: 3,
      bathRoom: 2,
      floor: 21,
      size: 45,
      title: `คอนโดให้เช่า สไตล์มูจิคุมโทน ห้องกว้างสบาย พร้อมเข้าอยู่1`,
      detail: `อัพเดทล่าสุด 15/02/2022 13:07:50`,
      viewCount: 38,
      icon: `https://wallpaperaccess.com/full/2416004.jpg`,
      NameL1: `Circle Condominium`,
      NameL2: `(เซอร์เคิล คอนโดมิเนียม)`,
      images: [
        `https://q-xx.bstatic.com/xdata/images/hotel/840x460/255255228.jpg?k=c85dced828d473b715a509ef0d322399c5153dd3e37cd89d89131d58c49a968c&o=`,
        `https://q-xx.bstatic.com/xdata/images/hotel/840x460/262801657.jpg?k=2a9c22b3900f4f9d0605af4116a5b03ba9a088c4b57145bbe5593dac0fc5a95e&o=`,
        `https://q-xx.bstatic.com/xdata/images/hotel/840x460/264464427.jpg?k=07ed1187f37e6dff3ecdf33d50ee92a9d523ac4eadfa021c083e9265ae692a83&o=`,
        `https://q-xx.bstatic.com/xdata/images/hotel/840x460/264464413.jpg?k=de2908279ce2aa1435c8fadfb4c3766f2556e9022c094e7bc8946dbc71d26137&o=`,
        `https://q-xx.bstatic.com/xdata/images/hotel/840x460/264464396.jpg?k=f5855c40d46ce5bcf28ef21cc8b829a6f726f63922b0764c922511ef6704d41d&o=`
      ]
    },
    {
      price: `14,000`,
      bedRoom: 3,
      bathRoom: 2,
      floor: 18,
      size: 60,
      title: `คอนโดให้เช่า สไตล์มูจิคุมโทน ห้องกว้างสบาย พร้อมเข้าอยู่2`,
      detail: `อัพเดทล่าสุด 15/02/2022 13:07:50`,
      viewCount: 38,
      icon: `https://wallpaperaccess.com/full/2416004.jpg`,
      NameL1: `Circle Condominium`,
      NameL2: `(เซอร์เคิล คอนโดมิเนียม)`,
      images: [
        `https://www.nirvanadaii.com/uploaded/banner/H1fkbLgduE3Elijc16L9sYHDxW9fQnsdodXByPA1.jpg`,
        `https://www.nirvanadaii.com/uploaded/condo/BqJWJdqKAyUrc3P80yqTAyhXBW84F4prMrrNeX5K.jpg`,
        `https://www.nirvanadaii.com/uploaded/condo/gsleVtF0jIhvLswvI08RULW4ao0hiaAzrQ71DJV2.jpg`
      ]
    },
    {
      price: `16,000`,
      bedRoom: 4,
      bathRoom: 2,
      floor: 31,
      size: 75,
      title: `คอนโดให้เช่า สไตล์มูจิคุมโทน ห้องกว้างสบาย พร้อมเข้าอยู่3`,
      detail: `อัพเดทล่าสุด 15/02/2022 13:07:50`,
      viewCount: 38,
      icon: `https://wallpaperaccess.com/full/2416004.jpg`,
      NameL1: `Circle Condominium`,
      NameL2: `(เซอร์เคิล คอนโดมิเนียม)`,
      images: [
        `https://zmyhome.com//contentImg/3.jpg`,
        `https://zmyhome.com/public/uploads/files/513.jpg`,
        `https://zmyhome.com/public/uploads/files/5bbc86e014cc0.jpg`
      ]
    },
    {
      price: `18,000`,
      bedRoom: 4,
      bathRoom: 3,
      floor: 70,
      size: 85,
      title: `คอนโดให้เช่า สไตล์มูจิคุมโทน ห้องกว้างสบาย พร้อมเข้าอยู่4`,
      detail: `อัพเดทล่าสุด 15/02/2022 13:07:50`,
      viewCount: 38,
      icon: `https://wallpaperaccess.com/full/2416004.jpg`,
      NameL1: `Circle Condominium`,
      NameL2: `(เซอร์เคิล คอนโดมิเนียม)`,
      images: [
        `https://www.erawancondo.com/assets/images/w12-1280x850-800x531.jpg`,
        `https://www.erawancondo.com/assets/images/w15-1280x850-800x531.jpg`,
        `https://www.erawancondo.com/assets/images/w16-1280x850-800x531.jpg`,
        `https://www.erawancondo.com/assets/images/w6-1280x850-800x531.jpg`,
        `https://www.erawancondo.com/assets/images/w2s-1280x850-800x531.jpg`,
        `https://www.erawancondo.com/assets/images/w3s-1-1280x850-800x531.jpg`,
        `https://www.erawancondo.com/assets/images/w8-1280x850-800x531.jpg`,
        `https://www.erawancondo.com/assets/images/r15-800x531.jpg`,
        `https://www.erawancondo.com/assets/images/r16-800x531.jpg`
      ]
    }
  ],
  recent: [
    {
      type: 'Rent',
      img: 'https://www.erawancondo.com/assets/images/w12-1280x850-800x531.jpg',
      title: 'คอนโดให้เช่า สไตล์มูจิคุมโทน ห้องกว้างสบาย พร้อมเข้าอยู่',
      price: '14,000',
      unitType: '2 ห้องนอน/2 ห้องนำ้',
      roomSize: 45,
      floor: 35,
      icon: 'https://scontent.fbkk22-5.fna.fbcdn.net/v/t39.30808-6/272955380_2727493584063336_1270064504063369680_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=09cbfe&_nc_eui2=AeFmvF0vGbJL3iy9gOoDW5w63eUvN1AUQ6Hd5S83UBRDoR4vjjJnhrfE0OQ3Ch4sDJNqs-GVFXfqLd6YOX_0tYn7&_nc_ohc=ZJC1_UoS0AUAX9iFUdi&_nc_ht=scontent.fbkk22-5.fna&oh=00_AT8mvUjYU61JaI2tJrLDQ5kwxhTzVupQkCr0DfS9exNDbg&oe=62684CBE',
      Name: 'Pleum'
    },
    {
      type: 'Rent',
      img: 'https://zmyhome.com/public/uploads/files/513.jpg',
      title: 'คอนโดให้เช่า สไตล์มูจิคุมโทน ห้องกว้างสบาย พร้อมเข้าอยู่',
      price: '12,000',
      unitType: '2 ห้องนอน/2 ห้องนำ้',
      roomSize: 30,
      floor: 12,
      icon: 'https://scontent.fbkk22-5.fna.fbcdn.net/v/t39.30808-6/272955380_2727493584063336_1270064504063369680_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=09cbfe&_nc_eui2=AeFmvF0vGbJL3iy9gOoDW5w63eUvN1AUQ6Hd5S83UBRDoR4vjjJnhrfE0OQ3Ch4sDJNqs-GVFXfqLd6YOX_0tYn7&_nc_ohc=ZJC1_UoS0AUAX9iFUdi&_nc_ht=scontent.fbkk22-5.fna&oh=00_AT8mvUjYU61JaI2tJrLDQ5kwxhTzVupQkCr0DfS9exNDbg&oe=62684CBE',
      Name: 'Pleum'
    }
  ],
  recent_sale: [
    {
      type: 'Sale',
      img: 'https://zmyhome.com//contentImg/3.jpg',
      title: 'คอนโด สไตล์มูจิคุมโทน ห้องกว้างสบาย พร้อมเข้าอยู่',
      price: '2.4M',
      unitType: '2 ห้องนอน/2 ห้องนำ้',
      roomSize: 45,
      floor: 35,
      icon: 'https://scontent.fbkk22-5.fna.fbcdn.net/v/t39.30808-6/272955380_2727493584063336_1270064504063369680_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=09cbfe&_nc_eui2=AeFmvF0vGbJL3iy9gOoDW5w63eUvN1AUQ6Hd5S83UBRDoR4vjjJnhrfE0OQ3Ch4sDJNqs-GVFXfqLd6YOX_0tYn7&_nc_ohc=ZJC1_UoS0AUAX9iFUdi&_nc_ht=scontent.fbkk22-5.fna&oh=00_AT8mvUjYU61JaI2tJrLDQ5kwxhTzVupQkCr0DfS9exNDbg&oe=62684CBE',
      Name: 'Pleum'
    },
    {
      type: 'Sale',
      img: 'https://q-xx.bstatic.com/xdata/images/hotel/840x460/255255228.jpg?k=c85dced828d473b715a509ef0d322399c5153dd3e37cd89d89131d58c49a968c&o=',
      title: 'คอนโด สไตล์มูจิคุมโทน ห้องกว้างสบาย พร้อมเข้าอยู่',
      price: '2M',
      unitType: '2 ห้องนอน/2 ห้องนำ้',
      roomSize: 30,
      floor: 12,
      icon: 'https://scontent.fbkk22-5.fna.fbcdn.net/v/t39.30808-6/272955380_2727493584063336_1270064504063369680_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=09cbfe&_nc_eui2=AeFmvF0vGbJL3iy9gOoDW5w63eUvN1AUQ6Hd5S83UBRDoR4vjjJnhrfE0OQ3Ch4sDJNqs-GVFXfqLd6YOX_0tYn7&_nc_ohc=ZJC1_UoS0AUAX9iFUdi&_nc_ht=scontent.fbkk22-5.fna&oh=00_AT8mvUjYU61JaI2tJrLDQ5kwxhTzVupQkCr0DfS9exNDbg&oe=62684CBE',
      Name: 'Pleum'
    }
  ],
  PopularPost: {
    metadata: [
      {
        author: {
          ref: 'User',
          type: 'IDSomething1234'
        },
        status: 'published',
        postName: 'คอนโด สไตล์มูจิคุมโทน ห้องกว้างสบาย พร้อมเข้าอยู่',
        realEstate: {
          ref: 'RealEstate',
          type: 'IDSomethings5678'
        },
        location: 'ลาดกระบัง',
        detail: [
          'เฟอร์นิเจอร์',
          'เครื่องปรับอากาศ',
          'ประตู Digital',
          'TV',
          'ตู้เย็น',
          'Wifi ภายในห้อง',
          'โทรศัพท์บ้าน',
          'เครื่องทำนำ้อุ่น',
          'อ่างอาบนำ้',
          'เตาปรุงอาหาร',
          'เครื่องดูดควัน',
          'เครื่องซักผ้า'
        ],
        size: '45 ตร.ม.',
        floor: '15',
        bedRoom: '2',
        bathRoom: '2',
        type: 'คอนโด',
        contractType: 'Rent',
        price: '12,000',
        images: [
          `https://q-xx.bstatic.com/xdata/images/hotel/840x460/255255228.jpg?k=c85dced828d473b715a509ef0d322399c5153dd3e37cd89d89131d58c49a968c&o=`,
          `https://q-xx.bstatic.com/xdata/images/hotel/840x460/262801657.jpg?k=2a9c22b3900f4f9d0605af4116a5b03ba9a088c4b57145bbe5593dac0fc5a95e&o=`,
          `https://q-xx.bstatic.com/xdata/images/hotel/840x460/264464427.jpg?k=07ed1187f37e6dff3ecdf33d50ee92a9d523ac4eadfa021c083e9265ae692a83&o=`,
          `https://q-xx.bstatic.com/xdata/images/hotel/840x460/264464413.jpg?k=de2908279ce2aa1435c8fadfb4c3766f2556e9022c094e7bc8946dbc71d26137&o=`,
          `https://q-xx.bstatic.com/xdata/images/hotel/840x460/264464396.jpg?k=f5855c40d46ce5bcf28ef21cc8b829a6f726f63922b0764c922511ef6704d41d&o=`
        ],
        lastModified: Date('2012', '8', '8'),
        moreDetail: 'คอนโดดี ราคางาม',
        publishDate: Date(-(7 * 24 * 60 * 60 * 1000)),
        views: 50,
        icon: `https://wallpaperaccess.com/full/2416004.jpg`, //  not og
        NameL1: `Circle Condominium`,
        NameL2: `(เซอร์เคิล คอนโดมิเนียม)`
      },
      {
        author: {
          ref: 'User',
          type: 'IDSomething1235'
        },
        status: 'published',
        postName: 'คอนโด สไตล์มูจิคุมโทน ห้องกว้างสบาย พร้อมเข้าอยู่2',
        realEstate: {
          ref: 'RealEstate',
          type: 'IDSomethings5679'
        },
        location: 'ลาดกระบัง',
        detail: [
          'เฟอร์นิเจอร์',
          'เครื่องปรับอากาศ',
          'ประตู Digital',
          'TV',
          'ตู้เย็น',
          'Wifi ภายในห้อง',
          'เครื่องทำนำ้อุ่น',
          'อ่างอาบนำ้',
          'เตาปรุงอาหาร',
          'เครื่องดูดควัน',
          'เครื่องซักผ้า'
        ],
        size: '60 ตร.ม.',
        floor: '32',
        bedRoom: '2',
        bathRoom: '2',
        type: 'คอนโด',
        contractType: 'Rent',
        price: '14,000',
        images: [
          `https://www.nirvanadaii.com/uploaded/banner/H1fkbLgduE3Elijc16L9sYHDxW9fQnsdodXByPA1.jpg`,
          `https://www.nirvanadaii.com/uploaded/condo/BqJWJdqKAyUrc3P80yqTAyhXBW84F4prMrrNeX5K.jpg`,
          `https://www.nirvanadaii.com/uploaded/condo/gsleVtF0jIhvLswvI08RULW4ao0hiaAzrQ71DJV2.jpg`
        ],
        lastModified: Date(-(7 * 24 * 60 * 60 * 1000)),
        moreDetail: 'คอนโดดี ราคางาม',
        publishDate: Date(-(8 * 24 * 60 * 60 * 1000)),
        views: 45,
        icon: `https://wallpaperaccess.com/full/2416004.jpg`, //  not og
        NameL1: `Circle Condominium`,
        NameL2: `(เซอร์เคิล คอนโดมิเนียม)`
      },
      {
        author: {
          ref: 'User',
          type: 'IDSomething1236'
        },
        status: 'published',
        postName: 'คอนโด สไตล์มูจิคุมโทน ห้องกว้างสบาย พร้อมเข้าอยู่',
        realEstate: {
          ref: 'RealEstate',
          type: 'IDSomethings5680'
        },
        location: 'ลาดกระบัง',
        detail: [
          'เฟอร์นิเจอร์',
          'เครื่องปรับอากาศ',
          'TV',
          'ตู้เย็น',
          'Wifi ภายในห้อง',
          'โทรศัพท์บ้าน',
          'เครื่องทำนำ้อุ่น',
          'อ่างอาบนำ้'
        ],
        size: '55 ตร.ม.',
        floor: '2',
        bedRoom: '2',
        bathRoom: '2',
        type: 'คอนโด',
        contractType: 'Rent',
        price: '13,500',
        images: [
          `https://zmyhome.com//contentImg/3.jpg`,
          `https://zmyhome.com/public/uploads/files/513.jpg`,
          `https://zmyhome.com/public/uploads/files/5bbc86e014cc0.jpg`
        ],
        lastModified: Date(-(1 * 24 * 60 * 60 * 1000)),
        moreDetail: 'คอนโดดี ราคางาม',
        publishDate: Date(-(2 * 24 * 60 * 60 * 1000)),
        views: 158,
        icon: `https://wallpaperaccess.com/full/2416004.jpg`, //  not og
        NameL1: `Circle Condominium`,
        NameL2: `(เซอร์เคิล คอนโดมิเนียม)`
      },
      {
        author: {
          ref: 'User',
          type: 'IDSomething1237'
        },
        status: 'published',
        postName: 'คอนโด สไตล์มูจิคุมโทน ห้องกว้างสบาย พร้อมเข้าอยู่3',
        realEstate: {
          ref: 'RealEstate',
          type: 'IDSomethings5681'
        },
        location: 'ลาดกระบัง',
        detail: [
          'เฟอร์นิเจอร์',
          'เครื่องปรับอากาศ',
          'ประตู Digital',
          'TV',
          'ตู้เย็น',
          'Wifi ภายในห้อง',
          'โทรศัพท์บ้าน',
          'เครื่องทำนำ้อุ่น',
          'อ่างอาบนำ้',
          'เตาปรุงอาหาร',
          'เครื่องดูดควัน',
          'เครื่องซักผ้า'
        ],
        size: '80 ตร.ม.',
        floor: '15',
        bedRoom: '2',
        bathRoom: '2',
        type: 'คอนโด',
        contractType: 'Rent',
        price: '30,000',
        images: [
          `https://www.erawancondo.com/assets/images/w12-1280x850-800x531.jpg`,
          `https://www.erawancondo.com/assets/images/w15-1280x850-800x531.jpg`,
          `https://www.erawancondo.com/assets/images/w16-1280x850-800x531.jpg`,
          `https://www.erawancondo.com/assets/images/w6-1280x850-800x531.jpg`,
          `https://www.erawancondo.com/assets/images/w2s-1280x850-800x531.jpg`,
          `https://www.erawancondo.com/assets/images/w3s-1-1280x850-800x531.jpg`,
          `https://www.erawancondo.com/assets/images/w8-1280x850-800x531.jpg`,
          `https://www.erawancondo.com/assets/images/r15-800x531.jpg`,
          `https://www.erawancondo.com/assets/images/r16-800x531.jpg`
        ],
        lastModified: Date(),
        moreDetail: 'คอนโดดี ราคางาม',
        publishDate: Date(-(14 * 24 * 60 * 60 * 1000)),
        views: 5000,
        icon: `https://wallpaperaccess.com/full/2416004.jpg`, //  not og
        NameL1: `Circle Condominium`,
        NameL2: `(เซอร์เคิล คอนโดมิเนียม)`
      }
    ]
  }
};

export default mockData;
