window.onscroll = function(event) {
    scrollFunction()
  }
  
  
function scrollFunction() {
  let currentScroll = document.documentElement.scrollTop;
  if (currentScroll > 0) {
    document.getElementById("navbar").style.height = "150px";
    document.getElementById("headerInputBox").style.top = "20px";
    document.getElementById('content').style.marginTop = '300px';
  }
  else if(currentScroll === 0) {
    document.getElementById("navbar").style.height = "600px";
    document.getElementById("headerInputBox").style.top = "0";
    document.getElementById('content').style.marginTop = '660px';
  }
}