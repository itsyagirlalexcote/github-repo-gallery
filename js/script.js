// Variable for div where your profile information appears
const overview = document.querySelector(".overview");
// Github username 
const username = "itsyagirlalexcote";

// async function to fetch info from your github profile
const gitUserInfo = async function () {
    const userInfo = await fetch(`https://api.github.com/users/${username}`);
    const data = await userInfo.json();
    console.log(data);

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
};