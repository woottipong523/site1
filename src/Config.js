import Cookies from "js-cookie";


export const url = {
  URLauthen: "https://foodbackend.logoutwifi.me/login.php"
};

export const accesstoken = async () => {
  const jwt = await Cookies.get("__session");
  return jwt;
};


export const logOut = () => {
  Cookies.remove("__session");
};
