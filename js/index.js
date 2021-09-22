// add eventListener as the page loads
window.addEventListener('DOMContentLoaded', (event) => {
  createInnerHtml();
});

// function to create table and append it to the innerHTML 
const createInnerHtml = () => {
  // column headings
  const headerHtml = "<tr><th></th><th>Name</th><th>Gender</th>" + "<th>Department</th><th>Salary</th><th>Start Date</th><th>Actions</th></tr>";
  // data row
  const innerHtml = `${headerHtml}
    <tr>
      <td><img class="profile" src="../assets/profile-images/Ellipse -2.png" alt=""></td>
      <td>Surya Kumar</td>
      <td>Male</td>
      <td>
        <div class="dept-label">HR</div>
        <div class="dept-label">Finance</div>
      </td>
      <td>300000</td>
      <td>1 Nov 2008</td>
      <td>
        <img src="../assets/icons/delete-black-18dp.svg" alt="delete">
        <img src="../assets/icons/create-black-18dp.svg" alt="create">
      </td>
    </tr>`
    ;
  document.querySelector('#display').innerHTML = innerHtml;
}