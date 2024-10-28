export const CreateProject = {
    template: `
        <main id="create-project" class="d-flex justify-content-evenly align-items-center flex-row">
            <section class="dinamic-content">
                <div class="page-section d-flex justify-content-start align-items-center">
                    <h2>Novo Projeto</h2>
                </div>

                <section class="form-content">
                    <div class="section-title d-flex justify-content-between flex-row align-items-center"> 
                        <h3>Informações do projeto</h3>
                        <img class="icon" src="../images/bottom-section.png" alt="Expandir">
                    </div>
                    <form>
                        <div class="form-inputs d-flex justify-content-start d-column">
                            <input type="text" placeholder="Nome">
                            <input type="date" placeholder="Data de início">
                        </div>
                        <div class="form-inputs d-flex justify-content-start d-column">
                            <select>
                                <option value="unity">Unidade</option>
                            </select>
                            <input type="date" placeholder="Data de conclusão">
                        </div>
                        <div class="form-inputs d-flex justify-content-start d-column">
                            <textarea class="description" placeholder="Descrição"></textarea>
                        </div>                        
                    </form>
                    <br>
                    <div class="section-title d-flex justify-content-between flex-row align-items-center"> 
                        <h3>Integrantes</h3>
                        <img class="icon" src="../images/bottom-section.png" alt="Expandir">
                    </div>
                    <form>
                        <h1>Adicione um novo integrante clicando no ícone abaixo</h1>
                        <h2>É necessário informar o nome completo do integrante</h2>
                        <div class="form-inputs d-flex justify-content-start d-column">
                            <input type="text" placeholder="Integrante"> 
                            <span class="add-btn">+</span>
                        </div>              
                        <div class="form-entries d-flex justify-content-start d-column flex-column">
                            <!-- Exemplo de membros abaixo -->
                            <div class="members">
                                <img src="../images/user.png" alt="Expandir">
                                <p>Alexandre Silva</p>
                                <span>-</span>
                            </div>
                            <div class="members">
                                <img src="../images/user.png" alt="Expandir">
                                <p>Mariane Leite</p>
                                <span>-</span>
                            </div>
                        </div>
                        </form>
                    <br>
                    <div class="section-title d-flex justify-content-between flex-row align-items-center"> 
                        <h3>Anexos</h3>
                        <img class="icon" src="../images/bottom-section.png" alt="Expandir">
                    </div>
                    <form>
                        <div class="form-gap d-flex d-row flex-row">
                            <div class="form-inputs d-flex justify-content-start d-column flex-column">
                                <select placeholder="Escolha um arquivo">
                                    <option value="PDF">PDF</option>
                                    <option value="URL">URL</option>
                                    <option value="JPEG">JPEG</option>
                                    <option value="PNG">PNG</option>
                                </select>
                                <div class="file-drop d-flex justify-content-center d-column flex-column align-items-center">
                                    <img class="icon" src="../images/download.png" alt="Integrante">
                                    <p>Anexe ou arraste o arquivo para cá </p>
                                    <button type="button">Selecionar arquivo</button>
                                </div>         
                            </div>  
                            <div class="form-entries d-flex justify-content-start d-column flex-column">
                                <!-- Exemplo de membros abaixo -->
                                <div class="files">
                                    <img src="../images/file-pdf.png" alt="Expandir">
                                    <p>manual_do_usuario.pdf</p>
                                    <span>-</span>
                                </div>                                
                                <div class="files">
                                    <img src="../images/file-pdf.png" alt="Expandir">
                                    <p>diagramas.pdf</p>
                                    <span>-</span>
                                </div>                                
                                <div class="files">
                                    <img src="../images/file-link.png" alt="Expandir">
                                    <p>https://github.com/users/projectsofia</p>
                                    <span>-</span>
                                </div>                                
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
        }
    },
    created() {
        //Conteúdos que deverão ser carregados em uma espécie de onload.
    }
};