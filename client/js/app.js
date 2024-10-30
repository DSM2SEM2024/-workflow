//Importando os arquivos através do caminho e atribuindo o seu identificador
import { Login } from './pages/login.js';
import { Home } from './pages/home.js';
import { ManagementPage } from './pages/management.js';
import { CreateCoordinator } from './pages/create-coordinator.js';
import { MyProjects } from './components/my-projects.js';

// import { Footer } from './components/footer.js';
import { CreateProject } from './pages/create-project.js';

//Definindo as rotas através desse identificador
const routes = [
    { path: '/', component: Login },
    { path: '/home', component: Home },
    { path: '/management', component: ManagementPage },
    { path: '/create-coordinator', component: CreateCoordinator },
    { path: '/create-project', component: CreateProject },
    { path: '/my-projects', component: MyProjects}
];

//Criando um histórico de rotas para facilitar a navegação entre as páginas. Página anterior e posterior.
const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes
});

const App = {
    data() {
        return {
            startTime: null,
            endTime: null,
            renderTime: null
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
    // components: {
    //     Footer
    // },
    //Aplicando o template header padrão em todas as views (páginas) dinamicamente
    //Depois do conteúdo (páginas), implementa-se o footer na ordem em cascata
    template: `
        <div class="d-flex justify-content-start flex-row h-100">
            <header class="d-flex flex-column align-items-center h-100">
                <nav class="d-flex flex-column justify-content-between gap-5 h-100">
                    <div class="d-flex flex-column justify-content-between gap-5">
                        <router-link to="/">
                        <img class="icon" src="../images/icon-home.png" alt="Home">
                        </router-link>
                        <router-link to="/">
                        <img class="icon" src="../images/search.png" alt="Home">
                        </router-link>
                        <router-link to="/">
                        <img class="icon" src="../images/colletion.png" alt="Home">
                        </router-link>        
                    </div>          
                    
                    <div class="cps-icon">
                        <img class="icon" src="../images/logo-cps.png" alt="Home">
                    </div>
                </nav>
            </header>
            <router-view></router-view>
        </div>
    `,
    //Porta na qual o servidor front-end roda.
    setup() {
        const urlBase = 'http://localhost:8080/';
        return {
            urlBase
        };
    },
    provide() {
        return {
            urlBase: this.urlBase
        };
    }
};

//Finalizando a criação da aplicação, aplicando rota, versionamento e carregando no body do index.
const app = Vue.createApp(App);
app.use(router);
app.mount('#app');