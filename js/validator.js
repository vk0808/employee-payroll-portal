// function to get salary slider output
function salaryOutput() {
  const salary = document.querySelector('#salary');
  const output = document.querySelector('.salary-output');
  output.textContent = salary.value;
  salary.addEventListener('input', function () {
    output.textContent = salary.value;
  });
}

// function validate name
function validateName() {
  const name = document.querySelector('#name');
  const textError = document.querySelector('.text-error');
  name.addEventListener('input', function () {
    if (name.value.length == 0) {
      textError.textContent = "";
      return;
    }
    try {
      (new EmployeePayrollData()).name = name.value;
      textError.textContent = "";
    } catch (e) {
      console.error(e);
      textError.textContent = e;
    }
  });
}

// check date if it is within 30 days
function checkDate() {
  const dateError = document.querySelector('.date-error');
  try {
    let date = day.value + " " + month.value + " " + year.value;
    (new EmployeePayrollData()).startDate = new Date(Date.parse(date));
    dateError.textContent = "";
  } catch (e) {
    dateError.textContent = e;
  }
}

// function to validate date
function validateDate() {
  const day = document.querySelector('#day');
  const month = document.querySelector('#month');
  const year = document.querySelector('#year');
  day.addEventListener('input', checkDate);
  month.addEventListener('input', checkDate);
  year.addEventListener('input', checkDate);
}

// add eventListener as the page loads
window.addEventListener('DOMContentLoaded', () => {
  salaryOutput();
  validateName();
  validateDate();
});

// function to save to local storage
const save = () => {
  try {
    let employeePayrollData = createEmployeePayroll();
  } catch (e) {
    return;
  }
}

// function to create employee object and store values by getting it from input fields  
const createEmployeePayroll = () => {
  let employeePayrollData = new EmployeePayrollData();
  try {
    employeePayrollData.name = getInputValueById('#name');
  } catch (e) {
    setTextValue('.text-error', e);
    throw e;
  }
  employeePayrollData.profilePic = getSelectedValues('[name=profile]').pop();
  employeePayrollData.gender = getSelectedValues('[name=gender]').pop();
  employeePayrollData.department = getSelectedValues('[name=department]');
  employeePayrollData.salary = getInputValueById('#salary');
  employeePayrollData.note = getInputValueById('#notes');
  employeePayrollData.id = employPayrollObject._id;
  let date = getInputValueById('#day') + " " + getInputValueById('#month') + " " + getInputValueById('#year');
  employeePayrollData.date = Date.parse(date);
  alert(employeePayrollData.toString());
  return employeePayrollData;
}

// Three methods to get value of input field based on class and id
// 1. Class: function to return values of selected items using querySelectorAll
const getSelectedValues = (propertyValue) => {
  let allItems = document.querySelectorAll(propertyValue);
  let selItems = [];
  allItems.forEach(item => {
    if (item.checked) selItems.push(item.value);
  });
  return selItems;
}

// 2. Id: function to return values of selected items using querySelector
const getInputValueById = (id) => {
  let value = document.querySelector(id).value;
  return value;
}

// 3. Id: function to return values of selected items using getElementById
const getInputElementValue = (id) => {
  let value = document.getElementById(id).value;
  return value;
}