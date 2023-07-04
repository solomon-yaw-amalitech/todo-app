
// Code for light mode
document.querySelector(".light_mode").addEventListener("click",function(){
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
        
});


//code for light mode
document.querySelector(".dark_mode").addEventListener("click",function(){
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
    
}); 

//Event listener for textbox

document.querySelector(".text_input").addEventListener("keyup",function( event){
  console.log(event); 
  
   const listItem = event.target.value;
   console.log(listItem); 
   
   if(event.keyCode===13){
     addlist(listItem);
     document.querySelector(".text_input").value=""; 
     
   }
        

}); 

function addlist(list)
{
 
  
  const newHtml = `<div class="list">
  <label for="checkbox">
    <input class="input_check" type="checkbox" id="checkbox">
    <span>
      <svg class="svg_check" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="11.5" fill="white" stroke="#E3E4F1"/>
        <circle cx="12" cy="12" r="12" fill="url(#paint0_linear_0_595)"/>
        <path class="svg" d="M8 12.3041L10.6959 15L16.6959 9" stroke="white" stroke-width="2"/>
        <defs>
        <linearGradient id="paint0_linear_0_595" x1="-12" y1="12" x2="12" y2="36" gradientUnits="userSpaceOnUse">
        <stop stop-color="#55DDFF"/>
        <stop offset="1" stop-color="#C058F3"/>
        </linearGradient>
        </defs>
        </svg>
    </span>
  </label>
  <p class="list_title">${list}</p>
  <svg class="cancel_list" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="Combined Shape 2">
    <path id="Combined Shape" fill-rule="evenodd" clip-rule="evenodd" d="M17.6777 0.707107L16.9706 0L8.83883 8.13173L0.707107 0L0 0.707107L8.13173 8.83883L0 16.9706L0.707106 17.6777L8.83883 9.54594L16.9706 17.6777L17.6777 16.9706L9.54594 8.83883L17.6777 0.707107Z" fill="#494C6B"/>
    </g>
    </svg>
</div>
`;

document.querySelector(".todo_list").insertAdjacentHTML("afterbegin",newHtml); 


}
