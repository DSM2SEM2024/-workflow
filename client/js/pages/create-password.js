import { validateAccess } from "../functions/validate-access.js";
import { backend_url } from "../global-var/backend-url.js";

export const CreatePassword = {
    template: `
        <main id="create-password" class="dinamic-content d-flex justify-content-evenly align-items-center flex-row">
            <div class="left-content">
                <figure>
                    <img src="../images/logo-cps.png" alt="Logo Centro Paula Souza">
                </figure>
            </div>

            <div class="middle-content">
            </div>

            <section class="right-content">
                <h1>Crie sua senha de acesso</h1>
                <p class="subtitle">Complete seu registro para acessar o sistema</p>

                <div class="form-newpassword">
                    <div class="d-flex flex-column justify-content-start form-inputs">
                        <input type="password" v-model="password" placeholder="Senha">
                        
                        <input type="password" v-model="confirm" placeholder="Confirme a senha">
                        <p class="message-error error-newpassword"><!--As senhas não coincidem --></p>
                        <!-- A senha precisa de, no mínimo (regras de negócio) ou as senhas não coincidem -->               
                    </div>

                    <div class="d-flex justify-content-center flex-column gap-3 option-register">
                        <button type="submit" class="button btn-red signin" @click="signin">Registrar-se</button>
                    </div>
                </div>
            </section>
        </main>
    `,
    data() {
        return {
            code: decodeURIComponent(window.location.href.split('create-password/')[1]),
            password: '',
            confirm: '',
            base_host: window.location.href.split('#')[0]
        };
    },
    inject: ['urlBase'],
    methods: {
        gerarSlug(titulo) {
            return titulo.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '-');
        },
        //Função para salvar os dados de um formulário e enviar para o servidor back-end.
        signin() {

            let url = backend_url+'/password/define';
            let options = {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    code: this.code,
                    password: this.password,
                })
            };
            
            if(this.password==this.confirm){
                fetch(url, options)
                .then(response=>response.json())
                .then(response=>{
                    console.log(response)
                    if(response.status==true){
                        this.$router.push('/login');
                    } else {
                        // tratamento de falha no login temporário
                        alert(response.message);
                    }
    
                })
            }

        }
    },
    created() {
    }
};