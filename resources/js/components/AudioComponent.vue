<template>
    <div class="container">
        <div class="row mt-4 d-flex justify-content-center">
            <div class="col-6 d-flex justify-content-center">
                <button v-on:click="grabar" class="btn btn-success"><i class="fas fa-play"></i> Predecir</button>
            </div>
            <div class="col-6 d-flex justify-content-center">
                <button v-on:click="parar = true" class="btn btn-danger"><i class="fas fa-stop"></i> Detener</button>
            </div>
        </div>
        <div class="row mt-4 d-flex justify-content-center">
            <div class="col-4">
                <div class="alert alert-info" role="alert">
                    {{locutor}}
                </div>
            </div>
        </div>
        <!--<div v-for="url_audio in url_audios" class="row mt-2">
            <div class="col-12 d-flex justify-content-center">
                <audio id="audio" controls>
                    <source id="source" :src="url_audio" type="audio/wav"/>
                </audio>
            </div>
        </div>-->
    </div>
</template>

<script>
    let gumStream; 						//stream from getUserMedia()
    let rec; 							//Recorder.js object
    let input;
    var AudioContext = window.AudioContext || window.webkitAudioContext;
    var audioContext //audio context to help us record

    export default {
        data: function () {
            return {
                url_audios: [],
                parar: false,
                locutor: null,
            }
        },
        mounted() {
            console.log('Component mounted.')
        },
        methods: {
            grabar() {
                var vm = this
                vm.parar = false
                console.log("recordButton clicked");
                //this.limpiar()
                var constraints = { audio: true, video: false }
                this.boton_grabar = false
                this.boton_pausar = true
                this.boton_detener = true

                navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
                    //console.log("getUserMedia() success, stream created, initializing Recorder.js ...");
                    audioContext = new AudioContext();
                    gumStream = stream;
                    input = audioContext.createMediaStreamSource(stream);
                    rec = new Recorder(input, { numChannels: 1 })
                    //start the recording process
                    rec.record()
                    console.log("Recording started");
                    setTimeout(function(){ vm.detener() }, 5000);
                }).catch(function (err) {
                    console.log(err)
                });
                
            },
            detener() {
                var vm = this
                rec.stop()
                gumStream.getAudioTracks()[0].stop();
                rec.exportWAV(function(blob) {
                    console.log(blob)
                    var url = URL.createObjectURL(blob)
                    vm.url_audios.push(url)
                    console.log(url)
                    vm.enviar(blob)
                });
                if(!vm.parar) {
                    this.grabar()
                    console.log("Inicia Otra");
                } else {
                    console.log("Se detuvo");
                }
            },
            enviar(blob) {
                let vm = this
                let data = new FormData()
                var file = new File([blob], "holi");

                data.append('audio', file)

                let config = {
                    header: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
                axios.post('predecir', data, config).then(response => {
                    console.log('response', response)
                    if (response.data == 0) {
                        vm.locutor = "Alonso"
                    } else if(response.data == 1) {
                        vm.locutor = "JeanCarlos"
                    } else if(response.data == 2) {
                        vm.locutor = "Jhony"
                    } else if(response.data == 3) {
                        vm.locutor = "Jorge"
                    } else if(response.data == 4) {
                        vm.locutor = "Luis"
                    } else if(response.data == 5) {
                        vm.locutor = "Otros"
                    }
                    
                }).catch(error => {
                    console.log('error', error)
                })
                
            },
        }
    }
</script>
