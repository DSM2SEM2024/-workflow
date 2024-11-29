
export const Header = {
    template: `
                <header class="d-flex flex-column align-items-center h-100 d-none d-md-flex">
                <nav class="d-flex flex-column justify-content-between gap-5 h-100">
                    <!-- Menu lateral -->
                    <div class="d-flex flex-column justify-content-between gap-5">
                        <router-link to="/">
                            <img class="icon" src="https://gustavojoia.github.io/iprepository/images/icon-home.png" alt="Home">
                        </router-link>
                        <router-link to="/">
                            <img class="icon" src="https://gustavojoia.github.io/iprepository/images/search.png" alt="Search">
                        </router-link>
                        <router-link to="/management">
                            <img class="icon" src="https://gustavojoia.github.io/iprepository/images/colletion.png" alt="My Projects">
                        </router-link>       
                    </div>

                    
                    <div class="cps-icon">
                        <img class="icon" src="https://gustavojoia.github.io/iprepository/images/logo-cps.png" alt="CPS Logo">
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
                        <router-link to="/management" @click="toggleMenu">
                            <p>Meus projetos</p>
                        </router-link>
                    </nav>
                </div>
            </div>
    `,
    data() {
    },
    inject: ['urlBase'],
    methods: {
        gerarSlug(titulo) {
            return titulo.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '-');
        },
        //Função para salvar os dados de um formulário e enviar para o servidor back-end.
        save() {
        }
    },
    created() {
        //Conteúdos que deverão ser carregados em uma espécie de onload.
    },

};