
let input = document.querySelector('input')  
let textarea = document.querySelector('textarea') 
input.addEventListener('change', function () { 
    let files = input.files; 
    if (files.length == 0) return; 
    let file = files[0]; 
    var reader = new FileReader(); 
    reader.onload = function (e) { 
        let file = e.target.result; 
       // console.log(file)
        const lines = file.split(/\r\n|\n/); 
        textarea.value = lines.join('\n'); 

        fetch('https://api.textgears.com/spelling?key=1gVny1rfj02gy7kY&text='+ textarea.value)
            .then(response => response.json())
            .then(data =>{ 
                // console.log(data)
                // console.log(data.response.errors[0].bad)
                var temp = textarea.value
                data.response.errors.forEach(function(ele) {
                    //console.log(ele.bad)
                    temp = (temp.replace(new RegExp(ele.bad, 'ig'), `<span style="font-weight: bold; color: red; font-size: 30px"> ${ele.bad} </span>`) )   
                });
                    return temp
            });
         }; 
    //console.log(textarea.value )
    reader.onerror = function(e) {alert(e.target.error.name)}; 
    reader.readAsText(file);
}); 

