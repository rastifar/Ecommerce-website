export const convertTimeStamToDate = (timestamp) => {
  const date = new Date(timestamp).toLocaleDateString("fa-IR");
  return date;
};

export const splitArrayOfImage = (arrayOfImage) => {
  console.log(arrayOfImage);
  const array = arrayOfImage.split(',')
  console.log(array);
  return array;
}
