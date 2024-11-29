import { Header } from '../components/header.js';
import { MyProjects } from '../components/my-projects.js';
import { navigate } from '../functions/navigate.js';
import { backend_url } from '../global-var/backend-url.js';
import { validateAccess } from '../functions/validate-access.js';

export const Home = {
    template: `
        <Header></Header>
        <main id="home" class="d-flex flex-row justify-content-between gap-2 flex-wrap">
            <div class="dinamic-content">
                <div class="page-section d-flex justify-content-start align-items-center">
                    <h2>Projetos Interdisciplinares</h2>
                </div>

                <section class="form-content">
                    <form class="box-search" @submit.prevent="">
                        <div class="icon-column d-flex justify-content-end top-0">
                            <img class="icon" src="./images/bottom-section.png" alt="Projeto Interdisciplinar">
                        </div>
                                            
                        <div class="form-inputs d-flex justify-content-start flex-row flex-wrap">
                            <div class="input-content">
                                <label>Nome</label>
                                <div class="input-section">
                                    <div class="input-icon">
                                        <img src="./images/icon-searchlight.png" alt="Projeto Interdisciplinar">
                                    </div>
                                    <input v-model="name_filter" type="text" name="name" placeholder="Digite o nome do projeto...">
                                </div>
                            </div>
                            <div class="gap-column">
                            </div>                            
                            <div class="input-content">
                                <label>Unidade</label>
                                <div class="select-section">
                                    <div class="input-icon">
                                        <img src="./images/icon-bottom.png" alt="Projeto Interdisciplinar">
                                    </div>
                                    <select v-model="unit_filter" name="units">
                                        <option value="">Escolha uma unidade...</option>
                                        <option v-for="unit in units" :value="unit.ID_Unit">{{unit.Unit_Name}}</option>
                                    </select>
                                </div>
                            </div>                    
                        </div>

                        <div class="form-inputs align-items-end flex-wrap">
                            <div class="input-content">
                                <label>Data</label>
                                <div class="input-section">
                                    <div class="input-icon">
                                        <img src="./images/calendar.png" alt="Projeto Interdisciplinar">
                                    </div>
                                    <input v-model="start_filter" type="date" name="name">                                    
                                </div>                               
                            </div>
                            <div class="gap-column d-flex justify-content-end align-items-end">
                                <p>até</p>
                            </div>
                            <div class="input-content">
                                <div class="input-section">
                                    <div class="input-icon">
                                        <img src="./images/calendar.png" alt="Projeto Interdisciplinar">
                                    </div>
                                    <input v-model="end_filter" type="date" name="name">                                    
                                </div>                                
                            </div>

                            <div class="input-content d-flex align-items-center gap-3">
                                <button class="btn-white" name="filter" @click="applyFilter">Filtrar</button>
                                <button class="btn-white" name="clear" @click="limpar">Limpar</button>
                            </div>
                        </div>                        
                    </form>
                </section>

                <article class="project-container d-flex flex-row w-100 gap-5 flex-wrap">

                    <div class="project-card" v-for="project in renderedProjects" :key="project.ID_Project" >
                        <h1 class="project-title">{{project.Name}}</h1>
                        <img class="project-image" :src="project.cover.File_Data" alt="Projeto Interdisciplinar">

                        <p class="project-description">{{project.Description}}</p>
                        
                        <div class="project-info d-flex justify-content-between flex-row align-items-end gap-4">
                            <div class="all-information d-flex flex-column align-items-start w-80">
                                <h3>Curso</h3>
                                <h4>Desenvolvimento de Software e Multiplataforma</h4>
                                <p>Clique em visualizar para obter mais informações</p>
                            </div>

                            <div class="w-20">
                                <button class="button btn-red" @click="(this.$router.push('/project/'+project.ID_Project))">Visualizar</button>
                            </div>
                        </div>
                    </div>
                    
                </article>
            </div>
            <MyProjects v-if="showMyProjects"></MyProjects>
        </main>
    `,
    data() {
        return{
            projects: [],
            renderedProjects: [],
            showMyProjects: false,
            token: window.localStorage.getItem('reposystem_token'),
            units: [],
            name_filter: '',
            unit_filter: '',
            start_filter: '',
            end_filter: ''
        }
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
        navigate,
        list(){
            Swal.showLoading();
            let url = backend_url+'/project'
            fetch(url)
            .then(response=>response.json())
            .then(response=>{
                if(response.status==true){
                    this.projects = response.data;
                }
                this.listImages();
                this.renderedProjects = this.projects;
            })
        },
        validateLogin(){
            let url = backend_url+'/token/validateAccess';
            let options = {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${this.token}`
                },
                body: JSON.stringify({
                    role: 'professor'
                })
            }
            fetch(url,options)
            .then(response=>response.json())
            .then(response=>{
                if(response.status==true){
                    this.showMyProjects = true;
                } else {
                    this.showMyProjects = false;
                }
            })
        },
        listImages(){

            let url = backend_url+'/cover';
            fetch(url)
            .then(response=>response.json())
            .then(response=>{
                response.data.forEach(img => {

                    this.projects.forEach(project => {
                        if(project.ID_Project == img.ID_Project){
                            project.cover = img;
                        }
                    });
                    
                });
                Swal.close();
            })

        },
        listUnits(){

            let url = `${backend_url}/unit`;
            fetch(url)
            .then(response=>response.json())
            .then(response=>{
                if(response.status==true){
                    this.units = response.data;
                }
            })

        },
        prevent(){
            Swal.fire('teste');
        },
        limpar(){
            this.name_filter = '';
            this.unit_filter = '';
            this.start_filter = '';
            this.end_filter = '';
            this.renderedProjects = this.projects;
        },
        applyFilter() {
            // Converter datas apenas se os campos forem preenchidos
            let start = this.start_filter ? new Date(this.start_filter) : null;
            let end = this.end_filter ? new Date(this.end_filter) : null;
        
            // Inicializar a lista de projetos renderizados
            this.renderedProjects = this.projects.filter(project => {
                // Verificar o filtro de nome (se preenchido)
                const nameMatch = this.name_filter
                    ? project.Name.toLowerCase().includes(this.name_filter.toLowerCase())
                    : true;
        
                // Verificar o filtro de unidade (se preenchido)
                const unitMatch = this.unit_filter
                    ? this.unit_filter == project.ID_Unit
                    : true;
        
                // Verificar o filtro de data (se ambos preenchidos)
                const dateMatch = (start && end)
                    ? new Date(project.End_Date).getTime() >= start.getTime() &&
                      new Date(project.End_Date).getTime() <= end.getTime()
                    : true;
        
                // Retornar true apenas se todos os filtros forem atendidos
                return nameMatch && unitMatch && dateMatch;
            });
        }
        
    },
    created() {
        //Conteúdos que deverão ser carregados em uma espécie de onload.
        this.listUnits();
        this.list();
        this.validateLogin();
    },
    components:{
        Header,
        MyProjects
    }    
};