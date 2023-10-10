import Swal from 'sweetalert2';

import Navigate from '../Router/Navigate';
import { getAuthenticatedUser } from "../../utils/auths";


const contactPage = async () => {

    const main = document.querySelector('main');
    if (!getAuthenticatedUser()) {
        main.innerHTML = `<center><p style="font-family: 'Games', sans-serif; color: red">Not connected</p></center>`
    } else {
        const mesage = await getMessage();
        const page = pageHtml(mesage);
        main.innerHTML = page;
    }
    document.querySelector('#changePage').addEventListener('click', () => {
        Navigate('/contact');
    });

    document.querySelectorAll('#delete').forEach(b => {
        b.addEventListener('click', async (e) => {
            e.preventDefault();
            const { elementId } = e.target.dataset;

            const options = {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: getAuthenticatedUser().token,
                },
            };

            await fetch(`${process.env.API_BASE_URL}/message/${elementId}`, options)
            contactPage();
        });
    })


    document.querySelectorAll('#update').forEach(b => {
        b.addEventListener('click', async (e) => {
            const { elementId } = e.target.dataset;
            const message = e.target.parentElement
            const updatedMessage = {
                content: message.children[1].innerText,
                type: message.children[0].innerText
            }
            const options = {
                method: 'PATCH',
                body: JSON.stringify(updatedMessage),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: getAuthenticatedUser().token,
                },
            }
            const response = await fetch(`${process.env.API_BASE_URL}/message/${elementId}`, options);

            if (!response.ok) Swal.fire({
                title: 'Le type doit etre  une "question", "suggestion" ou "suppresion" ',
                position: 'top',
            })
            Navigate('/contactView')
        })
    })
};

function pageHtml(mesage) {
    let contactpage = `
    <section class="contactpage">
            
    <div id="header">
    <button style="font-family: 'Games', sans-serif;" type="button" id="changePage"  >Add Message</button >
     <p style="font-family: 'Games', sans-serif"> View Message</p>
    </div>`
    Array.from(mesage.message).forEach(element => {
        contactpage += `
        <div id="message2"> 
        <div id="container2">
        <div style="font-family: 'Games', sans-serif;" id="type2" data-element-id="${element.type}" contenteditable='true'> ${element.type}</div> 
        <div style="font-family: 'Games', sans-serif;" id="content2" data-element-id=" ${element.content}" contenteditable='true'> ${element.content} </div>
        <button style="font-family: 'Games', sans-serif;" type="button" id="update" data-element-id="${element.id}"> Update </button>
        <button style="font-family: 'Games', sans-serif;" type="button" id="delete" data-element-id="${element.id}"> Delete </button>
        </div>
        </div>
           `;
    });
    return contactpage;
}

async function getMessage() {
    const options = {
        method: "GET",
        headers: {
            Authorization: getAuthenticatedUser()?.token,
        }
    }
    const response = await fetch(`${process.env.API_BASE_URL}/message`, options)

    if (!response.ok) {
        throw new Error(`readAllMovies:: fetch error : ${response.status} : ${response.statusText}`);
    }

    const message = await response.json();
    return message;
}

export default contactPage;