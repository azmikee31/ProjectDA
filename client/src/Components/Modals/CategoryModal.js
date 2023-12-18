import React, { useEffect, useState } from "react";
import MainModal from "./MainModal";
import { Input } from "../UsedInputs";
import { useDispatch, useSelector } from "react-redux";
import {
  createCategoryAction,
  updateCategoryAction,
} from "../../Redux/Actions/categoriesActions";
import toast from "react-hot-toast";
import Spinner from "../Spinner";
function CategoryModal({ modalOpen, setModalOpen, category }) {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  const { isLoading, isSuccess, isError } = useSelector(
    (state) => state.categoryCreate
  );
  const {
    isLoading: upLoading,
    isSuccess: upSuccess,
    isError: upError,
  } = useSelector((state) => state.categoryCreate);
  const submitHandle = (e) => {
    e.preventDefault();
    if (title) {
      if (category) {
        dispatch(updateCategoryAction(category?._id, { title: title }));
        setModalOpen((pre) => !pre);
      } else {
        dispatch(createCategoryAction({ title: title }));
        setTitle("");
      }
    } else {
      toast.error("Please write a category name");
    }
  };
  return (
    <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
      <div className="inline-block sm:w-4/5 border border-border md:w-3/5 lg:w-2/5 w-full align-middle p-10 overflow-y-auto h-full bg-main text-white rounded-2xl">
        <h2 className="text-3xl font-bold">{category ? "Update" : "Create"}</h2>
        <form
          onSubmit={submitHandle}
          className="flex flex-col gap-6 text-left mt-6"
        >
          <Input
            label="Category Name"
            placeholder={category ? category.title : "Actions"}
            type="text"
            bg={false}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button
            disabled={isLoading || upLoading}
            type="submit"
            className="w-full flex-rows gap-4 py-3 text-lg transitions hover:bg-dry border-2 border-subMain rounded bg-subMain text-white"
          >
            {isLoading || upLoading ? <Spinner /> : category ? "Update" : "Add"}
          </button>
        </form>
      </div>
    </MainModal>
  );
}

export default CategoryModal;
