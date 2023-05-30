@extends('master')

@section('heading')
    Dashboard
@endsection

@section('content')
<form action="{{ route('logout') }}" method="POST">
@csrf
<button type="submit">logout</button>
</form>
<form action="{{ route('add_todo') }}" method="POST">
    @csrf
    {{$errors}}
    <div>
        <label for="title">
            title
        </label>
        <input type="text" id="title" name="title">
    </div>
    <div>
        <label for="description">
            description
        </label>
        <input type="text" id="description" name="description">
    </div>
    <div>
        <label for="deadline">
            deadline
        </label>
        <input type="date" id="deadline" name="deadline">
    </div>
    <div>
        <label for="vpoints">
            v-points
        </label>
        <input type="number" id="vpoints" name="vpoints">
    </div>
    <button type="submit">
        add todo
    </button>
</form>

<section>
    @foreach($todos as $todo)
    <article>
        <input type="checkbox" {{ ($todo->completed) ? 'checked' : '' }}> {{ $todo->title }}
    </article>
    @endforeach
</section>
@endsection