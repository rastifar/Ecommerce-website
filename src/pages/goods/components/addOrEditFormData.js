import { caterories, subCategories } from "../../../constants/formsConst";

const formInputText = [
  {
    name: "name",
    label: "نام کالا",
    type: "text",
    id: "name",
  },
  {
    name: "price",
    label: "قیمت",
    type: "number",
    id: "price",
  },
  {
    name: "count",
    label: "نعداد",
    type: "number",
    id: "count",
  },
  {
    name: "wieght",
    label: "وزن",
    type: "text",
    id: "wieght",
  },
];

const formInputSelect = [
  {
    name: "category",
    label: "دسته بندی",
    options: caterories,
  },
  {
    name: "subcategory",
    label: "زیر دسته بندی",
    options: subCategories,
  },
];
export { formInputText, formInputSelect };
// {
//   name: 'category',
//   label: "دسته بندی",
//   type: "text",
//   id: "category",
// },
// {
//   name: 'subcategory',
//   label: "زیر دسته بندی",
//   type: "text",
//   id: "subcategory",
// },
