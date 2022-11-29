class Activity extends HTMLElement {

    constructor(name) {
        super();

    }
    connectedCallback() {
      this.innerHTML = `
      
      <div class="activity-card">
      <div style="background-color:${this.getAttribute('bgColor')};" class="activity-card__img-container" >
        <img class="activity-card__img" src="images/${this.getAttribute('bannerImg')}" alt="Play Icon">
      </div>
      
  
      <!--  Activity Card Content-->
      <div class="activity-card__content">
        <div class="activity-card__content__header-container">
          <p id="card-title">${this.getAttribute('title')}</p>
          <img class="activity-card__content__header-container__ellipsis" src="images/icon-ellipsis.svg" alt="icon-ellipsis">
        </div>
  
        <p id="current-hours">${this.getAttribute('currHours')} Hrs</p>
        <p id="prev-hours">Last week - ${this.getAttribute('prevHours')}hrs</p>
      </div>
      
    </div>
      `
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
      newCard.setAttribute("currHours", data[i].timeframes.daily.current);
      newCard.setAttribute("prevHours", data[i].timeframes.daily.previous);
      newCard.setAttribute("bannerImg", imgDict[data[i].title]['image'])
      newCard.setAttribute("bgColor", imgDict[data[i].title]['color'])
      newCard.setAttribute("id", i);
      cardContainer.appendChild(newCard);

        console.log(data[i].title);
        console.log(data[i].timeframes.daily.current);
        console.log(data[i].timeframes.daily.previous);

        console.log(data[i].timeframes.weekly.current);
        console.log(data[i].timeframes.weekly.previous);

        console.log(data[i].timeframes.monthly.current);
        console.log(data[i].timeframes.monthly.previous);

    }
    
})


