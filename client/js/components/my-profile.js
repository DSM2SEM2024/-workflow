import { MyData } from '../components/my-data.js';
import { backend_url } from '../global-var/backend-url.js';

export const MyProfile = {
    components: {
        MyData
    },
    template: `
        <div class="section-top d-flex justify-content-start align-items-start flex-row gap-5">
            <div class="profile-picture" :style="
                ('background-image: url('+img+')')"> <!-- onde fica a foto? -->
                <button v-if="editable" class="btn-send-photo" @click="uploadPhoto">
                    <img src="../images/icon-sendphoto.png">
                    <form style="display: none" enctype="multipart/form-data">
                        <input type="file" ref="pfp" @change="savePhoto" accept=".jpg, .png">
                    </form>
                    
                </button>
                <!-- <img class="profile-picture" :src="src" alt="foto do professor"> -->
                
            </div>

            <div class="d-flex flex-row justify-content-between align-items-start w-100">
                <div class="profile-apresentation d-flex justify-content-start flex-column">
                    <h2 class="teacher-name">Professor {{professor.Name}}</h2>
                    <p class="teacher-expertise">{{professor.Area_of_Expertise}}</p>
                </div>
                <button v-if="editable" class="btn-configuration" @click="toggleMyData"> 
                    <img class="icon" src="../images/icon-configuration.png" alt="Projeto Interdisciplinar">
                    </i>{{ showMyData ? '': '' }}
                </button>
            </div>
        </div>

        <MyData v-if="showMyData" :professor="professor" :units="units" :courses="courses"></MyData>

    `,
    data() {
        return {
            showMyData: false,
            pfp: null,
            src: 'https://picsum.photos/200',
            token: window.localStorage.getItem('reposystem_token'),
            editable: false
        }
    },
    props:{
        id:{
            required: true
        },
        img:{
            type: String,
            required: true
        },
        professor:{
            required: true
        },
        units:{
            required: true
        },
        courses: {
            required: true
        },
        yours:{
            required: true
        }
    },
    watch:{
        yours(newer, older){
            if(newer){
                this.editable = true;
            }
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
        handleImg(){
            this.src = this.img;
        },
        uploadPhoto(){
            this.$refs.pfp.click();
        },
        savePhoto(event){

            const selecionados = event.target.files;
            this.pfp = selecionados;

            let formData = new FormData();
            formData.append('pfp', selecionados[0]);
            let url = backend_url+'/profilePicture/'+this.id;
            let options = {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Authorization': `Bearer ${this.token}`
                },
                body: formData
            };
        
            fetch(url, options)
            .then(response => response.json())
            .then(response => {
                
                if(response.status){
                    location.reload(true);
                }
                
            })
            .catch(error => {
                Swal.fire({
                    title: `${error.code} - Erro no registro`,
                    text: error,
                    icon: 'error'
                })
            });
        },
        isYours(){
            console.log(this.yours)
            if(this.yours==true){
                this.editable = true;
            }
        }
        
    },
    created() {
        this.handleImg();
        this.isYours();
    }
};

