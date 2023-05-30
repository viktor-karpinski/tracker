<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\Controller;
use App\Http\Controllers\DayController;
use App\Http\Controllers\FoodController;
use App\Http\Controllers\TodoController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('login', [AuthController::class, 'login']);
Route::post('signup', [AuthController::class, 'signup']);

Route::get('test', [Controller::class, 'test']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('day', [DayController::class, 'get_today']);
    Route::get('day/{date}', [DayController::class, 'get_day']);
    Route::post('day/wake-up/{day}', [DayController::class, 'wake_up']);
    Route::post('day/sleep/{day}', [DayController::class, 'sleep']);
    Route::post('day/eating-start/{day}', [DayController::class, 'eating_start']);
    Route::post('day/eating-end/{day}', [DayController::class, 'eating_end']);
    Route::post('day/rating/{day}', [DayController::class, 'rating']);

    Route::get('food/eaten/{date}', [FoodController::class, 'eaten']);

    Route::get('todos', [TodoController::class, 'todos']);

    Route::post('todo', [TodoController::class, 'add_todo']);
    Route::put('todo/{todo}', [TodoController::class, 'edit_todo']);
    Route::delete('todo/{todo}', [TodoController::class, 'delete_todo']);
    Route::put('todo/complete/{todo}', [TodoController::class, 'complete_todo']);
    Route::put('todo/un/complete/{todo}', [TodoController::class, 'un_complete_todo']);

    Route::get('food', [FoodController::class, 'index']);
    Route::post('food', [FoodController::class, 'store']);
    Route::post('food/eat', [FoodController::class, 'eat']);

    Route::get('tags', [FoodController::class, 'get_tags']);
    Route::post('tag', [FoodController::class, 'store_tag']);
    Route::put('tag/{food}/{tag}', [FoodController::class, 'store_tag']);
});
