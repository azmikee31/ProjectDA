import Axios from "./Axios";

// CREATE payment function
const createPaymentService = async (token) => {
  const { data } = await Axios.post("/payment", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export { createPaymentService };
