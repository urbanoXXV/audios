<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}" defer></script>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
</head>
<body>
    <div id="app">
        <div class="container">
            <div class="row mt-2">
                    <div class="col-3 col-md-3"></div>
                    <div class="col-12 col-md-6">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">TEXTO</h5>
                                <p class="card-text">@{{texto}}</p>
                            </div>
                        </div>
                        <small id="emailHelp" class="form-text text-muted">Grabar en un ambiente lo mas silencioso posible donde solo se escuche su voz</small>
                    </div>
                    <div class="col-3 col-md-3"></div>
            </div>
            <div class="row mt-2">
                <div class="col-12 d-flex justify-content-center">
                    <vue-record-audio mode="press" @result="onResult" @start="limpiar" />
                </div>
            </div>
            <div class="row mt-2">
                <div class="col-12 d-flex justify-content-center">
                    <small id="emailHelp" class="form-text text-muted">Presione para iniciar a grabar y vuelva a presionar para detener</small>
                </div>
            </div>
            <div class="row mt-2">
                <div class="col-12 d-flex justify-content-center">
                    <audio v-if="existe" id="audio" controls>
                        <source id="source" :src="url_audio" type="audio/wav"/>
                    </audio>
                </div>
            </div>
            <div class="row mt-2">
                <div class="col-4"></div>
                <div class="col-4">
                    <label for="exampleFormControlInput1">DNI</label>
                    <input class="form-control" v-model="dni" type="number">
                    <!--<small id="emailHelp" class="form-text text-muted">Se utilizara solo para identificar a quien le pertenece audio</small>-->
                </div>
                <div class="col-4"></div>
            </div>
            <div class="row mt-2">
                <div class="col-4"></div>
                <div class="col-4">
                    <label for="exampleFormControlInput1" >Edad</label>
                    <input class="form-control" v-model="edad" type="number">
                </div>
                <div class="col-4"></div>
            </div>
            <div class="row mt-2">
                <div class="col-4"></div>
                <div class="col-4">
                    <label for="exampleFormControlInput1">Sexo: </label>
                    <div class="form-check form-check-inline">
                      <input v-model="sexo" class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="M">
                        <label class="form-check-label" for="inlineRadio1">M</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input v-model="sexo" class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="F">
                        <label class="form-check-label" for="inlineRadio2">F</label>
                    </div>
                </div>
                <div class="col-4"></div>
            </div>
            <div class="row mt-1">
                <div class="col-12 d-flex justify-content-center">
                    <small id="emailHelp" class="form-text text-muted"><strong>Importante!!</strong> Luego de terminar el proyecto los datos se eliminaran</small>
                </div>
            </div>
            <div class="row mt-1">
                <div class="col-12 d-flex justify-content-center">
                    <button class="btn btn-success" v-on:click="enviar">Enviar Audio</button>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
