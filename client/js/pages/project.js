export const Project = {
    template: `
        <main id="project" class="d-flex justify-content-evenly align-items-center flex-row">
            <section class="dinamic-content">
                <div class="page-section d-flex justify-content-start align-items-center">
                    <h2>Informações do Projeto</h2>
                </div>

                <div class="section-data">
                    <div class="data-title">
                        <div class="icon-title"></div>
                        <h1>Projeto</h1>
                    </div>

                    <h3>Publicado em 28/11/2024</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum</p>
                </div>


                <hr>
                <div class="section-files">
                    <div class="title">
                        <div></div>
                        <h2>Anexos</h2>
                    </div>

                    <div class="files-content d-flex justify-content-between flex-row">
                        <div class="left-data d-flex justify-content-start flex-row gap-2">
                            <img class="icon" src="../images/pdf.png" alt="Projeto Interdisciplinar">
                            <p>Documento</p>
                        </div>

                        <div class="right-data">
                            <img class="icon" src="../images/pdf.png" alt="Projeto Interdisciplinar">
                        </div>
                    </div>

                </div>  

                <div class="section-info">
                    <div class="label-content">
                        <label>Curso</label>
                        <div>
                            <img class="icon" src="../images/icon-bottom.png" alt="Projeto Interdisciplinar">
                            <p>Desenvolvimento de Software e Multiplataforma</p>
                        </div>
                    </div>

                    <div class="label-content">
                        <label>Semestre</label>
                        <div>
                            <img class="icon" src="../images/icon-bottom.png" alt="Projeto Interdisciplinar">
                            <p>1° semestre de 2024</p>
                        </div>                    
                    </div>

                    <div class="label-content">
                        <label>Ministrado por</label>
                        <div>
                            <img class="icon" src="../images/icon-bottom.png" alt="Projeto Interdisciplinar">
                            <p>Fretz Sievers Junior</p>
                        </div>                    
                    </div>

                    <div class="label-content">
                        <label>Equipe de Desenvolvimento</label>
                        <div>
                            <img class="icon" src="../images/icon-bottom.png" alt="Projeto Interdisciplinar">
                            <p>Anthony Cabral, Renata Joaquim, Mariane Leite e José Carlos</p>
                        </div>                    
                    </div>

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