const form = document.getElementById('loginForm');

form.addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(form);
    const obj = {};
        
    data.forEach((value,key) => obj[key] = value);
    console.log(obj)
    fetch('/api/users/retrievepassword',{
        method:'POST',
        body:JSON.stringify(obj),

        headers: {
            'Content-Type' : 'application/json'
        }
    }).then(result => {
        console.log(result)
        if(result.status == 200){
            // window.location.replace('/login');
            console.log('enviado!')
        }
    })
    

});