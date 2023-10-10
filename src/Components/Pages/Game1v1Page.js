import Swal from 'sweetalert2';

import witsel from "../../img/Axel_Witsel.jpg"
import carrasco from "../../img/Carrasco.jpg"
import deBruyn from "../../img/Kevin_De_Bruyne.jpg"
import batshuayi from "../../img/Michy_Batshuayi.jpg"
import lukaku from "../../img/Romelu_Lukaku.jpg"
import team from "../../img/team.jpg"
import courtois from "../../img/Thibaut_Courtois.jpg"
import tielemans from "../../img/Youri_Tielemans.jpg"
import hazard from "../../img/hazard.jpg"

import { clearPage } from "../../utils/render"
import Navigate from '../Router/Navigate';
import cdm from '../../img/cdm.jpg';
import ballonJ from '../../img/ballonJ.png';


const Game1v1Page = () => {
    clearPage()

    const difficulte = window.location.search.split('=')[1].split('%')[0]
    let timer = -1;
    if (difficulte === 'Easy') {
        timer = 4000;
    } else if (difficulte === 'Medium') {
        timer = 2000;
    } else {
        timer = 700;
    }
    let lockboard = false;
    let cmptCartes = 9;
    let pointJoueur1 = 0
    let pointJoueur2 = 0

    const divBackGame = document.createElement('div');
    divBackGame.className = 'divBackGame1';

    const main = document.querySelector('main');

    const divColumn1 = document.createElement('div');
    divColumn1.className = 'player1';

    const divColumn2 = document.createElement('div');
    divColumn2.className = 'player2';

    const img = document.createElement('img');
    img.src = `${ballonJ}`
    img.setAttribute('id', 'imgBall0')

    const divScore = document.createElement("div")
    divScore.className = "divScore"

    const divJoueur = document.createElement("div")
    divJoueur.className = "divJoueur"

    const player1 = document.createElement("h1");
    player1.innerHTML = 'Player 1'

    const player1Cmpt = document.createElement("h6");
    player1Cmpt.innerHTML = `${pointJoueur1}&nbsp; -`
    player1Cmpt.className = 'score'


    const player2 = document.createElement("h1");
    player2.innerHTML = 'Player 2'

    const player2Cmpt = document.createElement("h6");
    player2Cmpt.innerHTML = `&nbsp; ${pointJoueur2}`
    player2Cmpt.className = 'score'

    let section = document.createElement('section');
    section.className = 'sectionCard'



    main.appendChild(divBackGame);
    divBackGame.appendChild(divScore)
    divBackGame.appendChild(divJoueur)


    divJoueur.appendChild(divColumn1);
    divJoueur.appendChild(divColumn2);
    divScore.appendChild(player1Cmpt);
    divScore.appendChild(player2Cmpt);

    divColumn1.appendChild(player1);
    divJoueur.appendChild(img)
    divColumn2.appendChild(player2);

    divBackGame.appendChild(section);



    let joueur = tirageAuSort(player1, player2);

    if (joueur === 'Player 1') {
        joueur = 'Player 2';
        setTimeout(() => img.setAttribute('id', 'imgBall2'), timer + 2000);
    } else {
        joueur = 'Player 1';
        setTimeout(() => img.setAttribute('id', 'imgBall1'), timer + 2000);
    }

    const generateData = () =>
        [
            { imgSrc: lukaku, name: "lukaku" },
            { imgSrc: courtois, name: "courtois" },
            { imgSrc: deBruyn, name: "deBruyn" },
            { imgSrc: batshuayi, name: "batshuayi" },
            { imgSrc: carrasco, name: "carrasco" },
            { imgSrc: team, name: "team" },
            { imgSrc: tielemans, name: "tielemans" },
            { imgSrc: witsel, name: "witsel" },
            { imgSrc: hazard, name: "hazard" },


            { imgSrc: lukaku, name: "lukaku" },
            { imgSrc: courtois, name: "courtois" },
            { imgSrc: deBruyn, name: "deBruyn" },
            { imgSrc: batshuayi, name: "batshuayi" },
            { imgSrc: carrasco, name: "carrasco" },
            { imgSrc: team, name: "team" },
            { imgSrc: tielemans, name: "tielemans" },
            { imgSrc: hazard, name: "hazard" },
            { imgSrc: witsel, name: "witsel" },

        ];
    const randomize = () => {
        const cardData = generateData();
        cardData.sort(() => Math.random() - 0.5);
        return cardData;
    };

    const regarderCarte = (e) => {
        const carteClick = e.target;
        carteClick.classList.add("flipped");
        const carteFlip = document.querySelectorAll(".flipped");
        if (carteFlip.length === 2) {
            if (carteFlip[0].getAttribute("name") === carteFlip[1].getAttribute("name")) {
                carteFlip.forEach((card) => {
                    const cart = card;
                    cart.classList.remove("flipped");
                    cart.style.pointerEvents = "none";
                })
                cmptCartes -= 1;
                if (joueur === 'Player 1') { pointJoueur1 += 1; mettreAJourCompteur(player1Cmpt, pointJoueur1, 'joueur1') } else { pointJoueur2 += 1; mettreAJourCompteur(player2Cmpt, pointJoueur2, 'joueur2') }

            } else {
                lockboard = true;
                carteFlip.forEach((card) => {
                    card.classList.remove("flipped");
                    setTimeout(() => {
                        card.classList.remove("toggleCard")
                        lockboard = false
                    }, 1000);
                });
                if (joueur === 'Player 1') {
                    joueur = 'Player 2';
                    setTimeout(() => img.setAttribute('id', 'imgBall2'), 1000);
                } else {
                    joueur = 'Player 1';
                    setTimeout(() => img.setAttribute('id', 'imgBall1'), 1000);
                }
            }
            if (carteFlip[0].getAttribute("name") === carteFlip[1].getAttribute("name") && cmptCartes === 0) {
                let gagnant = Math.max(pointJoueur1, pointJoueur2)
                if (gagnant === pointJoueur1) { gagnant = 'Player 1' } else { gagnant = 'Player 2' }
                Swal.fire({
                    title: `<span style="color:white"><strong>${gagnant} wins</strong></span>`,
                    imageUrl: `${cdm}`,
                    width: 800,
                    padding: '3em',
                    color: '#716add',
                    background: `rgba(15, 15, 15, 0.7)`,
                    showDenyButton: true,
                    confirmButtonText:
                        '<a style="font-family:\'Games\', sans-serif;">Ranking</a>\n',
                    denyButtonText:
                        '<a style="font-family:\'Games\', sans-serif;">Restart</a>\n',
                }).then((result) => {
                    if (result.isConfirmed) {
                        Navigate('/ranking')
                    } else if (result.isDenied) {
                        Navigate('/level')
                    }
                })
            }
        }

    };
    const cardGenerator = () => {
        section = document.querySelector("section");
        const cardData = randomize();
        cardData.forEach((item) => {
            const card = document.createElement("div");
            const recto = document.createElement("img");
            const verso = document.createElement("div");
            card.classList = "card";
            recto.classList = "recto1";
            verso.classList = "verso1";
            recto.src = item.imgSrc;
            card.setAttribute("name", item.name);
            section.appendChild(card);
            card.appendChild(recto);
            card.appendChild(verso);
            card.classList.toggle("toggleCard");
            setTimeout(() => card.classList.remove("toggleCard"), timer);
            setTimeout(() => card.addEventListener('click', e => {
                if (lockboard) return;

                if (card.className !== "card toggleCard flipped") {


                    card.classList.toggle("toggleCard")
                    regarderCarte(e)
                }

            }), timer + 2000);
        })
    };

    cardGenerator();

};


function mettreAJourCompteur(playerCmpt, cmpt, joueur) {
    const player = playerCmpt;

    if (joueur === 'joueur1') {
        player.innerHTML = `${cmpt} -`
    } else {
        player.innerHTML = `&nbsp ${cmpt}`
    }


}
function tirageAuSort(j1, j2) {
    const player = [j1.innerHTML, j2.innerHTML];
    return player[Math.floor(Math.random() * 2)];
}


export default Game1v1Page;