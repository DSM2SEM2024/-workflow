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
                    <!-- Todos os campos são obrigatórios -->
                    <form id="form-createproject">
                        <div class="form-inputs d-flex justify-content-start d-column">
                            <div class="d-flex flex-column align-items-start">                            
                                <input type="text" placeholder="Nome" v-model="name">
                                <p class="message-error error-name"></p>
                            </div>
                            <div class="d-flex flex-column align-items-start">                            
                                <input type="date" placeholder="Data de início" v-model="startDate" >
                                <p class="message-error error-startDate"></p>
                            </div>
                        </div>

                        <div class="form-inputs d-flex justify-content-start d-column">
                            <div class="d-flex flex-column align-items-start">                            
                                <select v-model="unitId">
                                    <option value="">Selecione unidade...</option>
                                    <option v-for="unit in units" :value="unit.ID_Unit">{{unit.Unit_Name}}</option>
                                </select>
                                <p class="message-error error-unit"></p>
                            </div>

                            <div class="d-flex flex-column align-items-start">
                                <input type="date" placeholder="Data de conclusão" v-model="endDate">
                                <p class="message-error error-endDate"></p>
                            </div>
                        </div>
                        <div class="form-inputs d-flex justify-content-start d-column">
                            <div class="d-flex flex-column align-items-start">
                                <textarea class="description" placeholder="Descrição" v-model="description"></textarea>
                                <p class="message-error error-description"></p>
                            </div>
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


                        <div class="form-inputs d-flex justify-content-start flex-row">
                            <input type="text" placeholder="Integrante" v-model="participant"> 
                            <span class="add-btn" @click="adicionar">+</span>
                        </div>              
                        <p class="message-error error-participant"></p>

                        <div class="form-entries d-flex justify-content-start flex-column">
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
                                <select v-model="file_type_value" placeholder="Escolha um arquivo">
                                    <option value="">Escolha o tipo de anexo...</option>
                                    <option v-for="type in file_types" :value="type">{{type}}</option>
                                </select>
                                <div @dragover.prevent @drop.prevent="handleDrop" @click="selecionarArquivo" class="file-drop d-flex justify-content-center d-column flex-column align-items-center">
                                    <img class="icon" src="../images/download.png" alt="Integrante">
                                    <p>Anexe ou arraste o arquivo para cá </p>
                                    <button type="button">Selecionar arquivo</button>
                                    <input type="file" multiple ref="fileInput" @change="handleFileSelect" style="display: none"/>
                                </div>     
                                <p class="message-error error-file"></p>    
                            </div>  
                            <div class="form-entries d-flex justify-content-start d-column flex-column">
                                <!-- Exemplo de membros abaixo -->
                                <div class="files" v-for="(url, index) in attach.links" :key="index">
                                    <img src="../images/file-link.png" alt="Expandir">
                                    <p>{{url}}</p>
                                    <span @click="removerArquivo(index,'link')" >-</span>
                                </div>
                                <div class="files" v-for="(file, index) in attach.files" :key="index">
                                    <img v-if="isPdf(file)" src="../images/file-pdf.png" alt="Expandir">
                                    <img v-if="isImg(file)" src="../images/icon-upload.png" alt="Expandir">
                                    <img v-if="isElse(file)" src="../images/icon-file.png" alt="Expandir">
                                    <p>{{file.name}}</p>
                                    <span @click="removerArquivo(index,'file')" >-</span>
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
            units: [],
            attach: {
                files: [],
                links: []
            },
            file_types: [
                'Arquivo','URL'
            ],
            file_type_value: ''
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
            fetch(backend_url+'/unit')
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
        cadastrar() {
            let token = window.localStorage.getItem('reposystem_token');
            let url = backend_url + '/project/create';
        
            // Criar o objeto FormData
            let formData = new FormData();
            
            // Adicionar dados do projeto ao FormData
            formData.append('name', this.name);
            formData.append('description', this.description);
            formData.append('startDate', this.startDate);
            formData.append('endDate', this.endDate);
            formData.append('participants', JSON.stringify(this.participants)); // Assumindo que `participants` seja um array
            formData.append('unit', this.unitId);
            formData.append('role', 'professor');
        
            // Adicionar arquivos ao FormData
            this.attach.files.forEach((arquivo, index) => {
                formData.append(`arquivos[${index}]`, arquivo);
            });
            this.attach.links.forEach((arquivo, index) => {
                formData.append(`links[${index}]`, arquivo);
            });
        
            // Configurar a requisição
            let options = {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            };
        
            fetch(url, options)
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
        async handleDrop(event) {
            const itens = event.dataTransfer.items;
      
            for (let i = 0; i < itens.length; i++) {
              const item = itens[i];
      
              // Verifica se o item é um arquivo
              if (item.kind === 'file') {
                const file = item.getAsFile();
                if (file) {
                  this.attach.files.push(file);
                }
              }
              // Verifica se o item é um link ou texto
              else if (item.kind === 'string' && item.type === 'text/uri-list') {
                // Lê o link e o adiciona à lista
                const link = await new Promise((resolve) =>
                  item.getAsString(resolve)
                );
                this.attach.links.push(link);
              }
            }
        },
        isPdf(file){

            if(file.type.split('/')[1]=='pdf'){
                return true;
            } else {
                return false;
            }

        },
        isImg(file){

            if(file.type.split('/')[1]=='jpeg' || file.type.split('/')[1]=='png'){
               return true;
            } else {
                return false;
            }

        },
        isElse(file){
            if(file.type.split('/')[1]!='jpeg' && file.type.split('/')[1]!='png' && file.type.split('/')[1]!='pdf'){
                return true;
            } else {
                return false;
            }
        },
        selecionarArquivo(){
            this.$refs.fileInput.click();
        },
        handleFileSelect(event) {
            const selecionados = Array.from(event.target.files);
            this.attach.files = this.attach.files.concat(selecionados);
        },
        removerArquivo(index, type) {
            if(type=='file'){
                this.attach.files.splice(index, 1);
            } else {
                this.attach.links.splice(index, 1);
            }
        }
    },
    created() {
        //Conteúdos que deverão ser carregados em uma espécie de onload.
        validateAccess('professor');
        this.getUnits();
    }
};