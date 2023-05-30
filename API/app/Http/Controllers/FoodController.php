<?php

namespace App\Http\Controllers;

use App\Models\Day;
use App\Models\EatenFood;
use App\Models\Food;
use App\Models\FoodTag;
use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FoodController extends Controller
{
    public function get_food()
    {
        $food = [];
        $tags = Tag::where('user_id', Auth::user()->id)->get();

        foreach ($tags as $tag) {
            $food_tags = FoodTag::where('tag_id', $tag->id)->get();
            $tf = [];
            foreach ($food_tags as $food_tag) {
                $tf[] = Food::where('id', $food_tag->food_id)->get();
            }
            $food[] = [$tag->name => $tf];
        }

        $foods = Food::all();
        foreach ($foods as $f) {
            if (!in_array($f, $food)) {
                $food[] = $f;
            }
        }

        return $food;
    }

    public function index()
    {
        return response()->json([
            'food' => $this->get_food(),
        ], 200);
    }

    public function calc_eaten($day)
    {
        $data = [];
        $eaten_foods = EatenFood::where('day_id', $day->id)->get();
        foreach ($eaten_foods as $eaten_food) {
            $food = Food::find($eaten_food->food_id);
            if (str_contains($food->serving, " ")) {
                $serving = explode(' ', $food->serving);
                $amount = floor((int)$serving[0] * $eaten_food->factor) . 'x';
            } else {
                $amount = floor((int)substr($food->serving, 0, 3)  * $eaten_food->factor) . substr($food->serving, 3, strlen($food->serving));
            }
            $data[] = [
                'name' => $food->name,
                "amount" => $amount,
            ];
        }
        return $data;
    }

    public function eaten($date)
    {
        $day = Day::where([
            ['user_id', Auth::user()->id],
            ['date', $date],
        ])->first();

        return response()->json([
            'food' => $this->calc_eaten($day),
        ], 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|max:128|min:3',
            'kcal' => 'required',
            'protein' => 'required',
            'carbs' => 'required',
            'fat' => 'required',
            'saturated_fat' => 'required',
            'sugar' => 'required',
            'salt' => 'required',
            'fibre' => 'required',
            'serving' => 'required',
        ]);

        $food = new Food();
        $food->name = $request->name;
        $food->kcal = $request->kcal;
        $food->protein = $request->protein;
        $food->fat = $request->fat;
        $food->saturated_fat = $request->saturated_fat;
        $food->carbs = $request->carbs;
        $food->fibre = $request->fibre;
        $food->sugar = $request->sugar;
        $food->salt = $request->salt;
        $food->serving = $request->serving;
        $food->save();

        return response()->json([
            'food' => $this->get_food(),
        ], 200);
    }

    public function eat(Request $request)
    {
        $request->validate([
            'factor' => 'required|numeric',
            'date' => 'required',
            'food_id' => 'required',
        ]);

        $day = Day::where([
            ['date', $request->date],
            ['user_id', Auth::user()->id],
        ])->first();
        $food = Food::find($request->food_id);

        $eaten_food = EatenFood::where([
            ['day_id', $day->id],
            ['food_id', $food->id],
        ]);

        if ($eaten_food->exists()) {
            $eaten_food = $eaten_food->first();
            $eaten_food->factor += $request->factor;
            $eaten_food->save();
        } else {
            $eaten_food = new EatenFood();
            $eaten_food->day_id = $day->id;
            $eaten_food->food_id = $food->id;
            $eaten_food->user_id = Auth::user()->id;
            $eaten_food->factor = $request->factor;

            $eaten_food->save();
        }

        $day->kcal = 0;
        $day->protein = 0;
        $day->fat = 0;
        $day->carbs = 0;
        $day->saturated_fat = 0;
        $day->sugar = 0;
        $day->salt = 0;
        $day->fibre = 0;

        $eaten_foods = EatenFood::where('day_id', $day->id)->get();
        foreach ($eaten_foods as $eaten_food) {
            $food = Food::find($eaten_food->food_id);
            $day->kcal += $food->kcal * $eaten_food->factor;
            $day->protein += $food->protein * $eaten_food->factor;
            $day->fat += $food->fat * $eaten_food->factor;
            $day->saturated_fat += $food->saturated_fat * $eaten_food->factor;
            $day->carbs += $food->carbs * $eaten_food->factor;
            $day->fibre += $food->fibre * $eaten_food->factor;
            $day->salt += $food->salt * $eaten_food->factor;
            $day->sugar += $food->sugar * $eaten_food->factor;
        }

        $day->save();

        return response()->json([
            'day' => $day,
            'food' => $this->calc_eaten($day),
        ], 200);
    }

    public function get_tags()
    {
        $tags = Tag::where('user_id', Auth::user()->id)->get();
        return response()->json([
            'tags' => $tags
        ], 200);
    }

    public function store_tag(Request $request)
    {
        $request->validate([
            'name' => 'required|max:32',
        ]);

        $tag = new Tag();
        $tag->name = $request->name;
        $tag->user_id = Auth::user()->id;
        $tag->save();

        $tags = Tag::where('user_id', Auth::user()->id)->get();

        return response()->json([
            'tags' => $tags
        ], 200);
    }

    public function set_tag(Food $food, Tag $tag)
    {
        if ($tag->user_id === Auth::user()->id) {
            $food_tag = new FoodTag();
            $food_tag->food_id = $food->id;
            $food_tag->tag_id = $tag->id;
            $food_tag->save();

            return response()->json([
                'food' => $this->get_food(),
            ]);
        }
    }
}
