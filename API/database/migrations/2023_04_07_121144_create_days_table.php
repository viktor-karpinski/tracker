<?php

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
        Schema::create('days', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(User::class);
            $table->date('date');
            $table->time('wake_up')->nullable();
            $table->time('sleep')->nullable();
            $table->time('eating_start')->nullable();
            $table->time('eating_end')->nullable();
            $table->integer('rating')->nullable();
            $table->integer('vpoints')->default(0);
            $table->float('kcal')->default(0)->nullable();
            $table->float('protein')->default(0)->nullable();;
            $table->float('fat')->default(0)->nullable();
            $table->float('saturated_fat')->default(0)->nullable();
            $table->float('carbs')->default(0)->nullable();
            $table->float('fibre')->default(0)->nullable();
            $table->float('sugar')->default(0)->nullable();
            $table->float('salt')->default(0)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('days');
    }
};
