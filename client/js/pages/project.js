import { backend_url } from "../global-var/backend-url.js";
import { urlBase } from "../global-var/url-base.js";
import { dateFormatter } from "../functions/date-formatter.js";
import { semChecker } from "../functions/sem-checker.js";

export const Project = {
    template: `
        <main id="project" class="d-flex justify-content-evenly align-items-center flex-row">
            <section class="dinamic-content">
                <div class="page-section d-flex justify-content-start align-items-center">
                    <h2>Informações do Projeto</h2>
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

                    <div class="files-content d-flex justify-content-between flex-row">
                        <div class="left-data d-flex justify-content-start align-items-center flex-row gap-3">
                            <img class="icon" src="../images/icon-pdf.png" alt="Projeto Interdisciplinar">
                            <p>Documento</p>
                        </div>

                        <div class="right-data d-flex justify-content-start align-items-center flex-row gap-3">
                            <img class="icon" src="../images/icon-upload.png" alt="Projeto Interdisciplinar">
                        </div>
                    </div>

                    
                    <div class="files-content d-flex justify-content-between flex-row">
                        <div class="left-data d-flex justify-content-start align-items-center flex-row gap-3">
                            <img class="icon" src="../images/icon-link.png" alt="Projeto Interdisciplinar">
                            <p>Link</p>
                        </div>

                        <div class="right-data d-flex justify-content-start align-items-center flex-row gap-3">
                            <img class="icon" src="../images/icon-upload.png" alt="Projeto Interdisciplinar">
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
            members: ''
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
            let url = backend_url+'/project/'+this.project.ID_Project;
            console.log(url)
            fetch(url)
            .then(response=>response.json())
            .then(response=>{
                console.log(response)
                if(response.status==true){
                    this.project = response.data;
                    this.project.End_Date = dateFormatter(this.project.End_Date);
                    this.sem = semChecker(this.project.Start_Date);
                    let count_participants = response.data.Participants.length;
                    response.data.Participants.forEach((participant, key) => {
                        if(key==(count_participants-1) && count_participants>1){
                            this.members+=`e ${participant.participantName}.`;
                        } else if(key==(count_participants-2) && count_participants>2){
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
        dateFormatter,
        semChecker
    },
    created() {
        //Conteúdos que deverão ser carregados em uma espécie de onload.
        this.getById()
    }
};