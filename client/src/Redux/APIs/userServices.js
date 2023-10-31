import Axios from "./Axios";

// register new user API call
const registerService = async (user) => {
  try {
    const { data } = await Axios.post("/users", user);
    return data;
  } catch (error) {
    throw new error();
  }
};

// log out user Function
const logoutService = () => {
  localStorage.removeItem("userInfo");
  return null;
};

// login user API call
const loginService = async (user) => {
  const { data } = await Axios.post("/users/login", user);
  if (data) {
    localStorage.setItem("userInfo", JSON.stringify(data));
  }
  return data;
};

// update profile call API
const updateProfileService = async (user, token) => {
  const { data } = await Axios.put("/users", user, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (data) {
    localStorage.setItem("userInfo", JSON.stringify(data));
  }
  return data;
};

export { registerService, logoutService, loginService, updateProfileService };
