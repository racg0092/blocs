type attr = 'drag' | 'resize';
declare class Bloc extends HTMLElement {
    #private;
    container: HTMLDivElement;
    content: HTMLDivElement;
    constructor();
    static get observedAttributes(): string[];
    attributeChangedCallback(name: attr, ov: string, nv: string): void;
    connectedCallback(): void;
    draggableFunc(): void;
    contentEvents(): void;
    resizableFunc(): void;
}
