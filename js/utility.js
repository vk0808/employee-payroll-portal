const stringifyDate = (date) => {
  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  const newDate = !date ? "undefined" : new Date(date).toLocaleDateString('en-GB', options);
  return newDate;
};

const checkName = (name) => {
  let nameRegex = RegExp("^[A-Z]{1}[a-zA-Z\\s]{2,}$");
  if (!nameRegex.test(name)) throw "Invalid name: should start with capital & needs to be min. 3 chars";
}
const checkStartDate = (startDate) => {
  let currentDate = new Date();
  if (startDate > currentDate) {
    throw "Starting date is a future date";
  }
  var diff = Math.abs(currentDate.getTime() - startDate.getTime());
  if (diff / (1000 * 60 * 60 * 24) > 30) {
    throw "Starting date is beyond 30 days";
  }
}
