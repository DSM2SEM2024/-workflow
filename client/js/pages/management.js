import { backend_url } from "../global-var/backend-url.js";
import { Header } from "../components/header.js";

export const ManagementPage = {
    template: `
        <Header></Header>
        <main v-if="loaded" id="management-projects" class="d-flex justify-content-evenly align-items-center flex-row">
            <section class="dinamic-content">
                <div class="page-section d-flex justify-content-start align-items-center">
                    <h2>Gerenciar Projetos</h2>
                </div>
                <div class="page-content d-flex justify-content-start align-items-start flex-column">
                    <div class="new-project-card">
                        <h1>Acessar meu perfil</h1>
                        <h2>Veja e manuseie seu perfil público dentro do sistema.</h2>
                        <button class="btn-red" @click="(this.$router.push('/teachers-area/'+id))">Abrir perfil</button>
                    </div>
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
                            <button @click="(this.$router.push('/project/'+project.ID_Project))" class="btn-editar btn-red"><img class="icon" src="./images/lapis.png">Editar</button>
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
            // email: null,
            // password: null
            loaded: false,
            base_host: window.location.href.split('#')[0],
            projects: [],
            id: '',
            token: window.localStorage.getItem('reposystem_token')
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
            Swal.showLoading();
            let token = window.localStorage.getItem("reposystem_token");
            let options = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${this.token}`,
                }
            }

            fetch(backend_url+ '/projectByProf', options)
            .then(response=> response.json())
            .then(response=>{
                this.projects = response.data
            })
            .catch(error=>{
                Swal.fire({
                    title: `Erro ao listar projetos`,
                    text: error.message,
                    icon: 'error'
                })
            })

        },
        getIdByToken(){
            let url = backend_url+'/idByToken';
            let options = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${this.token}`,
                }
            }
            fetch(url,options)
            .then(response=>response.json())
            .then(response=>{
                this.id = response.ID_Professor;
                Swal.close();
            })
            .catch(error=>{
                Swal.fire({
                    title: `Erro ao buscar dados`,
                    text: error.message,
                    icon: 'error'
                })
            })
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
        validateAccess(role){

            let token = window.localStorage.getItem('reposystem_token');
        
            let validate_url = backend_url+'/token/validateAccess';
            let validate_options = {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${token}`
                },
                body: JSON.stringify({
                    role: role
                })
            }
        
            fetch(validate_url, validate_options)
            .then(response=>response.json())
            .then(response=>{
                if(response.status==false){
                    switch (role) {
                        case 'professor':
                            this.$router.push('/login')
                            break;
                    
                        case 'coordinator':
                            this.$router.push('/home')
                            break;
                    }
                    Swal.close();
                } else {
                    if(window.localStorage.getItem('reposystem_role')=='coordinator'){
                        Swal.close();
                        this.$router.push('/management-teachers')
                    } else {
                        this.loaded = true;
                    }
                }
            })
            .catch(error=>{
                Swal.fire({
                    title: `Erro ao validar acesso`,
                    text: error.message,
                    icon: 'error'
                })
            })
        }
    },
    created() {
        this.validateAccess('professor');
        this.getProjectByProfessor();
        this.getIdByToken();
    }
};