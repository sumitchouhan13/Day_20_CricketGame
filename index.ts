class Box {
  table: HTMLElement;
  constructor(name: string, player: number) {
    this.table = document.createElement("table");
    this.table.setAttribute("class", "table");
    let tbody = document.createElement("tbody");
    for (var i = 0; i < 10; i++) {
      let tr = document.createElement("tr");
      for (var j = 0; j < 8; j++) {
        if (i != 0) {
          if (j == 0) {
            let td = document.createElement("td");
            td.setAttribute("id", (i + " " + j).toString());
            td.setAttribute("style", "font-weight:bold");
            td.innerText = "PLAYER " + i;
            tr.appendChild(td);
          } else {
            let td = document.createElement("td");
            td.setAttribute("id", (player + " " + i + " " + j).toString());
            td.setAttribute("style", "font-weight:bold");
            tr.appendChild(td);
          }
        } else {
          if (i == 0 && j == 0) {
            let th = document.createElement("th");
            th.setAttribute("scope", "row");
            th.innerText = name;
            tr.appendChild(th);
          } else if (j == 7) {
            let th = document.createElement("th");
            th.setAttribute("scope", "row");
            th.innerText = "TOTAL";
            tr.appendChild(th);
          } else {
            let th = document.createElement("th");
            th.setAttribute("scope", "row");
            th.innerText = "B" + j;
            tr.appendChild(th);
          }
        }
      }
      tbody.appendChild(tr);
    }
    let player1 = document.getElementById(name);
    this.table.appendChild(tbody);
    player1.appendChild(this.table);
    let btn = document.getElementById("start");
    btn.onclick = this.generate();
    let hitbtn = document.getElementById("hit" + player);
    let k = 1,
      l = 1,
      count = 1;
    let totalSum = 0,
      rowSum = 0;
    hitbtn.onclick = this.generateRun(k, l, count, player, totalSum, rowSum);
  }

  generate(): () => void {
    return () => {
      let count = document.getElementById("countDown");
      let num = 60;
      var interval = setInterval(() => {
        num--;
        let button = <HTMLButtonElement>document.getElementById("start");
        if (num == 0) {
          clearInterval(interval);
        }
        count.innerText = num.toString();
        button.disabled = true;
      }, 1000);
    };
  }

  generateRun(k, l, count, player, totalSum, rowSum): () => void {
    return () => {
      let gen = Math.floor(Math.random() * 7);
      totalSum += gen;
      rowSum += gen;
      let score = document.getElementById("score" + player);
      score.innerText = totalSum.toString();
      let data = document.getElementById(player + " " + k + " " + l);
      data.innerText = gen.toString();
      if (count == 6 || gen == 0) {
        let totalCol = document.getElementById(player + " " + k + " " + 7);
        totalCol.innerText = rowSum.toString();
        rowSum = 0;
        k = k + 1;
        l = 0;
        count = 0;
      }
      count++;
      l = l + 1;
      if (k > 9) {
        let id = "hit" + player;
        let button = <HTMLButtonElement>document.getElementById(id);
        button.disabled = true;
      }
    };
  }
}

new Box("Team1", 1);
new Box("Team2", 2);

// class Result {
//   total: number;
//   constructor(name: number) {
//     let sum;
//     for (var i = 1; i < 10; i++) {
//       let id = name + " " + i  + " "+ "7";
//       sum += parseInt(document.getElementById(id).innerText);
//     }
//     this.total = sum;
//     console.log(this.total);
//   }
// }

// let x = new Result(1);
// console.log(x)
