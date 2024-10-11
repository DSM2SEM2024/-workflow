export const CreateCoordinator = {
    template: `
        <main id="create-coordinator" class="d-flex justify-content-evenly align-items-center flex-row">
            <section class="dinamic-content">
                <div class="page-section d-flex justify-content-start align-items-center">
                    <h2>Cadastrar coordenador</h2>
                </div>

                <section class="form-content">
                    <div class="section-title d-flex justify-content-between flex-row align-items-center"> 
                        <h3>Informações do coordenador</h3>
                        <img class="icon" src="../images/bottom-section.png" alt="Expandir">
                    </div>
                    <form>
                        <div class="form-inputs d-flex justify-content-start d-column">
                            <input type="text" placeholder="Nome">
                            <input type="email" placeholder="E-mail">
                        </div>
                        <div class="form-inputs d-flex justify-content-start d-column">                               
                            <select>
                                <option value="unity">Unidade</option>
                            </select>
                            <div class="choosed-option"></div>
                        </div>
                    </form>

                    <hr>

                    <div class="form-footer d-flex justify-content-between d-row align-items-start">
                        <p>Atenção, certifique-se de preencher os campos obrigatórios!</p>

                        <button class="btn-create">Cadastrar coordenador ‎ |
                            <img class="icon" src="../images/next.png" alt="Expandir">
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