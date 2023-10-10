
import Navigate from '../Router/Navigate';
import { clearPage } from '../../utils/render';
import Navbar from '../Navbar/Navbar';


const LevelPage = () => {

    Navbar();
    clearPage();
    const main = document.querySelector('main');
    const submit = document.createElement('input');
    submit.value = 'Go back to HomePage';
    submit.className = 'home';
    submit.addEventListener('click', () => {
        Navigate('/');
    });
    const soloGameTitle = document.createElement("h1");
    soloGameTitle.innerHTML = 'Solo Game'

    const title1v1 = document.createElement("h1");
    title1v1.innerHTML = '1 vs 1'

    const divBoxes = document.createElement('div');
    divBoxes.className = 'boxes';

    const divColumn1 = document.createElement('div');
    divColumn1.className = 'column1';

    const divColumn2 = document.createElement('div');
    divColumn2.className = 'column2';

    const btnEasy = document.createElement('button');
    btnEasy.innerHTML = "Easy";
    btnEasy.className = 'levelEasy';
    btnEasy.addEventListener('click', (e) => {
        const difficulte = e.target.innerHTML
        Navigate(`/gameSolo?difficulte=${difficulte}`)
    });

    const btnMedium = document.createElement('button');
    btnMedium.innerHTML = "Medium";
    btnMedium.className = 'levelMedium';
    btnMedium.addEventListener('click', (e) => {
        const difficulte = e.target.innerHTML
        Navigate(`/gameSolo?difficulte=${difficulte}`)
    });

    const btnHard = document.createElement('button');
    btnHard.innerHTML = "Hard";
    btnHard.className = 'levelHard';
    btnHard.addEventListener('click', (e) => {
        const difficulte = e.target.innerHTML
        Navigate(`/gameSolo?difficulte=${difficulte}`)
    });





    const btnEasy1 = document.createElement('button');
    btnEasy1.innerHTML = "Easy";
    btnEasy1.className = 'levelEasy';
    btnEasy1.addEventListener('click', (e) => {
        const difficulte = e.target.innerHTML
        Navigate(`/game1v1Page?difficulte=${difficulte}`)
    });

    const btnMedium1 = document.createElement('button');
    btnMedium1.innerHTML = "Medium";
    btnMedium1.className = 'levelMedium';
    btnMedium1.addEventListener('click', (e) => {
        const difficulte = e.target.innerHTML
        Navigate(`/game1v1Page?difficulte=${difficulte}`)
    });

    const btnHard1 = document.createElement('button');
    btnHard1.innerHTML = "Hard";
    btnHard1.className = 'levelHard';
    btnHard1.addEventListener('click', (e) => {
        const difficulte = e.target.innerHTML
        Navigate(`/game1v1Page?difficulte=${difficulte}`)
    });

    main.appendChild(divBoxes);
    divBoxes.appendChild(divColumn1);
    divBoxes.appendChild(divColumn2);
    divColumn1.appendChild(soloGameTitle);
    divColumn1.appendChild(btnEasy);
    divColumn1.appendChild(btnMedium);
    divColumn1.appendChild(btnHard);
    divColumn2.appendChild(title1v1);
    divColumn2.appendChild(btnEasy1);
    divColumn2.appendChild(btnMedium1);
    divColumn2.appendChild(btnHard1);

};
export default LevelPage;