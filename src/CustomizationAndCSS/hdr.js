window.onscroll = function() {
    scrollFunction()
  }
  
  function scrollFunction() {
    if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
      document.getElementById("navbar").style.height = "292px";
      document.getElementById("headerInputBox").style.top = "90px";
      
    } else {
      document.getElementById("navbar").style.height = "600px";
      document.getElementById("headerInputBox").style.top = "0";
    }
  }