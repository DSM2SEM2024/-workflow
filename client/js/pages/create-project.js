import { navigate } from "../functions/navigate.js";
import { validateAccess } from "../functions/validate-access.js";
import { backend_url } from "../global-var/backend-url.js";

export const CreateProject = {
    template: `
        <main id="create-project" class="d-flex justify-content-evenly align-items-center flex-row">
            <section class="dinamic-content">
                <div class="page-section d-flex justify-content-start align-items-center">
                    <h2>Novo Projeto</h2>
                </div>

                <section class="form-content">
                    <div class="section-title d-flex justify-content-between flex-row align-items-center"> 
                        <h3>Informações do projeto</h3>
                        <img class="icon" src="../images/bottom-section.png" alt="Expandir">
                    </div>
                    <form>
                        <div class="form-inputs d-flex justify-content-start d-column">
                            <input type="text" placeholder="Nome" v-model="name">
                            <input type="date" placeholder="Data de início" v-model="startDate" >
                        </div>
                        <div class="form-inputs d-flex justify-content-start d-column">
                            <select v-model="unitId">
                                <option value="">Selecione unidade...</option>
                                <option v-for="unit in units" :value="unit.ID_Unit">{{unit.Unit_Name}}</option>
                            </select>
                            <input type="date" placeholder="Data de conclusão" v-model="endDate">
                        </div>
                        <div class="form-inputs d-flex justify-content-start d-column">
                            <textarea class="description" placeholder="Descrição" v-model="description"></textarea>
                        </div>                        
                    </form>
                    <br>
                    <div class="section-title d-flex justify-content-between flex-row align-items-center"> 
                        <h3>Integrantes</h3>
                        <img class="icon" src="../images/bottom-section.png" alt="Expandir">
                    </div>
                    <form>
                        <h1>Adicione um novo integrante clicando no ícone abaixo</h1>
                        <h2>É necessário informar o nome completo do integrante</h2>
                        <div class="form-inputs d-flex justify-content-start d-column">
                            <input type="text" placeholder="Integrante" v-model="participant"> 
                            <span class="add-btn" @click="adicionar">+</span>
                        </div>              
                        <div class="form-entries d-flex justify-content-start d-column flex-column">
                            <!-- Exemplo de membros abaixo -->
                            <div class="members" v-for="(member, key) in participants">
                                <img src="../images/user.png" alt="Expandir">
                                <p>{{member.participantName}}</p>
                                <span @click="remover(key)">-</span>
                            </div>
                        </div>
                        </form>
                    <br>
                    <div class="section-title d-flex justify-content-between flex-row align-items-center"> 
                        <h3>Anexos</h3>
                        <img class="icon" src="../images/bottom-section.png" alt="Expandir">
                    </div>
                    <form>
                        <div class="form-gap d-flex d-row flex-row">
                            <div class="form-inputs d-flex justify-content-start d-column flex-column">
                                <select placeholder="Escolha um arquivo">
                                    <option value="PDF">PDF</option>
                                    <option value="URL">URL</option>
                                    <option value="JPEG">JPEG</option>
                                    <option value="PNG">PNG</option>
                                </select>
                                <div class="file-drop d-flex justify-content-center d-column flex-column align-items-center">
                                    <img class="icon" src="../images/download.png" alt="Integrante">
                                    <p>Anexe ou arraste o arquivo para cá </p>
                                    <button type="button">Selecionar arquivo</button>
                                </div>         
                            </div>  
                            <div class="form-entries d-flex justify-content-start d-column flex-column">
                                <!-- Exemplo de membros abaixo -->
                                <div class="files">
                                    <img src="../images/file-pdf.png" alt="Expandir">
                                    <p>manual_do_usuario.pdf</p>
                                    <span>-</span>
                                </div>                                
                                <div class="files">
                                    <img src="../images/file-pdf.png" alt="Expandir">
                                    <p>diagramas.pdf</p>
                                    <span>-</span>
                                </div>                                
                                <div class="files">
                                    <img src="../images/file-link.png" alt="Expandir">
                                    <p>https://github.com/users/projectsofia</p>
                                    <span>-</span>
                                </div>                                
                            </div>  
                        </div>           
                    </form>

                    <hr>

                    <div class="form-footer d-flex justify-content-between d-column align-items-start">
                        <p>Atenção, certifique-se de preencher os campos obrigatórios!</p>

                        <button class="btn-create" @click="cadastrar">Cadastrar projeto ‎ |
                            <img class="icon" src="../images/next.png" alt="Integrante">
                        </button>
                    </div>
                
                </section>
            </section>
        </main>
    `,
    data() {
        return {
            // email: null,
            // password: null
            base_url: window.location.href.split('#')[0],
            name: '',
            description: '',
            startDate: '',
            endDate: '',
            participant: '',
            participants: [

            ],
            unitId: '',
            units: []
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
        getUnits(){
            fetch('http://localhost:70/unit')
            .then(response=>response.json())
            .then(response=>{
                if(response.status==true){
                    this.units = response.data;
                }
            })
        },
        adicionar(){
            let integrante = {
                participantName: this.participant
            }
            this.participants.push(integrante);
            this.participant = ''
        },
        remover(key){
            this.participants.splice(key,1);
        },
        cadastrar(){

            let token = window.localStorage.getItem('reposystem_token');
            let url = backend_url+'/project/create';
            let options = {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${token}`
                },
                body: JSON.stringify({
                    name: this.name,
                    description: this.description,
                    startDate: this.startDate,
                    endDate: this.endDate,
                    participants: this.participants,
                    unit: this.unitId,
                    role: 'professor'
                })
            }
            fetch(url, options)
            .then(response=>response.json())
            .then(response=>{
                console.log(response)
                if(response.status==true){
                    navigate('project/'+response.data);
                } else {
                    alert('Cadastro inválido');
                }
            })

        }
    },
    created() {
        //Conteúdos que deverão ser carregados em uma espécie de onload.
        validateAccess('professor');
        this.getUnits();
    }
};