var issueContainerLink = document.querySelector("#issues-container");

var getRepoIssues= function(repo) {

    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";

    fetch(apiUrl)
    .then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);
                displayIssues(data);
            });
        } else {
            alert("There was a problem with your request!");
        }
    });
    console.log(repo);
};
getRepoIssues("facebook/react");


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

