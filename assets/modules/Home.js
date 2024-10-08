import { Octokit, App } from "https://esm.sh/octokit";

class Home {
  constructor() {
    this.descriptionHTML = document.querySelector(".js-home-description");
    this.profilHTML = document.querySelector(".js-home-profil-url");
    this.avatarHTML = document.querySelector(".js-home-avatar");

    this.projectsTitle = document.querySelectorAll(".js-home-projet-title");
    this.projectsDescription = document.querySelectorAll(
      ".js-home-projet-description"
    );
    this.projectsTagContainer = document.querySelectorAll(
      ".js-home-projet-tag"
    );
    this.init();
  }

  init() {
    this.getUserInformations();
    this.getReposInformation();
  }
  getUserInformations() {
    //url: https://api.github.com/users/Damtab83

    fetch("https://api.github.com/users/Damtab83")
      .then((response) => response.json())
      .then((data) => {
        this.updateHTMLIntro(data);
      })
      .catch((error) => {
        console.log("ERREUR lors de l'appel API", error);
      });
  }

  async getReposInformation() {
    //API façon #2 avec Octokit
    console.log(Octokit);
    const octokit = new Octokit();
    const response = await octokit
      .request("GET /users/Damtab83/repos")
      .catch((error) => {
        console.log("ERREUR lors de l'appel API getRepoInformations", error);
      });
    this.updateHTMLProjects(response.data);
  }

  updateHTMLIntro(APIdata) {
    this.descriptionHTML.textContent = APIdata.bio;
    this.profilHTML?.setAttribute("href", APIdata.html_url);
    this.avatarHTML?.setAttribute("src", APIdata.avatar_url);
  }
  updateHTMLProjects(projects) {
    const maxIndex = projects.length - 1;
    let htmlIndex = 0;
    for (let i = maxIndex; i > maxIndex - 3; i--) {
      const project = projects[i];
      this.projectsTitle[htmlIndex].textContent = project.name;
      this.projectsDescription[htmlIndex].textContent = project.description;
      const languages = project.topics;
      console.log(languages);
      htmlIndex++;
    }
  }
}

export { Home };
