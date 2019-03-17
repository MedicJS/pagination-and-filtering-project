/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
//declare global varibles
const page = document.querySelector('.page');
//const studentItems = document.getElementsByClassName('student-item');
const list = document.querySelector('ul.student-list');
//Gets all the lis of the list above
const students = list.children;
//Calcs the amount of pages needed
const numOfPages = Math.ceil(students.length / 10);
//used for remove function and creating search bar
const pageHeader = document.getElementsByClassName('page-header')[0];
//used to create pagination div
const pagDiv = document.createElement('div');
pagDiv.className = 'pagination';
//makes pag unordered list of links
const pagUl = document.createElement('ul');


//ShowPage Function 
const showPage = (list, page) => {
   //Declare low and high page number to index student list
   const low = (page * 10) - 10;
   const high = 10 * page;
   //loop through student list using the low and high number
   for(let i = 0 ; i < students.length; i++){
      const li = students[i];
      //Example if i >= 1 && 10 display students 1-10 if i >= 11  && 20 display 11-20 and so on
      ((i >= low && i < high)) ? li.style.display = '' : li.style.display = 'none'; //Tenary Operator
   }
}

//Function to create correct Pagination based off of numOfPages
const createPagination = (num) => {
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
      showPage(students, newPage);
      e.target.classList = 'active';
   })
   //Appends Created Div to Main Page Element
   page.appendChild(pagDiv);
}// End of Create Pagination Function

const noResDiv = document.createElement('div');
const noResults = () => {
   noResDiv.innerHTML = "";
   noResDiv.innerHTML = "<p>No results were found.</p>";
   list.appendChild(noResDiv);
 }
 

//Create Search Input Form 
const searchDiv = document.createElement('div');
searchDiv.className = 'student-search';
//Create Input Form
const searchBar = document.createElement('input');
searchBar.type = 'text';
searchBar.placeholder = 'Search For Students...';
//Create Search Button
const searchBtn = document.createElement('button');
searchBtn.textContent = 'search';
//Append Input and Button to Div and Page
searchDiv.appendChild(searchBar);
searchDiv.appendChild(searchBtn);
pageHeader.appendChild(searchDiv);

//FILTER STUDENT LIST

//create filterStudents Function
const filterStudents = () => {
   //Get Input Value That Updates With Keyup
   let value = searchBar.value.toUpperCase();
   //Grabs Ul
   let ul = document.querySelector('ul.student-list');
   
   //Grabs each li
   let li = ul.querySelectorAll('li');

   let resultsArr = [];
   
   //iterates through each li above
   for(let i = 0; i < li.length; i++) {
         //Grabs The Text inside the h3 of each li in list
         let names = li[i].getElementsByTagName('h3')[0].innerText;

         //Converts text to Uppercase and use indexOf to test the array.
         if(names.toUpperCase().indexOf(value) > -1){
            li[i].style.display = ''; //Shows matching names
            resultsArr.push
         } else {
            li[i].style.display = 'none';//hides not matching names
         }
   
      //Remove Pagination while searching
      if(value != '') {
         document.getElementsByClassName('pagination')[0].style.display = 'none';
      } else {
      // Add  Pagination class while searching
         let pages = document.getElementsByClassName('pagination')[0].getElementsByTagName('a');
         for (let i = 0; i < pages.length; i++) {
            pages[i].className = "";
         } //RESET PAGE WITH LINKS
         showPage(students, 1);
         pages[0].className = "active";
         document.getElementsByClassName('pagination')[0].style.display = 'block';
      }
   }
   //calls the no result functions
   if(resultsArr !== '') {
      noResults();
   }
}


//Search Event Listener
searchBar.addEventListener('keyup', filterStudents);
//Run Functions on start
showPage(students, 1);
createPagination(numOfPages);

//End
