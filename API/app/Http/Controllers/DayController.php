<?php

namespace App\Http\Controllers;

use App\Models\Day;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DayController extends Controller
{
    public function get_today()
    {
        $day = Day::where([
            ['user_id', Auth::user()->id],
            ['date', date('Y/m/d')]
        ])->get()->first();
        return response()->json(['day' => $day], 200);
    }

    public function get_day($date)
    {
        $day = Day::where([
            ['user_id', Auth::user()->id],
            ['date', date($date)]
        ]);
        if ($day->exists()) {
            return response()->json(['day' => $day->first()], 200);
        } else {
            $day = new Day();
            $day->user_id = Auth::user()->id;
            $day->date = date($date);
            $day->kcal = 0;
            $day->protein = 0;
            $day->fat = 0;
            $day->saturated_fat = 0;
            $day->carbs = 0;
            $day->salt = 0;
            $day->sugar = 0;
            $day->fibre = 0;
            $day->save();
            return response()->json(['day' => $day], 200);
        }
    }

    public function wake_up(Request $request, Day $day)
    {
        if ($day->user_id === Auth::user()->id) {
            $day->wake_up = $request->wake_up;
            $day->save();
            return response()->json(['message' => 'wake up time noted'], 200);
        }
        return response()->json(['message' => 'not your day'], 405);
    }

    public function sleep(Request $request, Day $day)
    {
        if ($day->user_id === Auth::user()->id) {
            $day->sleep = $request->sleep;
            $day->save();
            return response()->json(['message' => 'sleep time noted'], 200);
        }
        return response()->json(['message' => 'not your day'], 405);
    }

    public function eating_start(Request $request, Day $day)
    {
        if ($day->user_id === Auth::user()->id) {
            $day->eating_start = $request->eating_start;
            $day->save();
            return response()->json(['message' => 'eating time noted'], 200);
        }
        return response()->json(['message' => 'not your day'], 405);
    }

    public function eating_end(Request $request, Day $day)
    {
        if ($day->user_id === Auth::user()->id) {
            $day->eating_end = $request->eating_end;
            $day->save();
            return response()->json(['message' => 'eating time noted'], 200);
        }
        return response()->json(['message' => 'not your day'], 405);
    }

    public function rating(Request $request, Day $day)
    {
        if ($day->user_id === Auth::user()->id) {
            $day->rating = $request->rating;
            $day->save();
            return response()->json(['message' => 'rating noted'], 200);
        }
        return response()->json(['message' => 'not your day'], 405);
    }
}
