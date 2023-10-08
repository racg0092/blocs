import { theme_watcher } from './utils/events.utils';



type Property = "position";
type Position = "tl" | "tr" | "bl" | "br" | "center" | "c-bottom" | "c-top";

export class PopUp extends HTMLElement {
    #template = document.createElement("template");
    #html = `
        <style>
            :host {
                background-color: var(--nord5);
                color: var(--nord1);
                width: max-content;
                position: absolute;
                border-radius: 5px;
                box-shadow: 0 0 .05rem var(--nord1);
                transform: scale(0);
            }

            :host([mode=dark]) {
                background-color: var(--nord1);
                color: var(--nord5);
            }

            :host([mode=light]) {
                background-color: var(--nord5);
                color: var(--nord1);
            }

            div.container {
                padding: .5rem;
            }
        </style>
        <div class="container">
            <slot></slot>
        </div>
    `

    constructor() {
        super();
        this.attachShadow({mode:'open'});
        this.#template.innerHTML = this.#html;
        this.shadowRoot.append(this.#template.content.cloneNode(true));
    }

    static get observedAttributes(): Array<Property> {
        return ["position"];
    }

    attributeChangedCallback(name: Property, ov: any, nv: any) {
        switch(name) {
            case "position":
                this.setPosition(nv);
                break;
        }
    }

    connectedCallback() {
        this.showAnimation().play();
        theme_watcher.funcs.push((theme) => this.onThemeChange(theme));
    }


    showAnimation() {
        return this.animate([
            {transform: "scale(0)"},
            {transform: "scale(1.2)"},
            {transform: "scale(1)"}
        ], {
            duration: 250,
            fill: "both",
            easing: "ease-in-out",
            delay: 100
        })
    }

    setPosition(pos: Position) {
        switch(pos) {
            case "tl":
                this.style.top = ".5rem";
                this.style.left = ".5rem";
                break;
            case "tr":
                this.style.right = ".5rem";
                this.style.top = ".5rem";
                break;
            case "bl":
                this.style.bottom = ".5rem";
                this.style.left = ".5rem";
                break;
            case "br":
                this.style.bottom = ".5rem";
                this.style.right = ".5rem";
                break;
            case "center":
                this.style.left = "50%";
                this.style.top = "50%";
                this.style.transform = "translate(-50%,-50%)";
                break;
            case "c-bottom":
                this.style.left = "50%";
                this.style.bottom = ".5rem";
                break;
            case "c-top":
                this.style.left = "50%";
                this.style.top = ".5rem";
                break;
        }
    }

    onThemeChange(theme: string) {
        this.setAttribute("mode", theme);        
    }


    static open(content: string, pos?: Position): PopUp {
        const popup = document.createElement('bloc-popup') as PopUp;
        if(pos) {
            popup.setAttribute("position", pos);
        }
        popup.innerHTML = content;
        document.body.append(popup);
        return popup;
    }
}





if(customElements.get("bloc-popup") === undefined) {
    customElements.define("bloc-popup", PopUp);
}