import { MyData } from '../components/my-data.js';

export const MyProfile = {
    components: {
        MyData
    },
    template: `
        <div class="section-top d-flex justify-content-start align-items-start flex-row gap-5">
            <div class="profile-picture">
                <button class="btn-send-photo"><img src="../images/icon-sendphoto.png"></button>
            </div>

            <div class="d-flex flex-row justify-content-between align-items-start w-100">
                <div class="profile-apresentation d-flex justify-content-start flex-column">
                    <h2 class="user-name">Usuário</h2>
                    <p class="user-expertise">Especialização</p>
                </div>

                <button class="btn-configuration" @click="toggleMyData"> 
                    <img class="icon" src="../images/icon-configuration.png" alt="Projeto Interdisciplinar">
                    </i>{{ showMyData ? '': '' }}
                </button>
            </div>
        </div>

        <MyData v-if="showMyData"></MyData>

    `,
    data() {
        return {
            showMyData: false,
        }
    },
    inject: ['urlBase'],
    methods: {
        gerarSlug(titulo) {
            return titulo.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '-');
        },
        toggleMyData() {
            this.showMyData = !this.showMyData;
        },
        save() {
        },
    },
    created() {
    }
};

