export const MyProjects = {
    template: `
    <div id="my-projects" class="">
        <div class="section-title">
            <h2>Meus projetos</h2>
        </div>

        <div class="current-projects">
            <p>Criados recentemente</p>

            <div class="project">
                <div class="left">
                    <h4>Projeto Sofia</h4>
                    <h5>Desenvolvimento de Software e Multiplataforma</h5>
                </div>
                <div class="right d-flex justify-content-between flex-column align-items-end">
                    <p>Status</p>
                    <p>28/11/2024</p>
                </div>
            </div>

            <div class="project">
                <div class="left">
                    <h4>Projeto Sofia</h4>
                    <h5>Desenvolvimento de Software e Multiplataforma</h5>
                </div>
                <div class="right d-flex justify-content-between flex-column align-items-end">
                    <p>Status</p>
                    <p>28/11/2024</p>
                </div>
            </div>    

            <div class="button-section d-flex justify-content-start flex-row gap-3">
                <button class="btn-red">Exibir todos</button>
                <button class="btn-red">+ Criar projeto</button>
            </div>
        </div>
    </div>
    `,
    data() {

    },
    inject: ['urlBase'],
    methods: {
        gerarSlug(titulo) {
            return titulo.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '-');
        },
        save() {
        }
    },
    created() {
    }
};

