import { MyProfile } from '../components/my-profile.js';

export const CoordinatorsArea = {
    components: {
        MyProfile
    },
    template: `
        <main id="coordinator-area" class="d-flex flex-row justify-content-between gap-2 flex-wrap">
            <div class="dinamic-content">
                <MyProfile></MyProfile>

                

            </div>
        </main>
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
        }
    },
    created() {
        //Conteúdos que deverão ser carregados em uma espécie de onload.
    }
};