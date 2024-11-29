
export const Header = {
    template: `
                <header class="d-flex flex-column align-items-center h-100 d-none d-md-flex">
                <nav class="d-flex flex-column justify-content-between gap-5 h-100">
                    <!-- Menu lateral -->
                    <div class="d-flex flex-column justify-content-between gap-5">
                        <router-link to="/">
                            <img class="icon" src="./images/icon-home.png" alt="Home">
                        </router-link>
                        <router-link to="/">
                            <img class="icon" src="./images/search.png" alt="Search">
                        </router-link>
                        <router-link to="/management">
                            <img class="icon" src="./images/colletion.png" alt="My Projects">
                        </router-link>       
                    </div>

                    
                    <div class="cps-icon">
                        <img class="icon" src="./images/logo-cps.png" alt="CPS Logo">
                    </div>
                </nav>
            </header>

            <div class="d-md-none position-relative">
                <button class="navbar-toggler position-absolute d-flex justify-content-center align-items-center burger-button" type="button" @click="toggleMenu" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
                    <span class="navbar-toggler-icon"></span>
                </button>
            </div>

            <div class="offcanvas burguer-menu offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                <div class="offcanvas-body">
                    <div class="menu-overlay position-fixed top-0 left-0 w-100 h-100 bg-white d-flex justify-content-center align-items-center">
                    <nav class="d-flex flex-column justify-content-center align-items-center gap-5 h-100">
                        <router-link to="/" data-bs-dismiss="offcanvas">
                            <p>Home</p>
                        </router-link>
                        <router-link to="/" data-bs-dismiss="offcanvas">
                            <p>Pesquisar</p>
                        </router-link>
                        <router-link to="/management" data-bs-dismiss="offcanvas">
                            <p>Meus projetos</p>
                        </router-link>
                    </nav>
                </div>
                </div>
            </div>
    `,
    data() {
        return{
            offcanvas: '',
        }
    },
    inject: ['urlBase'],
    methods: {
        gerarSlug(titulo) {
            return titulo.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '-');
        },
        //Função para salvar os dados de um formulário e enviar para o servidor back-end.
        save() {
        },
        toggleMenu(){
            
        }
    },
    created() {
        //Conteúdos que deverão ser carregados em uma espécie de onload.
        this.offcanvas = document.querySelector('.burguer-menu');
    },

};