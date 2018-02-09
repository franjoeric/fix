import axios from 'axios'
import {AsyncStorage, Platform} from 'react-native';

axios.defaults.baseURL = 'https://api.sophico.org/';
// axios.defaults.useXDomain = true;
// axios.defaults.withCredentials = true;
// axios.defaults.headers.patch = {'Content-Type': 'application/json;charset=utf-8'};


var TOKEN;
// AsyncStorage.clear()
AsyncStorage.getItem('TOKEN').then((token) => {
  console.log("TOKEN STORAGE", token);
})
const loginApi = function (url, data) {
  return axios({
    method: "POST",
    url,
    data
  })
}

const getData = function (url) {
  return axios({
    method:"GET",
    url
  })
}

const postData = function (url, data) {
  return axios({
    method:"POST",
    data,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-Sophico-Channel': 'mobile'
    },
  })
}

axios.interceptors.response.use(function (response) {
  //klasika
  if(response.config.url === 'https://api.sophico.org/login') {
    var arr = response.headers['set-cookie'][0].split(';');
    console.log(arr[0]);
    if(Platform.OS == 'android'){
      axios.defaults.headers.Cookie = arr[0];
      axios.defaults.headers['Accept-Language'] = response.data.locale;
    }
   TOKEN = arr[0];
   console.log(TOKEN);
   AsyncStorage.setItem('TOKEN', TOKEN);
  }
  return response;
})

axios.interceptors.request.use(function (config) {
  // config.headers["Cookie"] = TOKEN;
  console.log(JSON.stringify(config));
  return config;
})


export default services = {
  loginApi,
  getData,
  postData
}
