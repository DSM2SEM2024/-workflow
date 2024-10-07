export const Login = {
    template: `
        <div id="login">
            <section id="left-content">
                <figure>
                    <img src="logo" alt="Logo Centro Paula Souza">
                    <figcaption>Logo CPS</figcaption>
                </figure>
            </section>

            <section id="right-content">
                <h1>Login</h1>
                <p>Faça login na plataforma para criar projetos</p>
                <section>
                    <input type="email" v-model="email" placeholder="E-mail">
                    <input type="password" v-model="password">

                    <section class="options-password">
                        <input type="checkbox" placeholder="Lembrar credenciais">
                        <a href="">Esqueci a senha</a>
                    </section>

                    <section class="options-login">
                        <button type="submit">Entrar</button>
                        <button type="submit">Entrar com Microsoft</button>
                    </section>
                </section>
            </section>
        </div>
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
        save(){
            this.email;
        }
    },
    created() {
        //Conteúdos que deverão ser carregados em uma espécie de onload.
    }
};