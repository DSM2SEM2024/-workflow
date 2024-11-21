import { MyContacts } from '../components/my-contacts.js';
import { MyProfile } from '../components/my-profile.js';

export const TeachersArea = {
    components: {
        MyProfile,
        MyContacts
    },
    template: `
        <main id="teachers-area" class="d-flex flex-row justify-content-between gap-2 flex-wrap">
            <div class="dinamic-content">
                <MyProfile></MyProfile>

                <div class="section section-career">
                    <h4>Graduação</h4>

                    <div class="list d-flex flex-column align-items-start">
                        <p>Ciências Contábeis</p>
                        <p>Engenharia da Computação</p>
                        <p>Tecnologia em Análise e Desenvolvimento de Sistemas</p>
                        <p>Mestrado em Engenharia Eletrônica e Computação pelo Instituto Tecnológico de Aeronáutica (ITA)</p>
                    </div>
                </div>

                <section class="teachers-projects">
                    <div class="title-section">
                        <h3>Projetos</h3>
                    </div>

                    <div class="list d-flex flex-column align-items-start">
                        <div class="project d-flex justify-content-between align-items-end gap-3">
                            <div class="left d-flex flex-column align-items-start">
                                <p class="project-name">Nome do Projeto</p>
                                <p class="curse-name">Curso</p>
                            </div>

                            <div class="right">
                                <p class="project-createdate">29/11/2024</p>
                            </div>
                        </div>

                        <div class="project d-flex justify-content-between align-items-end gap-3">
                            <div class="left d-flex flex-column align-items-start">
                                <p class="project-name">Nome do Projeto</p>
                                <p class="curse-name">Curso</p>
                            </div>

                            <div class="right">
                                <p class="project-createdate">29/11/2024</p>
                            </div>
                        </div>    
                        
                        <div class="project d-flex justify-content-between align-items-end gap-3">
                            <div class="left d-flex flex-column align-items-start">
                                <p class="project-name">Nome do Projeto</p>
                                <p class="curse-name">Curso</p>
                            </div>

                            <div class="right">
                                <p class="project-createdate">29/11/2024</p>
                            </div>
                        </div> 
                    </div>
                </section>

               <MyContacts></MyContacts>
            </div>
        </main>
    `,
    data() {
        return {
        }
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
        //Conteúdos que deverão ser carregados em uma espécie de onload.
    }
};