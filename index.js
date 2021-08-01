const resultBox = document.querySelector('.result');
const resultArea = document.querySelector('.result-area span');
const calcArea = document.querySelector('.calc-area');

let NUM = [];
let NUM2 = [];
let crrValue = null;
let crrValue2 = null;
let crrFnValue = null;

function handleKeypads(e){
    if(e.target.tagName !== 'BUTTON') return;
    if(e.target.parentNode.className ==='num-area' && e.target.value !== '='){
        handleNums(e.target.value);
    } else if(e.target.parentNode.className === 'fn-area'){
        handleFns(e.target.value);
    } else if(e.target.value === '='){
        handleResult();
    };
};

function handleNums(num){
    if(num === 'C'){
        handleReset();
    } else {
        if(crrFnValue === null){
            NUM.push(num);
            crrValue = NUM.join('');
            resultArea.innerText = crrValue;
        } else if(crrFnValue !== null){
            NUM2.push(num);
            crrValue2 = NUM2.join('');
            resultArea.innerText = crrValue2;
        }
    }
};

function handleFns(fn){
    if(NUM2.length === 0){
        crrFnValue = fn;
    } else if(NUM2.length !== 0){
        const result = eval(`${crrValue}${crrFnValue}${crrValue2}`);
        resultArea.innerText = result;
        crrValue = result;
        crrFnValue = fn;
        NUM = [];
        NUM2 = [];
    }

};

function handleResult(){
    resultArea.innerText = eval(`${crrValue}${crrFnValue}${crrValue2}`);
    resultBox.classList.add('change');
    setTimeout(removeChange, 1500)
};

function removeChange(){
    resultBox.classList.remove('change');
}

function handleReset(){
    NUM = [];
    NUM2 = [];
    crrValue = null;
    crrValue2 = null;
    crrFnValue = null;
    resultArea.innerText = '';
};

(function init(){
    calcArea.addEventListener('click', handleKeypads);
})();