<?php

use App\Http\Controllers\loginFunction;
use App\Http\Controllers\postFunction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Models\User;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::prefix('v1')->group(function(){

    Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
        return User::with('user_info')->find(Auth::id());
    });

    /* PUBLIC ROUTE */
    Route::prefix('auth')->group(function(){
        Route::post('login', [loginFunction::class, 'loginUser']);
        Route::post('register', [loginFunction::class, 'registerUser']);
    });

    /* PROTECTED ROUTES */
    Route::middleware(['auth:sanctum'])->group(function (){
        Route::post('logout', [loginFunction::class, 'logout']);
    
        Route::prefix('post')->group(function(){
            Route::post('create',[postFunction::class, 'createPost']);
            /* Route::get('/',[postFunction::class, 'createPost']);
            Route::put('update',[postFunction::class, 'createPost']);
            Route::patch('update2',[postFunction::class, 'createPost']);
            Route::delete('delete',[postFunction::class, 'createPost']); */
        });
    
        /* RESERVED ROUTE (NOT CONFIGURED PROPERLY) */
        Route::prefix('comment')->group(function(){
            Route::get('/',[postFunction::class, 'createPost']);
            Route::post('create',[postFunction::class, 'createPost']);
            Route::put('update',[postFunction::class, 'createPost']);
            Route::patch('update2',[postFunction::class, 'createPost']);
            Route::delete('delete',[postFunction::class, 'createPost']);
        });
        
    });

});