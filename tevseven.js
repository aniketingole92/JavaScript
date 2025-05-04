let h1Element = document.CreateElement('h1');
h1Element.textContent = "Web Technologics";
let ContainerElement = document.getElementById('mycontainer');
ContainerElement.appendChild(h1Element);

let btnElement = document.createElement('button');
btnElement.textContent = "Change Heading";
ContainerElement.appendChild(btnElement);
