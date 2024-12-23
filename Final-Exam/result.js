window.onload = function() {
    const scoreContainer = document.getElementById("score");
  
   
    const score = localStorage.getItem("quizScore");
  
    if (score !== null) {
      scoreContainer.textContent = `You scored: ${score} / 10`;
    } else {
      scoreContainer.textContent = "No score found.";
    }
  };
  
  function goBack() {
    window.location.href = "index.html";  
  }
  