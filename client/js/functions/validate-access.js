import { backend_url } from "../global-var/backend-url.js";
import { urlBase } from "../global-var/url-base.js";

export function validateAccess(role){

    let token = window.localStorage.getItem('reposystem_token');

    let validate_url = backend_url+'/token/validateAccess';
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
        console.log(response)
        if(response.status==false){
            switch (role) {
                case 'professor':
                    window.location.href = urlBase+'#/login';
                    break;
            
                case 'coordinator':
                    window.location.href = urlBase+'#/project/1';
                    break;
            }
            
        }
    })
}