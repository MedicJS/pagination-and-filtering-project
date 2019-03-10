/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
//declare global varibles
const page = document.querySelector('.page');
const studentList = document.getElementsByClassName('student-item');
const list = document.querySelector('.student-list').children;
const numOfPages = Math.ceil(list.length / 10); //Num of Students divided by 10

//ShowPage Function 
const showPage = (list, page) => {
   //Declare low and high page number to index student list
   const low = (page * 10) - 10;
   const high = 10 * page;
   //loop through student list using the low and high number
   for(let i = 0 ; i < studentList.length; i++){
      const li = studentList[i];
      const conditional = ((i >= low && i < high)) ? li.style.display = '' : li.style.display = 'none'; //Tenary Operator
   }
}


//Function to create correct Pagination based off of numOfPages
const createPagination = (num) => {
   const pagDiv = document.createElement('div');
   const pagUl = document.createElement('ul');
   pagDiv.className = 'pagination';

   // remove active classes - src https://stackoverflow.com/questions/38990163/how-can-i-add-and-remove-an-active-class-to-an-element-in-pure-javascript/38990288
   const removeActive = (e) => {
      var elems = document.querySelectorAll(".active");
      [].forEach.call(elems, function(el) {
      el.classList.remove("active");
      });
      e.target.className = "active";
   }
    
   //Creates New Pag Link
   const createLi= (i) => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = '#';
      a.innerHTML = i + 1;
      li.appendChild(a);
      pagUl.appendChild(li);
      pagDiv.appendChild(pagUl);
   }

   //loop over the createLi() to based off num of pages
   for(i = 0; i < num; i++) {
      createLi(i);
   }

   //Adds Click event for
   pagUl.addEventListener('click', (e) => {
      removeActive(e);
      const newPage = e.target.innerHTML;
      showPage(studentList, newPage);
      e.target.classList = 'active';
   })
   //Appends Created Div to Main Page Element
   page.appendChild(pagDiv);

}// End of Create Pagination Function



//Run Functions on start
showPage(studentList, 1);
createPagination(numOfPages);

//End