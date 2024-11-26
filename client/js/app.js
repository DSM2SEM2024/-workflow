// Importando os arquivos através do caminho e atribuindo o seu identificador
import { Login } from './pages/login.js';
import { Home } from './pages/home.js';
import { ManagementPage } from './pages/management.js';
import { ManagementTeachers } from './pages/management-teachers.js';
import { ManagementCurses } from './pages/management-curses.js';
import { ManagementUnities } from './pages/management-unities.js';
import { CreateUser } from './pages/create-user.js';
import { Project } from './pages/project.js';
import { urlBase } from './global-var/url-base.js';
import { RegisterUnit } from './pages/register-unit.js';
import { CreatePassword } from './pages/create-password.js';
import { RegisterCourse } from './pages/register-course.js';
import { TeachersArea } from './pages/teachers-area.js';
import { CoordinatorsArea } from './pages/coordinators-area.js';
import { CreateProject } from './pages/create-project.js';
import { MyData } from './components/my-data.js';
import { MyProfile } from './components/my-profile.js';
import { MyProjects } from './components/my-projects.js';
import { MyContacts } from './components/my-contacts.js';

// Definindo as rotas através desse identificador
const routes = [
    { path: '/', component: Home, meta: { title: 'Home' }},
    { path: '/login', component: Login, meta: { title: 'Login' }},
    { path: '/management', component: ManagementPage, meta: { title: 'Gestão' }},
    { path: '/management-teachers', component: ManagementTeachers, meta: { title: 'Gestão de Professores' }},
    { path: '/management-curses', component: ManagementCurses, meta: { title: 'Gestão de Cursos' }},
    { path: '/management-unities', component: ManagementUnities, meta: { title: 'Gestão de Unidades' }},
    { path: '/create-user', component: CreateUser, meta: { title: 'Criar Usuário' }},
    { path: '/create-project', component: CreateProject, meta: { title: 'Criar Projeto' }},
    { path: '/my-projects', component: MyProjects, meta: { title: 'Meus Projetos' }},
    { path: '/project/:id', component: Project, meta: { title: 'Projeto' }},
    { path: '/register-unit', component: RegisterUnit, meta: { title: 'Registrar Unidade' }},
    { path: '/teachers-area', component: TeachersArea, meta: { title: 'Área do Docente' }},
    { path: '/create-password/:email', component: CreatePassword, meta: { title: 'Criar Senha' }},
      
    { path: '/register-course', component: RegisterCourse, meta: { title: 'Registrar Curso' }},
    { path: '/coordinators-area', component: CoordinatorsArea, meta: { title: 'Área do Coordenador' }},
    { path: '/my-data', component: MyData, meta: { title: 'Meus Dados' }},
    { path: '/my-profile', component: MyProfile, meta: { title: 'Meu Perfil' }},
    { path: '/my-contacts', component: MyContacts, meta: { title: 'Meus Contatos' }}
];

// Criando o router
const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes
});

// Atualizando o título da página dinamicamente
router.afterEach((to) => {
    const defaultTitle = 'IP Repository'; // Título padrão
    document.title = to.meta.title ? `${to.meta.title} - ${defaultTitle}` : defaultTitle;
});

const App = {
    data() {
        return {
            startTime: null,
            endTime: null,
            renderTime: null,
            career: '',
            isMenuOpen: false // Adicionando o estado para controlar o menu
        };
    },
    beforeMount() {
        this.startTime = performance.now();
    },
    mounted() {
        this.endTime = performance.now();
        this.renderTime = this.endTime - this.startTime;
        console.log(`Tempo de renderização: ${this.renderTime}ms`);
    },
    methods: {
        toggleMenu() {
            this.isMenuOpen = !this.isMenuOpen;
        }
    },
    // components: {
    //     Footer
    // },
    // Aplicando o template header padrão em todas as views (páginas) dinamicamente
    // Depois do conteúdo (páginas), implementa-se o footer na ordem em cascata
    template: `
        <div class="d-flex justify-content-start flex-row h-100">
            <header class="d-flex flex-column align-items-center h-100 d-none d-md-flex">
                <nav class="d-flex flex-column justify-content-between gap-5 h-100">
                    <!-- Menu lateral -->
                    <div class="d-flex flex-column justify-content-between gap-5">
                        <router-link to="/">
                            <img class="icon" src="../images/icon-home.png" alt="Home">
                        </router-link>
                        <router-link to="/">
                            <img class="icon" src="../images/search.png" alt="Search">
                        </router-link>
                        <router-link to="/my-projects">
                            <img class="icon" src="../images/colletion.png" alt="My Projects">
                        </router-link>       
                    </div>

                    
                    <div class="cps-icon">
                        <img class="icon" src="../images/logo-cps.png" alt="CPS Logo">
                    </div>
                </nav>
            </header>

            <div class="d-md-none position-relative">
                <button class="navbar-toggler position-absolute d-flex justify-content-center align-items-center burger-button" type="button" @click="toggleMenu">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div v-if="isMenuOpen" class="menu-overlay position-fixed top-0 left-0 w-100 h-100 bg-white d-flex justify-content-center align-items-center">
                    <nav class="d-flex flex-column justify-content-center align-items-center gap-5 h-100">
                        <router-link to="/" @click="toggleMenu">
                            <p>Home</p>
                        </router-link>
                        <router-link to="/" @click="toggleMenu">
                            <p>Pesquisar</p>
                        </router-link>
                        <router-link to="/my-projects" @click="toggleMenu">
                            <p>Meus projetos</p>
                        </router-link>
                    </nav>
                </div>
            </div>

            <router-view></router-view>
        </div>
    `,
    // Porta na qual o servidor front-end roda, definida na pasta global-var/base-url.js.
    setup() {
        return {
            urlBase: urlBase
        };
    },
    provide() {
        return {
            urlBase: this.urlBase
        };
    }
};

// Finalizando a criação da aplicação, aplicando rota, versionamento e carregando no body do index.
const app = Vue.createApp(App);
app.use(router);
app.mount('#app');
