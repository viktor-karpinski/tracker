<?php

namespace App\Http\Controllers;

use App\Models\Day;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $user = User::where('email', $request->email);
        if ($user->exists()) {
            $user = $user->first();
            if (Hash::check($request->password, $user->password)) {
                Auth::login($user);
                $token = $user->createToken($user->email)->plainTextToken;
                $user->token = $token;
                $user->save();
                return response()->json(['token' => $token], 200);
            }
        }

        return response()->json(['message' => ':('], 422);
    }

    public function signup(Request $request)
    {
        $request->validate([
            'email' => 'required|min:3|max:32|unique:users',
            'password' => 'required|min:8|max:64',
        ]);

        $user = new User();
        $user->email = $request->email;
        $user->password = $request->password;
        $user->token = '';
        $user->save();

        $token = $user->createToken($user->email)->plainTextToken;
        $user->token = $token;
        $user->save();

        $day = new Day();
        $day->user_id = $user->id;
        $day->date = date('Y/m/d');
        $day->save();

        return response()->json(['token' => $token], 200);
    }

    public function logout(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }

    public function viewLogin()
    {
        $pwd = Hash::make('password');
        return view('login', ['pwd' => $pwd]);
    }
}
