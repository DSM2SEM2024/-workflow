export function validateAccess(role){

    let base_host = window.location.href.split('#')[0]
    let token = window.localStorage.getItem('reposystem_token');

    let validate_url = 'http://localhost:70/token/validateAccess';
    let validate_options = {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`
        },
        body: JSON.stringify({
            role: role
        })
    }

    fetch(validate_url, validate_options)
    .then(response=>response.json())
    .then(response=>{
        if(response.status==false){
            switch (role) {
                case 'professor':
                    window.location.href = base_host + '#/login'; 
                    break;
            
                case 'coordinator':
                    window.location.href = base_host + '#/login-coordinator'; 
                    break;
                case 'admin':
                    window.location.href = base_host + '#/login-admin';
                    break;
            }
            
        }
    })
}