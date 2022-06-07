import EggTwoToneIcon from "@mui/icons-material/EggTwoTone";
import AcUnitTwoToneIcon from "@mui/icons-material/AcUnitTwoTone";
import BlenderTwoToneIcon from "@mui/icons-material/BlenderTwoTone";

const products = [
  {
    category: "میوه و سبزی تازه",
    link: "/productgroup/1",
    icon: <EggTwoToneIcon />,
    subcategory: [
      {
        title: "میوه",
        link: "/productgroup/1/subcategory/1",
      },
      {
        title: "سبزی",
        link: "/productgroup/1/subcategory/2",
      },
    ],
  },
  {
    category: "میوه و سبزی منجمد",
    link: "/productgroup/2",
    icon: <AcUnitTwoToneIcon />,
    subcategory: [
      {
        title: "میوه",
        link: "/productgroup/2/subcategory/1",
      },
      {
        title: "سبزی",
        link: "/productgroup/2/subcategory/2",
      },
    ],
  },
  {
    category: "نوشیدنی",
    link: "/productgroup/3",
    icon: <BlenderTwoToneIcon />,
    subcategory: [
      {
        title: "میوه",
        link: "/productgroup/3/subcategory/1",
      },
      {
        title: "سبزی",
        link: "/productgroup/3/subcategory/2",
      },
    ],
  },
];
const filterByPrice = [
  {
    title: "از کم به زیاد",
    link: "&_sort=price&_order=asc",
  },
  {
    title: "از زیاد به کم",
    link: "&_sort=price&_order=desc",
  },
  {
    title: "حذف فیلتر",
    link: "",
  },
];
const filterByPopularity = [
  {
    title: "محبوب ترین ها",
    link: "&_sort=favorite&_order=desc",
  },
  {
    title: "پرفروش ترین ها",
    link: "&_sort=count&_order=asc",
  },
  {
    title: "حذف فیلتر",
    link: "",
  },
];

export { products, filterByPrice, filterByPopularity };
