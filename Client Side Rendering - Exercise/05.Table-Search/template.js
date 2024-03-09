import { html, render } from "./node_modules/lit-html/lit-html.js";

let template = (rd) => html`
    <tr>
        <td>${rd.firstName} ${rd.lastName}</td>
        <td>${rd.email}</td>
        <td>${rd.course}</td>
    </tr>
`;
export {
    template
}