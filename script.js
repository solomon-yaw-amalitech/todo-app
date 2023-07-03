document.querySelector(".light_mode").addEventListener("click",function(){
    document.body.style.background = "#171823";
    document.querySelector(".dark_mode").style.display ="block"; 
    document.querySelector(".light_mode").style.display ="none";
    document.querySelector(".header").style.background ="url(images/bg-desktop-dark.jpg)"; 
    document.body.style.color = "#fff";
    
    const listTitle = document.querySelectorAll(".list_title");
   const list =  document.querySelectorAll(".list");

   for(titles of listTitle){
    titles.style.color = "#fff";
   }
    
   for(lists of list){
    lists.classList.add("bg_list");
      
  }
    
    
    
}) 

document.querySelector(".dark_mode").addEventListener("click",function(){
    document.body.style.background = "#fff";
    document.querySelector(".dark_mode").style.display ="none"; 
    document.querySelector(".light_mode").style.display ="block";
    document.querySelector(".header").style.background ="url(images/bg-desktop-light.jpg)"; 

    const listTitle = document.querySelectorAll(".list_title");
   const list =  document.querySelectorAll(".list");

   for(titles of listTitle){
    titles.style.color = "#494C6B";
   }
    
   for(lists of list){
    lists.classList.remove("bg_list");
      
  }
    
    
    
}) 

