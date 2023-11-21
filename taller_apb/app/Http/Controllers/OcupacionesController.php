<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Ocupaciones;
use Illuminate\Auth\Access\Response;

class OcupacionesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $rows = Ocupaciones::all();
        return new Response($rows);    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $input =$request ->all();
        $row = new Ocupaciones();
        $row ->id = $input['id'];
        $row ->nombre = $input['nombre'];
        $row->save();
        return new Response($request -> all());
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $row = Ocupaciones::find($id);
        if (empty($row)){
            return new Response('Señor usuario no existe el registro',404);
        }
        return $row;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $row = Ocupaciones::find($id);
        if (empty($row)){
            return new Response('Señor usuario no existe el registro',404);
        }
        $input =$request ->all();
        $row ->id = $input['id'];
        $row ->nombre = $input['nombre'];
        $row->save();
        return $row;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $row = Ocupaciones::find($id);
        if (empty($row)){
            return new Response('Señor usuario no existe el registro',404);
        }
        $row->delete();
        return "registro eliminado";
    }
}
