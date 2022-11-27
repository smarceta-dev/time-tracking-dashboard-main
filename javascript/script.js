class Activity extends HTMLElement {

    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
        <div class="activity-card">
        <div class="activity-card__img-container">
          <img class="activity-card__img" src="images/icon-play.svg" alt="Play Icon">
        </div>
        $
    
        <!--  Activity Card Content-->
        <div class="activity-card__content">
          <div class="activity-card__content__header-container">
            <p id="card-title">Work</p>
            <img class="activity-card__content__header-container__ellipsis" src="images/icon-ellipsis.svg" alt="icon-ellipsis">
          </div>
    
          <p id="current-hours">32hrs</p>
          <p id="prev-hours">Last week - 36hrs</p>
        </div>
        
      </div>
        `
    }
}

customElements.define("app-activity", Activity);

fetch('../data.json')
.then((res) => res.json())
.then((data) => {

    const newDiv = document.createElement("app-activity");
    const thisDiv = document.getElementById("thisDiv");
    thisDiv.insertAdjacentElement("afterend", newDiv);

    for (let i in data){
        console.log(data[i].title);
        console.log(data[i].timeframes.daily.current);
        console.log(data[i].timeframes.daily.previous);

        console.log(data[i].timeframes.weekly.current);
        console.log(data[i].timeframes.weekly.previous);

        console.log(data[i].timeframes.monthly.current);
        console.log(data[i].timeframes.monthly.previous);

    }
    
   
})


