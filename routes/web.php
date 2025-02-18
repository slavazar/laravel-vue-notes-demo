<?php

use Illuminate\Support\Facades\Route;
//use Illuminate\Http\Request;

Route::get('/', function () {
    return view('main');
    //return view('welcome');
});

require __DIR__.'/auth.php';

Route::get('/{vue_capture?}', function() {
    return view('main');
})->where('vue_capture', '[\/\w\.-]*');
