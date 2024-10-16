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
    fetch("https://api.github.com/users/Damtab83")
      .then((response) => response.json())
      .then((data) => {
        this.updateHTMLUser(data);
      })
      .catch((error) => {
        console.log("ERREUR lors de l'appel API getUserInformations", error);
      });
  }

  async getReposInformation() {
    //API façon #2 avec Octokit
    const octokit = new Octokit();
    const response = await octokit
      .request("GET /users/Damtab83/repos")
      .catch((error) => {
        console.log("ERREUR lors de l'appel API getRepoInformations", error);
      });
    const recentsProjects = response.data.slice(-3);
    for (let i = 0; i < recentsProjects.length; i++) {
      const languagesUrl = recentsProjects[i].languages_url;
      const cleanedUrl = languagesUrl.replace("https://api.github.com", "");
      const responseLanguages = await octokit
        .request(`GET ${cleanedUrl}`)
        .catch((error) => {
          console.log(
            "ERREUR lors de l'appel API getRepoInformations - languages",
            error
          );
        });
      const projectLanguages = responseLanguages.data;
      recentsProjects[i].languages = projectLanguages;
    }
    this.updateHTMLProjects(recentsProjects);
  }

  updateHTMLUser(APIdata) {
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
      this.createHTMLLanguageTag(
        this.projectsTagContainer[i],
        project.languages
      );
      htmlIndex++;
    }
  }

  createHTMLLanguageTag(div, languages) {
    console.log("div", div);
    console.log("languages", languages);
    const arrayLanguages = Object.keys(languages);
    for (let i = 0; i < arrayLanguages.length; i++) {
      const span = document.createElement("span");
      span.textContent = arrayLanguages[i];
      div.appendChild(span);
    }
    console.log("array", arrayLanguages);
  }
}

export { Home };
