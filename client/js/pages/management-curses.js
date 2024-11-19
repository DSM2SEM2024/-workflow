import { validateAccess } from "../functions/validate-access.js";
import { backend_url } from "../global-var/backend-url.js";

export const ManagementCurses = {
    template: `
    <main id="management-curses" class="d-flex justify-content-evenly align-items-center flex-row">
        <section class="dinamic-content">
            <div class="page-section d-flex justify-content-start align-items-center">
                <h2>Gerenciar Cursos</h2>
            </div>
            <div class="page-content d-flex justify-content-start align-items-start flex-column">
                <div class="new-curse-card">
                    <h1>Adicione um novo curso à unidade</h1>
                    <h2>Gerencie os Cursos através da central de gerenciamento. Crie e atualize um curso existente.</h2>
                    <button class="btn-red" @click="">+ Criar Professor</button>
                </div>
                <div class="page-section d-flex justify-content-start align-items-center">
                    <h2>Todos os cursos</h2>
                </div>
                <div id="curses-container" class="d-flex justify-content-start align-items-start flex-column">
                    <div class="curse d-flex flex-column">
                        <p class="name-unit">Fatec Itaquera - Prof° Miguel Reale</p>
                        <p class="curse-name">Desenvolvimento de Software e Multiplataforma</p>
                        <button class="btn-editar btn-red"><img class="icon" src="../images/lapis.png">Editar</button>
                    </div>
                </div>
            </div>
        </section>
    </main>
`,
    data() {
        return {
            curses: [],
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