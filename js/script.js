// Variable for div where your profile information appears
const overview = document.querySelector(".overview");
// Github username 
const username = "itsyagirlalexcote";
// variable for unordered list to display the repo list
const repoList = document.querySelector(".repo-list");
// variable for container where repo info appears (class of repos)
const allReposContainer = document.querySelector(".repos");
// variable for where individual repo data will appear
const repoData = document.querySelector(".repo-data");
// variable for Back to repo gallery button
const backToReposButton = document.querySelector(".view-repos");
// variable for Search by name placeholder
const filterInput = document.querySelector(".filter-repos");


// function to fetch info from your github profile
const gitUserInfo = async function () {
    const userInfo = await fetch(`https://api.github.com/users/${username}`);
    const data = await userInfo.json();

    displayUserInfo(data);
};

gitUserInfo();

// function to display fetched used info
const displayUserInfo = function (data) {
    const div = document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML = `
        <figure>
            <img alt="user avatar" src=${data.avatar_url} />
        </figure>
        <div>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Bio:</strong> ${data.bio}</p>
            <p><strong>Location:</strong> ${data.location}</p>
            <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
        </div>
    `;

    overview.append(div);
    gitRepos();
};

// function to fetch repos
const gitRepos = async function () {
    const fetchRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await fetchRepos.json();

    displayRepos(repoData);
};

const displayRepos = function (repos) {
    filterInput.classList.remove("hide");
    for (const repo of repos) {
        const repoItem = document.createElement("li");
        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(repoItem);
    }
};

repoList.addEventListener("click", function(e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        getRepoInfo(repoName);
    }
});

// function to get specific repo info
const getRepoInfo = async function (repoName) {
    const fetchInfo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await fetchInfo.json();
    console.log(repoInfo);
    // fetch languages
    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languageData = await fetchLanguages.json();

    // Make a list of languages
    const languages = [];
    for (const language in languageData) {
        languages.push(language);
    };

    displayRepoInfo(repoInfo, languages)
};

// display the specific repo info
const displayRepoInfo = function (repoInfo, languages) {
    repoData.innerHTML = "";
    repoData.classList.remove("hide");
    allReposContainer.classList.add("hide");
    backToReposButton.classList.remove("hide");
    const div = document.createElement("div");
    div.innerHTML = `
        <h4>Name: ${repoInfo.name}</h4>
        <p>Description: ${repoInfo.description}</p>
        <p>Default Branch: ${repoInfo.default_branch}</p>
        <p>Languages: ${languages.join(", ")}</p>
        <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
    `;
    repoData.append(div);
};

backToReposButton.addEventListener("click", function () {
    allReposContainer.classList.remove("hide");
    repoData.classList.add("hide");
    backToReposButton.classList.add("hide");
});

// Dynamic search
filterInput.addEventListener("input", function (e) {
    const searchText = e.target.value;
    const repos = document.querySelectorAll(".repo");
    const lowerCaseSearch = searchText.toLowerCase();

    for (const repo of repos) {
        const lowerCaseRepo = repo.innerText.toLowerCase();
        if (lowerCaseRepo.includes(lowerCaseSearch)) {
            repo.classList.remove("hide");
        } else {
            repo.classList.add("hide");
        }
    }
});
