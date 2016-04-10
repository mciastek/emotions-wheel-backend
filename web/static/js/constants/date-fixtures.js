const fillArrayValues = (length, offset = 1) => {
  return Object.keys([].fill.call({ length }, '')).map((_, i) => {
    return (i + offset);
  });
};

const generateDays = () => {
  return fillArrayValues(30);
};

const generateYears = () => {
  return fillArrayValues(60, 1900);
};

export default {
  days: generateDays(),
  months: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ],
  years: generateYears()
};
