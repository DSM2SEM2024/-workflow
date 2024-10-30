export const Project = {
    template: `
        <main id="project" class="d-flex justify-content-evenly align-items-center flex-row">
            <section class="dinamic-content">
                <div class="page-section d-flex justify-content-start align-items-center">
                    <h2>Informações do Projeto</h2>
                </div>

                <div class="section-data d-flex flex-column align-items-start gap-1">
                    <div class="data-title d-flex justify-content-start flex-row gap-3">
                        <div class="icon-title"></div>
                        <h1>Projeto</h1>
                    </div>

                    <h3>Publicado em 28/11/2024</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum</p>
                </div>
                <hr>
                <div class="section-files d-flex flex-column justify-content-start gap-2">
                    <div class="title d-flex justify-content-start flex-row align-items-center gap-3">
                        <img class="icon" src="../images/icon-file.png" alt="Projeto Interdisciplinar">
                        <h2>Anexos</h2>
                    </div>

                    <div class="files-content d-flex justify-content-between flex-row">
                        <div class="left-data d-flex justify-content-start align-items-center flex-row gap-3">
                            <img class="icon" src="../images/icon-pdf.png" alt="Projeto Interdisciplinar">
                            <p>Documento</p>
                        </div>

                        <div class="right-data d-flex justify-content-start align-items-center flex-row gap-3">
                            <img class="icon" src="../images/icon-upload.png" alt="Projeto Interdisciplinar">
                        </div>
                    </div>

                    
                    <div class="files-content d-flex justify-content-between flex-row">
                        <div class="left-data d-flex justify-content-start align-items-center flex-row gap-3">
                            <img class="icon" src="../images/icon-link.png" alt="Projeto Interdisciplinar">
                            <p>Link</p>
                        </div>

                        <div class="right-data d-flex justify-content-start align-items-center flex-row gap-3">
                            <img class="icon" src="../images/icon-upload.png" alt="Projeto Interdisciplinar">
                        </div>
                    </div>
                </div>  

                <div class="section-info">
                    <div class="label-content">
                        <label>Curso</label>
                        <div class="d-flex justify-content-start flex-row gap-2">
                            <img class="icon" src="../images/external-link.png" alt="Projeto Interdisciplinar">
                            <p>Desenvolvimento de Software e Multiplataforma</p>
                        </div>
                    </div>

                    <div class="label-content">
                        <label>Semestre</label>
                        <div class="d-flex justify-content-start flex-row gap-2">
                            <p>1° semestre de 2024</p>
                        </div>                    
                    </div>

                    <div class="label-content">
                        <label>Ministrado por</label>
                        <div class="d-flex justify-content-start flex-row gap-2">
                            <p>Fretz Sievers Junior</p>
                        </div>                    
                    </div>

                    <div class="label-content">
                        <label>Equipe de Desenvolvimento</label>
                        <div>
                            <p>Anthony Cabral, Renata Joaquim, Mariane Leite e José Carlos</p>
                        </div>                    
                    </div>

                    <br>

                    <a href="" target="_blank">
                        Se interessou pelo Projeto e deseja entrar em contato?
                    </a>
                </div>
            </section>
        </main>
        {{email}} {{password}}
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
    }
};