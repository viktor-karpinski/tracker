<?php

use App\Models\Todo;
use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('todos', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->longText('description')->nullable();
            $table->timestamp('deadline')->nullable();
            $table->boolean('completed')->default(false);
            $table->timestamp('completed_time')->nullable();
            $table->integer('vpoints')->nullable();
            $table->boolean('repeat')->nullable();
            $table->integer('repeat_type')->nullable();
            $table->foreignIdFor(Todo::class)->nullable();
            $table->foreignIdFor(User::class)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('todos');
    }
};
