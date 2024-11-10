import { navigate } from "../functions/navigate.js";
import { backend_url } from "../global-var/backend-url.js";

export const MyProjects = {
    template: `
    <div id="my-projects" class="">
        <div class="section-title">
            <h2>Meus projetos</h2>
        </div>

        <div class="current-projects">
            <p>Criados recentemente</p>

            <div class="project" v-for="project in projects">
                <div class="left">
                    <h4>{{project.name}}</h4>
                    <h5>{{project.course}}</h5>
                </div>
                <div class="right d-flex justify-content-between flex-column align-items-end">
                    <p>{{project.tatus}}</p>
                    <p>{{project.endDate}}</p>
                </div>
            </div>   

            <div class="button-section d-flex justify-content-start flex-row gap-3">
                <button class="btn-red" @click="navigate('management')" >Exibir todos</button>
                <button class="btn-red" @click="navigate('create-project')" >+ Criar projeto</button>
            </div>
        </div>
    </div>
    `,
    data() {
        return {projects: []}
    },
    inject: ['urlBase'],
    methods: {
        gerarSlug(titulo) {
            return titulo.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '-');
        },
        save() {
        },
        navigate,
        getProjectByProfessor(){
            let token = document.localStorage.getItem("reposystem_token");
            let options = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                }
            }

            fetch(backend_url+ '/project/prof', options).then(response=> response.json()).then(
                console.log(response),
                this.projects = response.data
            )

        }
    },
    created() {
    }
};

