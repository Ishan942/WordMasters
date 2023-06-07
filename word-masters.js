const letters= document.querySelectorAll('.scoreboard-letter');
const loadingDiv= document.querySelector('.info-bar');
const len=5;
const attempts=5;

async function init(){
let done=false;
let wordin='';
let currentRow=0;
let isLoading=true;

    const res=await fetch("https://words.dev-apis.com/word-of-the-day");
    const obj=await res.json();
    const word=obj.word.toUpperCase();
    setLoading(false);
    isLoading=false;
    const wordarr=word.split("");
    
    function addLetter(letter){
        if(wordin.length < len){
            //if length is less than 5 append letter to the end
            wordin +=letter;
        }
        else{
            //if length is equal to 5 then just modify the last letter
            wordin=wordin.substring(0,len-1)+ letter;
        }
        //update the dom
        letters[len*currentRow+wordin.length-1].innerText=letter;
    }
    async function commit(){
        const map=lettercount(wordarr);
        if(wordin.length != len){
            return;
        }
        
        //check if the word belongs to dicitonary
        isLoading=true;
        setLoading(true);
        const res=await fetch("https://words.dev-apis.com/validate-word",{
            method:"POST",
            body:JSON.stringify({word: wordin})
        });
        const resobj=await res.json();
        const validword=resobj.validWord;
        isLoading=false;
        setLoading(false);
        if(!validword){
            markInvalidWord();
            return;
        }
        //marks correct or wrong
        const guessarr=wordin.split("");
        for(let i=0;i<len;i++){
            if(guessarr[i]===wordarr[i]){
                letters[currentRow*len +i].classList.add("correct");
                map[wordarr[i]]--;
            }
        }
        for(let i=0;i<len;i++){
            if(guessarr[i]===wordarr[i]){}
            else if(wordarr.includes(guessarr[i]) && map[guessarr[i]]){
                letters[currentRow*len +i].classList.add("close");
                map[guessarr[i]]--;
            }
            else{
                letters[currentRow*len +i].classList.add("wrong");
            }
        }
        if(currentRow== attempts){
            alert(`YOU LOST  the word is ${word}`)
            done=true;
        }
        if(wordin===word){
            document.querySelector('.brand').classList.add("winner");
            alert("Winner");
            done =true;
            
        }
        //win or loose
        currentRow++;
        wordin='';
    }
    function backspace(){
        wordin=wordin.substring(0,wordin.length-1);
        letters[len*currentRow + wordin.length].innerText='';
    }

    document.addEventListener('keydown',function keypress(event){
        if(done || isLoading){
            return;
        } 
        const action=event.key;
        if(action== 'Enter'){
            commit();
        }
        else if(action === 'Backspace'){
            backspace();
        }
        else if(isLetter(action)){
            addLetter(action.toUpperCase())
        }
        });
}
function markInvalidWord(){
    alert("Not a valid word");
}
function isLetter(letter) {
    return /^[a-zA-Z]$/.test(letter);
  }

function setLoading(isLoading){
    loadingDiv.classList.toggle('hidden',!isLoading);
}
function lettercount(array){
    const obj={};
    for(let i=0;i<len;i++){
        if(obj[array[i]]){
            obj[array[i]]++;
        }
        else{
            obj[array[i]]=1;
        }
    }
    return obj;
}
init();