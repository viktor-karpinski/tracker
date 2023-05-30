<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Date;

class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;

    public function dashboard()
    {
        $todos = Todo::where('user_id', Auth::user()->id)->get();
        return view('dashboard', ['todos' => $todos]);
    }

    public function test(Request $request)
    {
        $date = date('Y/m/d');
        return response()->json([
            'message' => $date,
        ], 200);
    }
}
