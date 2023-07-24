
changeCheckBox();
//Event listener for custom checkbox
function changeCheckBox(){
  const checkboxes = document.querySelectorAll('.custom-checkbox');
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', (event) => {
      // Code to handle checkbox change event
      const checkboxImage = event.target.parentNode.querySelector('.checkbox-image');
      if (event.target.checked) {
        checkboxImage.src = './images/check.png';
        event.target.parentNode.parentNode.classList.add("complete");
      } else {
        checkboxImage.src = './images/circle-white.png';
        event.target.parentNode.parentNode.classList.remove("complete");
      }

    });
  });
  
}




// Code for dark mode
document.querySelector(".light_mode").addEventListener("click",function(event){
  showDarkMode();        
});


//code for light mode

document.querySelector(".dark_mode").addEventListener("click",function(event){
   showLightMode();
}); 

//Event listener for textbox

document.querySelector(".text_input").addEventListener("keyup",function( event){
  event.preventDefault();
  
  const listItem = event.target.value;
  if(listItem.length>0){
    if(event.keyCode===13){
      getItemsFromLocalStorage();
     render();
     addItemToLocalStorage(listItem);
     changeCheckBox();      
     document.querySelector(".text_input").value=""; 
     itemsLeft();
     
    }

  }
  else{
    alert("You must write something");
  }
  
}); 

function render()
{
  let items = getItemsFromLocalStorage();
  const todoList = document.querySelector(".todo_list");

  // Clear the previous items in the todo list
  todoList.innerHTML = "";

  for(item of items){
    
    //const hasTextInput = document.querySelector(".text_input").value.length > 0;
//<div class="list ${hasTextInput ? 'bg_list' : ''}"></div>
 const newHtml = `<div class="list" draggable="true">
 <label>
   <input type="checkbox" id="checkbox" class="custom-checkbox">
   <img src="./images/check.png" alt="Checkbox" class="checkbox-image">
 </label>      <p class="list_title">${item.description}</p>
 <svg onclick ="deleteListItem(event)" class="delete_list" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
   <g id="Combined Shape 2">
   <path id="Combined Shape" fill-rule="evenodd" clip-rule="evenodd" d="M17.6777 0.707107L16.9706 0L8.83883 8.13173L0.707107 0L0 0.707107L8.13173 8.83883L0 16.9706L0.707106 17.6777L8.83883 9.54594L16.9706 17.6777L17.6777 16.9706L9.54594 8.83883L17.6777 0.707107Z" fill="#494C6B"/>
   </g>
   </svg>
</div>
`;


// Append the new HTML to the todo list
todoList.insertAdjacentHTML("afterbegin", newHtml); 

draggableList();
  }


}

function showDarkMode(){

 document.body.style.background = "#171823";
   document.querySelector(".dark_mode").style.display ="block"; 
   document.querySelector(".light_mode").style.display ="none";
   document.querySelector(".header").style.background ="url(images/bg-desktop-dark.jpg)"; 
   document.body.style.color = "#fff";
   const listTitlePtag = document.querySelectorAll(".list_title");
  const listDiv =  document.querySelectorAll(".list");
  const listFooterDiv = document.querySelector(".list_footer");
  listFooterDiv.style.background =" #25273D";

  const listFooter2Div = document.querySelector(".list_footer2");
  listFooter2Div.style.background = "#25273D";

  
     // Check if there is a text input
  const hasTextInput = document.querySelector(".text_input").value.length > 0;

  // add bg_list class from the listDiv elements if there is a text input
  for (const list of listDiv) {
    if (hasTextInput) {
      list.classList.add("bg_list");
    } else {
      list.classList.remove("bg_list");
    }
  }

  

  for(titles of listTitlePtag){
   titles.style.color = "#fff";
  }
   
  for(lists of listDiv){
   lists.classList.add("bg_list");
     
 }
   
}

function showLightMode(){
 document.body.style.background = "#fff";
   document.body.style.color = "black";
   document.querySelector(".dark_mode").style.display ="none"; 
   document.querySelector(".light_mode").style.display ="block";
   document.querySelector(".header").style.background ="url(images/bg-desktop-light.jpg)"; 
   const listTitlePtag = document.querySelectorAll(".list_title");
  const listDiv =  document.querySelectorAll(".list");

  const listFooterDiv = document.querySelector(".list_footer");
  listFooterDiv.style.background =" #fff";

  const listFooter2Div = document.querySelector(".list_footer2");
  listFooter2Div.style.background = "#fff";

    // Check if there is a text input
    const hasTextInput = document.querySelector(".text_input").value.length > 0;

    // Remove bg_list class from the listDiv elements if there is a text input
    for (const list of listDiv) {
      if (hasTextInput) {
        list.classList.remove("bg_list");
      } else {
        list.classList.add("bg_list");
      }
    }
  
  

  for(titles of listTitlePtag){
   titles.style.color = "#494C6B";
  }
   
  for(lists of listDiv){
   lists.classList.remove("bg_list");
     
 }
   
}


//get items from localstorage
function getItemsFromLocalStorage(){
  let items = localStorage.getItem("items");
  
  
     if(items)
     {
      items = JSON.parse(items);
     }
  
     else{
      items = [];
     }
     
     return items;
   
     
  }

   

  // add items to localStorage
  function addItemToLocalStorage(description)
{
  let items = getItemsFromLocalStorage();

   items.push({
    description
   });

   localStorage.setItem("items",JSON.stringify(items));
   render();

}

// Function to delete a list item
function deleteListItem(event) {
  const listItem = event.target.parentElement;  
  const description = listItem.querySelector('.list_title').textContent;
  deleteItemFromLocalStorage(description);
  listItem.remove();
  itemsLeft();
}


// Function to delete an item from localStorage
function deleteItemFromLocalStorage(description) {
  let items = getItemsFromLocalStorage();

  // Filter out the item with the matching description
  items = items.filter(item => item.description !== description);

  // Update the local storage with the updated items
  localStorage.setItem('items', JSON.stringify(items));
}

  
function itemsLeft(){

  const lists = getItemsFromLocalStorage();
  const itemsLeft = document.querySelector(".items_left"); 
  itemsLeft.textContent = `${lists.length} items left`; 
  
}
//call itemsLeft Function
itemsLeft();

//Drag and drop to reorder list
// Variable to store the reference to the element being dragged
let draggedItem = null;

function draggableList() {
  const lists = document.querySelectorAll('.list');
  lists.forEach((list) => {
    list.addEventListener('dragstart', dragStart);
    list.addEventListener('dragover', dragOver);
    list.addEventListener('drop', drop);
  });
}

function dragStart(event) {
  // Store the reference to the dragged element
  draggedItem = event.target;
}

function dragOver(event) {
  // Prevent default to enable drop
  event.preventDefault();
}

function drop(event) {
  // Get the target element to drop on
  const dropTarget = event.target;

  // Swap the positions of the dragged item and the drop target in the DOM
  const parent = dropTarget.parentNode;
  const next = dropTarget.nextElementSibling;

  if (draggedItem !== dropTarget) {
    parent.insertBefore(draggedItem, dropTarget);
  } else if (next) {
    parent.insertBefore(draggedItem, next);
  } else {
    parent.appendChild(draggedItem);
  }
}



 

