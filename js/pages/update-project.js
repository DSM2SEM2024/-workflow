import { validateAccess } from "../functions/validate-access.js";
import { backend_url } from "../global-var/backend-url.js";
import { Header } from "../components/header.js";
import { dateFormatter } from "../functions/date-formatter.js";
import { semChecker } from "../functions/sem-checker.js";

export const UpdateProject = {
    template: `
        <Header></Header>
        <main id="create-project" class="d-flex justify-content-evenly align-items-center flex-row">
            <section class="dinamic-content">
                <div class="page-section d-flex justify-content-start align-items-center">
                    <h2>Editando Projeto</h2>
                </div>

                <section class="form-content">
                    <div class="section-title d-flex justify-content-between flex-row align-items-center"> 
                        <h3>Informações do projeto</h3>
                        <img class="icon" src="https://gustavojoia.github.io/iprepository/images/bottom-section.png" alt="Expandir">
                    </div>
                    <!-- Todos os campos são obrigatórios -->
                    <form id="form-createproject">
                        <div class="form-inputs d-flex justify-content-start flex-row flex-wrap">
                            <div class="d-flex flex-column align-items-start">                            
                                <input type="text" placeholder="Nome" v-model="project.Name">
                                <p class="message-error error-name"></p>
                            </div>
                            <div class="d-flex flex-column align-items-start">                            
                                <input type="date" placeholder="Data de início" v-model="project.Start_Date" >
                                <p class="message-error error-startDate"></p>
                            </div>
                        </div>

                        <div class="form-inputs d-flex justify-content-start flex-row flex-wrap">
                            <div class="d-flex flex-column align-items-start">                            
                                <select v-model="project.ID_Unit">
                                    <option value="">Selecione unidade...</option>
                                    <option v-for="unit in units" :value="unit.ID_Unit">{{unit.Unit_Name}}</option>
                                </select>
                                <p class="message-error error-unit"></p>
                            </div>

                            <div class="d-flex flex-column align-items-start">
                                <input type="date" placeholder="Data de conclusão" v-model="project.End_Date">
                                <p class="message-error error-endDate"></p>
                            </div>
                        </div>
                        <div class="form-inputs d-flex justify-content-start d-column w-100">
                            <div class="d-flex flex-column align-items-start w-100">
                                <textarea class="description" placeholder="Descrição" v-model="project.Description"></textarea>
                                <p class="message-error error-description"></p>
                            </div>
                        </div>                        
                    </form>
                    <br>
                    <div class="section-title d-flex justify-content-between flex-row align-items-center"> 
                        <h3>Integrantes</h3>
                        <img class="icon" src="https://gustavojoia.github.io/iprepository/images/bottom-section.png" alt="Expandir">
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
                                <img src="https://gustavojoia.github.io/iprepository/images/user.png" alt="Expandir">
                                <p>{{member.participantName}}</p>
                                <span @click="remover(key)">-</span>
                            </div>
                        </div>
                        </form>
                    <br>
                    <div class="section-title d-flex justify-content-between flex-row align-items-center"> 
                        <h3>Anexos</h3>
                        <img class="icon" src="https://gustavojoia.github.io/iprepository/images/bottom-section.png" alt="Expandir">
                    </div>
                    <form>
                        <div class="form-gap d-flex d-row flex-row">
                            <div class="form-inputs d-flex justify-content-start d-column flex-column">
                                <select v-model="file_type_value" placeholder="Escolha um arquivo">
                                    <option value="">Escolha o tipo de anexo...</option>
                                    <option v-for="type in file_types" :value="type">{{type}}</option>
                                </select>
                                <div @dragover.prevent @drop.prevent="handleDrop" @click="selecionarArquivo" class="file-drop d-flex justify-content-center d-column flex-column align-items-center">
                                    <img class="icon" src="https://gustavojoia.github.io/iprepository/images/download.png" alt="Integrante">
                                    <p>Anexe ou arraste o arquivo para cá </p>
                                    <button type="button">Selecionar arquivo</button>
                                    <input type="file" accept=".jpg, .png" multiple ref="fileInput" @change="handleFileSelect" style="display: none"/>
                                </div>     
                                <p class="message-error error-file"></p>    
                            </div>  
                            <div class="form-entries d-flex justify-content-start d-column flex-column">
                                <!-- Exemplo de membros abaixo -->
                                <div class="files" v-for="(url, index) in attach.links" :key="index">
                                    <img src="https://gustavojoia.github.io/iprepository/images/file-link.png" alt="Expandir">
                                    <p>{{url.URL}}</p>
                                    <span @click="removerArquivo(index,'link')" >-</span>
                                </div>
                                <div class="files" v-for="(file, index) in attach.files" :key="index">
                                    <img v-if="isPdf(file.File_Type)" src="https://gustavojoia.github.io/iprepository/images/file-pdf.png" alt="Expandir">
                                    <img v-if="isImg(file.File_Type)" src="https://gustavojoia.github.io/iprepository/images/icon-upload.png" alt="Expandir">
                                    <img v-if="isElse(file.File_Type)" src="https://gustavojoia.github.io/iprepository/images/icon-file.png" alt="Expandir">
                                    <p>{{file.File_Name}}</p>
                                    <span @click="removerArquivo(index,'file')" >-</span>
                                </div>     
                                <div class="files" v-for="(url, index) in new_attach.links" :key="index">
                                    <img src="https://gustavojoia.github.io/iprepository/images/file-link.png" alt="Expandir">
                                    <p>{{url}}</p>
                                    <span @click="removerArquivo(index,'link')" >-</span>
                                </div>
                                <div class="files" v-for="(file, index) in new_attach.files" :key="index">
                                    <img v-if="new_isPdf(file)" src="https://gustavojoia.github.io/iprepository/images/file-pdf.png" alt="Expandir">
                                    <img v-if="new_isImg(file)" src="https://gustavojoia.github.io/iprepository/images/icon-upload.png" alt="Expandir">
                                    <img v-if="new_isElse(file)" src="https://gustavojoia.github.io/iprepository/images/icon-file.png" alt="Expandir">
                                    <p>{{file.name}}</p>
                                    <span @click="removerArquivo(index,'file')" >-</span>
                                </div>                         
                            </div>  
                        </div>           
                    </form>

                    <hr>

                    <div class="form-footer d-flex justify-content-between d-column align-items-start gap-3 flex-wrap">
                        <p>Atenção, certifique-se de preencher os campos obrigatórios!</p>

                        <button class="btn-create" @click="cadastrar">Cadastrar projeto ‎ |
                            <img class="icon" src="https://gustavojoia.github.io/iprepository/images/next.png" alt="Integrante">
                        </button>
                    </div>
                
                </section>
            </section>
        </main>
    `,
    components:{
        Header
    },
    data() {
        return {
            // email: null,
            // password: null
            token: window.localStorage.getItem('reposystem_token'),
            id: window.location.href.split('update-project/')[1],
            project:{
                ID_Project: window.location.href.split('update-project/')[1],
                Name: '',
                Description: '',
                Start_Date:'',
                End_Date:'',
                Participants: [],
                ID_Unit: ''
            },
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
            new_attach:{
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
        isYours(){
            let url = `${backend_url}/verifyTeachersPage/${this.project.ID_Professor}`;
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
                console.log(url)
                console.log(response)
                if(response.status==false){
                    this.$router.push('/');
                }
            })
        },
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
            Swal.showLoading();
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
                if (response.status == true) {
                    Swal.close();
                    this.$router.push(`/project/${response.data}`);
                } else {
                    Swal.fire({
                        title: `${response.code} - Cadastro inválido`,
                        text: response.message,
                        icon: 'error'
                    })
                }
            })
            .catch(error => {
                Swal.fire({
                    title: `Erro ao enviar`,
                    text: error.message,
                    icon: 'error'
                })
            });
        },        
        async handleDrop(event) {
            const itens = event.dataTransfer.items;
      
            for (let i = 0; i < itens.length; i++) {
              const item = itens[i];
      
              // Verifica se o item é um arquivo
              if (item.kind === 'file') {
                const file = item.getAsFile();
                if (file) {
                  this.new_attach.files.push(file);
                }
              }
              // Verifica se o item é um link ou texto
              else if (item.kind === 'string' && item.type === 'text/uri-list') {
                // Lê o link e o adiciona à lista
                const link = await new Promise((resolve) =>
                  item.getAsString(resolve)
                );
                this.new_attach.links.push(link);
              }
            }
        },
        isPdf(file){

            if(file=='pdf'){
                return true;
            } else {
                return false;
            }

        },
        isImg(file){

            if(file=='jpeg' || file=='png'){
               return true;
            } else {
                return false;
            }

        },
        isElse(file){
            if(file!='jpeg' && file!='png' && file!='pdf'){
                return true;
            } else {
                return false;
            }
        },
        new_isPdf(file){

            if(file.type.split('/')[1]=='pdf'){
                return true;
            } else {
                return false;
            }

        },
        new_isImg(file){

            if(file.type.split('/')[1]=='jpeg' || file.type.split('/')[1]=='png'){
               return true;
            } else {
                return false;
            }

        },
        new_isElse(file){
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
            this.new_attach.files = this.new_attach.files.concat(selecionados);
        },
        removerArquivo(index, type) {
            if(type=='file'){
                this.attach.files.splice(index, 1);
            } else {
                this.attach.links.splice(index, 1);
            }
        },
        navi(){
            this.$router.push('/update-project/'+this.id);
        },
        gerarSlug(titulo) {
            return titulo.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '-');
        },
        //Função para salvar os dados de um formulário e enviar para o servidor back-end.
        save() {
            // this.email;
        },
        getById(){
            Swal.showLoading();
            let url = backend_url+'/project/'+this.project.ID_Project;
            fetch(url)
            .then(response=>response.json())
            .then(response=>{
                if(response.status==true){
                    this.project = response.data;
                    let count_participants = response.data.Participants.length;
                    this.participants = response.data.Participants;
                }
            })
        },
        getFiles(){
            let url = backend_url+'/files/'+this.project.ID_Project;
            fetch(url)
            .then(response=>response.json())
            .then(response=>{
                console.log(response.data)
                let attach = {
                    files: [],
                    links: []
                }
                response.data.forEach(file => {
                    if(file.File_Type=='link'){
                        attach.links.push(file);
                    } else {
                        attach.files.push(file)
                    }
                });
                this.attach = attach;
                Swal.close();
            })
        },
        isPdf(file_type){

            if(file_type=='pdf'){
                return true;
            } else {
                return false;
            }

        },
        isImg(file_type){

            if(file_type=='jpeg' || file_type=='jpg' || file_type=='png'){
               return true;
            } else {
                return false;
            }

        },
        isLink(file_type){

            if(file_type=='link'){
               return true;
            } else {
                return false;
            }

        },
        isElse(file_type){
            if(file_type!='jpeg' && file_type!='jpg' && file_type!='png' && file_type!='pdf' && file_type!='link'){
                return true;
            } else {
                return false;
            }
        },
        dateFormatter,
        semChecker,
        professorChecker(){
            let token = window.localStorage.getItem('reposystem_token');
            let url = backend_url+'/token/validateAccess';
            let options = {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${token}`
                },
                body: JSON.stringify({role:'professor'})
            }
            fetch(url, options)
            .then(response=>response.json())
            .then(response=>{
                if(response.data.sub.ID_Professor == this.project.ID_Professor){
                    this.isProfessor = response.data;
                }
            })
        },
        toggleUpdate(){
            this.updateMode = !this.updateMode;
            if(this.updateMode){
                this.edit_btn_txt = 'CANCELAR';
            } else {
                this.edit_btn_txt = 'EDITAR';
            }
        }
    },
    created() {
        //Conteúdos que deverão ser carregados em uma espécie de onload.
        validateAccess('professor');
        this.getUnits();
        this.getById();
        this.getFiles();
        this.isYours();
    }
};