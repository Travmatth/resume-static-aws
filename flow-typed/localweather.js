/* Localweather Types */

declare type ApiParams = {|
  'lat': number;
  'lon': number;
  'units': string;
  'APPID': string;
|}

declare type Coordinates = {|
  longitude: number;
  latitude: number;
|}

declare type Coords = {|
  lon: number;
  lat: number;
|}

declare type Sys = {|
  population: number;
|}

declare type Measurement = {|
  '3h': number;
|}

declare type Clouds = {| 
  all: number 
|}

declare type City = {|
  population: number;
  id: number;
  coord: Coords;
  name: string;
  country: string;
  sys: Sys; 
|}

declare type Temperatures = {|
  temp: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
|}

declare type WeatherReport = {|
  id: number;
  main: string;
  description: string;
  icon: string;
|} 

declare type Wind = {|
  speed: number;
  deg: number;
|}

declare type Forecast = {|
  dt: number;
  main: Temperatures;
  weather: Array<WeatherReport>;
  clouds: Clouds;
  wind: Wind;
  rain: ?Measurement;
  snow: ?Measurement;
  sys: Sys;
  dt_txt: string;
|}

declare type DailyTemperature = {
  celsius: number;
  farenheit: number;
}

declare type DailyForecast = {|
  icon: string;
  rain: ?number;
  snow: ?number;
  description: string;
  weather: string;
  cloud: number;
  date: number;
  temp: DailyTemperature
|}

declare type WeatherResponse = {|
  now: number;
  city: string;
  forecasts: Array<DailyForecast>;
|}

declare type Daily= {
  icon: string;
  rain: ?number;
  snow: ?number;
  description: string;
  weather: string;
  cloud: number;
  day: string;
  time: string;
  temp: DailyTemperature
}

declare type Weather = {|
  now: number;
  city: string;
  forecasts: Array<Daily>;
|}

declare type FiveDayForecast = {|
  city: City;   
  cod: string;
  message: number;
  cnt: number;
  list: Array<Forecast>;
|}
