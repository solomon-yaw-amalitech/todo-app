"use strict";
loadCheckboxState();

//DarkMode
document
  .getElementById("toggle-checkbox")
  .addEventListener("change", function () {
    document.body.classList.toggle("dark");
    document.querySelector(".list_footer").classList.toggle("list-dark");
    document.querySelector(".header").classList.toggle("bg-image");

    const list = document.querySelectorAll(".list");

    for (let lists of list) {
      lists.classList.toggle("list-dark");
    }
  });

changeCheckBox();
//Event listener for custom checkbox
function changeCheckBox() {
  const checkboxes = document.querySelectorAll(".custom-checkbox");
  checkboxes.forEach((checkbox, index) => {
    checkbox.addEventListener("change", (event) => {
      // Get the items from local storage
      let items = getItemsFromLocalStorage();

      // Update the 'completed' property of the corresponding item
      items[index].completed = event.target.checked;

      // Update the local storage with the updated items
      localStorage.setItem("items", JSON.stringify(items));

      // Update the checkbox image based on the checkbox state
      const checkboxImage =
        event.target.parentNode.querySelector(".checkbox-image");
      checkboxImage.src = event.target.checked
        ? "./images/check.png"
        : "./images/circle-white.png";

      // Update the 'complete' class of the list item
      const listItem = event.target.closest(".list");
      listItem.classList.toggle("complete", event.target.checked);

      const listTitle = listItem.querySelector(".list_title");
      // Toggle the "completed_with_color" class based on checkbox state
      if (event.target.checked) {
        listTitle.classList.toggle("completed_with_color");
      }

      // Update the number of items left
      itemsLeft();
    });
  });
}

function loadCheckboxState() {
  const checkboxes = document.querySelectorAll(".custom-checkbox");
  const items = getItemsFromLocalStorage();

  checkboxes.forEach((checkbox, index) => {
    // Check the checkbox only if the item is completed
    checkbox.checked = items[index].completed;

    // Get the corresponding checkbox image element
    const checkboxImage = checkbox.parentNode.querySelector(".checkbox-image");

    // Set the checkbox image based on the checkbox state
    if (checkbox.checked) {
      checkboxImage.src = "./images/check.png";
    } else {
      checkboxImage.src = "./images/circle-white.png";
    }
  });
}

// Add an event listener to update checkboxes when the filter changes to "Active"
document.querySelector(".status .active").addEventListener("click", () => {
  updateFilteredList("active");
  changeCheckBox(); // This will call loadCheckboxState for the "Active" filter
});

//Event listener for textbox

document
  .querySelector(".text_input")
  .addEventListener("keyup", function (event) {
    event.preventDefault();

    const listItem = event.target.value;
    if (listItem.length > 0) {
      if (event.keyCode === 13) {
        getItemsFromLocalStorage();
        render();
        addItemToLocalStorage(listItem);
        changeCheckBox();
        document.querySelector(".text_input").value = "";
        itemsLeft();

        // Call the loadCheckboxState function to set the initial state on page load
        loadCheckboxState();
      }
    } else {
      alert("You must write something");
    }
  });

