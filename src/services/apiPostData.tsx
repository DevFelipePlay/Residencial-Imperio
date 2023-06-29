import axios from 'axios';

const apiPostData = axios.create({
  baseURL: 'https://telefonia.playmovel.com.br/',
});

export default apiPostData;
