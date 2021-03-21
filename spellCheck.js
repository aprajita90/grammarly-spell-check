
let input = document.querySelector('input')  
let textarea = document.querySelector('textarea') 
input.addEventListener('change', function () { 
    let files = input.files; 
    if (files.length == 0) return; 
    let file = files[0]; 
    var reader = new FileReader(); 
    reader.readAsText(file);
    reader.onload = function () { 
       let text = reader.result
       let formattedText = text.replace('','');
        console.log(formattedText)
        fetch('https://api.textgears.com/spelling?key=1gVny1rfj02gy7kY&text='+ formattedText)
            .then(response => response.json())
            .then(data =>{ 
                let temp = formattedText;
                let invalidWords=data.response.errors
                invalidWords.forEach(function(ele) {
                    temp = temp.replace(ele.bad, `<span style="font-weight: bold; color: red; font-size: 15px" class ="invalidWord">${ele.bad}</span>`)    
                });
                filecontent.innerHTML = temp;
                
                let invalidWordSpans=document.querySelectorAll(".invalidWord");
            
                for(let i=0; i< invalidWordSpans.length; i++){
                console.log(invalidWordSpans[i]);
                $(invalidWordSpans[i]).contextmenu(function(event){
                    console.log(event.clientX +" "+ event.clientY);
                    event.preventDefault();
                    $("#custommenu > ul").empty();
                    for(let j=0; j<invalidWords[i].better.length;j++){
                        console.log(invalidWords[i]);
                    $("#custommenu > ul").append(`<li wordToReplace="${invalidWords[i].bad}" class="suggestionList">${invalidWords[i].better[j]}</li>`);
                    }
                    $(".suggestionList").mouseover(function (event){
                        event.target.style.backgroundColor = "grey";
                    })
                    $(".suggestionList").mouseout(function(event){
                        event.target.style.backgroundColor = "";
                    })
                    $(".suggestionList").click(function(event){
                        let wrongWords = document.getElementsByClassName("invalidWord");
                        for(let k=0; k < wrongWords.length; k++){
                            console.log(wrongWords[k].innerHTML,"nnnnnnnnnnnnnnn");
                            console.log($(event.target).attr("wordToReplace"))
                            if(wrongWords[k].innerHTML == $(event.target).attr("wordToReplace")){
                                wrongWords[k].innerHTML = event.target.innerHTML;
                                wrongWords[k].classList.remove("invalidWord");
    
                                $("#custommenu").css("display", "none");
                                break;
                            }
                        }
                    })
                    $("#custommenu").css("display", "block");
                    $("#custommenu").css({position:"relative", top:event.clientY, left:event.clientX});
                 })
               }
            })   
        }
}); 

