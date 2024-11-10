import { validateAccess } from "../functions/validate-access.js";
import { backend_url } from "../global-var/backend-url.js";

export const Login = {
    template: `
        <main id="login" class="dinamic-content d-flex justify-content-evenly align-items-center flex-row">
            <div class="left-content">
                <figure>
                    <img src="../images/logo-cps.png" alt="Logo Centro Paula Souza">
                </figure>
            </div>

            <div class="middle-content">
            </div>

            <section class="right-content">
                <h1>Login</h1>
                <p class="subtitle">Faça login na plataforma para criar projetos</p>

                <div>
                    <div class="d-flex flex-column justify-content-start form-inputs">
                        <input type="email" v-model="email" placeholder="E-mail">
                        <p class="message-error error-email"><!--E-mail inválido.--></p>

                        <input type="password" v-model="password" placeholder="Senha">
                        <p class="message-error error-password"><!--A senha é muito curta.--></p>
                    </div>

                    <div class="d-flex justify-content-between flex-row options-password">
                        <div class="d-flex justify-content-start align-items-center gap-2">
                            <input type="checkbox">
                            <label>Lembrar credenciais</label>
                        </div>

                        <a href="">Esqueci a senha</a>
                    </div>
                    <p class="message-error error-password"><!-- E-mail ou senha incorretos. Tente novamente. --></p>

                    <div class="d-flex justify-content-center flex-column gap-3 options-login">
                        <button type="submit" class="button btn-red" @click="login">Entrar</button>
                        <button type="submit" class="d-flex justify-content-center flex-row align-items-center gap-3 button btn-white">
                            <img class="icon" src="../images/logo-microsoft.png" alt="Logo Microsoft">
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
            base_host: window.location.href.split('#')[0]
        };
    },
    inject: ['urlBase'],
    methods: {
        gerarSlug(titulo) {
            return titulo.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '-');
        },
        //Função para salvar os dados de um formulário e enviar para o servidor back-end.
        login() {

            let url = backend_url+'/professor/login';
            let options = {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    email: this.email,
                    password: this.password
                })
            };
            
            fetch(url, options)
            .then(response=>response.json())
            .then(response=>{

                if(response.status==true){
                    window.localStorage.setItem('reposystem_token',response.data);
                    window.location.href = this.base_host+'#/management'
                } else {
                    // tratamento de falha no login temporário
                    alert(response.message);
                }

            })

        }
    },
    created() {
    }
};