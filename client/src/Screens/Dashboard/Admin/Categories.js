import React, { useEffect, useState } from "react";
import { HiPlusCircle } from "react-icons/hi";
import Table2 from "../../../Components/Table2";
import SideBar from "../SideBar";
import CategoryModal from "../../../Components/Modals/CategoryModal";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import { deleteCategoryAction, getAllCategoriesAction } from "../../../Redux/Actions/categoriesActions";
import Loader from "../../../Components/Notifications/Loader";
import { Empty } from "../../../Components/Notifications/Empty";

function Categories() {
  const [modalOpen, setModalOpen] = useState(false);
  const [category, setCategory] = useState();
  const dispatch = useDispatch()

  // all categories
  const { categories, isLoading } = useSelector((state) => state.categoryGetAll);
  //delete category
  const { isSuccess, isError } = useSelector((state) => state.categoryDelete);
  const adminDeleteCategory = (id) => {
    if (window.confirm("Are you want to delete this categories")) {
      dispatch(deleteCategoryAction(id))
    }
  }
  const OnEditFunction = (id) => {
    setCategory(id);
    setModalOpen(!modalOpen);
  };

  useEffect(() => {
    //get all categories 
    dispatch(getAllCategoriesAction());

    if (isError) {
      toast.error(isError);
      dispatch({
        type: " DELETE_CATEGORY_RESET",
      });
    }

    if (isSuccess) {
      dispatch({
        type: " DELETE_CATEGORY_RESET",
      });
    }

    if (modalOpen === false) {
      setCategory();
    }
  }, [modalOpen, dispatch, isError, isSuccess]);

  return (
    <SideBar>
      <CategoryModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        category={category}
      />
      <div className="flex flex-col gap-6">
        <div className="flex-btn gap-2">
          <h2 className="text-xl font-bold">Categories</h2>
          <button
            onClick={() => setModalOpen(true)}
            className="bg-subMain flex-rows gap-4 font-medium transitions hover:bg-main border border-subMain text-white py-2 px-4 rounded"
          >
            <HiPlusCircle /> Create
          </button>
        </div>

        {isLoading ? (
          <Loader />
        ) : categories?.length > 0 ? (
          <Table2
            data={categories}
            users={false}
            OnEditFunction={OnEditFunction}
            onDeleteFunction={adminDeleteCategory}
          />
        ) : (
          <Empty message="You have no categories" />
        )}

      </div>
    </SideBar>
  );
}

export default Categories;
