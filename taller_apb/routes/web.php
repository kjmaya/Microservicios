<?php

/** @var \Laravel\Lumen\Routing\Router $router */

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    return $router->app->version();
});
$router ->get('docentes','DocenteController@index');
$router ->get('docentes/{id}','DocenteController@show');
$router ->post('docentes','DocenteController@store');
$router ->put('docentes/{id}','DocenteController@update');
$router ->delete('docentes/{id}','DocenteController@destroy');
// $router ->get('curso','CursoController@index');
// $router ->get('ocupaciones','OcupacionesController@index');

$router ->get('curso','CursoController@index');
$router ->get('curso/{id}','CursoController@show');
$router ->post('curso','CursoController@store');
$router ->put('curso/{id}','CursoController@update');
$router ->delete('curso/{id}','CursoController@destroy');

$router ->get('ocupaciones','OcupacionesController@index');
$router ->get('ocupaciones/{id}','OcupacionesController@show');
$router ->post('ocupaciones','OcupacionesController@store');
$router ->put('ocupaciones/{id}','OcupacionesController@update');
$router ->delete('ocupaciones/{id}','OcupacionesController@destroy');