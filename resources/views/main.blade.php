<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet" type="text/css">

        <!-- Styles -->
        <link rel="stylesheet" type="text/css" href="/css/app.css">
        <meta charset="utf-8" name="csrf-token" content="{{ csrf_token() }}">
        <style type="text/css">
             .mr-bt-10{
            margin-bottom: 10px
            }
         h2 {margin:10px;}
         label{margin:10px;}
        </style>
    </head>

    <body>
        <div class="container">
        <div class="row">
        <div class="col-md-8 offset-md-2">
          
        @yield('content')
       
            
        </div>
        </div>
        </div>
        </div>
        <script type="text/javascript" src="/js/app.js"></script>
    </body>
</html>
