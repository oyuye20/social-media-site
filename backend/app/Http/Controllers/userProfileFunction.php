<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class userProfileFunction extends Controller
{
    public function getProfileByID($id){
        return User::with('user_info')->findOrFail($id);
    }
    public function updateUserProfile(Request $request){

    }
}
