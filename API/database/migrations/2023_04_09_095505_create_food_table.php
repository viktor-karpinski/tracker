<?php

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
        Schema::create('food', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->float('kcal')->default(0)->nullable();
            $table->float('protein')->default(0)->nullable();;
            $table->float('fat')->default(0)->nullable();
            $table->float('saturated_fat')->default(0)->nullable();
            $table->float('carbs')->default(0)->nullable();
            $table->float('fibre')->default(0)->nullable();
            $table->float('sugar')->default(0)->nullable();
            $table->float('salt')->default(0)->nullable();
            $table->string('serving')->default("100g")->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('food');
    }
};
