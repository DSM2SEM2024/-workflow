import { validateAccess } from "../functions/validate-access.js";
import { backend_url } from "../global-var/backend-url.js";

export const ManagementPage = {
    template: `
        <main id="management-projects" class="d-flex justify-content-evenly align-items-center flex-row">
            <section class="dinamic-content">
                <div class="page-section d-flex justify-content-start align-items-center">
                    <h2>Gerenciar Projetos</h2>
                </div>
                <div class="page-content d-flex justify-content-start align-items-start flex-column">
                    <div class="new-project-card">
                        <h1>Crie um novo Projeto Interdisciplinar</h1>
                        <h2>Gerencie os Projetos através da central de gerenciamento. Crie e atualize Projetos existentes.</h2>
                        <button class="btn-red" @click="(this.$router.push('/create-project'))">+ Criar Projeto</button>
                    </div>
                    <div class="page-section d-flex justify-content-start align-items-center">
                        <h2>Meus projetos</h2>
                    </div>
                    <div id="projects-container" class="d-flex justify-content-start align-items-start flex-column">
                        <div v-for="project in projects" class="project d-flex flex-column">
                            <h1>{{project.Name}}<span>— {{defDate(project.End_Date)}}</span></h1>
                            <h2>Desenvolvimento de Software e Multiplataforma</h2>
                            <button @click="(this.$router.push('/project/'+project.ID_Project))" class="btn-editar btn-red"><img class="icon" src="../images/lapis.png">Editar</button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    `,
    data() {
        return {
            // email: null,
            // password: null
            base_host: window.location.href.split('#')[0],
            projects: [],
        };
    },
    inject: ['urlBase'],
    methods: {
        gerarSlug(titulo) {
            return titulo.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '-');
        },
        //Função para salvar os dados de um formulário e enviar para o servidor back-end.
        save() {
            // this.email;
        },
        getProjectByProfessor(){
            let token = window.localStorage.getItem("reposystem_token");
            let options = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                }
            }

            fetch(backend_url+ '/projectByProf', options)
            .then(response=> response.json())
            .then(response=>{
                console.log(response),
                this.projects = response.data
            }
            )

        },
        defStatus(status){
            if(status==0){
                return 'Em análise';
            } else {
                return 'Aprovado';
            }
        },
        defDate(date){
            return date.split('-')[2]+'/'+date.split('-')[1]+'/'+date.split('-')[0];
        }
    },
    created() {
        validateAccess('professor');
        this.getProjectByProfessor();
    }
};