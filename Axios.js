import Axios from "axios";

export const urlMain = "http://192.168.1.68:3000/api";
//export const urlMain = "https://restcountries.com/v3.1";
export const multipartHeader = {
  headers: {
    "Content-type": "application/json",
  },
};
// const token = localStorage.getItem("user")
//   ? JSON.parse(localStorage.getItem("user")).token
//   : null;

export default Axios.create({
  headers: {
    "Content-Type": "application/json",
    //Authorization: token,
  },
  baseURL: urlMain,
  // validateStatus: function (status) {
  //   console.log({ status });
  //   if (status === 403) {
  //     window.location.href = "/login";
  //     localStorage.removeItem("user");
  //   }

  //   return status >= 200 && status < 300; // default
  // },
});
