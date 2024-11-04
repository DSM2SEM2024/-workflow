import { validateAccess } from "../functions/validate-access.js";
import { backend_url } from "../global-var/backend-url.js";

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
                        <div class="form-inputs d-flex justify-content-start d-column">
                            <input v-model="name" type="text" name="name" placeholder="Nome">
                            <input v-model="email" type="email" name="email" placeholder="E-mail">
                        </div>
                        <div class="form-inputs d-flex justify-content-start d-column">                               
                            <select v-model="unit" class="unity">
                                <option>Unidade...</option>
                                <option v-for="unit in units" :value="unit.ID_Unit">{{unit.Unit_Name}}</option>
                            </select>       

                            <!-- Ajustado para valores únicos -->
                            <select v-model="role" class="career">
                                <option value="">Cargo...</option>
                                <option v-for="role in roles" :value="role.value">{{role.name}}</option>
                            </select>
                        </div>

                        <!-- Div para Coordenador -->
                        <div class="coordinator-section" v-if="career === 'coordinator'">
                            <div class="section-title d-flex justify-content-between flex-row align-items-center">
                                <h3>Formação e Curso</h3>
                                <img class="icon" src="../images/bottom-section.png" alt="Expandir">
                            </div>

                            <div class="form-inputs d-flex justify-content-start align-items-end d-column">
                                <div class="d-flex flex-row align-items-end no-wrap gap-3">
                                    <input type="text" name="degree" placeholder="Formação">
                                    <select class="curse">
                                        <option>Curso</option>
                                    </select>
                                    <img class="icon" src="../images/icon-add.png" alt="Expandir">
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
                        </div>

                        <!-- Div para Professor -->
                        <div class="teacher-section" v-else-if="career === 'teacher'">
                            <div class="section-title d-flex justify-content-between flex-row align-items-center">
                                <h3>Curso e Disciplina</h3>
                                <img class="icon" src="../images/bottom-section.png" alt="Expandir">
                            </div>

                            <p>Adicione uma nova unidade clicando no ícone abaixo.</p>

                            <div class="form-inputs d-flex justify-content-start d-column">
                                <input type="text" name="degree" placeholder="Formação">
                                <select class="curse">
                                    <option>Curso</option>
                                </select>
                            </div>

                            <div class="form-inputs d-flex justify-content-start align-items-end d-column">
                                <div class="d-flex flex-row align-items-end no-wrap gap-3">
                                    <select class="discipline">
                                        <option>Disciplina</option>
                                    </select>
                                    <img class="icon" src="../images/icon-add.png" alt="Expandir">
                                </div>
                            </div>

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
                        </div>
                    </form>

                    <hr>

                    <div class="form-footer d-flex justify-content-between d-row align-items-start">
                        <p>Atenção, certifique-se de preencher os campos obrigatórios!</p>
                        <button class="btn-create">Cadastrar usuário ‎ |
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
            role: ''
        };
    },
    inject: ['urlBase'],
    methods: {
        gerarSlug(titulo) {
            return titulo.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '-');
        },
        //Função para salvar os dados de um formulário e enviar para o servidor back-end.
        send() {
            let url = backend_url+'/'
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
