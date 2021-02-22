<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AudiosController;
use App\Http\Controllers\GetAudiosController;
use App\Http\Controllers\TextoController;
use App\Http\Controllers\SetTextosController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::apiResource('/setAudio', AudiosController::class);
Route::apiResource('/getTexto', TextoController::class);
Route::apiResource('/getAudios', GetAudiosController::class);
Route::apiResource('/setTextos', SetTextosController::class);



Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
