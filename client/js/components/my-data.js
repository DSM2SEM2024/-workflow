import { navigate } from "../functions/navigate.js";

export const MyData = {
    template: `
    <section id="my-data">
            <div class="form-content">
                <div class="section-title d-flex justify-content-between flex-row align-items-center"> 
                    <h3>Minhas informações</h3>
                    <img class="icon" src="../images/bottom-section.png" alt="Expandir">
                </div>
            </div>

            <form>
                <div class="form-inputs d-flex justify-content-start d-column">
                    <input type="text" name="name" placeholder="Nome">
                    <input type="email" name="email" placeholder="E-mail">
                </div>

                <div class="form-inputs d-flex justify-content-start d-column">
                    <input type="text" name="expertise" placeholder="Formação">
                </div>

                <div class="form-inputs d-flex justify-content-start d-column">                               
                    <div class="units">
                    <!-- Insira um foreach com todas as unidades das quais o professor faz parte -->
                        <li v-for="unity in units">{{unity}}</li>
                    </div>    
                    <!-- Insira um foreach com todos os cursos dos quais o professor ministra -->
                    <div class="curses">
                        <li v-for="curse in curses">{{curse}}</li>
                    </div>    
                </div>

                <div class="section-password">
                    <p>Clique no botão abaixo para alterar a sua senha de acesso.</p>
                    <div class="form-inputs d-flex justify-content-start d-column">
                    <!-- Deixe a senha do usuário setada aqui, quando ele clicar no botão de alterar a senha, limpe o campo -->
                        <input type="password" name="password" placeholder="Digite a sua senha...">
                        <input type="password" name="confirm-password" placeholder="Confirme a sua senha...">
                    </div>
                    <button @click="changePassword">Confirmar</button>
                </div>
                <hr>
                <div class="form-footer d-flex justify-content-between d-row align-items-start">
                    <button class="btn-create">Atualizar informações ‎ |
                        <img class="icon" src="../images/next.png" alt="Expandir">
                    </button>
                </div>

                <button @click="updateMyData">Atualizar dados</button>
            </form>
    </section>

    `,
    data() {
    },
    inject: ['urlBase'],
    methods: {
        gerarSlug(titulo) {
            return titulo.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '-');
        },
        save() {
        },
        navigate
    },
    created() {
    }
};

