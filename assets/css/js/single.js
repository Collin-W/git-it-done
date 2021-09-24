var issueContainerLink = document.querySelector("#issues-container");
var limitWarningEl = document.querySelector("#limit-warning");
var repoNameEl = document.querySelector("#repo-name");
var queryString = document.location.search;


var getRepoName = function() {
    var repoName = queryString.split("=")[1];
    console.log(repoName);

    if(repoName) {
    repoNameEl.textContent = repoName;
    getRepoIssues(repoName);
  } else {
      document.location.replace("./index.html");
  }
}


var getRepoIssues= function(repo) {


    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";

    fetch(apiUrl)
    .then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);
                displayIssues(data);

                //check if the api has paginated issues that are not showing 
                if (response.headers.get("Link")) {
                    displayWarning(repo)
                }
            });
        } else {
          document.location.replace("./index.html");
        }
    });
   
};


var displayIssues = function(issues) {
    
    if (issues.length === 0) {
        issueContainerLink.textContent = "This repo has no open issues!";
        return;
      }

    for (var i = 0; i < issues.length; i++) {

        var issueLink = document.createElement("a");
        issueLink.classList = "list-item flex-row justify-space-between align-center";
        issueLink.setAttribute("href", issues[i].html_url);
        issueLink.setAttribute("target", "_blank");

        // create span to hold issue title 
        var titleEl = document.createElement("span");
        titleEl.textContent = issues[i].title;

        // append to container
        issueLink.appendChild(titleEl);

        //create a type element
        var typeEl = document.createElement("span");

        // check if issue is issue or pull request 
        if (issues[i].pull_request) {
            typeEl.textContent = "(Pull request)";
        } else {
            typeEl.textContent = "(Issue)";
        }
        issueLink.appendChild(typeEl);
        issueContainerLink.appendChild(issueLink);
        }
    };

    var displayWarning = function(repo) {

        // add text to warning container
        limitWarningEl.textContent = "To see more that 30 issues, visit ";


        var linkEl = document.createElement("a");
        linkEl.textContent = "See More Issues on GitHub.com";
        linkEl.setAttribute("href", "https://github.com/" + repo + "/issues");
        linkEl.setAttribute("target", "_blank");

        // append to warning container
        limitWarningEl.appendChild(linkEl);
    };

    getRepoName();