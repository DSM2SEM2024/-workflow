import { validateAccess } from "../functions/validate-access.js";

export const RegisterUnit = {
    template: `
        <main id="register-unit" class="d-flex justify-content-evenly align-items-center flex-row">
            <section class="dinamic-content">
                <div class="page-section d-flex justify-content-start align-items-center">
                    <h2>Cadastrar Unidade</h2>
                </div>

                <section class="form-content">
                    <div class="section-title d-flex justify-content-between flex-row align-items-center"> 
                        <h3>Informações da Unidade</h3>
                        <img class="icon" src="../images/bottom-section.png" alt="Expandir">
                    </div>
                    <form>
                        <div class="form-inputs d-flex justify-content-start d-column">
                            <input type="text" placeholder="Nome da unidade">
                            <input type="text" placeholder="CEP">
                        </div>
                        <div class="form-inputs d-flex justify-content-start d-column">
                            <input type="text" placeholder="Endereço">
                            <input type="text" placeholder="Número">
                        </div>
                        <div class="form-inputs d-flex justify-content-start d-column">
                            <input type="text" placeholder="Cidade">
                            <input type="text" placeholder="Estado">
                        </div>
                    </form>
                    <br>
                    <div class="section-title d-flex justify-content-between flex-row align-items-center"> 
                        <h3>Corpo Administrativo</h3>
                        <img class="icon" src="../images/bottom-section.png" alt="Expandir">
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
                                <img src="../images/user.png" alt="Expandir">
                                <p>Rodrigo Aragão</p>
                                <span>-</span>
                            </div>
                        </div>
                    </form>
                    <br>
                    <div class="section-title d-flex justify-content-between flex-row align-items-center"> 
                        <h3>Corpo Docente</h3>
                        <img class="icon" src="../images/bottom-section.png" alt="Expandir">
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
                                <img src="../images/user.png" alt="Expandir">
                                <p>Fretz Sievers</p>
                                <span>-</span>
                            </div>
                            <div class="members">
                                <img src="../images/user.png" alt="Expandir">
                                <p>Rodrigo Faustino</p>
                                <span>-</span>
                            </div>
                            <div class="members">
                                <img src="../images/user.png" alt="Expandir">
                                <p>Daniel da Silva</p>
                                <span>-</span>
                            </div>
                        </div>
                    </form>

                    <hr>

                    <div class="form-footer d-flex justify-content-between d-column align-items-start">
                        <p>Atenção, certifique-se de preencher os campos obrigatórios!</p>

                        <button class="btn-create">Cadastrar projeto ‎ |
                            <img class="icon" src="../images/next.png" alt="Integrante">
                        </button>
                    </div>
                
                </section>
            </section>
        </main>
        {{email}} {{password}}
    `,
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