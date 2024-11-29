import { Header } from '../components/header.js';
import { MyProfile } from '../components/my-profile.js';
import { MyContacts } from '../components/my-contacts.js';

export const CoordinatorsArea = {
    template: `
        <Header></Header>
        <main id="coordinator-area" class="d-flex flex-row justify-content-between gap-2 flex-wrap">
            <div class="dinamic-content">
                <MyProfile></MyProfile>

                <section class="management-board">
                    <div class="subtitle">
                        <h3>Gerencie usuários, conceda permissões e acompanhe em tempo real o desenvolvimento acadêmico de projetos e seus respectivos cursos.</h3>
                    </div>

                    <div class="title-section">
                        <h3>Estatística</h3>
                    </div>

                    <div class="section-middle d-flex justify-content-between flex-row">
                        <div class="statistic d-flex justify-content-start flex-row gap-3 flex-wrap">
                            <div class="graphic d-flex justify-content-center align-items-center flex-column w-30">
                                <h4>Projetos por Curso</h4>
                            </div>

                            <div class="graphic d-flex justify-content-center align-items-center flex-column w-50">
                                <h4>Total de Projetos Interdisciplinares por ano</h4>
                            </div>
                        </div>

                        <div class="access w-20">
                            <ul>
                                <li><RouterLink to="/management-curses">Cursos</RouterLink></li>
                                <li><RouterLink to="/management-teachers">Professores</RouterLink></li>
                                <li><RouterLink to="/management">Projetos</RouterLink></li>
                                <li><RouterLink to="/management-unities">Unidades</RouterLink></li>
                            </ul>
                        </div>
                    </div>
                    <MyContacts></MyContacts>
                </section>
            </div>
        </main>
    `,
    components: {
        Header,
        MyProfile,
        MyContacts
    },
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