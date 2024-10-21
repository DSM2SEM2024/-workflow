export const Home = {
    template: `
        <main id="home" class="d-flex justify-content-evenly align-items-center flex-row">
            <section class="dinamic-content">
                <div class="page-section d-flex justify-content-start align-items-center">
                    <h2>Projetos Interdisciplinares</h2>
                </div>

                <section class="form-content">
                    <form class="box-search">
                        <div class="form-inputs">
                            <div class="input-content">
                                <label>Nome</label>
                                <div class="input-section">
                                    <img href="">
                                    <input type="text" name="name">
                                </div>
                            </div>

                            <div class="form-inputs">
                                <label>Curso</label>
                                <div class="select-section">
                                    <img href="">
                                    <select name="curses">
                                        <option>Escolha um curso...</option>
                                    </select>
                                </div>
                            </div>                    
                        </div>

                        <div class="form-inputs">
                            <div class="input-content">
                                <label>Data</label>
                                <div class="input-section">
                                    <img href="">
                                    <input type="date" name="name">
                                    <p>até</p>
                                    <input type="date" name="name">
                                </div>
                            </div>
                            <div class="input-content">
                                <button name="filter">Filtrar</button>
                                <button name="clear">Limpar</button>
                            </div>
                        </div>
                    </form>
                    
                
                </section>
            </section>
        </main>
        {{email}} {{password}}
    `,
    data() {
        return {
            // email: null,
            // password: null
        };
    },
    inject: ['urlBase'],
    methods: {
        gerarSlug(titulo) {
            return titulo.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '-');
        },
        //Função para salvar os dados de um formulário e enviar para o servidor back-end.
        save() {
            // this.email;
        }
    },
    created() {
        //Conteúdos que deverão ser carregados em uma espécie de onload.
    }
};