const secretBtn=document.getElementById("secretBtn"),modal=document.getElementById("modal"),closeModal=document.getElementById("closeModal"),themeBtn=document.getElementById("themeBtn");
secretBtn.addEventListener("click",()=>{modal.classList.add("show");});
closeModal.addEventListener("click",()=>modal.classList.remove("show"));
modal.addEventListener("click",e=>{if(e.target===modal)modal.classList.remove("show")});
document.addEventListener("keydown",e=>{if(e.key==="Escape")modal.classList.remove("show")});
themeBtn.addEventListener("click",()=>{document.body.classList.toggle("light");});
document.title = "Nam — Personal Archive";
