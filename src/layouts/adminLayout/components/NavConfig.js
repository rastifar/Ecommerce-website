// component
import Iconify from "../../../components/Iconify ";

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: "dashboard",
    path: "/dashboard",
    icon: getIcon("eva:lock-fill"),
  },
  {
    title: "goods",
    path: "/dashboard/goods",
    icon: getIcon("eva:pie-chart-2-fill"),
  },
  {
    title: "orders",
    path: "/dashboard/orders",
    icon: getIcon("eva:people-fill"),
  },
  {
    title: "storequantity",
    path: "/dashboard/storequantity",
    icon: getIcon("eva:file-text-fill"),
  },
  {
    title: "Not found",
    path: "/404",
    icon: getIcon("eva:alert-triangle-fill"),
  },
];

export default navConfig;
