import { validateAccess } from "../functions/validate-access.js";
import { backend_url } from "../global-var/backend-url.js";

export const Login = {
    template: `
        <main id="login" class="dinamic-content d-flex justify-content-evenly align-items-center flex-row">
            <div class="left-content">
                <figure>
                    <img src="./images/logo-cps.png" alt="Logo Centro Paula Souza">
                </figure>
            </div>

            <div class="middle-content">
            </div>

            <section class="right-content">
                <h1>Login</h1>
                <p class="subtitle">Faça login na plataforma para criar projetos</p>

                <div>
                    <div class="d-flex flex-column justify-content-start form-inputs">
                        <input type="email" v-model="email" placeholder="E-mail" required>
                        <p v-if="invalidEmail" class="message-error error-email">{{emailAlert}}</p>

                        <input type="password" v-model="password" placeholder="Senha" required>
                        <p v-if="invalidPassword" class="message-error error-password">{{passwordAlert}}</p>

                        <select v-model="role" class="career">
                            <option value="professor">Professor</option>
                            <option value="coordinator">Coordenador</option>
                        </select>
                    </div>

                    <div class="d-flex justify-content-between flex-row options-password">
                        <div class="d-flex justify-content-start align-items-center gap-2">
                            <input id="remember" type="checkbox" v-model="manter_login" class="teste">
                            <label for="remember">Lembrar credenciais</label>
                        </div>

                        <a href="">Esqueci a senha</a>
                    </div>
                    <p class="message-error error-password"><!-- E-mail ou senha incorretos. Tente novamente. --></p>

                    <div class="d-flex justify-content-center flex-column gap-3 options-login">
                        <button type="submit" class="button btn-red" @click="verifyForLogin">Entrar</button>
                        <button type="submit" class="d-flex justify-content-center flex-row align-items-center gap-3 button btn-white">
                            <img class="icon" src="./images/logo-microsoft.png" alt="Logo Microsoft">
                            Entrar com Microsoft
                        </button>
                    </div>
                </div>
            </section>
        </main>
    `,
    data() {
        return {
            email: '',
            password: '',
            manter_login: false,
            base_host: window.location.href.split('#')[0],
            invalidEmail: false,
            emailAlert: '',
            invalidPassword: false,
            passwordAlert: '',
            role: 'professor'
        };
    },
    inject: ['urlBase'],
    methods: {
        gerarSlug(titulo) {
            return titulo.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '-');
        },
        //Função para salvar os dados de um formulário e enviar para o servidor back-end.
        login() {

            let url = backend_url+'/login';
            let options = {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    email: this.email,
                    password: this.password,
                    login: this.manter_login,
                    role: this.role
                })
            };
            Swal.showLoading();
            fetch(url, options)
            .then(response=>response.json())
            .then(response=>{
                Swal.close();
                console.log(response)
                if(response.status==true){
                    window.localStorage.setItem('reposystem_token',response.data);

                    if('ID_Professor' in response.message){
                        window.localStorage.setItem('reposystem_role','professor');
                    } else if('ID_Coordinator' in response.message){
                        window.localStorage.setItem('reposystem_role','coordinator');
                    }

                    this.$router.push('/management');
                } else {
                    // tratamento de falha no login temporário
                    Swal.fire({
                        title: `${response.code} - Houve um erro`,
                        text: response.message,
                        icon: 'error'
                    });
                }

            })

        },
        validarEmail(email) {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return regex.test(email);
        },
        verifyForLogin(){
            if(!this.validarEmail(this.email)){
                this.invalidEmail = true;
                this.emailAlert = 'Insira um e-mail válido';
            } else {
                this.invalidEmail = false;
            }
            if(this.password.length<8){
                this.invalidPassword = true;
                this.passwordAlert = 'Senha muito curta (min: 8 caracteres)';
            } else {
                this.invalidPassword = false;
            }
            if(this.validarEmail(this.email) && this.password.length > 7){
                this.login();
            }
        },
    },
    created() {
    }
};