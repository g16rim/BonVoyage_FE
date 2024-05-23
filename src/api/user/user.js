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
  // local.defaults.headers["Authorization"] = "Bearer " + sessionStorage.getItem("refreshToken"); //axios header에 refresh-token 셋팅
  const refreshToken = {
    refreshToken: sessionStorage.getItem("refreshToken")
  }
  console.log(refreshToken)
  await local.post(`/auth/signout`, JSON.stringify(refreshToken))
    .then((response) => {
      console.log("로그아웃 성공" + response);
      sessionStorage.removeItem("accessToken")
      sessionStorage.removeItem("refreshToken")
  }).catch(fail);
}

async function signup(signupUser, success, fail) {
  await local.post(`/auth/signup`, signupUser, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }).then(success).catch(fail)
}
// async function signup(signupUser, file, success, fail) {
//   const formData = new FormData();
//   formData.append("signUpRequest", new Blob([JSON.stringify(signupUser)], { type: "application/json" }));
//   if (file) {
//       formData.append("file", file);
//   }

//   await local.post(`/auth/signup`, formData, {
//       headers: {
//           "Content-Type": "multipart/form-data"
//       }
//   }).then(success).catch(fail);
// }

async function userInfo(success, fail) {
  local.defaults.headers["Authorization"] = "Bearer " + sessionStorage.getItem("accessToken")
  await local.get(`/auth/`).then(success).catch(fail)
}

export { userConfirm, findById, tokenRegeneration, logout, signup, userInfo };
