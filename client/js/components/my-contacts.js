import { navigate } from "../functions/navigate.js";

export const MyContacts = {
    template: `
     <div class="section section-bottom d-flex justify-content-start align-items-start">
        <div class="left d-flex flex-column gap-2">
            <h4>Contato</h4>
            <div class="d-flex flex-row justify-content-start align-items-center gap-2">
                <img class="icon" src="../images/icon-email.png" alt="Projeto Interdisciplinar">
                <a href="">fretz.junior@fatec.sp.gov.br</a>
            </div>
            <div class="d-flex flex-row justify-content-start align-items-center gap-2">
                <img class="icon" src="../images/icon-linkedin.png" alt="Projeto Interdisciplinar">
                <a href="">Frets Sievers Júnior</a>
            </div>
        </div>

        <div class="right d-flex flex-column flex-wrap gap-2">
            <h4>Instituição</h4>

            <div class="list d-flex flex-column align-items-start">
                <p>Fatec Itaquera - Prof° Miguel Reale</p>
                <p>Fatec Mogi das Cruzes</p>
                <p>Fatec Ferraz de Vasconcelos</p>
                <p>Fatec Mauá</p>

            </div>

        </div>
    </div>   
    `,
    data() {
        return {
        }
    },
    inject: ['urlBase'],
    methods: {
        gerarSlug(titulo) {
            return titulo.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '-');
        },
        save() {
        },
        navigate
    },
    created() {
    }
};

