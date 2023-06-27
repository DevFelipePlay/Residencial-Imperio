import axios from 'axios';

const apiPostData = axios.create({
  baseURL: 'http://telefonia.playmovel.com.br/',
});

export default apiPostData;
