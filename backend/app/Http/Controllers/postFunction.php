<?php

namespace App\Http\Controllers;

use App\Models\posts;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class postFunction extends Controller
{
    public function getPost(){
        return User::with('user_info')->get();
    }

    public function createPost(Request $request){
        $request->validate([
            'description' => 'required',
            'image' => 'nullable|mimes:png,jpg,jpeg'
        ]);

        if($request->has('image')){
            $file = $request->file('image');
            $extension = $file->getClientOriginalExtension();

            $filenameIMG = time().'.'.$extension;
            $file->move('image',$filenameIMG);
        }

        posts::create([
            'user_id' => Auth::id(),
            'total_likes' => 0,
            'total_comment' => 0,
            'description' => $request->description,
            'image' => $filenameIMG
        ]);


        return response('success');        
    }
}
