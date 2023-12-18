import React, { useState } from "react";

import Layout from "./../Layout/Layout";
import { createPaymentAction } from "../Redux/Actions/paymentAction";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "../Components/UsedInputs";

import { MdPayment } from "react-icons/md";

function Payment() {
  const dispatch = useDispatch();
  const { isLoading, isError, userInfo, isSuccess } = useSelector(
    (state) => state.userLogin
  );
  const user = useSelector((state) => state.user);
  const [paymentData, setPaymentData] = useState({
    amount: 70000,
    date: new Date().toISOString().split("T")[0],
  });

  // on submit
  const onSubmit = (data) => {
    dispatch(createPaymentAction(data));
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentData({
      ...paymentData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createPaymentAction(paymentData));
  };

  return (
    <Layout>
      <div className="container mx-auto px-2 my-24 flex-colo">
        <form
          className="w-full 2xl:w-2/5 gap-8 flex-colo p-8 sm:p-14 md:w-3/5 bg-dry  rounded-lg border border-border"
          action="http://localhost:8888/order/create_payment_url"
          method="post"
        >
          <img
            src="/images/faugepngrm.png"
            alt="logo"
            className="w-full h-12 object-contain"
          />
          <h2 className="text-xl text-red-600 align-middle">
            You can only subscribe to Premium for 1 month. If you agree with our
            policy, please click the button.
          </h2>

          <div className="w-full">
            <Input
              className=" w-full bg-dry text-sm mt-2 p-5 border border-border rounded text-white"
              label="Date"
              type="date"
              value={paymentData.date}
              name="date"
              onChange={handleInputChange}
            />
          </div>
          <div className="w-full">
            <Input
              className="text-cyan-800"
              label="Amount"
              name="amount"
              value={paymentData.amount}
            />
            <input type="hidden" name="language" value="vn" />
            <input type="hidden" name="bankCode" value="VNBANK" />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="bg-subMain transitions hover:bg-main flex-rows gap-4 text-white p-4 rounded-lg w-full"
          >
            {
              // if loading show loading
              isLoading ? (
                "Loading..."
              ) : (
                <>
                  <MdPayment /> Submit Payment
                </>
              )
            }
          </button>
        </form>
        {/* 
        <div className="xl:py-20 py-10 px-4">
          <div className="grid grid-flow-row xl:grid-cols-2 gap-4 xl:gap-16 items-center">
            <div>
              <h3 className="text-xl lg:text-3xl mb-4 font-semibold">
                Welcome to our Netflixo
              </h3>
              <div className="mt-3 text-sm leading-8 text-text">
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged.
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div className="p-8 bg-dry rounded-lg">
                  <span className="text-3xl block font-extrabold">10K</span>
                  <h4 className="text-lg font-semibold my-2">Listed Movies</h4>
                  <p className="mb-0 text-text leading-7 text-sm">
                    Lorem Ipsum is simply dummy text of the printing and
                  </p>
                </div>
                <div className="p-8 bg-dry rounded-lg">
                  <span className="text-3xl block font-extrabold">8K</span>
                  <h4 className="text-lg font-semibold my-2">Lovely Users</h4>
                  <p className="mb-0 text-text leading-7 text-sm">
                    Completely free, without registration! Lorem Ipsum is simply
                  </p>
                </div>
              </div>
            </div>
            <img
              src="/images/about2.jpg"
              alt="aboutus"
              className="w-full xl:block hidden h-header rounded-lg object-cover"
            />
          </div>
        </div> */}
      </div>
    </Layout>
  );
}

export default Payment;
