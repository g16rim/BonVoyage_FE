import axios from "axios";

const { VITE_BASE_URL } = import.meta.env;

// local vue api axios instance
function localAxios() {
  const instance = axios.create({
    baseURL: VITE_BASE_URL,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });
  return instance;
}

function dataAxios() {
  const instance = axios.create({
    baseURL: 'https://apis.data.go.kr/B551011/KorService1',
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    params: {
      MobileOS: 'ETC',
      MobileApp: 'bonvoyage',
      serviceKey: 'b%2BNZqkdbTJe3R9hRrdPnzw85LQSsFog%2BPAEBXHJ4FLR7Kgxcrlw7PFI%2BkFG24IxNoyBx8f0VrSdG7Uk5lYjJ6g%3D%3D'
    }
  });
  return instance;
}

export { localAxios, dataAxios };