function render() {
  let items = getItemsFromLocalStorage();
  const todoList = document.querySelector(".todo_list");

  // Clear the previous items in the todo list
  todoList.innerHTML = "";

  for (let item of items) {
    //const hasTextInput = document.querySelector(".text_input").value.length > 0;
    //<div class="list ${hasTextInput ? 'bg_list' : ''}"></div>
    const newHtml = `<div class="list class="list ${
      item.completed ? "complete" : ""
    }" "draggable="true">
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
    loadCheckboxState();
  }
}

// Call the renderTodoList function on page load
window.onload = function () {
  render();
  changeCheckBox();
};

//get items from localstorage
function getItemsFromLocalStorage() {
  let items = localStorage.getItem("items");

  if (items) {
    items = JSON.parse(items);
  } else {
    items = [];
  }

  return items;
}

// add items to localStorage
function addItemToLocalStorage(description) {
  let items = getItemsFromLocalStorage();

  items.push({
    description,
    completed: false,
  });

  localStorage.setItem("items", JSON.stringify(items));
  render();
}

// Function to delete a list item
function deleteListItem(event) {
  const listItem = event.target.parentElement;
  const description = listItem.querySelector(".list_title").textContent;
  deleteItemFromLocalStorage(description);
  listItem.remove();
  itemsLeft();
}

// Function to delete an item from localStorage
function deleteItemFromLocalStorage(description) {
  let items = getItemsFromLocalStorage();

  // Filter out the item with the matching description
  items = items.filter((item) => item.description !== description);

  // Update the local storage with the updated items
  localStorage.setItem("items", JSON.stringify(items));
}

function itemsLeft() {
  const items = getItemsFromLocalStorage();
  const notCompletedItems = items.filter((item) => !item.completed);
  const itemsLeftCount = notCompletedItems.length;

  const itemsLeft = document.querySelector(".items_left");
  itemsLeft.textContent = `${itemsLeftCount} item${
    itemsLeftCount === 1 ? "" : "s"
  } left`;
}
//call itemsLeft Function
itemsLeft();

//Drag and drop to reorder list
// Variable to store the reference to the element being dragged
let draggedItem = null;

function draggableList() {
  const lists = document.querySelectorAll(".list");
  lists.forEach((list) => {
    list.addEventListener("dragstart", dragStart);
    list.addEventListener("dragover", dragOver);
    list.addEventListener("drop", drop);
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

// Function to filter TODO items based on their completed status
function filterItems(filterType) {
  const items = getItemsFromLocalStorage();
  let filteredItems;

  switch (filterType) {
    case "all":
      filteredItems = items;
      break;
    case "active":
      filteredItems = items.filter((item) => !item.completed); // Only non-completed items for "Active" state
      break;
    case "completed":
      filteredItems = items.filter((item) => item.completed);
      break;
    default:
      filteredItems = items;
  }

  return filteredItems;
}

// Function to update the TODO list based on the selected filter
function updateFilteredList(filterType) {
  const todoList = document.querySelector(".todo_list");
  todoList.innerHTML = "";

  const filteredItems = filterItems(filterType);
  for (const item of filteredItems) {
    const newHtml = `<div class="list ${
      item.completed ? "complete" : ""
    }" draggable="true">
    <label>
    <input type="checkbox" id="checkbox" class="custom-checkbox">
    <img src="./images/check.png" alt="Checkbox" class="checkbox-image">
  </label>      <p class="list_title">${item.description}</p>
  <svg onclick="deleteListItem(event)" class="delete_list" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="Combined Shape 2">
    <path id="Combined Shape" fill-rule="evenodd" clip-rule="evenodd" d="M17.6777 0.707107L16.9706 0L8.83883 8.13173L0.707107 0L0 0.707107L8.13173 8.83883L0 16.9706L0.707106 17.6777L8.83883 9.54594L16.9706 17.6777L17.6777 16.9706L9.54594 8.83883L17.6777 0.707107Z" fill="#494C6B"/>
    </g>
    </svg>
 </div>`;

    todoList.insertAdjacentHTML("beforeend", newHtml);
  }
  loadCheckboxState();
  draggableList();
}

document.querySelectorAll(".status p").forEach((filterOption) => {
  filterOption.addEventListener("click", function () {
    const filterType = this.classList.contains("all")
      ? "all"
      : this.classList.contains("active")
      ? "active"
      : "completed";
    updateFilteredList(filterType);
    changeCheckBox();
    // Call the loadCheckboxState function to set the initial state on page load
    loadCheckboxState();
  });
});

//Function to clear completed list
function clearCompletedItems() {
  let items = getItemsFromLocalStorage();
  items = items.filter((item) => !item.completed);

  // Update the local storage with the updated items
  localStorage.setItem("items", JSON.stringify(items));
  render();
  itemsLeft();
}

// Event listener to the "Clear Completed" button
document.querySelector(".clear").addEventListener("click", clearCompletedItems);
