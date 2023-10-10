
import { getAnonymUser, getAuthenticatedUser } from "../../utils/auths";

const Navbar = () => {
  const navbarWrapper = document.querySelector('#navbarWrapper');
  let navbar = '';


  if ((window.location.pathname === '/' || window.location.pathname === '/logout') && !getAnonymUser()) {
    navbar += `
    <h1 style="   font-family: 'Games', sans-serif">
      Play with the  <span style="color:#FFFF8F"> belgian team for  </span> <span style="color:#C41E3A">one last game  </span>
     </h1>
      `;
  } else {
    navbar += `
 <ul>
 
 <li >
   <a data-uri="/ranking">Ranking</a>
   </li> 
 ${getAuthenticatedUser() ? ' <li> <a data-uri="/mystats">MyStats</a> </li>   ' : '<li> <a   href="#"  data-uri="/" >Login/Register</a> </li>'}

 <li>
   <a class="game"  href="#" data-uri="/level">Game</a>
  </li> 
 <li>
   <a  href="#" data-uri="/contact">Contact</a>
  </li> 

${getAuthenticatedUser() ? '<li> <a href="#" data-uri="/logout" >Logout</a> </li>' : ''}

 </ul>
 `;
  }



  navbar += `
<hr class="hr1">  
<hr class="hr2">  
<hr class="hr3"> 
`;


  navbarWrapper.innerHTML = navbar;
};


export default Navbar;