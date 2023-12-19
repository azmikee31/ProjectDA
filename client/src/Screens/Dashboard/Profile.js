import React, { useEffect, useState } from "react";
import Uploder from "../../Components/Uploder";
import { Input } from "../../Components/UsedInputs";
import SideBar from "./SideBar";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { ProfileValidation } from "../../Components/Validation/userValidation";
import { InlineError } from "../../Components/Notifications/Error";
import { Imagepreview } from "../../Components/imagepreview";
import { updateProfileAction } from "../../Redux/Actions/userActions";
import toast from "react-hot-toast";
import { createPaymentAction } from "../../Redux/Actions/paymentAction";
import { useNavigate } from "react-router-dom";
import { FaCrown } from "react-icons/fa";

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.userLogin);
  const [imageUrl, setImageUrl] = useState(userInfo ? userInfo.image : "");
  const { isLoading, isError, isSuccess } = useSelector(
    (state) => state.userUpdateProfile
  );

  const {
    isLoading: payLoading,
    isError: payError,
    isSuccess: paySuccess,
  } = useSelector((state) => state.createPayment || {});
  // validate user
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ProfileValidation),
  });

  // update Profile
  const onSubmit = (data) => {
    dispatch(updateProfileAction({ ...data, image: imageUrl }));
  };

  const updatePremium = () => {
    const confirmed = window.confirm(
      "Are you sure you want to update Premium?"
    );
    if (confirmed) {
      dispatch(createPaymentAction());
      navigate("/payment"); // Chuyển hướng qua trang payment
    }
  };

  // useEffect
  useEffect(() => {
    if (userInfo) {
      setValue("fullName", userInfo?.fullName);
      setValue("email", userInfo?.email);
    }
    if (isSuccess || paySuccess) {
      dispatch({ type: "CREATE_PAYMENT_SUCCESS" });
      dispatch({ type: "USER_UPDATE_PROFILE_RESET" });
    }
    if (isError || payError) {
      toast.error(isError || payError);
      dispatch({ type: "USER_UPDATE_PROFILE_RESET" });
      dispatch({ type: "CREATE_PAYMENT_RESET" });
    }
  }, [userInfo, setValue, isSuccess, isError, dispatch, payError, paySuccess]);
  return (
    <SideBar>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <h2 className="text-xl font-bold">Profile</h2>
        <div className="w-full grid lg:grid-cols-12 gap-6">
          <div className="col-span-10">
            <Uploder setImageUrl={setImageUrl} />
          </div>
          <div className="col-span-2">
            <Imagepreview
              image={imageUrl}
              name={userInfo ? userInfo.fullName : "Name"}
            />
          </div>
        </div>

        <div className="w-full">
          <Input
            label="FullName"
            placeholder="Fullname..."
            type="text"
            name="fullName"
            register={register("fullName")}
            bg={true}
          />
          {errors.fullName && <InlineError text={errors.fullName.message} />}
        </div>
        <div className="w-full">
          <Input
            label="Email"
            placeholder="yourmail@gmail.com"
            type="email"
            name="email"
            register={register("email")}
            bg={true}
          />
          {errors.email && <InlineError text={errors.email.message} />}
        </div>
        <div className="flex gap-2 flex-wrap flex-col-reverse sm:flex-row justify-between items-center my-4">
          <button
            onClick={updatePremium}
            disabled={payLoading || isLoading}
            className=" bg-subMain font-medium flex items-center gap-2 transitions hover:bg-main border border-subMain text-white py-3 px-6 rounded w-full sm:w-auto"
          >
            <FaCrown />
            {payLoading ? "loading..." : " Premium"}
          </button>
          <button
            disabled={payLoading || isLoading}
            type="submit"
            className="bg-main font-medium transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded w-full sm:w-auto"
          >
            {isLoading ? "Updating..." : "Update Profile"}
          </button>
        </div>
      </form>
    </SideBar>
  );
}

export default Profile;
