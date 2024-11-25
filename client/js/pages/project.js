import { backend_url } from "../global-var/backend-url.js";
import { urlBase } from "../global-var/url-base.js";
import { dateFormatter } from "../functions/date-formatter.js";
import { semChecker } from "../functions/sem-checker.js";

export const Project = {
    template: `
        <main id="project" class="d-flex justify-content-evenly align-items-center flex-row">
            <section class="dinamic-content">
                <div class="page-section d-flex justify-content-between align-items-center">
                    <h2>Informações do Projeto</h2>
                    <button class="edit-button" v-if="isProfessor" @click="toggleUpdate">{{edit_btn_txt}}</button>
                </div>

                <div class="section-data d-flex flex-column align-items-start gap-1">
                    <div class="data-title d-flex justify-content-start flex-row gap-3">
                        <div class="icon-title"></div>
                        <h1>{{project.Name}}</h1>
                    </div>

                    <h3>Publicado em {{project.End_Date}}</h3>
                    <p>{{project.Description}}</p>
                </div>
                <hr>
                <div class="section-files d-flex flex-column justify-content-start gap-2">
                    <div class="title d-flex justify-content-start flex-row align-items-center gap-3">
                        <img class="icon" src="../images/icon-file.png" alt="Projeto Interdisciplinar">
                        <h2>Anexos</h2>
                    </div>

                    <div v-for="(file, index) in files" class="files-content d-flex justify-content-between flex-row">

                        <div class="left-data d-flex justify-content-start align-items-center flex-row gap-3">
                            <img v-if="isPdf(file.File_Type)" class="icon" src="../images/icon-pdf.png" alt="Projeto Interdisciplinar">
                            <img v-if="isImg(file.File_Type)" class="icon" src="../images/icon-upload.png" alt="Projeto Interdisciplinar">
                            <img v-if="isLink(file.File_Type)" class="icon" src="../images/icon-link.png" alt="Projeto Interdisciplinar">
                            <img v-if="isElse(file.File_Type)" class="icon" src="../images/icon-file.png" alt="Projeto Interdisciplinar">

                            <p>{{file.File_Name}}</p>
                        </div>

                        <div class="right-data d-flex justify-content-start align-items-center flex-row gap-3">
                            <a v-if="isLink(file.File_Type)" :href="file.URL" target="_blank">
                                <img class="icon" src="../images/icon-upload.png" alt="Projeto Interdisciplinar">
                            </a>
                            <a v-else :href="file.File_Data" :download="file.File_Name">
                                <img class="icon" src="../images/icon-upload.png" alt="Projeto Interdisciplinar">
                            </a>
                        </div>

                    </div>

                </div>  

                <div class="section-info">
                    <div class="label-content">
                        <label>Curso</label>
                        <div class="d-flex justify-content-start flex-row gap-2">
                            <img class="icon" src="../images/external-link.png" alt="Projeto Interdisciplinar">
                            <p>Desenvolvimento de Software e Multiplataforma</p>
                        </div>
                    </div>

                    <div class="label-content">
                        <label>Semestre</label>
                        <div class="d-flex justify-content-start flex-row gap-2">
                            <p>{{sem}}</p>
                        </div>                    
                    </div>

                    <div class="label-content">
                        <label>Ministrado por</label>
                        <div class="d-flex justify-content-start flex-row gap-2">
                            <p>{{project.Professor_Name}}</p>
                        </div>                    
                    </div>

                    <div class="label-content">
                        <label>Equipe de Desenvolvimento</label>
                        <div>
                            <p>{{members}}</p>
                        </div>                    
                    </div>

                    <br>

                    <a href="" target="_blank">
                        Se interessou pelo Projeto e deseja entrar em contato?
                    </a>
                </div>
            </section>
        </main>
    `,
    data() {
        return {
            project: {
                ID_Project: window.location.href.split('project/')[1]
            },
            sem: '',
            members: '',
            files: [],
            isProfessor: false,
            updateMode: false,
            edit_btn_txt: 'EDITAR',
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
        getById(){
            Swal.showLoading();
            let url = backend_url+'/project/'+this.project.ID_Project;
            fetch(url)
            .then(response=>response.json())
            .then(response=>{
                if(response.status==true){
                    this.project = response.data;
                    this.project.End_Date = dateFormatter(this.project.End_Date);
                    this.sem = semChecker(this.project.Start_Date);
                    let count_participants = response.data.Participants.length;
                    response.data.Participants.forEach((participant, key) => {
                        if(key==(count_participants-1) && count_participants>1){
                            this.members+=`e ${participant.participantName}.`;
                        } else if(key==(count_participants-2) && count_participants>=2){
                            this.members+=`${participant.participantName} `;
                        } else if(count_participants==1) {
                            this.members+=`${participant.participantName}`;
                        } else {
                            this.members+=`${participant.participantName}, `;
                        }
                    });
                }
            })
        },
        getFiles(){
            let url = backend_url+'/files/'+this.project.ID_Project;
            fetch(url)
            .then(response=>response.json())
            .then(response=>{
                this.files = response.data;
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
        this.getById();
        this.getFiles();
        this.professorChecker();
    }
};