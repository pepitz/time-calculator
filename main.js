/*
 * Your program must print string with the number of years and months and the total number of days between the dates.
 * Dates are provided in dd.mm.yyyy format.
 * You are not allowed to plug in JS libraries such as moment.js or date-fns directly into the code. All code need to be written in this file.
 *
 * Result must be shown as a string in years, months and total days. If years or months are 0, then it should not be displayed in the output.
 *
 * Example:
 * Input: ['01.01.2000', '01.01.2016']
 * Output:
 * '16 years, total 5844 days'
 *
 * Example 2:
 * Input: ['01.11.2015', '01.02.2017']
 *
 * Output:
 * '1 year, 3 months, total 458 days'
 */
const dates = [
  ['01.01.2000', '01.01.2016'],
  ['01.01.2016', '01.08.2016'],
  ['01.11.2015', '01.02.2017'],
  ['17.12.2016', '16.01.2017'],
  ['01.01.2016', '01.01.2016'],
  ['28.02.2015', '13.04.2018'],
  ['28.01.2015', '28.02.2015'],
  ['17.03.2022', '17.03.2023'],
  ['17.02.2024', '17.02.2025'],
];

const datesFormatted = (arrDates) =>
  arrDates.map((date) => {
    const splitted = date.split('.').reverse().join('-');
    return splitted;
  });

const calcDateDifference = (date1, date2) => {
  /*
   * calcDate() : Calculates the difference between two dates
   * @date1 : "First Date in the format YYYY-MM-DD"
   * @date2 : "Second Date in the format YYYY-MM-DD"
   * return : Array
   */
  //new date instance
  const dt_date1 = new Date(date1);
  const dt_date2 = new Date(date2);

  //Get the Timestamp
  const date1_time_stamp = dt_date1.getTime();
  const date2_time_stamp = dt_date2.getTime();

  let calc;

  //Check which timestamp is greater
  if (date1_time_stamp > date2_time_stamp) {
    calc = new Date(date1_time_stamp - date2_time_stamp);
  } else {
    calc = new Date(date2_time_stamp - date1_time_stamp);
  }
  //Retrieve the date, month and year
  const calcFormatTmp =
    calc.getDate() + '-' + (calc.getMonth() + 1) + '-' + calc.getFullYear();
  //Convert to an array and store
  const calcFormat = calcFormatTmp.split('-');
  //Subtract each member of our array from the default date
  const days_passed = Number(Math.abs(calcFormat[0]) - 1);
  const months_passed = Number(Math.abs(calcFormat[1]) - 1);
  const years_passed = Number(Math.abs(calcFormat[2]) - 1970);

  //Set up custom text
  const yrsTxt = ['year', 'years'];
  const mnthsTxt = ['month', 'months'];
  const daysTxt = ['day', 'days'];

  //Convert to days and sum together
  const total_days = years_passed * 365 + months_passed * 30 + days_passed;

  //display result with custom text
  const years =
    years_passed == 1
      ? `${years_passed} ${yrsTxt[0]},`
      : years_passed > 1
      ? `${years_passed} ${yrsTxt[1]},`
      : '';
  const months =
    months_passed == 1
      ? `${months_passed} ${mnthsTxt[0]},`
      : months_passed > 1
      ? `${months_passed} ${mnthsTxt[1]},`
      : '';
  const total = `total ${Math.round(total_days)} days`;

  let result = `${years.trim()} ${months.trim()} ${total}`;

  return result;
};

// Receive string of dates one after each other
function outputDate(dates) {
  const formattedDates = dates.map((date) => datesFormatted(date));
  const infoDates = formattedDates.map(([dateFrom, dateTo]) =>
    calcDateDifference(dateFrom, dateTo)
  );
  return infoDates;
}
