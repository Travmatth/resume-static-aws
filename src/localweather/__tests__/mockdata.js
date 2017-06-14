/* @flow */
import { OPEN_WEATHER_APPID } from 'common/js/api_keys';
import type { Weather } from '../localweather.types';

export const url =
  'http://api.openweathermap.org/' +
  'data/2.5/forecast?' +
  'lat=0&' +
  'lon=0&' +
  'units=imperial&' +
  'APPID=' +
  OPEN_WEATHER_APPID;

// curl -XPOST -H "Content-type: application/json" 'http://api.openweathermap.org/data/2.5/forecast?lat=40.712784&lon=-74.005941&units=imperial&APPID=c26ef1df98c449f37f8f199738ce74c7'

export const data: Weather = {
  city: 'New York',
  now: 1482623395150,
  forecasts: [
    {
      day: 'Thursday, December 15th',
      icon: 'http://openweathermap.org/img/w/01n.png',
      rain: 0,
      snow: 0.0025,
      description: 'clear sky',
      weather: 'Clear',
      cloud: 36,
      temp: {
        celsius: -2,
        fahrenheit: 28.74,
      },
      time: '1:00',
    },
    {
      day: '',
      icon: 'http://openweathermap.org/img/w/13n.png',
      rain: 0,
      snow: 0.2075,
      description: 'light snow',
      weather: 'Snow',
      cloud: 20,
      temp: {
        celsius: -2,
        fahrenheit: 27.82,
      },
      time: '4:00',
    },
    {
      day: '',
      icon: 'http://openweathermap.org/img/w/01n.png',
      rain: 0,
      snow: 0,
      description: 'clear sky',
      weather: 'Clear',
      cloud: 0,
      temp: {
        celsius: -4,
        fahrenheit: 24.08,
      },
      time: '7:00',
    },
    {
      day: '',
      icon: 'http://openweathermap.org/img/w/02d.png',
      rain: 0,
      snow: 0,
      description: 'few clouds',
      weather: 'Clouds',
      cloud: 12,
      temp: {
        celsius: -4,
        fahrenheit: 24.48,
      },
      time: '10:00',
    },
    {
      day: '',
      icon: 'http://openweathermap.org/img/w/02d.png',
      rain: 0,
      snow: 0,
      description: 'few clouds',
      weather: 'Clouds',
      cloud: 24,
      temp: {
        celsius: -4,
        fahrenheit: 24.8,
      },
      time: '1:00',
    },
    {
      day: '',
      icon: 'http://openweathermap.org/img/w/01d.png',
      rain: 0,
      snow: 0.005,
      description: 'clear sky',
      weather: 'Clear',
      cloud: 36,
      temp: {
        celsius: -5,
        fahrenheit: 23.62,
      },
      time: '4:00',
    },
    {
      day: '',
      icon: 'http://openweathermap.org/img/w/01n.png',
      rain: 0,
      snow: 0.0025,
      description: 'clear sky',
      weather: 'Clear',
      cloud: 44,
      temp: {
        celsius: -5,
        fahrenheit: 23.46,
      },
      time: '7:00',
    },
    {
      day: '',
      icon: 'http://openweathermap.org/img/w/01n.png',
      rain: 0,
      snow: 0.0075,
      description: 'clear sky',
      weather: 'Clear',
      cloud: 48,
      temp: {
        celsius: -4,
        fahrenheit: 24.75,
      },
      time: '10:00',
    },
    {
      day: 'Friday, December 16th',
      icon: 'http://openweathermap.org/img/w/01n.png',
      rain: 0,
      snow: 0.0025,
      description: 'clear sky',
      weather: 'Clear',
      cloud: 56,
      temp: {
        celsius: -4,
        fahrenheit: 25.64,
      },
      time: '1:00',
    },
    {
      day: '',
      icon: 'http://openweathermap.org/img/w/01n.png',
      rain: 0,
      snow: 0.0075,
      description: 'clear sky',
      weather: 'Clear',
      cloud: 64,
      temp: {
        celsius: -3,
        fahrenheit: 26.21,
      },
      time: '4:00',
    },
    {
      day: '',
      icon: 'http://openweathermap.org/img/w/04n.png',
      rain: 0,
      snow: 0,
      description: 'broken clouds',
      weather: 'Clouds',
      cloud: 76,
      temp: {
        celsius: -3,
        fahrenheit: 26.33,
      },
      time: '7:00',
    },
    {
      day: '',
      icon: 'http://openweathermap.org/img/w/02d.png',
      rain: 0,
      snow: 0,
      description: 'clear sky',
      weather: 'Clear',
      cloud: 8,
      temp: {
        celsius: -2,
        fahrenheit: 27.9,
      },
      time: '10:00',
    },
    {
      day: '',
      icon: 'http://openweathermap.org/img/w/01d.png',
      rain: 0,
      snow: 0,
      description: 'clear sky',
      weather: 'Clear',
      cloud: 0,
      temp: {
        celsius: -1,
        fahrenheit: 30.07,
      },
      time: '1:00',
    },
    {
      day: '',
      icon: 'http://openweathermap.org/img/w/02d.png',
      rain: 0,
      snow: 0,
      description: 'few clouds',
      weather: 'Clouds',
      cloud: 20,
      temp: {
        celsius: -2,
        fahrenheit: 29.2,
      },
      time: '4:00',
    },
    {
      day: '',
      icon: 'http://openweathermap.org/img/w/02n.png',
      rain: 0,
      snow: 0,
      description: 'clear sky',
      weather: 'Clear',
      cloud: 8,
      temp: {
        celsius: -4,
        fahrenheit: 25.58,
      },
      time: '7:00',
    },
    {
      day: '',
      icon: 'http://openweathermap.org/img/w/04n.png',
      rain: 0,
      snow: 0,
      description: 'broken clouds',
      weather: 'Clouds',
      cloud: 64,
      temp: {
        celsius: -3,
        fahrenheit: 26.36,
      },
      time: '10:00',
    },
    {
      day: 'Saturday, December 17th',
      icon: 'http://openweathermap.org/img/w/13n.png',
      rain: 0,
      snow: 0.2925,
      description: 'light snow',
      weather: 'Snow',
      cloud: 88,
      temp: {
        celsius: -3,
        fahrenheit: 26.71,
      },
      time: '1:00',
    },
    {
      day: '',
      icon: 'http://openweathermap.org/img/w/13n.png',
      rain: 0,
      snow: 1.19,
      description: 'light snow',
      weather: 'Snow',
      cloud: 88,
      temp: {
        celsius: -3,
        fahrenheit: 27.38,
      },
      time: '4:00',
    },
    {
      day: '',
      icon: 'http://openweathermap.org/img/w/13n.png',
      rain: 0,
      snow: 2.4525,
      description: 'snow',
      weather: 'Snow',
      cloud: 92,
      temp: {
        celsius: -2,
        fahrenheit: 29.02,
      },
      time: '7:00',
    },
    {
      day: '',
      icon: 'http://openweathermap.org/img/w/10d.png',
      rain: 0.0075,
      snow: 5.3125,
      description: 'light rain',
      weather: 'Rain',
      cloud: 92,
      temp: {
        celsius: 1,
        fahrenheit: 33.08,
      },
      time: '10:00',
    },
    {
      day: '',
      icon: 'http://openweathermap.org/img/w/10d.png',
      rain: 0.26,
      snow: 2.9725,
      description: 'light rain',
      weather: 'Rain',
      cloud: 100,
      temp: {
        celsius: 1,
        fahrenheit: 34.66,
      },
      time: '1:00',
    },
    {
      day: '',
      icon: 'http://openweathermap.org/img/w/10d.png',
      rain: 1.21,
      snow: 0,
      description: 'light rain',
      weather: 'Rain',
      cloud: 92,
      temp: {
        celsius: 2,
        fahrenheit: 35.84,
      },
      time: '4:00',
    },
    {
      day: '',
      icon: 'http://openweathermap.org/img/w/10n.png',
      rain: 1.63,
      snow: 0,
      description: 'light rain',
      weather: 'Rain',
      cloud: 92,
      temp: {
        celsius: 3,
        fahrenheit: 36.65,
      },
      time: '7:00',
    },
    {
      day: '',
      icon: 'http://openweathermap.org/img/w/10n.png',
      rain: 0.57,
      snow: 0,
      description: 'light rain',
      weather: 'Rain',
      cloud: 100,
      temp: {
        celsius: 3,
        fahrenheit: 38.22,
      },
      time: '10:00',
    },
    {
      day: 'Sunday, December 18th',
      icon: 'http://openweathermap.org/img/w/10n.png',
      rain: 0.03,
      snow: 0,
      description: 'light rain',
      weather: 'Rain',
      cloud: 92,
      temp: {
        celsius: 6,
        fahrenheit: 43.09,
      },
      time: '1:00',
    },
    {
      day: '',
      icon: 'http://openweathermap.org/img/w/10n.png',
      rain: 0.41,
      snow: 0,
      description: 'light rain',
      weather: 'Rain',
      cloud: 92,
      temp: {
        celsius: 9,
        fahrenheit: 48.14,
      },
      time: '4:00',
    },
    {
      day: '',
      icon: 'http://openweathermap.org/img/w/10n.png',
      rain: 0.52,
      snow: 0,
      description: 'light rain',
      weather: 'Rain',
      cloud: 92,
      temp: {
        celsius: 12,
        fahrenheit: 52.94,
      },
      time: '7:00',
    },
    {
      day: '',
      icon: 'http://openweathermap.org/img/w/10d.png',
      rain: 0.5625,
      snow: 0,
      description: 'light rain',
      weather: 'Rain',
      cloud: 92,
      temp: {
        celsius: 14,
        fahrenheit: 56.59,
      },
      time: '10:00',
    },
    {
      day: '',
      icon: 'http://openweathermap.org/img/w/10d.png',
      rain: 2.5,
      snow: 0,
      description: 'light rain',
      weather: 'Rain',
      cloud: 64,
      temp: {
        celsius: 14,
        fahrenheit: 56.35,
      },
      time: '1:00',
    },
    {
      day: '',
      icon: 'http://openweathermap.org/img/w/10d.png',
      rain: 2.4875,
      snow: 0,
      description: 'light rain',
      weather: 'Rain',
      cloud: 92,
      temp: {
        celsius: 10,
        fahrenheit: 50.01,
      },
      time: '4:00',
    },
    {
      day: '',
      icon: 'http://openweathermap.org/img/w/10n.png',
      rain: 0.4625,
      snow: 0,
      description: 'light rain',
      weather: 'Rain',
      cloud: 92,
      temp: {
        celsius: 7,
        fahrenheit: 44.39,
      },
      time: '7:00',
    },
    {
      day: '',
      icon: 'http://openweathermap.org/img/w/04n.png',
      rain: 0,
      snow: 0,
      description: 'overcast clouds',
      weather: 'Clouds',
      cloud: 92,
      temp: {
        celsius: 4,
        fahrenheit: 39.65,
      },
      time: '10:00',
    },
    {
      day: 'Monday, December 19th',
      icon: 'http://openweathermap.org/img/w/04n.png',
      rain: 0,
      snow: 0,
      description: 'broken clouds',
      weather: 'Clouds',
      cloud: 68,
      temp: {
        celsius: 1,
        fahrenheit: 34.63,
      },
      time: '1:00',
    },
    {
      day: '',
      icon: 'http://openweathermap.org/img/w/01n.png',
      rain: 0,
      snow: 0,
      description: 'clear sky',
      weather: 'Clear',
      cloud: 0,
      temp: {
        celsius: -1,
        fahrenheit: 29.74,
      },
      time: '4:00',
    },
    {
      day: '',
      icon: 'http://openweathermap.org/img/w/01n.png',
      rain: 0,
      snow: 0,
      description: 'clear sky',
      weather: 'Clear',
      cloud: 0,
      temp: {
        celsius: -3,
        fahrenheit: 27.43,
      },
      time: '7:00',
    },
    {
      day: '',
      icon: 'http://openweathermap.org/img/w/01d.png',
      rain: 0,
      snow: 0,
      description: 'clear sky',
      weather: 'Clear',
      cloud: 0,
      temp: {
        celsius: -1,
        fahrenheit: 29.65,
      },
      time: '10:00',
    },
    {
      day: '',
      icon: 'http://openweathermap.org/img/w/01d.png',
      rain: 0,
      snow: 0,
      description: 'clear sky',
      weather: 'Clear',
      cloud: 0,
      temp: {
        celsius: -0,
        fahrenheit: 31.2,
      },
      time: '1:00',
    },
    {
      day: '',
      icon: 'http://openweathermap.org/img/w/02d.png',
      rain: 0,
      snow: 0,
      description: 'few clouds',
      weather: 'Clouds',
      cloud: 12,
      temp: {
        celsius: -1,
        fahrenheit: 30.38,
      },
      time: '4:00',
    },
  ],
};

