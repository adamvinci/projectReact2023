import { getAnonymUser, getAuthenticatedUser, isAuthenticated } from "../../utils/auths"
import Navigate from '../Router/Navigate';
import { clearPage } from '../../utils/render';



const contactPage = () => {
    clearPage();
    const page = pageHtml();
    const main = document.querySelector('main');
    if (getAuthenticatedUser() || getAnonymUser()) {
        main.innerHTML = page;
    } else {
        main.innerHTML = `<center><p style="font-size: x-large" >Vous n'avez pas acces a cet page</p></center>`;
    }


    document.querySelector('#messageSubmit').addEventListener('click', async (e) => {

        e.preventDefault();
        const content = document.querySelector('#message').value;
        const type = document.querySelector('#type').value;
        let response;
        const OPTIONS = {
            method: 'POST',
            body: JSON.stringify({
                type,
                content
            }),
            headers: {
                'Content-Type': 'application/json',
                Authorization: getAuthenticatedUser()?.token,
            }

        };

        if (isAuthenticated()) {
            response = await fetch(`${process.env.API_BASE_URL}/message/addMessageUser`, OPTIONS);
        } else {
            response = await fetch(`${process.env.API_BASE_URL}/message/addMessageVisitor`, OPTIONS);
        }

        if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);

        Navigate('/contactView');

    });
    document.querySelector('#changePage').addEventListener('click', () => {
        Navigate('/contactView');
    });
};

function pageHtml() {
    const user = getAuthenticatedUser() ? getAuthenticatedUser()?.username : getAnonymUser();
    const contactpage = `<section class="contactpage">

  <div id="header">
   <p style="font-family: 'Games', sans-serif;">  Add Message</p> 
     <button style="font-family: 'Games', sans-serif;" type="button" id="changePage"  >View Message</button >
  </div>
  <div class="form">
  <div class="container">  
          <form style="font-family: 'Games', sans-serif;">
  <div>
  <label >From </label>
  </div>
  <div>
        <input type="text" style="font-family: 'Games', sans-serif;" placeholder="${user}" id="username" readonly required/>  
  </div>  
        
  <div>
     
  <label for="">Choose a type of message:</label>
  </div>
  <div >
  <select style="font-family: 'Games', sans-serif;" id="type" required >
  <option  value="" disabled select   >Please Choose</option>
    <option value="question">Question</option>
    <option  value="suggestion">Suggestion</option>
   ${getAuthenticatedUser() ? '<option  value="suppresion">Delete my account </option>' : ''}
  
  </select>
    </div>  
         

     <div>
  <label for="message">Write your message:</label>
  </div>
    <div >
        <textarea style="font-family: 'Games', sans-serif;" name="message" id="message" required ></textarea>
           </div>  
           
           <div>
          <center> <button style="font-family: 'Games', sans-serif;" type="submit" id="messageSubmit"  value="Submit">Submit </button></center>
     </div>  

  </form>
  </div>
  </section>
  
  
  
  `
    return contactpage;
}

export default contactPage;