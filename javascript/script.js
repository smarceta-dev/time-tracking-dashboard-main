class Activity extends HTMLElement {

    constructor() {
        super();

    }

    get currHours(){
      return this.getAttribute("currhours");
    }

    get prevHours(){
      return this.getAttribute("prevhours");
    }

    set currHours(val) {
      this.setAttribute("currhours", val);
    }

    set prevHours(val) {
      this.setAttribute("prevhours", val);
    }

    static get observedAttributes()  {
      return ["prevhours", "currhours"];
    }

    attributeChangedCallback(prop, oldValue, newvalue) {
      if (prop === 'prevhours') this.render();
      if (prop === 'currhours') this.render();
      
      
    }

    render() {
      this.innerHTML = `
      
      <div class="activity-card">
      <div style="background-color:${this.getAttribute('bgcolor')};" class="activity-card__img-container" >
        <img class="activity-card__img" src="images/${this.getAttribute('bannerimg')}" alt="Play Icon">
      </div>
      
  
      <!--  Activity Card Content-->
      <div class="activity-card__content">
        <div class="activity-card__content__header-container">
          <p id="card-title">${this.getAttribute('title')}</p>
          <img class="activity-card__content__header-container__ellipsis" src="images/icon-ellipsis.svg" alt="icon-ellipsis">
        </div>
  
        <p id="current-hours">${this.currHours} Hrs</p>
        <p id="prev-hours">Last week - ${this.prevHours}hrs</p>
      </div>
      
    </div>
      `
    }

    connectedCallback() {
      this.render();
    }
}

const imgDict = {
  'Work': {'image': 'icon-work.svg', 'color': 'hsl(15, 100%, 70%)'},
  'Play': {'image': 'icon-play.svg', 'color': 'hsl(195, 74%, 62%)'},
  'Study': {'image': 'icon-study.svg', 'color': 'hsl(348, 100%, 68%)'},
  'Exercise': {'image': 'icon-exercise.svg', 'color': 'hsl(145, 58%, 55%)'},
  'Social': {'image': 'icon-social.svg', 'color': 'hsl(264, 64%, 52%)'},
  'Self Care': {'image': 'icon-self-care.svg' , 'color': 'hsl(43, 84%, 65%)'},
}


customElements.define("app-activity", Activity);

fetch('../data.json')
.then((res) => res.json())
.then((data) => {

  const cardContainer = document.getElementById("card-container");
    
    for (let i in data){
      const newCard = document.createElement("app-activity");
      newCard.setAttribute("title", data[i].title);
      newCard.setAttribute("currhours", data[i].timeframes.daily.current);
      newCard.setAttribute("prevhours", data[i].timeframes.daily.previous);
      newCard.setAttribute("bannerimg", imgDict[data[i].title]['image'])
      newCard.setAttribute("bgcolor", imgDict[data[i].title]['color'])
      newCard.setAttribute("id", data[i].title);
      cardContainer.appendChild(newCard);

    }   
})

const updateCardDataToWeekly = () => {

fetch('../data.json')
.then((res) => res.json())
.then((data) => {

  for (let i in data){

    const cardToUpdate = document.getElementById(data[i].title);
    cardToUpdate.setAttribute("currhours", data[i].timeframes.weekly.current);
    cardToUpdate.setAttribute("prevhours", data[i].timeframes.weekly.previous);
    console.log(cardToUpdate);
    console.log(`data: ${data[i].timeframes.weekly.previous}`);
    console.log(data[i].title);
  }}
  )}
