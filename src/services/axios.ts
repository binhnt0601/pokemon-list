import axios from 'axios';
import queryString from 'query-string';

const pageZero = true;
const AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});
AxiosInstance.interceptors.request.use((config) => {
  if (!config.url) {
    return config;
  }
  if (pageZero) {
    return { ...config, url: modifyPaging(config.url) };
  }
  return config;
});

AxiosInstance.interceptors.response.use(
  (res) => {
    if (pageZero) {
      const { config, data } = res;
      let myData = data;
      if (data.page !== undefined) {
        myData = { ...data, page: data.page + 1 };
      }
      return { ...res, config: { ...config, url: modifyPaging(config.url as string) }, data: myData };
    }
    return res;
  },
  async (err) => {
    if (!err.response) {
      return Promise.reject(err);
    }
    return Promise.reject(err);
  }
);

const modifyPaging = (url: string): string => {
  const myUrl = urlStringParser(url);
  const queryParams = myUrl.query;
  if (queryParams && queryParams.page) {
    let newPage = parseInt(queryParams.page as string) - 1;
    return urlStringBuilder({ ...myUrl, query: { ...queryParams, page: newPage } });
  } else {
    return url;
  }
};

export const urlStringParser = (url: string) => {
  return queryString.parseUrl(url);
};

export const urlStringBuilder = (params: any) => {
  return queryString.stringifyUrl(params);
};
export const queryStringBuilder = (params: any) => {
  let str = '';

  if (!params) {
    return str;
  }
  str = queryString.stringify(params);
  return str;
};

export default AxiosInstance;