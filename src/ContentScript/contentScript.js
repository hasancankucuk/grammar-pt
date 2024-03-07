import { MessageModel } from "../Models/MessageModel";

const getText = (node) => {
    if (node) {
        return node?.value || node?.target?.value || node?.innerHTML;
    }
}

const showTooltip = (correctedText) => {
    // Tooltip
    const tooltip = document.createElement('div');
    tooltip.textContent = correctedText;
    tooltip.id = 'hcktest'
    const mainCss = `
        position: absolute;
        background-color: white;
        padding: 5px;
        border-radius: 5px;
        z-index: 10;
        height: 'fit-conten';
        width: 'fit-content';
        margin-top: 50px;
    `;
    const cssText = `
        z-index: 10;
        display: inline-block;
        padding: 0.75rem 1rem;
        font-size: 0.875rem;
        font-weight: 500;
        color: #fff;
        border-radius: 0.375rem;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05), 0 1px 3px 1px rgba(0, 0, 0, 0.1);
        opacity: 1;
    `;
    const darkCssText = `
        background-color: rgb(34 197 94);
    `;

    const tooltipCssText = mainCss + cssText + darkCssText;
    tooltip.style.cssText = tooltipCssText
    const textarea = document.activeElement;
    const nextSibling = textarea.nextSibling;
    if (nextSibling && nextSibling.parentElement === textarea.parentElement) {
        textarea.parentElement.insertBefore(tooltip, nextSibling);
    }
}

const deleteTooltip = () => {
    var tooltip = document?.querySelectorAll('#hcktest');
    if (tooltip) {
        tooltip.forEach(element => {
            element.remove();
        })
    }
}

const applySuggestion = (geminiResponse) => {
    const wrongWord = geminiResponse.mistake;
    const textarea = document.activeElement;
    const text = textarea?.value || textarea?.target?.value || textarea?.innerHTML;
    const indices = [];
    const matches = [...text.matchAll(wrongWord)];
    for (const match of matches) {
        const index = match.index;
        if (!indices.includes(index)) {
            indices.push(index);
            const searchedTextWidth = getTextWidth(wrongWord, getComputedStyle(textarea).fontSize, getComputedStyle(textarea).fontFamily);
            const textBefore = text.substring(0, index);
            const textAfter = text.substring(index + wrongWord.length);
            const textBeforeWidth = getTextWidth(textBefore, getComputedStyle(textarea).fontSize, getComputedStyle(textarea).fontFamily);
            const totalWidth = textBeforeWidth + searchedTextWidth;
            let textHeight = getTextHeight(textarea, wrongWord);
            const shadowDiv = document.createElement('div');
            shadowDiv.classList.add('grammarlyHighlight');
            shadowDiv.id = `grammar-pt-${match.index}`;
            let left = Math.floor(textarea.parentElement.getBoundingClientRect().left + textBeforeWidth);
            if (left > textarea.getBoundingClientRect().width) {
                left -= textarea.getBoundingClientRect().width;
                textHeight *= 2;
            }

            shadowDiv.style.cssText = `
                box-sizing: content-box;
                position: absolute;
                pointer-events: auto;
                overflow: hidden;
                border: 0;
                border-radius: 0;
                padding: 0;
                margin: 0;
                background-color: rgba(255, 153, 171, 0.5);
                top: ${textHeight}px;
                left: ${left}px;
                width: ${searchedTextWidth}px;
                height: 3px;
                z-index: 9999;
            `;
            const nextSibling = textarea.nextSibling;
            if (nextSibling && nextSibling.parentElement === textarea.parentElement) {
                const elementExists = document.getElementById(shadowDiv.id);
                if (!elementExists) {
                    textarea.parentElement.insertBefore(shadowDiv, nextSibling);
                }
            }

            shadowDiv.addEventListener('mouseover', function () {
                showTooltip(geminiResponse.correction);
            });
            shadowDiv.addEventListener('mouseleave', deleteTooltip);
        }
    }
};

function getTextWidth(text, font, family) {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    context.font = `${font} ${family}`;
    const metrics = context.measureText(text);
    return metrics.width;
}

const getTextHeight = (textarea, searchedText) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const fontSize = getComputedStyle(textarea).fontSize;
    const fontFamily = getComputedStyle(textarea).fontFamily;
    ctx.font = `${fontSize} ${fontFamily}`;

    const metrics = ctx.measureText(searchedText);
    const fontHeight = metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent;
    const actualHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
    const height = Math.floor(fontHeight + actualHeight);
    return height;
};


export const setLanguage = (language) => {
    chrome.runtime.sendMessage({
        type: MessageModel.Language, value: language
    });
}

function updateSize() {
    const elements = document.querySelectorAll('[id^="grammar-pt-"]');
    elements.forEach(e => {
        e.remove();
    });
    const textarea = document.activeElement;
    applySuggestion(textarea, 'wrong');
}

const autoHighlight = () => {
    const textarea = document.activeElement;
    chrome.runtime.sendMessage({ type: MessageModel.Text, value: getText(textarea) });
}

document.addEventListener('keydown', function (event) {
    if (event.key === 'Backspace' || event.key === 'Delete') {
        updateSize();
    } else {
        clearTimeout(window.setTimeout);
        window.setTimeout(autoHighlight, 2500);
    }
});

window.addEventListener('resize', updateSize);

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message?.type == '4') {
        var parsedJSON = JSON.parse(message.message);
        if (parsedJSON.length > 0) {
            JSON.parse(message?.message).forEach(x => {
                applySuggestion(x)
            });
        }
    }
});