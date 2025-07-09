let buttons = document.querySelectorAll("button");
let number = document.querySelectorAll(".num");
let Operations = document.querySelectorAll(".Operations");
let suppr = document.getElementById("sup");
let Brackets = document.getElementById("Brackets");
let equal = document.getElementById("equal");
let Negative = document.getElementById("Negative");
let secrin = document.getElementById("secrin");
let result = document.getElementById("result");
let Historic_Cleaning = document.getElementById("Historic_Cleaning");
let text_coler = "";
let text_calc = "";
let res;
let clear = document.getElementById("clear");
let his = document.getElementById("History");
let History= [] ;
let parts = [] ;

number.forEach(button => {
    button.addEventListener("click", function () {
        result.classList.remove("equal");
        secrin.style.visibility = "visible";

        secrin.innerHTML += this.value;
        text_calc += this.value;

        try {
            res = math.evaluate(text_calc);
            result.innerText = res;
        } catch (e) {
            result.innerText = "";
        }
    });
});

Operations.forEach(OP => {
    OP.addEventListener("click", function () {
        result.classList.remove("equal");
        secrin.style.visibility = "visible";

        secrin.innerHTML += `<span class="text-success" style="font-size: 35px;font-weight: 600;" >${this.value}</span>`;
        text_calc += this.value;
    });
});

Brackets.onclick = () => {
    let text = secrin.innerText;

    let openCount = (text.match(/\(/g) || []).length;
    let closeCount = (text.match(/\)/g) || []).length;

    if (openCount > closeCount) {
        secrin.innerHTML += ")";
        text_calc += ")";
    } else {
        secrin.innerHTML += "(";
        text_calc += "(";
    }

    try {
        res = math.evaluate(text_calc);
        result.innerText = res;
    } catch (e) {
        result.innerText = "";
    }
};

suppr.onclick = () => {
    let secrinLast = secrin.lastChild;

    if (secrinLast) {
        if (secrinLast.nodeType === Node.TEXT_NODE) {
            secrinLast.textContent = secrinLast.textContent.slice(0, -1);

            if (secrinLast.textContent.length === 0) {
                secrin.removeChild(secrinLast);
            }
        } else {
            secrin.removeChild(secrinLast);
        }
    }

    text_calc = text_calc.slice(0, -1);

    try {
        res = math.evaluate(text_calc);
        result.innerText = res;
    } catch (e) {
        result.innerText = "";
    }
};



clear.onclick = () => {
    secrin.innerText = "";
    result.innerText = "";
    text_coler = "";
    text_calc = "";
};

equal.onclick = () => {

    History.push(secrin.innerText+"="+result.innerText);
    localStorage.setItem("History",History);


    parts = [];
    parts = localStorage.History.split(",");

    for (let i = 0; i < parts.length; i++) {
        his.innerHTML = `<p>${parts[i]}</p>`;
    }

    result.classList.add("equal");
    secrin.style.visibility = "hidden";
    secrin.innerText = result.innerText;
    text_calc = result.innerText;
};

document.addEventListener("DOMContentLoaded", function () {
    parts = [];
    parts = localStorage.History.split(",");

    for (let i = 0; i < parts.length; i++) {
        his.innerHTML += `<p>${parts[i]}</p>`;
    }
});

Historic_Cleaning.onclick =()=>{
    localStorage.clear(); 
    History = []; 
    parts = [];
    his.innerHTML = ""; 
    console.log("History cleared.");
}

Negative.onclick = () => {
    if (secrin.innerText.endsWith("(-")) {
        secrin.innerText = secrin.innerText.slice(0, -2);
        text_calc = text_calc.slice(0, -2);
        secrin.innerText += "+";
        text_calc += "+";
    } else if (secrin.innerText.endsWith("+")) {
        secrin.innerText = secrin.innerText.slice(0, -1);
        text_calc = text_calc.slice(0, -1);
        secrin.innerText += "(-";
        text_calc += "(-";
    } else {
        secrin.innerText += "(-";
        text_calc += "(-";
    }

    try {
        res = math.evaluate(text_calc);
        result.innerText = res;
    } catch (e) {
        result.innerText = "";
    }
};
