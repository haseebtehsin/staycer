export const formatDate = (dateString) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric"
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export const remainingDays = (dateString) => {
  const one_day = 1000 * 60 * 60 * 24;
  const givenDate = new Date(dateString);
  const today = new Date();
  return (Math.ceil((givenDate.getTime() - today.getTime()) / (one_day)))
}