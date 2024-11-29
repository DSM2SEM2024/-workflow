import { navigate } from "../functions/navigate.js";
import { backend_url } from "../global-var/backend-url.js";

export const MyData = {
    template: `
    <section v-show="showMyData" id="my-data" class="d-flex justify-content-evenly align-items-center flex-row">
        <div class="dinamic-content">
            <div class="form-content">
                <form>
                    <!-- Deixe todas as informações do usuário já carregadas nos inputs. -->
                    <div class="section-title d-flex justify-content-between flex-row align-items-center"> 
                        <h3>Minhas informações</h3>
                        <img class="icon" src="../images/bottom-section.png" alt="Expandir">
                    </div>
                                    
                    <div class="form-inputs d-flex justify-content-start flex-row flex-wrap">
                        <div class="d-flex flex-column align-items-start">
                            <input type="text" name="name" placeholder="Nome" v-model="name">
                            <p class="message-error error-name"></p>
                        </div>

                        <div class="d-flex flex-column align-items-start">
                            <input type="email" name="email" placeholder="E-mail" v-model="email">
                            <p class="message-error error-email"></p>
                        </div>
                    </div>

                    <!-- O campo de formação só aparece se for professor (Reutilização da atualização de dados pessoais para coordenador e professor) -->
                    <div class="form-inputs d-flex justify-content-start align-items-start flex-row flex-wrap">
                        <div v-if="typeUser === 'teacher'" class="d-flex flex-column align-items-start">                            
                            <input type="text" name="expertise" placeholder="Formação" v-model="expertise">
                            <p class="message-error error-expertise">Mensagem de erro</p>
                        </div>
                        <div class="form-inputs d-flex justify-content-start align-items-start flex-row">
                            <div class="d-flex flex-column align-items-start">                            
                                <input type="password" name="password" placeholder="Digite a sua senha..." v-model="password">
                                <p class="message-error error-password">Teste mensagem de erro</p>
                            </div>
                        </div>                        
                            <button class="btn-change" @click="changePassword">Alterar senha</button>
                    </div>

                    <div class="section-list d-flex justify-content-start flex-row gap-4">                               
                        <div class="units d-flex flex-column align-items-start">
                            <!-- Insira um foreach com todas as unidades das quais o professor/coordenador faz parte (só visualização) -->
                            <h4>Unidades:</h4>
                            <ul>
                                <li v-for="unit in units">{{unit.Unit_Name}}</li>
                            </ul>
                        </div>    
                        <!-- Insira um foreach com todos os cursos dos quais o professor ministra (só visualização) -->
                        <div v-if="typeUser === 'teacher'" class="curses d-flex flex-column align-items-start">
                            <h4>Cursos:</h4>
                                
                            <ul>
                                <li v-for="course in courses">{{course.Course_Name}}</li>
                            </ul>
                        </div>    
                    </div>
                        
                    <hr class="line-password">

                    <div class="form-footer d-flex justify-content-between d-row align-items-start">
                        <button click="updateMyData" class="btn-create">Atualizar informações ‎ |
                            <img class="icon" src="../images/next.png" alt="Expandir">
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </section>
    `,
    data() {
        //Trazer o tipo de usuário de acordo com a sessão para que eu possa manipular campos no front-end. Alguns campos devem ser ocultos para os outros tipos de usuário.
        return {
            showMyData: false,
            typeUser: 'teacher',

            name: 'Usuário',
            email: 'usuario@fatec.sp.gov.br',
            expertise: 'Graduado em Engenharia da Computação',
            password: 'as547d!d9f',
            // units: ['Fatec Mauá', 'Fatec Mogi das Cruzes', 'Fatec Guaratinguetá'],
            // curses: ['Design Digital', 'Desenvolvimento de Sistemas', 'Desenvolvimento Web']
        }
    },
    props:{
        professor:{
            required: true
        },
        units:{
            required: true
        },
        courses:{
            required: true
        }
    },
    inject: ['urlBase'],
    methods: {
        gerarSlug(titulo) {
            return titulo.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '-');
        },
        save() {
        },
        navigate,
        render(){
            this.name = this.professor.Name;
            this.email = this.professor.Email;
            this.expertise = this.professor.Area_of_Expertise;
            this.password = '';
        }
    },
    created() {
        this.render();
    }
};

