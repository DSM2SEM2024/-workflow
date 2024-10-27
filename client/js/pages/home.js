import { MyProjects } from '../components/my-projects.js';

export const Home = {
    template: `
        <main id="home" class="d-flex flex-row justify-content-between gap-2 flex-wrap">
            <div class="dinamic-content">
                <div class="page-section d-flex justify-content-start align-items-center">
                    <h2>Projetos Interdisciplinares</h2>
                </div>

                <section class="form-content">
                    <form class="box-search">
                        <div class="icon-column d-flex justify-content-end top-0">
                            <img class="icon" src="../images/bottom-section.png" alt="Projeto Interdisciplinar">
                        </div>
                                            
                        <div class="form-inputs d-flex justify-content-start flex-row flex-wrap">
                            <div class="input-content">
                                <label>Nome</label>
                                <div class="input-section">
                                    <div class="input-icon">
                                        <img src="../images/icon-searchlight.png" alt="Projeto Interdisciplinar">
                                    </div>
                                    <input type="text" name="name">
                                </div>
                            </div>
                            <div class="gap-column">
                            </div>                            
                            <div class="input-content">
                                <label>Curso</label>
                                <div class="select-section">
                                    <div class="input-icon">
                                        <img src="../images/icon-bottom.png" alt="Projeto Interdisciplinar">
                                    </div>
                                    <select name="curses">
                                        <option>Escolha um curso...</option>
                                    </select>
                                </div>
                            </div>                    
                        </div>

                        <div class="form-inputs align-items-end flex-wrap">
                            <div class="input-content">
                                <label>Data</label>
                                <div class="input-section">
                                    <div class="input-icon">
                                        <img src="../images/calendar.png" alt="Projeto Interdisciplinar">
                                    </div>
                                    <input type="date" name="name">                                    
                                </div>                               
                            </div>
                            <div class="gap-column d-flex justify-content-end align-items-end">
                                <p>até</p>
                            </div>
                            <div class="input-content">
                                <div class="input-section">
                                    <div class="input-icon">
                                        <img src="../images/calendar.png" alt="Projeto Interdisciplinar">
                                    </div>
                                    <input type="date" name="name">                                    
                                </div>                                
                            </div>

                            <div class="input-content d-flex align-items-center gap-3">
                                <button class="btn-white" name="filter">Filtrar</button>
                                <button class="btn-white" name="clear">Limpar</button>
                            </div>
                        </div>                        
                    </form>
                </section>

                <article class="project-container d-flex flex-row w-100 gap-5 flex-wrap">
                    <div class="project-card">
                        <h1 class="project-title">Nome do Projeto</h1>
                        <img class="project-image" src="../images/event.jpg" alt="Projeto Interdisciplinar">

                        <p class="project-description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit, Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                        
                        <div class="project-info d-flex justify-content-between flex-row align-items-end gap-4">
                            <div class="all-information d-flex flex-column align-items-start w-80">
                                <h3>Curso</h3>
                                <h4>Desenvolvimento de Software e Multiplataforma</h4>
                                <p>Clique em visualizar para obter mais informações</p>
                            </div>

                            <div class="w-20">
                                <button class="button btn-red">Visualizar</button>
                            </div>
                        </div>
                    </div>
                    <div class="project-card">
                        <h1 class="project-title">Nome do Projeto</h1>
                        <img class="project-image" src="../images/event.jpg" alt="Projeto Interdisciplinar">

                        <p class="project-description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit, Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                        
                        <div class="project-info d-flex justify-content-between flex-row align-items-end gap-4">
                            <div class="all-information d-flex flex-column align-items-start w-80">
                                <h3>Curso</h3>
                                <h4>Desenvolvimento de Software e Multiplataforma</h4>
                                <p>Clique em visualizar para obter mais informações</p>
                            </div>

                            <div class="w-20">
                                <button class="button btn-red">Visualizar</button>
                            </div>
                        </div>
                    </div>
                </article>
            </div>
            <MyProjects></MyProjects>
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
    components:{
        MyProjects
    }    
};