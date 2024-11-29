import { MyData } from '../components/my-data.js';
import { backend_url } from '../global-var/backend-url.js';
import { MyContacts } from '../components/my-contacts.js';
import { MyProfile } from '../components/my-profile.js';
import { Header } from '../components/header.js';
import { dateFormatter } from '../functions/date-formatter.js';

export const TeachersArea = {
    components: {
        MyProfile,
        MyContacts,
        Header
    },
    template: `
        <Header></Header>
        <main id="teachers-area" class="d-flex flex-row justify-content-between gap-2 flex-wrap">
            <div class="dinamic-content">
                <MyProfile :yours="yours" :id="id" :img="pfp" :professor="professor" :units="units" :courses="courses" ></MyProfile>

                <div class="section section-career">
                    <h4>Especializações</h4>

                    <div class="list d-flex flex-column align-items-start">
                        <p>Experiência: {{professor.Area_of_Expertise}}</p>
                        <p>Dá aula em unidades como {{units[0].Unit_Name}}</p>
                        <p>Leciona como docente no curso de {{courses[0].Course_Name}}</p>
                    </div>
                </div>

                <section class="teachers-projects">
                    <div class="title-section">
                        <h3>Projetos</h3>
                    </div>

                    <div class="list d-flex flex-column align-items-start">
                        <div v-for="project in projects" @click="(this.$router.push('/project/'+project.ID_Project))" class="project d-flex justify-content-between align-items-end gap-3">
                            <div class="left d-flex flex-column align-items-start">
                                <p class="project-name">{{project.Name}}</p>
                                <p class="curse-name">Desenvolvimento de Software Multiplataforma</p>
                            </div>

                            <div class="right">
                                <p class="project-createdate">{{dateFormatter(project.End_Date)}}</p>
                            </div>
                        </div> 
                    </div>
                </section>

               <MyContacts :id="id" :units="units" :professor="professor"></MyContacts>
            </div>
        </main>
    `,
    data() {
        return {
            showMyData: false,
            pfp: '',
            professor: {
                Profile_Picture: ''
            },
            id: window.location.href.split('/teachers-area/')[1],
            projects: [],
            units: [],
            courses: [],
            token: window.localStorage.getItem('reposystem_token'),
            yours: false,
        }
    },
    inject: ['urlBase'],
    methods: {
        dateFormatter,
        gerarSlug(titulo) {
            return titulo.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '-');
        },
        //Função para exibir componente de dados pessoais.
        toggleMyData() {
            this.showMyData = !this.showMyData;

        },uploadPhoto(){
            this.$refs.pfp.click();


        },savePhoto(event){
            const selecionados = Array.from(event.target.files);
            this.pfp = selecionados;

            let formData = new FormData();

            formData.append('pfp', this.pfp);

            let options = {
                method: 'PUT',
                mode: 'cors',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            };
        
            fetch(backend_url+"/profilePicture/6", options)
            .then(response => response.json())
            .then(response => {
                if (response.status == true) {
                    navigate('project/' + response.data);
                } else {
                    alert('Cadastro inválido');
                }
            })
            .catch(error => console.error('Erro ao enviar:', error));
        },

        //Função para salvar os dados de um formulário e enviar para o servidor back-end.
        save() {
        },

        fetchData(){
            Swal.showLoading();
            let id = this.id;
            let url = backend_url+'/professor/'+id;
            fetch(url)
            .then(response=>response.json())
            .then(response=>{
                this.professor = response.data;
                this.pfp = response.data.Profile_Picture;
            })
            .catch(error=>{
                Swal.fire(error.getMessage)
            })

        },
        getProjects(){
            let url = `${backend_url}/projectProf/${this.id}`;
            fetch(url)
            .then(response=>response.json())
            .then(response=>{
                this.projects = response.data;
                
            })
        },
        getUnits(){
            let url = backend_url+'/unitByProfessor/'+this.id;
            fetch(url)
            .then(response=>response.json())
            .then(response=>{
                this.units = response.data;
            })
        },
        getCourses(){
            let url = backend_url+'/courseByProfessor/'+this.id;
            fetch(url)
            .then(response=>response.json())
            .then(response=>{
                this.courses = response.data;
                Swal.close();
            })
        },
        isYours(){
            let url = `${backend_url}/verifyTeachersPage/${this.id}`;
            let options = {
                method: 'GET',
                mode: 'cors',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization': `Bearer ${this.token}`
                }
            }
            fetch(url,options)
            .then(response=>response.json())
            .then(response=>{
                if(response.status){
                    this.yours = true;
                }
            })
        }

    },
    created() {
        this.fetchData();
        this.isYours();
        this.getProjects();
        this.getUnits();
        this.getCourses();
    }
};