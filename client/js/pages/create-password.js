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
                        <p v-if="invalidPassword" class="message-error error-newpassword">{{passwordAlert}}</p>
                        
                        <input type="password" v-model="confirm" placeholder="Confirme a senha">
                        <p v-if="invalidConfirm" class="message-error error-newpassword">{{confirmAlert}}</p>              
                    </div>

                    <br>

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
            base_host: window.location.href.split('#')[0],
            invalidPassword: false,
            invalidConfirm: false,
            passwordAlert: '',
            confirmAlert: ''
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
            
            if(this.password==this.confirm && this.password.length>7){
                Swal.showLoading();
                fetch(url, options)
                .then(response=>response.json())
                .then(response=>{
                    if(response.status==true){
                        Swal.close();
                        this.$router.push('/login');
                    } else {
                        Swal.fire({
                            title: `${response.code} - Houve um erro`,
                            text: response.message,
                            icon: 'error'
                        })
                    }
    
                })
                .catch(error=>{
                    Swal.fire({
                        title: `Houve um erro`,
                        text: error.message,
                        icon: 'error'
                    })
                })
            }
            if(this.password.length<8){
                this.invalidPassword = true;
                this.passwordAlert = 'Senha muito pequena, insira ao menos 8 caracteres';
            } else {
                this.invalidPassword = false;
            }

            if(this.password!=this.confirm){
                this.invalidConfirm = true;
                this.confirmAlert = 'As senhas não coincidem';
            }

        }
    },
    created() {
    }
};