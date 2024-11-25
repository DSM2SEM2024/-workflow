import { MyData } from '../components/my-data.js';
import { backend_url } from '../global-var/backend-url.js';
import { MyContacts } from '../components/my-contacts.js';
import { MyProfile } from '../components/my-profile.js';

export const TeachersArea = {
    components: {
        MyProfile,
        MyContacts
    },
    template: `
        <main id="teachers-area" class="d-flex flex-row justify-content-between gap-2 flex-wrap">
            <div class="dinamic-content">
                <MyProfile :professor_name="professor.Name" :id="id"></MyProfile>

                <div class="section section-career">
                    <h4>Graduação</h4>

                    <div class="list d-flex flex-column align-items-start">
                        <p>Ciências Contábeis</p>
                        <p>Engenharia da Computação</p>
                        <p>Tecnologia em Análise e Desenvolvimento de Sistemas</p>
                        <p>Mestrado em Engenharia Eletrônica e Computação pelo Instituto Tecnológico de Aeronáutica (ITA)</p>
                    </div>
                </div>

                <section class="teachers-projects">
                    <div class="title-section">
                        <h3>Projetos</h3>
                    </div>

                    <div class="list d-flex flex-column align-items-start">
                        <div class="project d-flex justify-content-between align-items-end gap-3">
                            <div class="left d-flex flex-column align-items-start">
                                <p class="project-name">Nome do Projeto</p>
                                <p class="curse-name">Curso</p>
                            </div>

                            <div class="right">
                                <p class="project-createdate">29/11/2024</p>
                            </div>
                        </div>

                        <div class="project d-flex justify-content-between align-items-end gap-3">
                            <div class="left d-flex flex-column align-items-start">
                                <p class="project-name">Nome do Projeto</p>
                                <p class="curse-name">Curso</p>
                            </div>

                            <div class="right">
                                <p class="project-createdate">29/11/2024</p>
                            </div>
                        </div>    
                        
                        <div class="project d-flex justify-content-between align-items-end gap-3">
                            <div class="left d-flex flex-column align-items-start">
                                <p class="project-name">Nome do Projeto</p>
                                <p class="curse-name">Curso</p>
                            </div>

                            <div class="right">
                                <p class="project-createdate">29/11/2024</p>
                            </div>
                        </div> 
                    </div>
                </section>

               <MyContacts></MyContacts>
            </div>
        </main>
    `,
    data() {
        return {
            showMyData: false,
            pfp: 'https://picsum.photos/200',
            professor: {},
            id: window.location.href.split('/teachers-area/')[1],
        }
    },
    inject: ['urlBase'],
    methods: {
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
            console.log(this.pfp);

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
                console.log(response);
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
                console.log(response.data)
                this.professor = response.data;
                Swal.close();
            })
            .catch(error=>{
                Swal.fire(error.getMessage)
            })

        }

    },
    created() {
        this.fetchData();
    }
};