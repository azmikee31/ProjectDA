import React, { useEffect } from "react";
import { FaRegClock, FaRegListAlt, FaUser, FaEye } from "react-icons/fa";
import SideBar from "../SideBar";
import { HiViewGridAdd } from "react-icons/hi";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsersAction } from "../../../Redux/Actions/userActions";
import { getAllMoviesAction } from "../../../Redux/Actions/moviesActions";
import { getAllCategoriesAction } from "../../../Redux/Actions/categoriesActions";
import StatisticsChart from "../../../Components/chartComponent/statistics-chart";
import { Typography } from "@material-tailwind/react";
import { chartsConfig } from "../../../Data/charts-config";

function Dashboard() {
  const dispatch = useDispatch();
  //useSelectors
  const {
    isLoading: catLoading,
    isError: catError,
    categories,
  } = useSelector((state) => state.categoryGetAll);

  const {
    isLoading: userLoading,
    isError: userError,
    users,
  } = useSelector((state) => state.adminGetAllUsers);
  const { isLoading, isError, totalMovies, totalView } = useSelector(
    (state) => state.getAllMovies
  );

  //useEffect
  useEffect(() => {
    //Get all user
    dispatch(getAllUsersAction());
    //Get all movies
    dispatch(getAllMoviesAction({}));
    //Get all categories
    dispatch(getAllCategoriesAction());
    //error
    if (isError || catError || userError) {
      toast.error("Something went wrong!");
    }
  }, [dispatch, isError, catError, userError]);

  const DashboardData = [
    {
      bg: "bg-orange-600",
      icon: FaRegListAlt,
      title: "Total Movies",
      total: isLoading ? "Loading..." : totalMovies || 0,
    },
    {
      bg: "bg-blue-700",
      icon: HiViewGridAdd,
      title: "Total Categories",
      total: catLoading ? "Loading..." : categories?.length || 0,
    },
    {
      bg: "bg-green-600",
      icon: FaUser,
      title: "Total Users",
      total: userLoading ? "Loading..." : users?.length || 0,
    },
    {
      bg: "bg-purple-500",
      icon: FaEye,
      title: "Total View",
      total: userLoading ? "Loading..." : totalView || 0,
    },
  ];
  return (
    <SideBar>
      <h2 className="text-xl font-bold">Dashboard</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
        {DashboardData.map((data, index) => (
          <div
            key={index}
            className="p-4 rounded bg-main border-border grid grid-cols-4 gap-2"
          >
            <div
              className={`col-span-1 rounded-full h-12 w-12 flex-colo ${data.bg}`}
            >
              <data.icon />
            </div>
            <div className="col-span-3">
              <h2>{data.title}</h2>
              <p className=" mt-2 font-bold">{data.total}</p>
            </div>
          </div>
        ))}
      </div>
      <h3 className="text-md font-medium my-6 text-border">
        Statistical Tables
      </h3>

      <div className="chart-dashboard">
        <ChatTotal
          totalMovies={totalMovies}
          totalCategories={categories?.length}
          totalUsers={users?.length}
          totalView={totalView}
        />
      </div>
    </SideBar>
  );
}

const ChatTotal = ({ totalMovies, totalCategories, totalUsers, totalView }) => {
  const websiteViewsChart = {
    type: "bar",
    height: 220,
    series: [
      {
        name: "Views",
        data: [totalMovies, totalCategories, totalUsers, totalView],
      },
    ],
    options: {
      ...chartsConfig,
      colors: ["#ea580c"],
      plotOptions: {
        bar: {
          columnWidth: "16%",
          borderRadius: 5,
        },
      },
      xaxis: {
        ...chartsConfig.xaxis,
        categories: [
          "Total Movies",
          "Total Categories",
          "Total Users",
          "Total Views",
        ],
      },
    },
  };
  const statisticsChartsData = [
    {
      color: "black",
      title: "Website View",
      description: "Today Campaign Performance",
      footer: "campaign sent now",
      chart: websiteViewsChart,
    },
  ];
  return (
    <div className="">
      {statisticsChartsData.map((props) => (
        <StatisticsChart
          key={props.title}
          {...props}
          footer={
            <Typography
              variant="small"
              className="flex items-center font-normal text-gray-900"
            >
              <FaRegClock strokeWidth={2} className="h-4 w-4 text-gray-400" />
              &nbsp;{props.footer}
            </Typography>
          }
        />
      ))}
    </div>
  );
};

export default Dashboard;
