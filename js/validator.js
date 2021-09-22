// Global variables
let isUpdate = false;
let employPayrollObject = {};

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
  checkForUpdate();
});

// function to save to local storage
const save = () => {
  try {
    let employeePayrollData = createEmployeePayroll();
    createAndUpdateStorage(employeePayrollData);
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


// function to get EmployeePayrollData stored in local storage, 
// parse into JSON, then add to object and finally update local storage
const createAndUpdateStorage = (employeePayrollData) => {
  let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));

  // check if present
  if (employeePayrollList != undefined) {
    employeePayrollList.push(employeePayrollData);
  } else { // else add to object
    employeePayrollList = [employeePayrollData]
  }
  alert(employeePayrollList.toString());
  // update local storage
  localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));
}

// function to reset input fields
const resetForm = () => {
  setValue('#name', '');
  unsetSelectedValues('[name=profile]');
  unsetSelectedValues('[name=gender]');
  unsetSelectedValues('[name=department]');
  setValue('#salary', '');
  setTextValue('.salary-output', 400000);
  setTextValue(".text-error", '');
  setTextValue(".date-error", '');
  setValue('#notes', '');
  setValue('#day', '1');
  setValue('#month', 'Jan');
  setValue('#year', '2020');
}

// function to reset checkbox and radio buttons
const unsetSelectedValues = (propertyValue) => {
  let allItems = document.querySelectorAll(propertyValue);
  allItems.forEach(item => {
    item.checked = false;
  });
}

// function to reset innerHTML of the given element
const setTextValue = (id, value) => {
  let textError = document.querySelector(id);
  textError.textContent = value;
}

// function to reset value of the given element
const setValue = (id, value) => {
  const element = document.querySelector(id);
  element.value = value;
}

// function to check if there is any update array present inside object of local storage
const checkForUpdate = () => {
  const jsonData = localStorage.getItem('edit-emp');
  isUpdate = jsonData ? true : false;
  if (!isUpdate) return;
  employPayrollObject = JSON.parse(jsonData);
  setForm();
}

// function to set all the input fields with corresponding values of that element
const setForm = () => {
  setValue('#name', employPayrollObject._name);
  setSelectedValue('[name = profile]', employPayrollObject._profilePic);
  setSelectedValue('[name = gender]', employPayrollObject._gender);
  setSelectedValue('[name = department]', employPayrollObject._department);
  setValue('#salary', employPayrollObject._salary);
  setTextValue('.salary-output', employPayrollObject._salary);
  let date = stringifyDate(employPayrollObject._startDate).split(" ");
  setValue('#day', date[0]);
  setValue('#month', date[1]);
  setValue('#year', date[2]);
  setValue('#notes', employPayrollObject._note);
}

// function to set checkbox and radio buttons by selecting the values of that element
const setSelectedValue = (propertyValue, value) => {
  let allItem = document.querySelectorAll(propertyValue);
  allItem.forEach(item => {
    if (Array.isArray(value)) {
      if (value.includes(item.value)) {
        item.checked = true;
      }
    } else if (item.value === value) {
      item.checked = true;
    }
  });
}