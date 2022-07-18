const inputContainer = document.querySelector(".inputs"),
diskTitle = document.querySelector(".desk"),
guess_count = document.querySelector(".guess-count"),
resetButton =document.querySelector("button"),
typing = document.querySelector(".typing"),
success = new Audio("../audio/new.mp3");

// all words

const words =[
    {
        word: "react",
        disk: "javascript library"
    },
    {
        word: "vue",
        disk: "javascript framework"
    },
    {
        word: "angular",
        disk: "javascript mvw framework"
    },
    {
        word: "nodejs",
        disk: "javascript runtime environment"
    },
    {
        word: "php",
        disk: "general-purpose scripting language "
    },
    {
        word: "ruby",
        disk: "open source programming language"
    },
    {
        word: "python",
        disk: "programming language"
    },
    {
        word: "tailwind",
        disk: "A utility first css framework"
    },
    {
        word: "bootstrap",
        disk: "world's most famous free css framework"
    }

];
let word, maxguess=12, countwin=[];
// focus input after user keydown

document.addEventListener("keydown", ()=>typing.focus());
//start game after keydown
typing.addEventListener("input", startgame);
//handle click resetbutton change game
resetButton.addEventListener("click", getrandomword); //call function getrandomword to start new game 
//get radom word
function getrandomword(){
    //handle reset element
    reset();
    let randomobject = words[Math.floor(Math.random()*(words.length))],
    disk = randomobject.disk;
    word = randomobject.word;
    //add discription
    diskTitle.innerHTML=disk;
    //add guess count
    guess_count.innerText=maxguess;
    //create inputs
    let inputs="";
    for(let i=0; i<word.length; i++){
        inputs +=`<input class="bg-black=50 border-radius-2 text-info text-center fs-3 text-uppercase fw-bold" value="" style="width: 40px; height:35px" type="text" disabled>`;

    }
    inputContainer.innerHTML=inputs;
};

getrandomword();

 //start gamed 
 function startgame(e){
    let char = e.target.value;
    if(!char.match(/[a-z]/i)) return;
    if(word.includes(char)){
        for(let i=0; i<word.length; i++){
            //add char in position && check position is found or no
            if(word[i]===char && !inputContainer.querySelectorAll("input")[i].value){
                inputContainer.querySelectorAll("input")[i].value=char;
                countwin.push(char)
            }
           
        }
    }
    else{
        maxguess--;
            }
        guess_count.innerHTML=maxguess;
        typing.value="";
            // //winner
    if(countwin.length===word.length){
                countwin=[];
                success.play();
                document.querySelector(".winner").classList.remove("d-none");
            }
            //loser
    setTimeout(()=>{ if (maxguess<=0){
                alert("ياخسران صعب تكسب :) 🔥 😄  ")
                for(let i=0;i<word.length;i++){
                    inputContainer.querySelectorAll("input")[i].value=word[i];
                }
            }});
   
 };
//  reset element
 function reset(){
    maxguess=12;
    document.querySelector(".winner").classList.add("d-none");
    countwin=[];
    success.pause();
 };