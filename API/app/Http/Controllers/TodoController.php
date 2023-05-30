<?php

namespace App\Http\Controllers;

use App\Models\Day;
use App\Models\Todo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TodoController extends Controller
{
    public function todos()
    {
        $todos = Todo::where([
            ['user_id', Auth::user()->id],
            ['completed', false],
            ['todo_id', null]
        ])->get();

        $data = $this->get_todos($todos);

        return response()->json([
            'todos' => $data,
        ], 200);
    }

    public function get_todos($todos)
    {
        $data = [];
        foreach ($todos as $todo) {
            $sub_todos = Todo::where('todo_id', $todo->id)->orderBy('completed', 'ASC')->get();
            $sub_data = [];
            foreach ($sub_todos as $sub_todo) {
                $sub_data[] = [
                    'id' => $sub_todo->id,
                    'title' => $sub_todo->title,
                    'description' => $sub_todo->description,
                    'vpoints' => $sub_todo->vpoints,
                    'deadline' => $sub_todo->deadline,
                    'completed' => $sub_todo->completed,
                    'completed_time' => $sub_todo->completed_time,
                ];
            }
            $data[] = [
                'id' => $todo->id,
                'title' => $todo->title,
                'description' => $todo->description,
                'vpoints' => $todo->vpoints,
                'deadline' => $todo->deadline,
                'completed' => $todo->completed,
                'completed_time' => $todo->completed_time,
                'todos' => $sub_data,
            ];
        }
        return $data;
    }

    public function add_todo(Request $request)
    {
        $request->validate([
            'title' => 'required|min:3|max:255',
        ]);

        $todo = new Todo();
        $todo->title = $request->title;
        $todo->description = $request->description;
        $todo->deadline = $request->deadline;
        $todo->vpoints = $request->vpoints;
        $todo->user_id = Auth::user()->id;
        if (isset($request->todo_id)) {
            if (Todo::where('id', $request->todo_id)->exists()) {
                $todo->todo_id = $request->todo_id;
            }
        }
        $todo->save();

        $todos = Todo::where([
            ['user_id', Auth::user()->id],
            ['completed', false],
            ['todo_id', null]
        ])->get();

        $data = $this->get_todos($todos);

        return response()->json([
            'todos' => $data,
        ], 200);
    }

    public function edit_todo(Request $request, Todo $todo)
    {
        if ($todo->user_id === Auth::user()->id && $todo->completed === 0) {
            $request->validate([
                'title' => 'required|min:3|max:255',
            ]);

            $todo->title = $request->title;
            $todo->description = $request->description;
            $todo->deadline = $request->deadline;
            $todo->vpoints = $request->vpoints;
            if (isset($request->todo_id)) {
                if (Todo::where('id', $request->todo_id)->exists()) {
                    $todo->todo_id = $request->todo_id;
                }
            }
            $todo->save();
            $sub_todos = Todo::where('todo_id', $todo->id)->orderBy('completed', 'ASC')->get();
            $sub_data = [];
            foreach ($sub_todos as $sub_todo) {
                $sub_data[] = [
                    'id' => $sub_todo->id,
                    'title' => $sub_todo->title,
                    'description' => $sub_todo->description,
                    'vpoints' => $sub_todo->vpoints,
                    'deadline' => $sub_todo->deadline,
                    'completed' => $sub_todo->completed,
                    'completed_time' => $sub_todo->completed_time,
                ];
            }
            $todo->todos = $sub_todos;
            $todos = Todo::where([
                ['user_id', Auth::user()->id],
                ['completed', false],
                ['todo_id', null]
            ])->get();

            $data = $this->get_todos($todos);

            return response()->json(['todo' => $todo, 'todos' => $data], 200);
        }
        return response()->json([], 405);
    }

    public function complete_todo(Todo $todo)
    {
        if ($todo->user_id === Auth::user()->id && $todo->completed === 0) {
            $todo->completed = 1;
            $todo->completed_time = date('Y/m/d g:i:s');
            $todo->save();

            $day = Day::where([
                ['user_id', Auth::user()->id],
                ['date', date('Y/m/d')]
            ])->get()->first();
            $day->vpoints += $todo->vpoints;
            $day->save();

            $todos = Todo::where([
                ['user_id', Auth::user()->id],
                ['completed', false],
                ['todo_id', null]
            ])->get();

            $data = $this->get_todos($todos);

            return response()->json([
                'todos' => $data,
            ], 200);
        }
        return response()->json([], 405);
    }

    public function un_complete_todo(Todo $todo)
    {
        if ($todo->user_id === Auth::user()->id && $todo->completed === 1) {
            $todo->completed = 0;
            $todo->completed_time = null;
            $todo->save();

            $day = Day::where([
                ['user_id', Auth::user()->id],
                ['date', date('Y/m/d')]
            ])->get()->first();
            $day->vpoints -= $todo->vpoints;
            $day->save();

            $todos = Todo::where([
                ['user_id', Auth::user()->id],
                ['completed', false],
                ['todo_id', null]
            ])->get();

            $data = $this->get_todos($todos);

            return response()->json([
                'todos' => $data,
            ], 200);
        }
        return response()->json([], 405);
    }

    public function delete_todo(Todo $todo)
    {
        if ($todo->user_id === Auth::user()->id) {
            $todo->delete();
            $todos = Todo::where([
                ['user_id', Auth::user()->id],
                ['completed', false],
                ['todo_id', null]
            ])->get();

            $data = $this->get_todos($todos);

            return response()->json([
                'todos' => $data,
            ], 200);
        }
        return response()->json([], 405);
    }
}
