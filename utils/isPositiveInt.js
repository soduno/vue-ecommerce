export default isPositiveInteger = no => {
  const int = parseInt(no);
  if (isNaN(int)) return false;
  if (int < 1) return false;
  return true;
};
