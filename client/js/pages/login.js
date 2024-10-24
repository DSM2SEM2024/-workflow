export const Login = {
    template: `
        <main id="login" class="dinamic-content d-flex justify-content-evenly align-items-center flex-row">
            <div id="left-content">
                <figure>
                    <img src="../images/logo-cps.png" alt="Logo Centro Paula Souza">
                </figure>
            </div>

            <div id="middle-content">
            </div>

            <section id="right-content">
                <h1>Login</h1>
                <p class="subtitle">Faça login na plataforma para criar projetos</p>

                <div>
                    <div class="d-flex flex-column justify-content-start form-inputs">
                        <input type="email" v-model="email" placeholder="E-mail">
                        <input type="password" v-model="password" placeholder="Senha">
                    </div>

                    <div class="d-flex justify-content-between flex-row options-password">
                        <div class="d-flex justify-content-start align-items-center gap-2">
                            <input type="checkbox">
                            <label>Lembrar credenciais</label>
                        </div>

                        <a href="">Esqueci a senha</a>
                    </div>

                    <div class="d-flex justify-content-center flex-column gap-3 options-login">
                        <button type="submit" class="button btn-red">Entrar</button>
                        <button type="submit" class="d-flex justify-content-center flex-row align-items-center gap-3 button btn-white">
                            <img class="icon" src="../images/logo-microsoft.png" alt="Logo Microsoft">
                            Entrar com Microsoft
                        </button>
                    </div>
                </div>
            </section>
        </main>
        {{email}} {{password}}
    `,
    data() {
        return {
            email: null,
            password: null
        };
    },
    inject: ['urlBase'],
    methods: {
        gerarSlug(titulo) {
            return titulo.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '-');
        },
        //Função para salvar os dados de um formulário e enviar para o servidor back-end.
        save() {
            this.email;
        }
    },
    created() {
        //Conteúdos que deverão ser carregados em uma espécie de onload.
    }
};