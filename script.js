
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

   for(titles of listTitlePtag){
    titles.style.color = "#494C6B";
   }
    
   for(lists of listDiv){
    lists.classList.remove("bg_list");
      
  }
    
}); 

