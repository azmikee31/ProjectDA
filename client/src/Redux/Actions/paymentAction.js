import { ErrorsAction, tokenProtection } from "../Protection";
import toast from "react-hot-toast";
import * as paymentConstants from "../Constants/PaymentConstants";
import * as paymentApi from "../APIs/PaymentService";

// create payment
const createPaymentAction = (payment) => async (dispatch, getState) => {
  try {
    dispatch({ type: paymentConstants.CREATE_PAYMENT_REQUEST });
    const response = await paymentApi.createPaymentService(
      payment,
      tokenProtection(getState)
    );
    dispatch({
      type: paymentConstants.CREATE_PAYMENT_SUCCESS,
      payload: response,
    });
    toast.success("Payment is successfully");
  } catch (error) {
    ErrorsAction(error, dispatch, paymentConstants.CREATE_PAYMENT_FAIL);
  }
};

export { createPaymentAction };
