import axios from 'axios';
import { Message, MessageBox } from 'element-ui';
// 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_MOCK_API,
  timeout: 5000,
});

export default service;
