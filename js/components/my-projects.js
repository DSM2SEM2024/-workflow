import { navigate } from "../functions/navigate.js";
import { backend_url } from "../global-var/backend-url.js";
import { Header } from "./header.js";

export const MyProjects = {
    template: `
    <div v-if="isProfessor" id="my-projects" class="">
        <div class="section-title">
            <h2>Meus projetos</h2>
        </div>

        <div class="current-projects">
            <p>Criados recentemente</p>

            <div class="project" v-for="project in projects">
                <div class="left">
                    <h4>{{project.Name}}</h4>
                    <h5>Desenvolvimento de Software Multiplataforma</h5>
                </div>
                <div class="right d-flex justify-content-between flex-column align-items-end">
                    <p>{{defStatus(project.Status)}}</p>
                    <p>{{defDate(project.End_Date)}}</p>
                </div>
            </div>   

            <div class="button-section d-flex justify-content-start flex-row gap-3">
                <button class="btn-red" @click="(this.$router.push('/management'))" >Exibir todos</button>
                <button class="btn-red" @click="(this.$router.push('/create-project'))" >+ Criar projeto</button>
            </div>
        </div>
    </div>
    `,
    components: {
        Header
    },
    data() {
        return {
            projects: [],
            isProfessor: false
        }
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
            let token = window.localStorage.getItem("reposystem_token");
            let options = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                }
            }

            fetch(backend_url+ '/projectByProfLimit', options)
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
        },
        checkRole(){
            if(window.localStorage.getItem('reposystem_role')=='professor'){
                this.isProfessor = true;
            } else {
                this.isProfessor = false;
            }
        }
    },
    created() {
        this.getProjectByProfessor();
    }
};

