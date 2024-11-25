import { validateAccess } from "../functions/validate-access.js";
import { backend_url } from "../global-var/backend-url.js";

export const ManagementTeachers = {
    template: `
    <main id="management-teachers" class="d-flex justify-content-evenly align-items-center flex-row">
        <section class="dinamic-content">
            <div class="page-section d-flex justify-content-start align-items-center">
                <h2>Gerenciar Professores</h2>
            </div>
            <div class="page-content d-flex justify-content-start align-items-start flex-column">
                <div class="new-teacher-card">
                    <h1>Adicione um novo professor à unidade</h1>
                    <h2>Gerencie os Docentes através da central de gerenciamento. Crie e atualize dados existentes.</h2>
                    <button class="btn-red" @click="">+ Criar Professor</button>
                </div>
                <div class="page-section d-flex justify-content-start align-items-center">
                    <h2>Meus docentes</h2>
                </div>
                <div id="teachers-container" class="d-flex justify-content-start align-items-start flex-column">
                    <div class="teacher d-flex flex-column">
                        <p class="teacher-unit">Fatec Itaquera - Prof° Miguel Reale</p>
                        <p class="teacher-name">Fretz Sievers Junior</p>
                        <p class="teacher-curse">Desenvolvimento de Software e Multiplataforma</p>
                        <button class="btn-editar btn-red"><img class="icon" src="../images/lapis.png">Editar</button>
                    </div>
                </div>
            </div>
        </section>
    </main>
`,
    data() {
        return {
            teachers: [],
            isProfessor: false,
            base_host: window.location.href.split('#')[0]
        };
    },
    methods: {
        defDate(date) {
            let dateSplit = date.split('-');
            return dateSplit[2] + '/' + dateSplit[1] + '/' + dateSplit[0];
        },
        getAllProfessor() {
        }
    },
    mounted() {
        validateAccess('coordinator');
    }
};