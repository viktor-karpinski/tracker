Die Native-React APP

Im API Ordner ist die Laravel API drinnen und in dem andern ist die Native-App drinnen. 

In der Datenbank eine "vorder" Tabelle erstellen

composer install
php artisan migrate
php artisan serve

Um es zum laufen zu bringen müsste man aber einiges konfigurieren. Es gibt leider noch nicht ein in der App intergriertess login/signup System.


In der Datenbank eine "vorder" Tabelle erstellen

composer install
php artisan migrate
php artisan serve

Dannach müsste man ein JSON POST request an ../api/signup schicken mit z.B.:

{
  "email": "test",
  "password": "password"
}

Weiters muss man in der Native App in der Datei "fetch.js" den Bearer Token anpassen mit dem token aus der DB und die variable url auch (laravel server url).

Sonst noch:

npm install 

npx expo start
