import { validateAccess } from "../functions/validate-access.js";
import { backend_url } from "../global-var/backend-url.js";
import { Header } from "../components/header.js";

export const ManagementUnities = {
    template: `
    <Header></Header>
    <main id="management-unities" class="d-flex justify-content-evenly align-items-center flex-row">
        <section class="dinamic-content">
            <div class="page-section d-flex justify-content-start align-items-center">
                <h2>Gerenciar Unidades</h2>
            </div>
            <div class="page-content d-flex justify-content-start align-items-start flex-column">
                <div class="new-unitie-card">
                    <h1>Adicione uma nova unidade</h1>
                    <h2>Gerencie as unidades através da central de gerenciamento. Crie e atualize uma unidade existente.</h2>
                    <button class="btn-red" @click="">+ Criar Unidade</button>
                </div>
                <div class="page-section d-flex justify-content-start align-items-center">
                    <h2>Todas as unidades</h2>
                </div>
                <div id="unities-container" class="d-flex justify-content-start align-items-start flex-column">
                    <div class="unitie d-flex flex-column">
                        <p class="name-city">São Paulo - SP</p>
                        <p class="name-unity">Fatec Itaquera - Profº Miguel Reale</p>
                        <button class="btn-editar btn-red"><img class="icon" src="https://gustavojoia.github.io/iprepository/images/lapis.png">Editar</button>
                    </div>
                </div>
            </div>
        </section>
    </main>
    `,
    components: {
        Header
    },
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