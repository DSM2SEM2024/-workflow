import { validateAccess } from "../functions/validate-access.js";
import { Header } from "../components/header.js";

export const RegisterUnit = {
    template: `
        <Header></Header>
        <main id="register-unit" class="d-flex justify-content-evenly align-items-center flex-row">
            <section class="dinamic-content">
                <div class="page-section d-flex justify-content-start align-items-center">
                    <h2>Cadastrar Unidade</h2>
                </div>

                <section class="form-content">
                    <div class="section-title d-flex justify-content-between flex-row align-items-center"> 
                        <h3>Informações da Unidade</h3>
                        <img class="icon" src="./images/bottom-section.png" alt="Expandir">
                    </div>
                    <form>
                        <div class="form-inputs d-flex justify-content-start flex-row flex-wrap">
                            <div class="d-flex flex-column align-items-start">
                                <input type="text" placeholder="Nome da unidade">
                                <p class="message-error error-name"></p>
                            </div>

                            <div class="d-flex flex-column align-items-start">
                                <input type="text" placeholder="CEP">
                                <p class="message-error error-cep"><!-- O CEP é inválido.--></p>
                            </div>
                        </div>
                        <div class="form-inputs d-flex justify-content-start flex-row flex-wrap">

                            <div class="d-flex flex-column align-items-start">
                                <input type="text" placeholder="Endereço">
                                <p class="message-error error-address"><!-- O endereço é obrigatório.--></p>
                            </div>

                            <div class="d-flex flex-column align-items-start">
                                <input type="text" placeholder="Número">
                                <p class="message-error error-number"><!-- O número é obrigatório.--></p>
                            </div>
                        </div>

                        <div class="form-inputs d-flex justify-content-start flex-row flex-wrap">
                            <div class="d-flex flex-column align-items-start">
                                <input type="text" placeholder="Cidade">
                                <p class="message-error error-city"><!-- A cidade é obrigatório.--></p>
                            </div>

                            <div class="d-flex flex-column align-items-start">
                                <input type="text" placeholder="Estado">
                                <p class="message-error error-state"><!-- O estado é obrigatório.--></p>
                            </div>
                        </div>
                    </form>
                    <br>
                    <div class="section-title d-flex justify-content-between flex-row align-items-center"> 
                        <h3>Corpo Administrativo</h3>
                        <img class="icon" src="./images/bottom-section.png" alt="Expandir">
                    </div>
                    <form>
                        <h1>Adicione um novo coordenador clicando no ícone abaixo</h1>
                        <h2>Somente um cordenador por unidade</h2>
                        <div class="form-inputs d-flex justify-content-start d-column">
                            <select>
                                <option value="coordinator">Coordenador</option>
                            </select>
                        </div>
                        <div class="form-entries d-flex justify-content-start d-column flex-column">
                            <!-- Exemplo de coordenador abaixo -->
                            <div class="members">
                                <img src="./images/user.png" alt="Expandir">
                                <p>Rodrigo Aragão</p>
                                <span>-</span>
                            </div>
                        </div>
                        <p class="message-error error-member"><!-- O campo coordenador é obrigatório --></p>
                    </form>
                    <br>
                    <div class="section-title d-flex justify-content-between flex-row align-items-center"> 
                        <h3>Corpo Docente</h3>
                        <img class="icon" src="./images/bottom-section.png" alt="Expandir">
                    </div>
                    <form>
                        <h1>Adicione um novo docente clicando no ícone abaixo</h1>
                        <div class="form-inputs d-flex justify-content-start d-column">
                            <select>
                                <option value="teacher">Docente</option>
                            </select>
                        </div>
                        <div class="form-entries fe-limited d-flex justify-content-start d-column flex-column">
                            <!-- Exemplo de docentes abaixo -->
                            <div class="members">
                                <img src="./images/user.png" alt="Expandir">
                                <p>Fretz Sievers</p>
                                <span>-</span>
                            </div>
                            <div class="members">
                                <img src="./images/user.png" alt="Expandir">
                                <p>Rodrigo Faustino</p>
                                <span>-</span>
                            </div>
                            <div class="members">
                                <img src="./images/user.png" alt="Expandir">
                                <p>Daniel da Silva</p>
                                <span>-</span>
                            </div>
                        </div>
                        <p class="message-error error-member"><!-- O campo docente é obrigatório --></p>
                    </form>

                    <hr>

                    <div class="form-footer d-flex justify-content-between d-column align-items-start gap-3 flex-wrap">
                        <p>Atenção, certifique-se de preencher os campos obrigatórios!</p>

                        <button class="btn-create">Cadastrar Unidade ‎ |
                            <img class="icon" src="./images/next.png" alt="Integrante">
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