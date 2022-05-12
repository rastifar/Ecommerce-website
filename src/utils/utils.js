export const convertTimeStamToDate = (timestamp) => {
  const date = new Date(timestamp).toLocaleDateString("fa-IR");
  return date;
};
