class Activity extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <h1> This is an activity </h1>
        `
    }
}

customElements.define("app-activity", Activity)