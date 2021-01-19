// Set Mian Variables
let mainIput = document.querySelector(".get-repos input"),
  getButton = document.querySelector(".get-button"),
  reposData = document.querySelector(".show-data");

getButton.onclick = function () {
  getRepos();
};

mainIput.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    getButton.click();
  }
});
// Get Repos Function
function getRepos() {
  if (mainIput.value == "" || mainIput.value == null) {
    Swal.fire({
      icon: "error",
      title: "Erorr.",
      text: "You must type something",
    });
    reposData.classList.add("showUp");
    reposData.innerHTML = `<span>No data to show</span>`;
    setTimeout(function () {
      reposData.classList.remove("showUp");
      reposData.innerHTML = "";
    }, 2000);
  } else {
    fetch(`https://api.github.com/users/${mainIput.value}/repos`)
      .then((res) => res.json())
      .then((repositories) => {
        reposData.innerHTML = "";
        // Loop on Repositories
        repositories.forEach((repo) => {
          // Create Repo div Elelemnt and Repo URL
          let mainDiv = document.createElement("div"),
            repoName = document.createTextNode(repo.name),
            repoUrl = document.createElement("a"),
            urlText = document.createTextNode("Visit"),
            startsSpan = document.createElement("span"),
            starsText = document.createTextNode(
              `Stars: ${repo.stargazers_count}`
            );

          mainDiv.appendChild(repoName);
          repoUrl.appendChild(urlText);
          repoUrl.href = `https://github.com/${mainIput.value}/${repo.name}`;
          repoUrl.setAttribute("target", "_blank");
          startsSpan.appendChild(starsText);

          mainDiv.appendChild(repoUrl);
          mainDiv.appendChild(startsSpan);
          mainDiv.className = "repo-box";
          reposData.appendChild(mainDiv);
        });
      })
      .catch((error) => {
        console.error("Error:", error);
        Swal.fire({
          icon: "error",
          title: "Erorr.",
          text: "There is no such user",
        });
        reposData.classList.remove("showUp");
      });
    reposData.classList.add("showUp");
  }
}
