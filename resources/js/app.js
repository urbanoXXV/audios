/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

//import VueRecord from '@codekraft-studio/vue-record'
//import AudioRecorder from 'vue-audio-recorder'

window.Vue = require('vue').default;
//Vue.use(VueRecord)
//Vue.use(AudioRecorder)

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
Vue.component('predecir-audio', require('./components/AudioComponent.vue').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

let gumStream; 						//stream from getUserMedia()
let rec; 							//Recorder.js object
let input;
var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioContext //audio context to help us record

const app = new Vue({
    el: '#app',
    data: {
        texto: '',
        url_audio: null,
        existe: false,
        edad: '',
        dni: '',
        audio: null,
        texto: '',
        sexo: '',
        gumStream: null,
        rec: null,
        input: null,
        boton_grabar: true,
        boton_pausar: false,
        boton_detener: false,
        cargando: false,
    },
    methods: {
        llamada(data) {
            console.log(data)
        },
        limpiar() {
            this.existe = false
            this.audio = null
        },
        onResult(data) {
            console.log(data)
            this.audio = data.slice(0, data.size, "audio/wav")
            console.log(this.audio)
            this.url_audio = URL.createObjectURL(this.audio)
            this.existe = true
        },
        cambiartexto() {
            let vm = this
            axios.post('getTexto', {
            })
                .then(function (response) {
                    vm.texto = response.data
                    //console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        enviar() {
            this.cargando = true
            let run = true
            let vm = this
            let data = new FormData()
            var file = new File([vm.audio], "holi");
            if (vm.audio == null) {
                alert("Grabe un audio")
                run = false
                vm.cargando = false
                return false
            }
            if (vm.dni == '') {
                alert("Ingrese su DNI")
                run = false
                vm.cargando = false
                return false
            }
            if (vm.edad == '') {
                alert("Ingrese su edad")
                run = false
                vm.cargando = false
                return false
            }
            if (vm.sexo == '') {
                alert("Ingrese su sexo")
                run = false
                vm.cargando = false
                return false
            }

            data.append('dni', vm.dni)
            data.append('edad', vm.edad)
            data.append('sexo', vm.sexo)
            data.append('audio', file)

            let config = {
                header: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            if (run) {
                axios.post('setAudio', data, config).then(response => {
                    console.log('response', response)
                    $('#myModal').modal('show')
                    this.limpiar()
                    this.cambiartexto()
                    vm.cargando = false
                }).catch(error => {
                    vm.cargando = false
                    console.log('error', error)
                })
            } else {
                vm.cargando = false
            }
        },
        grabar() {
            console.log("recordButton clicked");
            this.limpiar()
            var constraints = { audio: true, video: false }
            this.boton_grabar = false
            this.boton_pausar = true
            this.boton_detener = true

            navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
                console.log("getUserMedia() success, stream created, initializing Recorder.js ...");
                /*
                    create an audio context after getUserMedia is called
                    sampleRate might change after getUserMedia is called, like it does on macOS when recording through AirPods
                    the sampleRate defaults to the one set in your OS for your playback device
                */
                audioContext = new AudioContext();

                //update the format 
                //document.getElementById("formats").innerHTML="Format: 1 channel pcm @ "+audioContext.sampleRate/1000+"kHz"

                /*  assign to gumStream for later use  */
                gumStream = stream;

                /* use the stream */
                input = audioContext.createMediaStreamSource(stream);

                /* 
                    Create the Recorder object and configure to record mono sound (1 channel)
                    Recording 2 channels  will double the file size
                */
                rec = new Recorder(input, { numChannels: 1 })

                //start the recording process
                rec.record()

                console.log("Recording started");

            }).catch(function (err) {
                console.log(err)
                /*enable the record button if getUserMedia() fails
                recordButton.disabled = false;
                stopButton.disabled = true;
                pauseButton.disabled = true
                */
            });
        },
        pausar() {
            console.log("pauseButton clicked rec.recording=", rec.recording);
            if (rec.recording) {
                //pause
                rec.stop();
                //pauseButton.innerHTML="Resume";
            } else {
                //resume
                rec.record()
                //pauseButton.innerHTML="Pause";

            }
        },
        detener() {
            console.log("stopButton clicked");

            this.boton_grabar = true
            this.boton_pausar = false
            this.boton_detener = false

            //reset button just in case the recording is stopped while paused
            //pauseButton.innerHTML="Pause";

            //tell the recorder to stop the recording
            rec.stop();

            //stop microphone access
            gumStream.getAudioTracks()[0].stop();

            //create the wav blob and pass it on to createDownloadLink
            rec.exportWAV(this.createDownloadLink);
        },
        createDownloadLink(blob) {
            console.log(blob)
            this.audio = blob
            this.url_audio = URL.createObjectURL(this.audio)
            this.existe = true
            //this.enviar()
            /*var url = URL.createObjectURL(blob);
            var au = document.createElement('audio');
            var li = document.createElement('li');
            var link = document.createElement('a');

            //name of .wav file to use during upload and download (without extendion)
            var filename = new Date().toISOString();

            //add controls to the <audio> element
            au.controls = true;
            au.src = url;

            //save to disk link
            link.href = url;
            link.download = filename+".wav"; //download forces the browser to donwload the file using the  filename
            link.innerHTML = "Save to disk";

            //add the new audio element to li
            li.appendChild(au);
            
            //add the filename to the li
            li.appendChild(document.createTextNode(filename+".wav "))

            //add the save to disk link to li
            li.appendChild(link);
            
            //upload link
            var upload = document.createElement('a');
            upload.href="#";
            upload.innerHTML = "Upload";
            upload.addEventListener("click", function(event){
                var xhr=new XMLHttpRequest();
                xhr.onload=function(e) {
                    if(this.readyState === 4) {
                        console.log("Server returned: ",e.target.responseText);
                    }
                };
                var fd=new FormData();
                fd.append("audio_data",blob, filename);
                xhr.open("POST","upload.php",true);
                xhr.send(fd);
            })
            li.appendChild(document.createTextNode (" "))//add a space in between
            li.appendChild(upload)//add the upload link to li

            //add the li element to the ol
            //recordingsList.appendChild(li);*/
        }
    },
    beforeMount() {
        let vm = this
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
