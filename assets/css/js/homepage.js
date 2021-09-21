var getUserRepos = function(user) {

    // format the github api url
  var apiUrl = "https://api.github.com/users/" + user + "/repos";

  // make a request to the url
  fetch(apiUrl).then(function(response) {
    response.json().then(function(data) {
      console.log(data);
    });
  });
};
  
  getUserRepos("Collin-W");
  



  // fetch("https://api.github.com/users/octocat/repos");

  // var response = fetch("https://api.github.com/users/octocat/repos");
  // console.log(response);
  
  // fetch("https://api.github.com/users/octocat/repos").then(function(response) {
  //   response.json().then(function(data) {
  //     console.log(data);
  //   });
  // });