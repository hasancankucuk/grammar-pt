import { Suggestion } from './Suggestion';

export class Highlight extends Suggestion {
    element;

    static of(textSegment, suggestion) {
        // create a DOM element to wrap the affected text.
        const el = document.createElement('span');
        el.innerText = textSegment.substring(suggestion.index, suggestion.index + suggestion.offset);
        el.id = Highlight.uniqueSelector();
        el.classList.add('grammar-pt-highlight', suggestion.type);

        return {
            index: suggestion.index,
            offset: suggestion.offset,
            reason: suggestion.reason,
            type: suggestion.type,
            element: el
        };
    }

    // Returns a pseudo random string for HTMLElement ID property.
    static uniqueSelector() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        let id = '';
        for (let i = 0; i < 20; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        } 
        return 'grammar-pt-' + id;
    }

    static applyHighlights(highlights, containerElement) {
        highlights.forEach(highlight => {
            containerElement.innerHTML = containerElement.innerHTML.substring(0, highlight.index) +
                `<span id="${highlight.element.id}" class="grammar-pt-highlight ${highlight.type}">${highlight.element.innerText}</span>` +
                containerElement.innerHTML.substring(highlight.index + highlight.offset);
        });
    }
}
