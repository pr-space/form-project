const btnSurvey = document.getElementsByClassName('btn-survey')[0];

btnSurvey.addEventListener('click',sendFormFile);

function sendFormFile(){
  
    window.location.href = "./views/form.html";

}

const btnResults = document.getElementsByClassName('btn-results')[0];

btnResults.addEventListener('click',sendResultsPage);

function sendResultsPage(){
    console.log("clicked");
    
  
    window.location.href = "./views/results.html";

}

