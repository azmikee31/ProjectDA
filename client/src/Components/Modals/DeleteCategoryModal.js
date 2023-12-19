import React, { useState } from "react";
import MainModal from "./MainModal";
import { Checkbox } from "@material-tailwind/react";
import { deleteCategoryAction } from "../../Redux/Actions/categoriesActions";
import { useDispatch } from "react-redux";

function DeleteCategoryModal({ modalOpen, setModalOpen, category }) {
  const [valueChecked, setValueChecked] = useState(0);
  const dispatch = useDispatch();

  const deleteCategory = () => {
    dispatch(deleteCategoryAction(valueChecked, category));
  };
  return (
    <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
      <div className="inline-block sm:w-4/5 border border-border md:w-3/5 lg:w-2/5 w-full align-middle p-10 overflow-y-auto h-full bg-main text-white rounded-2xl">
        <h2 className="text-3xl font-bold">Delete Category</h2>
        <div className="flex flex-col gap-3 mt-5">
          <p className="text-red-600">
            If you delete this category, it means you will also delete movies
            with that category or return it to an undefined category.
          </p>
          <CheckBoxType
            title="If you want to switch back to an undefined, click here!!"
            setValueChecked={setValueChecked}
          />
        </div>
        <div className="flex gap-5 items-center mt-10 justify-center">
          <button
            onClick={() => setModalOpen((pre) => !pre)}
            className="text-md transitions py-4 px-10 border-2 hover:bg-subMain rounded-lg border-red-500 text-white"
          >
            close
          </button>
          <button
            type="submit"
            onClick={deleteCategory}
            className="py-4 px-10 text-md transitions hover:bg-dry border-2 border-subMain rounded-lg bg-subMain text-white"
          >
            Delete
          </button>
        </div>
      </div>
    </MainModal>
  );
}

const CheckBoxType = ({ value, title, name, setValueChecked }) => {
  return (
    <div className="flex items-center gap-4">
      <Checkbox
        name={name}
        onChange={(e) => {
          const newValue = e.target.checked ? 1 : 0;
          if (newValue !== value) {
            setValueChecked(newValue);
          }
        }}
      />
      <label>{title}</label>
    </div>
  );
};

export default DeleteCategoryModal;
