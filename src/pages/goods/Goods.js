import React from "react";
import useAxios from "../../hooks/useAxios";
import axios from "../../api/httpRequestApi";

const Goods = () => {
  const [goods, error, loading, axiosFetch] = useAxios();
  const janatan={
    axiosInstance: axios,
    method: "POST",
    url: "/products",
    requestConfig: {
      name: "کیف پول چرم جانتا مدل 124",
      category: "15",
      brand: "جانتا",
      price: "120000",
      count: "12",
      description:
        "اکارتی ها ابزار و پوشش برای محافظت و نگهداری از همه ی کارت های مهم یک فرد، به خصوص کارت های بانکی هستند. جاکارتی جدید مجموعه ی چرم جانتا از طراحی ساده و در عین حال کاربردی برخوردار است. از لحاظ جنس، این جاکارتی از متریال چرم طبیعی مرغوب و منعطف ساخته شده است. این محصول در رنگ بندی متنوع و زیبا ساخته شده که تمام سلیقه ها را پوشش می دهد. برشی به اندازه انگشت شصت روی سطح رویی محصول طراحی شده است.",
      images: "c4e5c64298b479e9881aa323206920a3",
      thumbnail: "c4e5c64298b479e9881aa323206920a3",
    },
  }

  const handleNewAdd = () => {
    axiosFetch(janatan);
  };

  return (
    <div>
      <h1>Goods</h1>
      <button onClick={handleNewAdd}>add</button>
    </div>
  );
};

export default Goods;
