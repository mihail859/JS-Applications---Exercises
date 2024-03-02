export function createElements(type, content, parent, attributes){
    let element = document.createElement(type);
    element.textContent = content
    if (parent){
        parent.appendChild(element);
    }
    for (const atr of Object.keys(attributes)) {
        element.setAttribute(atr, attributes[atr]);
    }

    return element;
}