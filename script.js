document.querySelector("#textinput").addEventListener("keyup",function(e){

    e.preventDefault();
    const input = document.querySelector("#textinput").value;

    const newHtml = `<div class="todo-list">
    <label for="cb">
      <input type="checkbox" id="cb" name="cb" class="check-list">
      <span class="span">
      <svg class="svg_checkbox" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="11.5" fill="white" stroke="#E3E4F1"/>
        <circle class="marker" cx="12" cy="12" r="12" fill="url(#paint0_linear_0_479)"/>
        <path class="box" d="M8 12.3041L10.6959 15L16.6959 9" stroke="white" stroke-width="2"/>
        <defs>
        <linearGradient id="paint0_linear_0_479" x1="-12" y1="12" x2="12" y2="36" gradientUnits="userSpaceOnUse">
        <stop stop-color="#55DDFF"/>
        <stop offset="1" stop-color="#C058F3"/>
        </linearGradient>
        </defs>
        </svg>
      </span>
    </label>
    <p class="list_title">${input}</p>
    <svg class="svg_remove" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="Combined Shape 2">
      <path id="Combined Shape" fill-rule="evenodd" clip-rule="evenodd" d="M17.6777 0.707107L16.9706 0L8.83883 8.13173L0.707107 0L0 0.707107L8.13173 8.83883L0 16.9706L0.707106 17.6777L8.83883 9.54594L16.9706 17.6777L17.6777 16.9706L9.54594 8.83883L17.6777 0.707107Z" fill="#494C6B"/>
      </g>
      </svg>
  </div>
  `

    
    if(e.keyCode===13)
    {
        document.querySelector(".todo").insertAdjacentHTML("afterbegin",newHtml);
    } 
    
    
    
    

    
}); 



