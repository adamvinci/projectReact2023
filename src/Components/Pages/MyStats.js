import { getAuthenticatedUser } from "../../utils/auths";
import Navbar from "../Navbar/Navbar";


let nbeGameJoue;
let moyennErreur;
let point;
let userName;

const mystats = `

  <div id="mystats">
  <div class = "userName">
    <p class = "userName"> ${userName}</p>
</div>

    <div class="game-played">

      <p class ="title"> Game played : </p>
      <p class = gamePlayed> Score : ${nbeGameJoue}</p>
      
    </div>

    
    <div class="game-error" >

        <p class ="title"> Average error per game : </p>
        <p class = "gameError"> Score : ${moyennErreur}</p>

    </div>

    <div class="total-point" >

        <p class ="title"> Winned point/Total Point : </p>
        <p class = "totalPoint"> Score : ${point}</p> 
        
    </div>

  </div>
  `;


function text() {
  const main = document.querySelector('main');
  main.innerHTML = mystats;
}


async function getMystats() {
  const options = {
    method: "get",
    headers: {
      Authorization: getAuthenticatedUser().token,
    }
  }
  const response = await fetch(`${process.env.API_BASE_URL}/point`, options);

  if (!response.ok) {
    throw new Error("fetch error : ");
  }

  const data = await response.json();

  userName = document.querySelector('.userName');
  userName.innerHTML = JSON.stringify(getAuthenticatedUser().username);

  nbeGameJoue = document.querySelector('.gamePlayed');
  nbeGameJoue.innerHTML = JSON.stringify(data.nbeGameJoue);

  moyennErreur = document.querySelector('.gameError');
  moyennErreur.innerHTML = JSON.stringify(data.moyennErreur);

  point = document.querySelector('.totalPoint');
  point.innerHTML = JSON.stringify(data.point);
  point.innerHTML += ` / ${data.nbeGameJoue * 9} `
}


const Mystats = () => {
  Navbar();
  text();
  getMystats()


}


export default Mystats;