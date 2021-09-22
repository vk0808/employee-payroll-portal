// function to return JSON object
const createEmployeePayrollJSON = () => {
  let empPayrollListLocal = [
    {
      _name: 'Surya Kumar',
      _gender: 'Male',
      _department: [
        'HR',
        'Finance'
      ],
      _salary: '400000',
      _startDate: '2 Aug 2021',
      _note: '',
      _id: new Date().getTime(),
      _profilePic: '../assets/profile-images/Ellipse -2.png'
    },
    {
      _name: 'Punith Kumar',
      _gender: 'Male',
      _department: [
        'Engineer'
      ],
      _salary: '450000',
      _startDate: '12 Sep 2021',
      _note: '',
      _id: new Date().getTime(),
      _profilePic: '../assets/profile-images/Ellipse -3.png'
    }
  ];
  return empPayrollListLocal;
}