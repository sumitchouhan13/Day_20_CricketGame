var Box = /** @class */ (function () {
    function Box(name, player) {
        this.table = document.createElement("table");
        this.table.setAttribute("class", "table");
        var tbody = document.createElement("tbody");
        for (var i = 0; i < 10; i++) {
            var tr = document.createElement("tr");
            for (var j = 0; j < 8; j++) {
                if (i != 0) {
                    if (j == 0) {
                        var td = document.createElement("td");
                        td.setAttribute("id", (i + " " + j).toString());
                        td.setAttribute("style", "font-weight:bold");
                        td.innerText = "PLAYER " + i;
                        tr.appendChild(td);
                    }
                    else {
                        var td = document.createElement("td");
                        td.setAttribute("id", (player + " " + i + " " + j).toString());
                        td.setAttribute("style", "font-weight:bold");
                        tr.appendChild(td);
                    }
                }
                else {
                    if (i == 0 && j == 0) {
                        var th = document.createElement("th");
                        th.setAttribute("scope", "row");
                        th.innerText = name;
                        tr.appendChild(th);
                    }
                    else if (j == 7) {
                        var th = document.createElement("th");
                        th.setAttribute("scope", "row");
                        th.innerText = "TOTAL";
                        tr.appendChild(th);
                    }
                    else {
                        var th = document.createElement("th");
                        th.setAttribute("scope", "row");
                        th.innerText = "B" + j;
                        tr.appendChild(th);
                    }
                }
            }
            tbody.appendChild(tr);
        }
        var player1 = document.getElementById(name);
        this.table.appendChild(tbody);
        player1.appendChild(this.table);
        var btn = document.getElementById("start");
        btn.onclick = this.generate();
        var hitbtn = document.getElementById("hit" + player);
        var k = 1, l = 1, count = 1;
        var totalSum = 0, rowSum = 0;
        hitbtn.onclick = this.generateRun(k, l, count, player, totalSum, rowSum);
    }
    Box.prototype.generate = function () {
        return function () {
            var count = document.getElementById("countDown");
            var num = 60;
            var interval = setInterval(function () {
                num--;
                var button = document.getElementById("start");
                if (num == 0) {
                    clearInterval(interval);
                }
                count.innerText = num.toString();
                button.disabled = true;
            }, 1000);
        };
    };
    Box.prototype.generateRun = function (k, l, count, player, totalSum, rowSum) {
        return function () {
            var gen = Math.floor(Math.random() * 7);
            totalSum += gen;
            rowSum += gen;
            var score = document.getElementById("score" + player);
            score.innerText = totalSum.toString();
            var data = document.getElementById(player + " " + k + " " + l);
            data.innerText = gen.toString();
            if (count == 6 || gen == 0) {
                var totalCol = document.getElementById(player + " " + k + " " + 7);
                totalCol.innerText = rowSum.toString();
                rowSum = 0;
                k = k + 1;
                l = 0;
                count = 0;
            }
            count++;
            l = l + 1;
            if (k > 9) {
                var id = "hit" + player;
                var button = document.getElementById(id);
                button.disabled = true;
            }
        };
    };
    return Box;
}());
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
