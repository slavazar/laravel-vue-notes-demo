<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\NoteController;
use App\Http\Controllers\Api\CategoryController;

/*
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
 * 
 */

Route::get('/user', UserController::class);

Route::middleware(['auth:sanctum'])->group(function () {
    //notes
    Route::get('/notes/count', [NoteController::class, 'count']);
    Route::resource('notes', NoteController::class);
    
    //categories
    Route::get('/categories/list', [CategoryController::class, 'list']);
    Route::get('/categories/count', [CategoryController::class, 'count']);
    Route::resource('categories', CategoryController::class);
});


