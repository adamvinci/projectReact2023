const morePoint =
  `
  <table class="tablePoints">

      <thead>
        <tr > 
          <th class="th"> Rank</th> 
          <th class="th"> Username </th>
          <th class="th"> Points</th>
        </tr>
      </thead>
      
      <tbody class="tableData"> 

      </tbody>    
      
  </table>

  `
async function getRanking() {
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/point/getRanking`);


    if (!response.ok) {
      throw new Error("getRanking");
    }

    const data = await response.json();
    loadTable(data);

  } catch (error) {
    throw new Error("getRanking::error: ", error);
  }
}

function loadTable(data) {
  const tablePointBody = document.querySelector('.tableData');
  let dataHtml = ' ';
  const size = data.length;

  for (let i = 0; i < size;) {
    dataHtml += `<tr style="font-family: 'Games', sans-serif;">
      <td>${i + 1}</td><td>${data[i].login}</td> <td>${data[i].point}</td> </tr>`;
    i += 1
  }

  tablePointBody.innerHTML = dataHtml;

}

function text() {
  const main = document.querySelector('main');
  main.innerHTML = morePoint;
}


const Ranking = () => {
  text();
  getRanking();
}


export default Ranking;