export const response = {
  city: {
    id: 5128581,
    name: 'New York',
    coord: {
      lon: -74.005966,
      lat: 40.714272,
    },
    country: 'US',
    population: 0,
    sys: {
      population: 0,
    },
  },
  cod: '200',
  message: 0.0175,
  cnt: 38,
  list: [
    {
      dt: 1481781600,
      main: {
        temp: 28.74,
        temp_min: 28.74,
        temp_max: 30.17,
        pressure: 1020.8,
        sea_level: 1024.25,
        grnd_level: 1020.8,
        humidity: 98,
        temp_kf: -0.79,
      },
      weather: [
        {
          id: 800,
          main: 'Clear',
          description: 'clear sky',
          icon: '01n',
        },
      ],
      clouds: {
        all: 36,
      },
      wind: {
        speed: 11.21,
        deg: 248.001,
      },
      rain: {},
      snow: {
        '3h': 0.0025,
      },
      sys: {
        pod: 'n',
      },
      dt_txt: '2016-12-15 06:00:00',
    },
    {
      dt: 1481792400,
      main: {
        temp: 27.82,
        temp_min: 27.82,
        temp_max: 28.89,
        pressure: 1018.46,
        sea_level: 1022.03,
        grnd_level: 1018.46,
        humidity: 100,
        temp_kf: -0.59,
      },
      weather: [
        {
          id: 600,
          main: 'Snow',
          description: 'light snow',
          icon: '13n',
        },
      ],
      clouds: {
        all: 20,
      },
      wind: {
        speed: 13.42,
        deg: 264.003,
      },
      rain: {},
      snow: {
        '3h': 0.2075,
      },
      sys: {
        pod: 'n',
      },
      dt_txt: '2016-12-15 09:00:00',
    },
    {
      dt: 1481803200,
      main: {
        temp: 24.08,
        temp_min: 24.08,
        temp_max: 24.79,
        pressure: 1019.45,
        sea_level: 1022.97,
        grnd_level: 1019.45,
        humidity: 100,
        temp_kf: -0.39,
      },
      weather: [
        {
          id: 800,
          main: 'Clear',
          description: 'clear sky',
          icon: '01n',
        },
      ],
      clouds: {
        all: 0,
      },
      wind: {
        speed: 15.93,
        deg: 280.505,
      },
      rain: {},
      snow: {},
      sys: {
        pod: 'n',
      },
      dt_txt: '2016-12-15 12:00:00',
    },
    {
      dt: 1481814000,
      main: {
        temp: 24.48,
        temp_min: 24.48,
        temp_max: 24.83,
        pressure: 1021.01,
        sea_level: 1024.64,
        grnd_level: 1021.01,
        humidity: 100,
        temp_kf: -0.2,
      },
      weather: [
        {
          id: 801,
          main: 'Clouds',
          description: 'few clouds',
          icon: '02d',
        },
      ],
      clouds: {
        all: 12,
      },
      wind: {
        speed: 16.93,
        deg: 285.501,
      },
      rain: {},
      snow: {},
      sys: {
        pod: 'd',
      },
      dt_txt: '2016-12-15 15:00:00',
    },
    {
      dt: 1481824800,
      main: {
        temp: 24.8,
        temp_min: 24.8,
        temp_max: 24.8,
        pressure: 1022.07,
        sea_level: 1025.69,
        grnd_level: 1022.07,
        humidity: 100,
        temp_kf: 0,
      },
      weather: [
        {
          id: 801,
          main: 'Clouds',
          description: 'few clouds',
          icon: '02d',
        },
      ],
      clouds: {
        all: 24,
      },
      wind: {
        speed: 18.59,
        deg: 302.501,
      },
      rain: {},
      snow: {},
      sys: {
        pod: 'd',
      },
      dt_txt: '2016-12-15 18:00:00',
    },
    {
      dt: 1481835600,
      main: {
        temp: 23.62,
        temp_min: 23.62,
        temp_max: 23.62,
        pressure: 1025.4,
        sea_level: 1028.98,
        grnd_level: 1025.4,
        humidity: 100,
        temp_kf: 0,
      },
      weather: [
        {
          id: 800,
          main: 'Clear',
          description: 'clear sky',
          icon: '01d',
        },
      ],
      clouds: {
        all: 36,
      },
      wind: {
        speed: 15.46,
        deg: 306.502,
      },
      rain: {},
      snow: {
        '3h': 0.005,
      },
      sys: {
        pod: 'd',
      },
      dt_txt: '2016-12-15 21:00:00',
    },
    {
      dt: 1481846400,
      main: {
        temp: 23.46,
        temp_min: 23.46,
        temp_max: 23.46,
        pressure: 1027.65,
        sea_level: 1031.17,
        grnd_level: 1027.65,
        humidity: 100,
        temp_kf: 0,
      },
      weather: [
        {
          id: 800,
          main: 'Clear',
          description: 'clear sky',
          icon: '01n',
        },
      ],
      clouds: {
        all: 44,
      },
      wind: {
        speed: 15.01,
        deg: 279.001,
      },
      rain: {},
      snow: {
        '3h': 0.0025,
      },
      sys: {
        pod: 'n',
      },
      dt_txt: '2016-12-16 00:00:00',
    },
    {
      dt: 1481857200,
      main: {
        temp: 24.75,
        temp_min: 24.75,
        temp_max: 24.75,
        pressure: 1028.3,
        sea_level: 1031.96,
        grnd_level: 1028.3,
        humidity: 100,
        temp_kf: 0,
      },
      weather: [
        {
          id: 800,
          main: 'Clear',
          description: 'clear sky',
          icon: '01n',
        },
      ],
      clouds: {
        all: 48,
      },
      wind: {
        speed: 17.34,
        deg: 276.001,
      },
      rain: {},
      snow: {
        '3h': 0.0075,
      },
      sys: {
        pod: 'n',
      },
      dt_txt: '2016-12-16 03:00:00',
    },
    {
      dt: 1481868000,
      main: {
        temp: 25.64,
        temp_min: 25.64,
        temp_max: 25.64,
        pressure: 1029.56,
        sea_level: 1033.28,
        grnd_level: 1029.56,
        humidity: 100,
        temp_kf: 0,
      },
      weather: [
        {
          id: 800,
          main: 'Clear',
          description: 'clear sky',
          icon: '01n',
        },
      ],
      clouds: {
        all: 56,
      },
      wind: {
        speed: 15.77,
        deg: 281,
      },
      rain: {},
      snow: {
        '3h': 0.0025,
      },
      sys: {
        pod: 'n',
      },
      dt_txt: '2016-12-16 06:00:00',
    },
    {
      dt: 1481878800,
      main: {
        temp: 26.21,
        temp_min: 26.21,
        temp_max: 26.21,
        pressure: 1031.53,
        sea_level: 1035.18,
        grnd_level: 1031.53,
        humidity: 100,
        temp_kf: 0,
      },
      weather: [
        {
          id: 800,
          main: 'Clear',
          description: 'clear sky',
          icon: '01n',
        },
      ],
      clouds: {
        all: 64,
      },
      wind: {
        speed: 13.89,
        deg: 290.001,
      },
      rain: {},
      snow: {
        '3h': 0.0075,
      },
      sys: {
        pod: 'n',
      },
      dt_txt: '2016-12-16 09:00:00',
    },
    {
      dt: 1481889600,
      main: {
        temp: 26.33,
        temp_min: 26.33,
        temp_max: 26.33,
        pressure: 1034.6,
        sea_level: 1038.33,
        grnd_level: 1034.6,
        humidity: 100,
        temp_kf: 0,
      },
      weather: [
        {
          id: 803,
          main: 'Clouds',
          description: 'broken clouds',
          icon: '04n',
        },
      ],
      clouds: {
        all: 76,
      },
      wind: {
        speed: 11.68,
        deg: 303.001,
      },
      rain: {},
      snow: {},
      sys: {
        pod: 'n',
      },
      dt_txt: '2016-12-16 12:00:00',
    },
    {
      dt: 1481900400,
      main: {
        temp: 27.9,
        temp_min: 27.9,
        temp_max: 27.9,
        pressure: 1037.37,
        sea_level: 1041.02,
        grnd_level: 1037.37,
        humidity: 100,
        temp_kf: 0,
      },
      weather: [
        {
          id: 800,
          main: 'Clear',
          description: 'clear sky',
          icon: '02d',
        },
      ],
      clouds: {
        all: 8,
      },
      wind: {
        speed: 9.66,
        deg: 314.001,
      },
      rain: {},
      snow: {},
      sys: {
        pod: 'd',
      },
      dt_txt: '2016-12-16 15:00:00',
    },
    {
      dt: 1481911200,
      main: {
        temp: 30.07,
        temp_min: 30.07,
        temp_max: 30.07,
        pressure: 1036.96,
        sea_level: 1040.61,
        grnd_level: 1036.96,
        humidity: 100,
        temp_kf: 0,
      },
      weather: [
        {
          id: 800,
          main: 'Clear',
          description: 'clear sky',
          icon: '01d',
        },
      ],
      clouds: {
        all: 0,
      },
      wind: {
        speed: 7.92,
        deg: 303.507,
      },
      rain: {},
      snow: {},
      sys: {
        pod: 'd',
      },
      dt_txt: '2016-12-16 18:00:00',
    },
    {
      dt: 1481922000,
      main: {
        temp: 29.2,
        temp_min: 29.2,
        temp_max: 29.2,
        pressure: 1037.82,
        sea_level: 1041.38,
        grnd_level: 1037.82,
        humidity: 100,
        temp_kf: 0,
      },
      weather: [
        {
          id: 801,
          main: 'Clouds',
          description: 'few clouds',
          icon: '02d',
        },
      ],
      clouds: {
        all: 20,
      },
      wind: {
        speed: 4.9,
        deg: 273.505,
      },
      rain: {},
      snow: {},
      sys: {
        pod: 'd',
      },
      dt_txt: '2016-12-16 21:00:00',
    },
    {
      dt: 1481932800,
      main: {
        temp: 25.58,
        temp_min: 25.58,
        temp_max: 25.58,
        pressure: 1038.9,
        sea_level: 1042.71,
        grnd_level: 1038.9,
        humidity: 100,
        temp_kf: 0,
      },
      weather: [
        {
          id: 800,
          main: 'Clear',
          description: 'clear sky',
          icon: '02n',
        },
      ],
      clouds: {
        all: 8,
      },
      wind: {
        speed: 6.53,
        deg: 230,
      },
      rain: {},
      snow: {},
      sys: {
        pod: 'n',
      },
      dt_txt: '2016-12-17 00:00:00',
    },
    {
      dt: 1481943600,
      main: {
        temp: 26.36,
        temp_min: 26.36,
        temp_max: 26.36,
        pressure: 1039.15,
        sea_level: 1042.78,
        grnd_level: 1039.15,
        humidity: 100,
        temp_kf: 0,
      },
      weather: [
        {
          id: 803,
          main: 'Clouds',
          description: 'broken clouds',
          icon: '04n',
        },
      ],
      clouds: {
        all: 64,
      },
      wind: {
        speed: 7.83,
        deg: 238.501,
      },
      rain: {},
      snow: {},
      sys: {
        pod: 'n',
      },
      dt_txt: '2016-12-17 03:00:00',
    },
    {
      dt: 1481954400,
      main: {
        temp: 26.71,
        temp_min: 26.71,
        temp_max: 26.71,
        pressure: 1037.8,
        sea_level: 1041.41,
        grnd_level: 1037.8,
        humidity: 100,
        temp_kf: 0,
      },
      weather: [
        {
          id: 600,
          main: 'Snow',
          description: 'light snow',
          icon: '13n',
        },
      ],
      clouds: {
        all: 88,
      },
      wind: {
        speed: 6.6,
        deg: 224.001,
      },
      rain: {},
      snow: {
        '3h': 0.2925,
      },
      sys: {
        pod: 'n',
      },
      dt_txt: '2016-12-17 06:00:00',
    },
    {
      dt: 1481965200,
      main: {
        temp: 27.38,
        temp_min: 27.38,
        temp_max: 27.38,
        pressure: 1036.06,
        sea_level: 1039.65,
        grnd_level: 1036.06,
        humidity: 100,
        temp_kf: 0,
      },
      weather: [
        {
          id: 600,
          main: 'Snow',
          description: 'light snow',
          icon: '13n',
        },
      ],
      clouds: {
        all: 88,
      },
      wind: {
        speed: 6.96,
        deg: 220.502,
      },
      rain: {},
      snow: {
        '3h': 1.19,
      },
      sys: {
        pod: 'n',
      },
      dt_txt: '2016-12-17 09:00:00',
    },
    {
      dt: 1481976000,
      main: {
        temp: 29.02,
        temp_min: 29.02,
        temp_max: 29.02,
        pressure: 1033.92,
        sea_level: 1037.51,
        grnd_level: 1033.92,
        humidity: 100,
        temp_kf: 0,
      },
      weather: [
        {
          id: 601,
          main: 'Snow',
          description: 'snow',
          icon: '13n',
        },
      ],
      clouds: {
        all: 92,
      },
      wind: {
        speed: 7.29,
        deg: 214.002,
      },
      rain: {},
      snow: {
        '3h': 2.4525,
      },
      sys: {
        pod: 'n',
      },
      dt_txt: '2016-12-17 12:00:00',
    },
    {
      dt: 1481986800,
      main: {
        temp: 33.08,
        temp_min: 33.08,
        temp_max: 33.08,
        pressure: 1031.49,
        sea_level: 1035.08,
        grnd_level: 1031.49,
        humidity: 100,
        temp_kf: 0,
      },
      weather: [
        {
          id: 500,
          main: 'Rain',
          description: 'light rain',
          icon: '10d',
        },
      ],
      clouds: {
        all: 92,
      },
      wind: {
        speed: 8.16,
        deg: 206.504,
      },
      rain: {
        '3h': 0.0075,
      },
      snow: {
        '3h': 5.3125,
      },
      sys: {
        pod: 'd',
      },
      dt_txt: '2016-12-17 15:00:00',
    },
    {
      dt: 1481997600,
      main: {
        temp: 34.66,
        temp_min: 34.66,
        temp_max: 34.66,
        pressure: 1026.91,
        sea_level: 1030.4,
        grnd_level: 1026.91,
        humidity: 100,
        temp_kf: 0,
      },
      weather: [
        {
          id: 500,
          main: 'Rain',
          description: 'light rain',
          icon: '10d',
        },
      ],
      clouds: {
        all: 100,
      },
      wind: {
        speed: 4.38,
        deg: 226.505,
      },
      rain: {
        '3h': 0.26,
      },
      snow: {
        '3h': 2.9725,
      },
      sys: {
        pod: 'd',
      },
      dt_txt: '2016-12-17 18:00:00',
    },
    {
      dt: 1482008400,
      main: {
        temp: 35.84,
        temp_min: 35.84,
        temp_max: 35.84,
        pressure: 1023.93,
        sea_level: 1027.48,
        grnd_level: 1023.93,
        humidity: 100,
        temp_kf: 0,
      },
      weather: [
        {
          id: 500,
          main: 'Rain',
          description: 'light rain',
          icon: '10d',
        },
      ],
      clouds: {
        all: 92,
      },
      wind: {
        speed: 3.09,
        deg: 217.5,
      },
      rain: {
        '3h': 1.21,
      },
      snow: {},
      sys: {
        pod: 'd',
      },
      dt_txt: '2016-12-17 21:00:00',
    },
    {
      dt: 1482019200,
      main: {
        temp: 36.65,
        temp_min: 36.65,
        temp_max: 36.65,
        pressure: 1023.89,
        sea_level: 1027.36,
        grnd_level: 1023.89,
        humidity: 100,
        temp_kf: 0,
      },
      weather: [
        {
          id: 500,
          main: 'Rain',
          description: 'light rain',
          icon: '10n',
        },
      ],
      clouds: {
        all: 92,
      },
      wind: {
        speed: 5.84,
        deg: 218.507,
      },
      rain: {
        '3h': 1.63,
      },
      snow: {},
      sys: {
        pod: 'n',
      },
      dt_txt: '2016-12-18 00:00:00',
    },
    {
      dt: 1482030000,
      main: {
        temp: 38.22,
        temp_min: 38.22,
        temp_max: 38.22,
        pressure: 1022.63,
        sea_level: 1026.22,
        grnd_level: 1022.63,
        humidity: 100,
        temp_kf: 0,
      },
      weather: [
        {
          id: 500,
          main: 'Rain',
          description: 'light rain',
          icon: '10n',
        },
      ],
      clouds: {
        all: 100,
      },
      wind: {
        speed: 5.97,
        deg: 206.506,
      },
      rain: {
        '3h': 0.57,
      },
      snow: {},
      sys: {
        pod: 'n',
      },
      dt_txt: '2016-12-18 03:00:00',
    },
    {
      dt: 1482040800,
      main: {
        temp: 43.09,
        temp_min: 43.09,
        temp_max: 43.09,
        pressure: 1020.23,
        sea_level: 1023.69,
        grnd_level: 1020.23,
        humidity: 98,
        temp_kf: 0,
      },
      weather: [
        {
          id: 500,
          main: 'Rain',
          description: 'light rain',
          icon: '10n',
        },
      ],
      clouds: {
        all: 92,
      },
      wind: {
        speed: 9.89,
        deg: 202.5,
      },
      rain: {
        '3h': 0.03,
      },
      snow: {},
      sys: {
        pod: 'n',
      },
      dt_txt: '2016-12-18 06:00:00',
    },
    {
      dt: 1482051600,
      main: {
        temp: 48.14,
        temp_min: 48.14,
        temp_max: 48.14,
        pressure: 1017.73,
        sea_level: 1021.2,
        grnd_level: 1017.73,
        humidity: 92,
        temp_kf: 0,
      },
      weather: [
        {
          id: 500,
          main: 'Rain',
          description: 'light rain',
          icon: '10n',
        },
      ],
      clouds: {
        all: 92,
      },
      wind: {
        speed: 12.46,
        deg: 212.502,
      },
      rain: {
        '3h': 0.41,
      },
      snow: {},
      sys: {
        pod: 'n',
      },
      dt_txt: '2016-12-18 09:00:00',
    },
    {
      dt: 1482062400,
      main: {
        temp: 52.94,
        temp_min: 52.94,
        temp_max: 52.94,
        pressure: 1015.95,
        sea_level: 1019.39,
        grnd_level: 1015.95,
        humidity: 90,
        temp_kf: 0,
      },
      weather: [
        {
          id: 500,
          main: 'Rain',
          description: 'light rain',
          icon: '10n',
        },
      ],
      clouds: {
        all: 92,
      },
      wind: {
        speed: 16.11,
        deg: 211,
      },
      rain: {
        '3h': 0.52,
      },
      snow: {},
      sys: {
        pod: 'n',
      },
      dt_txt: '2016-12-18 12:00:00',
    },
    {
      dt: 1482073200,
      main: {
        temp: 56.59,
        temp_min: 56.59,
        temp_max: 56.59,
        pressure: 1016.35,
        sea_level: 1019.77,
        grnd_level: 1016.35,
        humidity: 89,
        temp_kf: 0,
      },
      weather: [
        {
          id: 500,
          main: 'Rain',
          description: 'light rain',
          icon: '10d',
        },
      ],
      clouds: {
        all: 92,
      },
      wind: {
        speed: 16.82,
        deg: 219.501,
      },
      rain: {
        '3h': 0.5625,
      },
      snow: {},
      sys: {
        pod: 'd',
      },
      dt_txt: '2016-12-18 15:00:00',
    },
    {
      dt: 1482084000,
      main: {
        temp: 56.35,
        temp_min: 56.35,
        temp_max: 56.35,
        pressure: 1018.53,
        sea_level: 1021.87,
        grnd_level: 1018.53,
        humidity: 91,
        temp_kf: 0,
      },
      weather: [
        {
          id: 500,
          main: 'Rain',
          description: 'light rain',
          icon: '10d',
        },
      ],
      clouds: {
        all: 64,
      },
      wind: {
        speed: 11.45,
        deg: 256.002,
      },
      rain: {
        '3h': 2.5,
      },
      snow: {},
      sys: {
        pod: 'd',
      },
      dt_txt: '2016-12-18 18:00:00',
    },
    {
      dt: 1482094800,
      main: {
        temp: 50.01,
        temp_min: 50.01,
        temp_max: 50.01,
        pressure: 1023.21,
        sea_level: 1026.6,
        grnd_level: 1023.21,
        humidity: 97,
        temp_kf: 0,
      },
      weather: [
        {
          id: 500,
          main: 'Rain',
          description: 'light rain',
          icon: '10d',
        },
      ],
      clouds: {
        all: 92,
      },
      wind: {
        speed: 11.81,
        deg: 260.502,
      },
      rain: {
        '3h': 2.4875,
      },
      snow: {},
      sys: {
        pod: 'd',
      },
      dt_txt: '2016-12-18 21:00:00',
    },
    {
      dt: 1482105600,
      main: {
        temp: 44.39,
        temp_min: 44.39,
        temp_max: 44.39,
        pressure: 1028.74,
        sea_level: 1032.34,
        grnd_level: 1028.74,
        humidity: 96,
        temp_kf: 0,
      },
      weather: [
        {
          id: 500,
          main: 'Rain',
          description: 'light rain',
          icon: '10n',
        },
      ],
      clouds: {
        all: 92,
      },
      wind: {
        speed: 11.21,
        deg: 287.001,
      },
      rain: {
        '3h': 0.4625,
      },
      snow: {},
      sys: {
        pod: 'n',
      },
      dt_txt: '2016-12-19 00:00:00',
    },
    {
      dt: 1482116400,
      main: {
        temp: 39.65,
        temp_min: 39.65,
        temp_max: 39.65,
        pressure: 1034.17,
        sea_level: 1037.7,
        grnd_level: 1034.17,
        humidity: 100,
        temp_kf: 0,
      },
      weather: [
        {
          id: 804,
          main: 'Clouds',
          description: 'overcast clouds',
          icon: '04n',
        },
      ],
      clouds: {
        all: 92,
      },
      wind: {
        speed: 10.51,
        deg: 323,
      },
      rain: {},
      snow: {},
      sys: {
        pod: 'n',
      },
      dt_txt: '2016-12-19 03:00:00',
    },
    {
      dt: 1482127200,
      main: {
        temp: 34.63,
        temp_min: 34.63,
        temp_max: 34.63,
        pressure: 1039.28,
        sea_level: 1042.87,
        grnd_level: 1039.28,
        humidity: 100,
        temp_kf: 0,
      },
      weather: [
        {
          id: 803,
          main: 'Clouds',
          description: 'broken clouds',
          icon: '04n',
        },
      ],
      clouds: {
        all: 68,
      },
      wind: {
        speed: 9.98,
        deg: 322.002,
      },
      rain: {},
      snow: {},
      sys: {
        pod: 'n',
      },
      dt_txt: '2016-12-19 06:00:00',
    },
    {
      dt: 1482138000,
      main: {
        temp: 29.74,
        temp_min: 29.74,
        temp_max: 29.74,
        pressure: 1043.01,
        sea_level: 1046.69,
        grnd_level: 1043.01,
        humidity: 100,
        temp_kf: 0,
      },
      weather: [
        {
          id: 800,
          main: 'Clear',
          description: 'clear sky',
          icon: '01n',
        },
      ],
      clouds: {
        all: 0,
      },
      wind: {
        speed: 9.53,
        deg: 328.007,
      },
      rain: {},
      snow: {},
      sys: {
        pod: 'n',
      },
      dt_txt: '2016-12-19 09:00:00',
    },
    {
      dt: 1482148800,
      main: {
        temp: 27.43,
        temp_min: 27.43,
        temp_max: 27.43,
        pressure: 1047.09,
        sea_level: 1050.79,
        grnd_level: 1047.09,
        humidity: 100,
        temp_kf: 0,
      },
      weather: [
        {
          id: 800,
          main: 'Clear',
          description: 'clear sky',
          icon: '01n',
        },
      ],
      clouds: {
        all: 0,
      },
      wind: {
        speed: 7.4,
        deg: 350.002,
      },
      rain: {},
      snow: {},
      sys: {
        pod: 'n',
      },
      dt_txt: '2016-12-19 12:00:00',
    },
    {
      dt: 1482159600,
      main: {
        temp: 29.65,
        temp_min: 29.65,
        temp_max: 29.65,
        pressure: 1050.79,
        sea_level: 1054.34,
        grnd_level: 1050.79,
        humidity: 100,
        temp_kf: 0,
      },
      weather: [
        {
          id: 800,
          main: 'Clear',
          description: 'clear sky',
          icon: '01d',
        },
      ],
      clouds: {
        all: 0,
      },
      wind: {
        speed: 7.99,
        deg: 25.5005,
      },
      rain: {},
      snow: {},
      sys: {
        pod: 'd',
      },
      dt_txt: '2016-12-19 15:00:00',
    },
    {
      dt: 1482170400,
      main: {
        temp: 31.2,
        temp_min: 31.2,
        temp_max: 31.2,
        pressure: 1051.13,
        sea_level: 1054.76,
        grnd_level: 1051.13,
        humidity: 100,
        temp_kf: 0,
      },
      weather: [
        {
          id: 800,
          main: 'Clear',
          description: 'clear sky',
          icon: '01d',
        },
      ],
      clouds: {
        all: 0,
      },
      wind: {
        speed: 5.97,
        deg: 20.0002,
      },
      rain: {},
      snow: {},
      sys: {
        pod: 'd',
      },
      dt_txt: '2016-12-19 18:00:00',
    },
    {
      dt: 1482181200,
      main: {
        temp: 30.38,
        temp_min: 30.38,
        temp_max: 30.38,
        pressure: 1051.61,
        sea_level: 1055.26,
        grnd_level: 1051.61,
        humidity: 100,
        temp_kf: 0,
      },
      weather: [
        {
          id: 801,
          main: 'Clouds',
          description: 'few clouds',
          icon: '02d',
        },
      ],
      clouds: {
        all: 12,
      },
      wind: {
        speed: 3.49,
        deg: 25.5006,
      },
      rain: {},
      snow: {},
      sys: {
        pod: 'd',
      },
      dt_txt: '2016-12-19 21:00:00',
    },
  ],
};
