import { navigate } from "../functions/navigate.js";

export const MyProfile = {
    template: `
 
    `,
    data() {
        //Trazer o tipo de usuário de acordo com a sessão para que eu possa manipular campos no front-end. Alguns campos devem ser ocultos para os outros tipos de usuário.
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

