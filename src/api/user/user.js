import { localAxios } from "@/util/http-commons";

const local = localAxios();

async function userConfirm(param, success, fail) {
  await local.post(`/auth/signin`, param).then(success).catch(fail);
}

// async function findById(success, fail) {
//   // console.log()
//   local.defaults.headers["Authorization"] = "Bearer " + sessionStorage.getItem("accessToken");
//   await local.get(`/auth/`).then((success) =>
//     console.log("success "+ success.data.userInfo)
// ).catch(fail);
// }

async function findById(success, fail) {
  // console.log()
  local.defaults.headers["Authorization"] = "Bearer " + sessionStorage.getItem("accessToken");
  console.log(sessionStorage.getItem("accessToken"));
  // await local.get(`/auth/`).then(success).catch(fail);
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
  local.defaults.headers["refreshToken"] =  "Bearer " + sessionStorage.getItem("refreshToken"); //axios header에 refresh-token 셋팅
  await local.post(`/auth/refresh`, user).then(success).catch(fail);
}

async function logout(success, fail) {
  local.defaults.headers["refreshToken"] =  "Bearer " + sessionStorage.getItem("refreshToken"); //axios header에 refresh-token 셋팅
  await local.post(`/auth/signout`).then(success).catch(fail);
}

export { userConfirm, findById, tokenRegeneration, logout };
