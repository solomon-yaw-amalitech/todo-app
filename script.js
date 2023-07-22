
//Event listener for custom checkbox
const checkboxes = document.querySelectorAll('.custom-checkbox');
checkboxes.forEach(checkbox => {
  checkbox.addEventListener('change', (event) => {
    // Code to handle checkbox change event
    const checkboxImage = event.target.parentNode.querySelector('.checkbox-image');
    if (event.target.checked) {
      checkboxImage.src = '/images/check.png';
    } else {
      checkboxImage.src = '/images/circle-white.png';
    }
  });
});

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
     addlist(listItem);
     document.querySelector(".text_input").value="";  
    }

  }
  
}); 

function addlist(list)
{

 
 const newHtml = `<div class="list">
 <label for="myCheckbox">
   <input type="checkbox" id="myCheckbox" style="display: none;">
   <img src="/images/check.png" alt="Unchecked Image" width="25" height="25">
 </label>
 <p class="list_title">Complete online Javascript Course</p>
 <svg class="cancel_list" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
   <g id="Combined Shape 2">
   <path id="Combined Shape" fill-rule="evenodd" clip-rule="evenodd" d="M17.6777 0.707107L16.9706 0L8.83883 8.13173L0.707107 0L0 0.707107L8.13173 8.83883L0 16.9706L0.707106 17.6777L8.83883 9.54594L16.9706 17.6777L17.6777 16.9706L9.54594 8.83883L17.6777 0.707107Z" fill="#494C6B"/>
   </g>
   </svg>
</div>  
`;

document.querySelector(".todo_list").insertAdjacentHTML("afterbegin",newHtml); 


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
  

  for(titles of listTitlePtag){
   titles.style.color = "#494C6B";
  }
   
  for(lists of listDiv){
   lists.classList.remove("bg_list");
     
 }
   
}
