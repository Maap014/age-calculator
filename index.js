const dayInput = document.querySelector("#js-day");
const monthInput = document.querySelector("#js-month");
const yearInput = document.querySelector("#js-year");
const submitBtn = document.querySelector("#js-submit-btn");
const dateDisplayRed = document.querySelectorAll(".js-display-date");
const inputBorder = document.querySelectorAll(".js-input-border");

function errorColor() {
  dateDisplayRed.forEach((dateItem) => {
    dateItem.style.color = "hsl(0, 100%, 67%)";
  });
  inputBorder.forEach((InputItem) => {
    InputItem.style.border = "1px solid hsl(0, 100%, 67%)";
  });
}

function requiredField() {
  // Clear the "This field is required" message and styling
  const redRequiredField = document.querySelectorAll(".js-required-field");
  const dayRequiredField = document.querySelector(".js-day-req-field");
  const monthRequiredField = document.querySelector(".js-month-req-field");
  const yearRequiredField = document.querySelector(".js-year-req-field");

  redRequiredField.forEach((requireItem) => {
    requireItem.innerHTML = "";
  });

  dateDisplayRed.forEach((dateItem) => {
    dateItem.style.color = "hsl(0, 1%, 44%)";
  });

  inputBorder.forEach((InputItem) => {
    InputItem.style.border = "1px solid #ced4da";
  });

  // Add the validation here and show the "This field is required" message and styling if needed
  if (
    dayInput.value === "" ||
    monthInput.value === "" ||
    yearInput.value === ""
  ) {
    redRequiredField.forEach((requireItem) => {
      requireItem.innerHTML = "This field is required";
    });
    errorColor();
    return false; // Return false to indicate validation failure
  }

  function getLastDayOfMonth(year, month) {
    return new Date(year, month + 1, 0);
  }

  const date = new Date();
  const lastDayCurrentMonth = getLastDayOfMonth(
    date.getFullYear(),
    date.getMonth()
  );

  //  Get the last day of Feb,Apr,Jun, Sep and Nov month
  const lastDayFeb = getLastDayOfMonth(date.getFullYear(), 1).getDate();
  const lastDayApril = getLastDayOfMonth(date.getFullYear(), 3).getDate();
  const lastDayjune = getLastDayOfMonth(date.getFullYear(), 5).getDate();
  const lastDaySep = getLastDayOfMonth(date.getFullYear(), 8).getDate();
  const lastDayNov = getLastDayOfMonth(date.getFullYear(), 10).getDate();

  function getMonthOfYear(year, month) {
    return new Date(year, month);
  }
  //  Get the month of Feb,Apr,Jun, Sep, Nov and Dec
  const monthOfFeb = getMonthOfYear(date.getFullYear(), 1).getMonth() + 1;
  const monthOfApril = getMonthOfYear(date.getFullYear(), 3).getMonth() + 1;
  const monthOfjune = getMonthOfYear(date.getFullYear(), 5).getMonth() + 1;
  const monthOfSep = getMonthOfYear(date.getFullYear(), 8).getMonth() + 1;
  const monthOfNov = getMonthOfYear(date.getFullYear(), 10).getMonth() + 1;
  const monthOfDec = getMonthOfYear(date.getFullYear(), 11).getMonth() + 1;

  // Add validation here and show the message if the input value is greater than
  if (Number(dayInput.value) > lastDayCurrentMonth.getDate()) {
    dayRequiredField.innerHTML = "Must be a valid day";
    errorColor();
    return false;
  }
  if (Number(monthInput.value) > monthOfDec) {
    monthRequiredField.innerHTML = "Must be a valid month";
    errorColor();
    return false;
  }
  if (Number(yearInput.value) > date.getFullYear()) {
    yearRequiredField.innerHTML = "Not Alive";
    errorColor();
    return false;
  }

  // Valid Date validation
  if (
    Number(dayInput.value) > lastDayFeb &&
    Number(monthInput.value) === monthOfFeb
  ) {
    dayRequiredField.innerHTML = "Must be a valid date";
    errorColor();
    return false;
  }
  if (
    Number(dayInput.value) > lastDayApril &&
    Number(monthInput.value) === monthOfApril
  ) {
    dayRequiredField.innerHTML = "Must be a valid date";
    errorColor();
    return false;
  }
  if (
    Number(dayInput.value) > lastDayjune &&
    Number(monthInput.value) === monthOfjune
  ) {
    dayRequiredField.innerHTML = "Must be a valid date";
    errorColor();
    return false;
  }
  if (
    Number(dayInput.value) > lastDaySep &&
    Number(monthInput.value) === monthOfSep
  ) {
    dayRequiredField.innerHTML = "Must be a valid date";
    errorColor();
    return false;
  }
  if (
    Number(dayInput.value) > lastDayNov &&
    Number(monthInput.value) === monthOfNov
  ) {
    dayRequiredField.innerHTML = "Must be a valid date";
    errorColor();
    return false;
  }
  return true; // Return true to indicate validation success
}

function ageCalculator() {
  if (!requiredField()) {
    return; // Stop the age calculation if validation fails
  }

  const currentDate = new Date();
  const displayYear = document.querySelector(".js-age-years");
  const displayMonth = document.querySelector(".js-age-months");
  const displayDay = document.querySelector(".js-age-days");

  let newYear = currentDate.getFullYear() - Number(yearInput.value);
  displayYear.innerHTML = newYear;

  let newMonth = currentDate.getMonth() + 1 - Number(monthInput.value);
  displayMonth.innerHTML = newMonth;

  let newDay = currentDate.getDate() - Number(dayInput.value);
  displayDay.innerHTML = newDay;

  // Clear the input fields after calculating and displaying the age
  dayInput.value = "";
  monthInput.value = "";
  yearInput.value = "";

  if (newMonth <= 0) {
    newMonth += 12;
    displayMonth.innerHTML = newMonth;
    newYear--;
    displayYear.innerHTML = newYear;
  }

  const previousMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );

  if (newDay < 0) {
    newDay += previousMonth.getDate();
    displayDay.innerHTML = newDay;
    newMonth--;
    displayMonth.innerHTML = newMonth;

    if (newDay === 0) {
      newYear++;
      displayYear.innerHTML = newYear;
      newMonth -= 12;
      displayMonth.innerHTML = newMonth;
    }
  }
}

submitBtn.addEventListener("click", () => {
  const day = Number(dayInput.value);
  const month = Number(monthInput.value);
  const year = Number(yearInput.value);
  ageCalculator(day, month, year);
});
