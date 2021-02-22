/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

import VueRecord from '@codekraft-studio/vue-record'

window.Vue = require('vue').default;
Vue.use(VueRecord)

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

Vue.component('example-component', require('./components/ExampleComponent.vue').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
    data: {
        texto: '',
        url_audio : null,
        existe: false,
        edad: '',
        dni: '',
        audio: null,
        texto: '',
        sexo: ''
    },
    methods: {
        limpiar() {
            this.existe = false
            this.audio = null
        },
        onResult (data) {
            console.log(data)
            this.audio = data.slice(0, data.size, "audio/wav")
            console.log(this.audio)
            this.url_audio = URL.createObjectURL(this.audio)
            this.existe = true
        },
        enviar() {
            let vm = this
            let data = new FormData()
            var file = new File([vm.audio], "holi");
            data.append('dni', vm.dni)
            data.append('edad', vm.edad)
            data.append('sexo', vm.sexo)
            data.append('audio', file)
            
            let config = {
                header : {
                'Content-Type' : 'multipart/form-data'
                }
            }
            
            axios.post('setAudio', data, config).then(response => {
                console.log('response', response)
            }).catch(error => {
                console.log('error', error)
            })
        },
    },
    beforeMount() {
            let vm =this
            axios.post('getTexto', {
            })
            .then(function (response) {
                vm.texto = response.data
                //console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
});
