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
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/management', component: ManagementPage },
    { path: '/management-teachers', component: ManagementTeachers },
    { path: '/management-curses', component: ManagementCurses },
    { path: '/management-unities', component: ManagementUnities },
    { path: '/create-user', component: CreateUser },
    { path: '/create-project', component: CreateProject },
    { path: '/my-projects', component: MyProjects},
    { path: '/project/:id', component: Project},
    { path: '/register-unit', component: RegisterUnit},
    { path: '/teachers-area/:id', component: TeachersArea},
    { path: '/create-password/:email', component: CreatePassword},
    { path: '/register-course', component: RegisterCourse},
    { path: '/coordinators-area', component: CoordinatorsArea},
    { path: '/my-data', component: MyData},
    { path: '/my-profile', component: MyProfile},
    { path : '/my-contacts', component: MyContacts}
];

// Criando um histórico de rotas para facilitar a navegação entre as páginas. Página anterior e posterior.
const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes
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
