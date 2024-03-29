<?php

use Illuminate\Support\Facades\Route;
use Laravel\Socialite\Facades\Socialite;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/login/facebook', function () {
    return Socialite::driver('facebook')->redirect();
})->name('facebook.login');

Route::get('/login/facebook/callback', 'App\Http\Controllers\Authlar\Auth\LoginController@handleFacebookCallback');