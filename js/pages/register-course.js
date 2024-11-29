import { validateAccess } from "../functions/validate-access.js";
import { Header } from "../components/header.js";

export const RegisterCourse = {
    template: `
        <Header></Header>
        <main id="register-course" class="d-flex justify-content-evenly align-items-center flex-row">
            <section class="dinamic-content">
                <div class="page-section d-flex justify-content-start align-items-center">
                    <h2>Cadastrar Curso</h2>
                </div>

                <section class="form-content">
                    <div class="section-title d-flex justify-content-between flex-row align-items-center"> 
                        <h3>Informações do Curso</h3>
                        <img class="icon" src="../images/bottom-section.png" alt="Expandir">
                    </div>
                    <form>
                        <div class="form-inputs d-flex justify-content-start flex-row flex-wrap">
                            <input type="text" placeholder="Nome">
                            <select>
                                <option value="unit">Unidade</option>
                            </select>
                        </div>
                        <div class="form-entries d-flex justify-content-start d-column flex-column">
                            <!-- Exemplo de unidade abaixo -->
                            <div class="unit">
                                <img src="../images/icon-university.png" alt="Expandir">
                                <div class="unit-info justify-content-center align-items-start">
                                    <h1>Fatec Itaquera - São Paulo</h1>
                                    <h2>Av. Miguel Ignácio Curi, 360 - Itaquera, São Paulo - SP, 08295-005</h2>
                                </div>
                                <span>-</span>
                            </div>
                            <p class="message-error error-unit"><!-- O campo unidade é obrigatório --></p>
                        </div>
                    </form>
                    <br>
                    <div class="section-title d-flex justify-content-between flex-row align-items-center"> 
                        <h3>Informações da disciplina</h3>
                        <img class="icon" src="../images/bottom-section.png" alt="Expandir">
                    </div>
                    <form>
                        <div class="form-inputs d-flex justify-content-start flex-row flex-wrap">
                            <input type="text" placeholder="Nome">
                            <select>
                                <option value="teacher">Docente</option>
                            </select>
                        </div>
                        <div class="form-entries d-flex justify-content-start d-column flex-column">
                            <!-- Exemplo de docente abaixo -->
                            <div class="members">
                                <img src="../images/user.png" alt="Expandir">
                                <p>Rodrigo Aragão</p>
                                <span>-</span>
                            </div>
                        </div>
                        <p class="message-error error-member"><!-- O campo docente é obrigatório --></p>
                    </form>

                    <hr>

                    <div class="form-footer d-flex justify-content-between d-column align-items-start flex-wrap">
                        <p>Atenção, certifique-se de preencher os campos obrigatórios!</p>

                        <button class="btn-create">Cadastrar Curso ‎ |
                            <img class="icon" src="../images/next.png" alt="Integrante">
                        </button>
                    </div>
                
                </section>
            </section>
        </main>
        {{email}} {{password}}
    `,
    components: {    
        Header
    },
    data() {
        return {
            // email: null,
            // password: null
            base_url: window.location.href.split('#')[0]
        };
    },
    inject: ['urlBase'],
    methods: {
        gerarSlug(titulo) {
            return titulo.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '-');
        },
        //Função para salvar os dados de um formulário e enviar para o servidor back-end.
        save() {
            // this.email;
        },
    },
    created() {
        //Conteúdos que deverão ser carregados em uma espécie de onload.
        validateAccess('professor');
    }
};