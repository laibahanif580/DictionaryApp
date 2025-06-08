
 const wrapper=document.querySelector(".wrapper");
 const searchInput=wrapper.querySelector("input");
 const infoText=wrapper.querySelector(".info-text");
 const synonyms=wrapper.querySelector(".synonyms .list");
 let volumeIcon=wrapper.querySelector(".word i");
 let removeIcon=wrapper.querySelector(".search span");

let audio;

 function data(result,word){
    if(result.title){
        infoText.innerHTML=`can't find the meaning of <span>"${word}"<span>.please try to search for another word`;
    }else{
        console.log(result);
        wrapper.classList.add("active");
        let definitions=result[0].meanings[0].definitions[0];
        phonetics=`${result[0].meanings[0].partOfSpeech} /${result[0].phonetics[0].text}`;

        document.querySelector(".word p").innerText=result[0].word;
        document.querySelector(".word span").innerText=phonetics;
        document.querySelector(".meaning span").innerText=definitions.definition;
        document.querySelector(".example span").innerText=result[0].meanings[0].partOfSpeech;
        audio=new Audio(result[0].phonetics[2].audio)

        if(result[0].meanings[0].synonyms[0]==undefined){
        synonyms.parentElement.style.display="none";
    }
       else{
        synonyms.parentElement.style.display="block";
        synonyms.innerHTML="";
        for(let i=0;i<5;i++){
            let tag=`<span onclick=search('${result[0].meanings[0].synonyms[i]}')>${result[0].meanings[0].synonyms[i]}</span>`
            synonyms.insertAdjacentHTML("beforeend",tag);
        }
       }
    }
 }

 function search(word){
    searchInput.value=word;
    fetchApi(word);
    wrapper.classList.remove("active");

 }
function fetchApi(word){
    wrapper.classList.remove("active");
    infoText.innerHTML=`Search the meaning of <span>"${word}"</span`;
    let url=`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    fetch(url).then(
        res=>res.json()
    ).then(result=>data(result,word))

}
searchInput.addEventListener("keyup",e=>{
    if(e.key==="Enter" && e.target.value){
        fetchApi(e.target.value);
    }
})


volumeIcon.addEventListener("click",()=>{
  audio.play();  
})

removeIcon.addEventListener("click",()=>{
    searchInput.value="";
    searchInput.focus();
    wrapper.classList.remove("active");
    infoText.style.color=`#9a9a9a`;
    infoText.innerHTML="Type a word and press enter to get meaning,example,pronunciation and synonyms of that typed word"
})