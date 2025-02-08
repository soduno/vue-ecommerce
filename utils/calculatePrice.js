export default calculatePrice = (dailyPrice, weeklyPrice, days) => {
  if (!days) return weeklyPrice;
  const NO_OF_DAYS_IN_WEEK = 8;
  const price =
    days <= NO_OF_DAYS_IN_WEEK
      ? parseFloat(weeklyPrice)
      : parseFloat(weeklyPrice) +
        parseFloat(dailyPrice) * (days - NO_OF_DAYS_IN_WEEK);
  return price;
};
