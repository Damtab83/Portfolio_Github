class Home {
  constructor() {
    this.descriptionHTML = document.querySelector(".js-home-description");
    this.profilHTML = document.querySelector(".js-home-profil-url");
    this.avatarHTML = document.querySelector(".js-home-avatar");

    this.init();
  }

  init() {
    //Recupere les infos du profildepuis l'api
    this.getUserInformations();
    //Affiche la description de mon Profil
    //Affiche l'url de mon profil
  }
  getUserInformations() {
    //url: https://api.github.com/users/Damtab83

    fetch("https://api.github.com/users/Damtab83")
      .then((response) => response.json())
      .then((data) => {
        this.updateHTML(data);
      })
      .catch((error) => {
        console.log("ERREUR lors de l'appel API", error);
      });
  }

  updateHTML(APIdata) {
    this.descriptionHTML.textContent = APIdata.bio;
    this.profilHTML?.setAttribute("href", APIdata.html_url);
    this.avatarHTML?.setAttribute("src", APIdata.avatar_url);
  }
}

export { Home };
