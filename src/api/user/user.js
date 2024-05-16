import { localAxios } from "@/util/http-commons";

const local = localAxios();

async function userConfirm(param, success, fail) {
  await local.post(`/auth/signin`, param).then(success).catch(fail);
}



async function findById(success, fail) {
  // console.log()
  local.defaults.headers["Authorization"] = "Bearer " + sessionStorage.getItem("accessToken");
  console.log(sessionStorage.getItem("accessToken"));
  return await local.get(`/auth/`).then((response) => {
    console.log("findById : " , response.data);
    console.log("findById : ", response.data.information);

    return response.data.information;
  }).catch((fail) => {
    console.log("findById Error: " + fail);
    return fail;
  });
}


async function tokenRegeneration(user, success, fail) {
  local.defaults.headers["Authorization"] =  "Bearer " + sessionStorage.getItem("refreshToken"); //axios header에 refresh-token 셋팅
  await local.post(`/auth/refresh`, user).then(success).catch(fail);
}

async function logout(success, fail) {
  local.defaults.headers["Authorization"] = "Bearer " + sessionStorage.getItem("refreshToken"); //axios header에 refresh-token 셋팅
  await local.post(`/auth/signout`).then((response) => {
    console.log("findById : " , response.status);
  }).catch(fail);
}

export { userConfirm, findById, tokenRegeneration, logout };
