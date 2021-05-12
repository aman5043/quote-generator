const quoteContainer=document.getElementById("quote-container");
const quoteText=document.getElementById("quote");
const authorText=document.getElementById("author");
const TwitterBtn=document.getElementById("twitter");
const newQuoteBtn=document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuote=[];
// show loading
function loading(){
    loader.hidden=false;
    quoteContainer.hidden=true;
}
// hide loader
function complete(){
    quoteContainer.hidden=false;
    loader.hidden=true;
}

function newQuote(){
    loading();
    const quote=apiQuote[Math.floor(Math.random() * apiQuote.length)];
    // Check if author quote is blank and replace it with unknown 
    if(!quote.author){
        authorText.textContent="Unknown";
    }
    else{
        authorText.textContent=quote.author;
    }
    //check quote length to determining styling
    if(quote.text.length>100){
        quoteText.classList.add('long-quote');
    }
    else{
        quoteText.classList.remove('long-quote');
    }
    // set quote hide loader
    quoteText.textContent=quote.text;
    complete();
}
// Creting API
async function getquotes(){
    loading();
    const apiUrl="https://type.fit/api/quotes";
    try{
        const response=await fetch(apiUrl);
        apiQuote=await response.json();
        newQuote();

    }
    catch(error){
        //error
    }
}
function tweetTwitter(){
    const tweetUrl=`https://twitter.com/intent/tweet?text=${quoteText.innerText} - ${authorText.innerText}`;
    window.open(tweetUrl,"_blank");
}
//Event Listener
newQuoteBtn.addEventListener('click',newQuote);
TwitterBtn.addEventListener('click',tweetTwitter);

//On load Animation

getquotes();
