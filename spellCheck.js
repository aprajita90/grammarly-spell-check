//import textgears from 'textgears-api';

const input = document.querySelector('input')  
const textarea = document.querySelector('textarea') 
input.addEventListener('change', function () { 
    let files = input.files; 
    if (files.length == 0) return; 
    let file = files[0]; 
    var reader = new FileReader(); 
    reader.onload = function (e) { 
        const file = e.target.result; 
        const lines = file.split(/\r\n|\n/); 
        textarea.value = lines.join('\n'); 
        console.log(textarea.value)
        const textgearsApi = fetch(`https://api.textgears.com/grammar?key=1gVny1rfj02gy7ky&text=`+textarea.value+`&language=en-GB`)
        .then(function(response){  response.json()})
        .then(function (data) {
            console.log(data)
        for (const error of data.errors) {
            console.log('Error: %s. Suggestions: %s', error.bad, error.better.join(', '));
        }
    })
    .catch((err) => {});
    }; 
    reader.onerror = function(e) {alert(e.target.error.name)}; 
    reader.readAsText(file);
}); 


// fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits')
//   .then(response => response.json())
//   .then(commits => alert(commits[0].author.login));
