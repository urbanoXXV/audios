<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Audios;

class GetAudiosController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $audio = Audios::first();
        $document = $audio->audio;

        $file_contents = base64_decode($document);

        return response($file_contents)
                ->header('Cache-Control', 'no-cache private')
                ->header('Content-Description', 'File Transfer')
                //->header('Content-Type', $document->mime_type)
                //->header('Content-length', strlen($file_contents))
                //->header('Content-Disposition', 'attachment; filename=' . $document->file_name)
                ->header('Content-Transfer-Encoding', 'binary');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
