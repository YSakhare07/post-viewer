<?php

namespace App\Http\Controllers\Authlar\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Http\Resources\Auth\AuthResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function login(LoginRequest $request){

        $user = User:: where( 'email', $request->email) -> first();

        if (!$user || !Hash:: check($request->password, $user->password)) {
        throw ValidationException:: withMessages([
        'password' => ['The provided credentials are incorrect.'],
        ]);
    }
        return $this -> makeToken($user);
    }    

    public function register(RegisterRequest $request)
    { 
        $user = User::create($request -> validated());
        return $this -> makeToken($user);
        
    }

    public function makeToken($user){
        $token = $user -> createToken('myToken') -> plainTextToken;
    
        return AuthResource::make([
            'token' => $token,
            'user' => [
                'name' => $user->name,
                'email' => $user->email,
            ],
        ]);
    }

    public function logout(Request $request){
        $request -> user() -> tokens() -> delete();
        return response() -> json([ 'message' => 'Logout Success'], 200);
    }
}