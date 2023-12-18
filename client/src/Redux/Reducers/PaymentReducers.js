import * as paymentConstants from "../Constants/PaymentConstants";

// create payment
export const createPaymentReducer = (state = {}, action) => {
  switch (action.type) {
    case paymentConstants.CREATE_PAYMENT_REQUEST:
      return { isLoading: true };
    case paymentConstants.CREATE_PAYMENT_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case paymentConstants.CREATE_PAYMENT_FAIL:
      return { isLoading: false, isError: action.payload };
    default:
      return state;
  }
};
