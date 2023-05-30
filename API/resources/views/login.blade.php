@extends('master')

@section('heading')
    Login
@endsection

@section('content')
<form action="{{ route('login') }}" method="POST">
    @csrf
    {{$errors}}
    {{$pwd}}
    <div>
        <label for="username">
            username
        </label>
        <input type="text" id="username" name="username" placeholder="viktor">
    </div>
    <div>
        <label for="password">
            password
        </label>
        <input type="password" id="password" name="password" placeholder="viktor-password">
    </div>
    <button type="submit">
        login
    </button>
</form>
@endsection