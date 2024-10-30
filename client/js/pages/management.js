export const ManagementPage = {
    template: `
        <main id="management-page" class="d-flex justify-content-evenly align-items-center flex-row">
            <section class="dinamic-content">
                <div class="page-section d-flex justify-content-start align-items-center">
                    <h2>Gerenciar Projetos</h2>
                </div>
                <div class="page-content d-flex justify-content-start align-items-start flex-column">
                    <div class="new-project-card">
                        <h1>Crie um novo Projeto Interdisciplinar</h1>
                        <h2>Gerencie os Projetos através da central de gerenciamento. Crie e atualize Projetos existentes.</h2>
                        <button class="btn-red">+ Criar Projeto</button>
                    </div>
                    <div class="page-section d-flex justify-content-start align-items-center">
                        <h2>Meus projetos</h2>
                    </div>
                    <div id="projects-container" class="d-flex justify-content-start align-items-start flex-column">
                        <div class="project d-flex flex-column">
                            <h1>Projeto Escalar <span>— 27/09/2024</span></h1>
                            <h2>Desenvolvimento de Software e Multiplataforma</h2>
                            <button class="btn-editar btn-red"><img class="icon" src="../images/lapis.png">Editar</button>
                        </div>
                        <div class="project d-flex flex-column">
                            <h1>Projeto Escalar <span>— 27/09/2024</span></h1>
                            <h2>Desenvolvimento de Software e Multiplataforma</h2>
                            <button class="btn-editar btn-red"><img class="icon" src="../images/lapis.png">Editar</button>
                        </div>
                        <div class="project d-flex flex-column">
                            <h1>Projeto Escalar <span>— 27/09/2024</span></h1>
                            <h2>Desenvolvimento de Software e Multiplataforma</h2>
                            <button class="btn-editar btn-red"><img class="icon" src="../images/lapis.png">Editar</button>
                        </div>
                        <div class="project d-flex flex-column">
                            <h1>Projeto Escalar <span>— 27/09/2024</span></h1>
                            <h2>Desenvolvimento de Software e Multiplataforma</h2>
                            <button class="btn-editar btn-red"><img class="icon" src="../images/lapis.png">Editar</button>
                        </div>
                        <div class="project d-flex flex-column">
                            <h1>Projeto Escalar <span>— 27/09/2024</span></h1>
                            <h2>Desenvolvimento de Software e Multiplataforma</h2>
                            <button class="btn-editar btn-red"><img class="icon" src="../images/lapis.png">Editar</button>
                        </div>
                    </div>
                </div>


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