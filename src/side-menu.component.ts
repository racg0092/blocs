import { theme_watcher } from './utils/events.utils';
import { BlocGlobalApi } from './utils/global.api';


type Properties = "width" | "hidable";

export class SideMenu extends HTMLElement {
    #template = document.createElement('template');
    #html = `
        <style>
            :host {
                background-color: var(--nord5);
                color: var(--nord1);
                position: absolute;
                width: var(--panel-w, max-content);
                height: 100vh;
                left:0;
            }
            div.container {
                padding: .5rem;
                display: flex;
                flex-flow: column nowrap;
                gap: .5rem;
            }

            :host([mode=dark]) {
                background-color: var(--nord1);
                color: var(--nord5);
            }

            :host([mode=light]) {
                background-color: var(--nord5);
                color: var(--nord1); 
            }

            ::slotted(*) {
                cursor: pointer;
            }
        </style>
        <div class="container">
            <slot></slot>
        </div>
    `;
    hideFunction: (evt?: Event) => void;
    w: number;
    isShowing: boolean;

    constructor() {
        super();
        this.attachShadow({mode:'open'});
        this.#template.innerHTML = this.#html;
        this.shadowRoot.append(this.#template.content.cloneNode(true));
    }

    static get observedAttributes() {
        return ["width", "hidable"];
    }

    attributeChangedCallback(name: Properties, ov: string, nv: string) {
        switch(name) {
            case "width":
                this.style.setProperty("--panel-w", nv);
                break;
            case "hidable":
                document.addEventListener("click", this.getHideFunction());
                break;
        }
    }


    connectedCallback() {
        theme_watcher.funcs.push((theme) =>  this.onThemeChange(theme));
        this.w = this.getBoundingClientRect().width;
    }

    disconnectedCallback() {        
        document.removeEventListener("click", this.getHideFunction());
    }



    getHideFunction() {
        if(this.hideFunction !== undefined) {
            return this.hideFunction;
        }
        const that = this;
        this.hideFunction = function (evt: Event) {
            if(that.isShowing === false) {
                return;
            }
            that.hideAnimation().play();
            that.isShowing = false;
        }
        return this.hideFunction;
    }

    onThemeChange(theme: string) {
        this.setAttribute("mode", theme);
    }

    hideAnimation() {
        return this.animate([
            {left: "0"},
            {left: `-${this.w}px`}
        ], {
            fill: 'both',
            duration: 250,
            easing: "ease-in-out"
        })
    }

}


if(customElements.get('bloc-side-menu') === undefined) {
    customElements.define('bloc-side-menu', SideMenu);
}


function addGLobalApi() {
    const win  = (window as BlocGlobalApi);
    win.showSideMenu = (menu?: SideMenu) => {
        if(menu) {
            menu.hideAnimation().reverse();
            menu.isShowing = true;
        } else {
            const menu = document.body.querySelector('bloc-side-menu') as SideMenu;
            menu.hideAnimation().reverse();
            menu.isShowing = true;
        }
    }
    win.hideSideMenu = (menu?: SideMenu) => {
        if(menu) {
            menu.hideAnimation().play();
            menu.isShowing = false;
        } else {
            const menu = document.body.querySelector("bloc-side-menu") as SideMenu;
            menu.hideAnimation().play();
            menu.isShowing = false; 
        }
    }
}

addGLobalApi();