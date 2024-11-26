import { validateAccess } from "../functions/validate-access.js";
import { backend_url } from "../global-var/backend-url.js";
import { token } from "../global-var/token.js";

export const CreateUser = {
    template: `
        <main id="create-user" class="d-flex justify-content-evenly align-items-center flex-row">
            <section class="dinamic-content">
                <div class="page-section d-flex justify-content-start align-items-center">
                    <h2>Cadastrar usuário</h2>
                </div>

                <section class="form-content">
                    <div class="section-title d-flex justify-content-between flex-row align-items-center"> 
                        <h3>Informações do usuário</h3>
                        <img class="icon" src="../images/bottom-section.png" alt="Expandir">
                    </div>
                    <form>
                        <div class="form-inputs d-flex justify-content-start d-column flex-wrap">
                            <div class="d-flex flex-column align-items-start">                            
                                <input v-model="name" type="text" name="name" placeholder="Nome">
                                <p class="message-error error-name"></p>
                            </div>
                            
                            <div class="d-flex flex-column align-items-start">
                                <input v-model="email" type="email" name="email" placeholder="E-mail">
                                <p class="message-error error-email"></p>
                            </div>
                        </div>
                        <div class="form-inputs d-flex justify-content-start d-column flex-wrap">  
                            <div class="d-flex flex-column align-items-start">
                                <select v-model="unit" class="unity">
                                    <option value="">Unidade...</option>
                                    <option v-for="unit in units" :value="unit.ID_Unit">{{unit.Unit_Name}}</option>
                                </select>
                                <p class="message-error error-unit"></p>
                            </div>       

                            <!-- Ajustado para valores únicos -->
                            <div class="d-flex flex-column align-items-start">
                                <select v-model="role" class="career">
                                    <option value="">Cargo...</option>
                                    <option v-for="role in roles" :value="role.value">{{role.name}}</option>
                                </select>
                                <p class="message-error error-career"></p>
                            </div>
                        </div>

                        <!-- Div para Coordenador -->
                        <div class="coordinator-section" v-if="career === 'coordinator'">
                            <div class="section-title d-flex justify-content-between flex-row align-items-center">
                                <h3>Formação e Curso</h3>
                                <img class="icon" src="../images/bottom-section.png" alt="Expandir">
                            </div>

                            <div class="form-inputs d-flex justify-content-start align-items-end d-column flex-wrap">
                                <div class="d-flex flex-row align-items-end gap-3 flex-wrap">
                                    <div class="d-flex flex-column align-items-start">                            
                                        <input type="text" name="degree" placeholder="Formação">
                                    </div>

                                    <div class="d-flex flex-column align-items-start">                            
                                        <div class="d-flex flex-row align-items-end gap-3">
                                            <select class="curse">
                                                <option>Curso</option>
                                            </select>
                                            <img class="icon" src="../images/icon-add.png" alt="Expandir">
                                        </div>
                                    </div>
                                </div>
                            </div> 

                            <div class="section-linked-data d-flex justify-content-between align-items-start gap-2">
                                <div class="d-flex flex-row justify-content-start align-items-center gap-3">
                                    <img class="icon" src="../images/icon-university.png" alt="Expandir">
                                    <div class="linked-data d-flex flex-column justify-content-start">
                                        <p class="unity-name">Unidade</p>
                                        <p class="curse-name">Curso</p>
                                    </div>
                                </div>
                                <span class="remove">-</span>
                            </div>   
                            <p class="message-error error-linked-data"><!-- Adicione ao menos uma associação. --></p>                        
                        </div>

                        <!-- Div para Professor -->
                        <div class="teacher-section" v-else-if="career === 'teacher'">
                            <div class="section-title d-flex justify-content-between flex-row align-items-center">
                                <h3>Curso e Disciplina</h3>
                                <img class="icon" src="../images/bottom-section.png" alt="Expandir">
                            </div>

                            <p class="description-unit">Adicione uma nova unidade clicando no ícone abaixo.</p>

                            <div class="form-inputs d-flex justify-content-start d-column flex-wrap">
                                <div class="d-flex flex-column align-items-start">
                                    <input type="text" name="degree" placeholder="Formação">
                                    <p class="message-error error-degree"></p>
                                </div>

                                <div class="d-flex flex-column align-items-start">
                                    <select class="curse">
                                        <option>Curso</option>
                                    </select>
                                    <p class="message-error error-curse"></p>
                                </div>
                            </div>

                            <div class="form-inputs d-flex justify-content-start align-items-end">
                                <div class="d-flex flex-row align-items-end no-wrap gap-3">
                                    <select class="discipline">
                                        <option>Disciplina</option>
                                    </select>
                                    <img class="icon" src="../images/icon-add.png" alt="Expandir">
                                </div>
                            </div>
                            <p class="message-error error-discipline"></p>

                            <div class="section-linked-data d-flex justify-content-between align-items-start gap-2">
                                <div class="d-flex flex-row justify-content-start align-items-center gap-3">
                                    <img class="icon" src="../images/icon-university.png" alt="Expandir">
                                    <div class="linked-data d-flex flex-column justify-content-start">
                                        <p class="unity-name">Unidade</p>
                                        <p class="discipline-name">Disciplina</p>
                                        <p class="curse-name">Curso</p>
                                    </div>
                                </div>
                                <span class="remove">-</span>
                            </div>
                            <p class="message-error error-linked-data"><!-- Adicione ao menos uma associação. --></p>
                        </div>
                    </form>

                    <hr>

                    <div class="form-footer d-flex justify-content-between d-row align-items-start gap-2 flex-wrap">
                        <p>Atenção, certifique-se de preencher os campos obrigatórios!</p>
                        <button :disabled="btn_disable" class="btn-create" @click="send">Cadastrar usuário ‎ |
                            <img class="icon" src="../images/next.png" alt="Expandir">
                        </button>
                    </div>            
                </section>
            </section>
        </main>
    `,
    data() {
        return {
            career: '',
            roles: [
                {
                    value: 'professor',
                    name: 'Professor'
                },
                {
                    value: 'coordinator',
                    name: 'Coordenador'
                }
            ],
            units: [],
            name: '',
            email: '',
            unit: '',
            role: '',
            btn_disable: false
        };
    },
    inject: ['urlBase'],
    methods: {
        gerarSlug(titulo) {
            return titulo.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '-');
        },
        //Função para salvar os dados de um formulário e enviar para o servidor back-end.
        send() {
            this.btn_disable = true;
            let url = backend_url+'/user/create';
            let options = {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${token}`
                },
                body: JSON.stringify({
                    name: this.name,
                    email: this.email,
                    role: this.role,
                    unit: this.unit
                })
            }
            console.log('Mail request');
            fetch(url, options)
            .then(response=>response.json())
            .then(response=>{
                console.log(response);
                this.btn_disable = false;
                if(response.status==true){
                    this.name = '',
                    this.email = '',
                    this.role = '',
                    this.unit = ''
                }
            })
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
    },
    created() {
        // Conteúdos que deverão ser carregados em uma espécie de onload.
        this.getUnits();
    }
};
