const username = "vygharajesh075-bit";

async function loadGitHubStats() {
    const reposEl = document.getElementById("repos");
    const starsEl = document.getElementById("stars");
    const followersEl = document.getElementById("followers");

    try {
        // USER DATA
        const userRes = await fetch(`https://api.github.com/users/${username}`);
        const userData = await userRes.json();

        followersEl.innerText = userData.followers;

        // REPOS DATA
        const repoRes = await fetch(`https://api.github.com/users/${username}/repos`);
        const repos = await repoRes.json();

        reposEl.innerText = repos.length;

        // CALCULATE STARS
        let totalStars = 0;
        repos.forEach(repo => {
            totalStars += repo.stargazers_count;
        });

        starsEl.innerText = totalStars;

    } catch (err) {
        console.error(err);
    }
}

// RUN ON LOAD
document.addEventListener("DOMContentLoaded", loadGitHubStats);