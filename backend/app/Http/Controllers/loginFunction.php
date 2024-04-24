<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class loginFunction extends Controller
{
    public function loginUser(Request $request){
        $validate = $request->validate([
            'email' => 'required',
            'password' => 'required',
        ]);

        if(Auth::attempt($validate)){
            Auth::user();

            return response([
                'message' => 'Successfuly logged in',
            ]);   
        }else {
            return response(
                'Incorrect email or password please try again'
            , 422);
        }
    }

    public function registerUser (Request $request){
        $data = $request->validate([
            'email' => 'required|unique:users|max:60',
            'password' => 'required',
            'name' => 'required|max:100',
        ]);

        $user = User::create([
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
            'name' => $data['name'],
        ]);

        return response([
            'user' => $user
        ]);
    }

    public function logout(Request $request){
        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();
        
        return response()->json(['message' => 'Successfully logged out']);
    }
}
