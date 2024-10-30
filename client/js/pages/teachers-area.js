export const TeachersArea = {
    template: `
        <main id="teachers-area" class="d-flex flex-row justify-content-between gap-2 flex-wrap">
            <div class="dinamic-content">
                <div class="section-top d-flex justify-content-start flex-row gap-5">
                    
                    <div class="profile-picture"></div>
                    <div class="profile-apresentation d-flex justify-content-start flex-column">
                        <h2 class="teacher-name">Professor</h2>
                        <h5 class="teacher-expertise">Graduado em Engenharia da Computação</h5>
                    </div>
                </div>

                <div class="section-career">
                    <h4>Graduação</h4>

                    <div class="list">
                        <p>Ciências Contábeis</p>
                        <p>Engenharia da Computação</p>
                        <p>Tecnologia em Análise e Desenvolvimento de Sistemas</p>
                        <p>Mestrado em Engenharia Eletrônica e Computação pelo Instituto Tecnológico de Aeronáutica (ITA)</p>
                    </div>
                <div>

                <section class="teachers-projects">
                    <div class="title-section">
                        <h3>Projetos</h3>
                    </div>

                    <div class="list">
                        <div class="project">
                            <div class="left">
                                <p class="project-name">Nome do Projeto</p>
                                <p class="curse-name">Curso</p>
                            </div>

                            <div class="right">
                                <p class="project-createdate">29/11/2024</p>
                            </div>
                        </div>
                    </div>
                </section>

                <div class="section-bottom">
                    <div class="left">
                        <h4>Contato</h4>
                    </div>

                    <div class="right">
                        <h4>Instituição</h4>
                    </div>
                </div>

            </div>
        </main>
    `,
    data() {
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
    },
};