<?php

use App\Http\Controllers\commentFunction;
use App\Http\Controllers\loginFunction;
use App\Http\Controllers\postFunction;
use App\Http\Controllers\userProfileFunction;
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

    Route::get('/websocket', function(){
        event(new App\Events\notification());

        dd('fired..');
    });


    Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
        return User::with('user_info')->find(Auth::id());
    });

    /* PUBLIC ROUTE */
    Route::prefix('auth')->group(function(){
        Route::post('login', [loginFunction::class, 'loginUser']);
        Route::post('register', [loginFunction::class, 'registerUser']);
    });


    /* FOR TESTING */
    Route::get('get',[commentFunction::class, 'getCommentsByID']);

    Route::prefix('post')->group(function(){
        Route::post('create',[postFunction::class, 'createPost']);
        
        Route::delete('delete/{id}',[postFunction::class, 'deletePost']);
        Route::get('/{id?}',[postFunction::class, 'getPost']);
        Route::put('update/{id}',[postFunction::class, 'updatePost']);
    });




    /* PROTECTED ROUTES */
    Route::middleware(['auth:sanctum'])->group(function (){
        Route::post('logout', [loginFunction::class, 'logout']);
        
        /* POST ROUTE FUNCTION */
        Route::prefix('post')->group(function(){
            /* Route::get('/{id?}',[postFunction::class, 'getPost']); */


            /* Route::get('get/{id}',[postFunction::class, 'getPostByID']); */
            
            Route::post('like',[postFunction::class, 'likePostFunction']);
            /* Route::put('update/{id}',[postFunction::class, 'createPost']); */
            Route::delete('delete',[postFunction::class, 'deletePost']);
        });
        
        /* RESERVED ROUTE (NOT CONFIGURED PROPERLY) */
        Route::prefix('comment')->group(function(){
            Route::get('/',[commentFunction::class, '']);
            Route::post('create',[commentFunction::class, 'addComment']);
            
            Route::patch('update2',[commentFunction::class, '']);
            Route::delete('delete',[commentFunction::class, '']);
        });

        /* ROUTE FOR UPDATE USER PROFILE */
        Route::prefix('profile')->group(function(){
            Route::post('update', [userProfileFunction::class, 'updateUserProfile']);
        });


        
    });

});