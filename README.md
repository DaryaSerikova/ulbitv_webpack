# UlbiTV

## Содержание
[Usage](#)\
[Basic setup](#basicSetup)
- [entry](#entry)
- [output](#output)
- [ЧТОБЫ ЗАПУСТИТЬ СБОРКУ](#Запуск)
- [Шаблоны. Динамические названия для файлов](#Шаблоны)

[Подключение плагинов](#setPlugins)
- [HTMLWebpackPlugin](#HTMLWebpackPlugin)


## Usage

`npm run start` - запуск webpack

Webpack.js.com => Guides => Busic Setup

<a name="basicSetup"></a> 

## Basic Setup 

<a name="entry"></a> 

### entry

`entry` - стартовая точка нашего приложения. 
В нашем случае это `'./src/index.js'`
```
module.exports = {
  entry: './src/index.js'
}
```
НО так хардкодить пути - это плохая практика, т к на разных операционных системах пути работают по-разному. 
Поэтому для создания пути используются спец инструменты.

Т.к. `Webpack` работает в среде `Node.js`, нам доступен стандартный модуль `path` и у него
есть функция `resolve`, с помощью которой мы можем склеить участки пути\
`__dirname` - это папка, в которой мы находимся в данный момемент.
```
const path = require('path');


module.exports = {
  entry: path.resolve(__dirname, 'src', 'index.js') 
}
```

<a name="output"></a> 

### output
`output` - 'то настройка того, куда и как мы будем делать сборку нашего приложения
 - `filename` - название главного файла сборки нашего приложения (`bundle.js`)
 - `path` - путь, куда сборка должна происходить (`build`/`dist`)

```
const path = require('path');


module.exports = {
  entry: path.resolve(__dirname, 'src', 'index.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')
  }
}
```
<a name="Запуск"></a> 

### ЧТОБЫ ЗАПУСТИТЬ СБОРКУ 
Нужно написать в терминале: `webpack (+Enter)`
Если у выпала такая ошибка:
```
zsh: command not found: webpack
```

Напишите в `package.json`, в `scripts`:

```
"scripts": {
   "start": "webpack"
},
``` 
Затем запустите через `npm run start`
![И вуа-ля!](/images/webpack_error.jpg)

Видим ворнинг, потому что мы не указали `mode` (`production`/`development`)\
Видим, что у нас появилась папочка `build` и в ней лежит `bundle.js`:
```
(()=>{"use strict";console.log("RANDOM FUNCTION")})();
```

Пофиксим ворнинг с `mode`:
```
const path = require('path');


module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, 'src', 'index.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')
  },

}
```

`production` - если мы уже куда-то наше приложение публикуем (минимизированный файл без пробелов и каких-либо отступов строк)
![production](/images/production.jpg)
`development` - на этапе разработки (куча какого-то кода)
![development](/images/development.jpg)

Чуть позже мы сможем это динамически конфигурировать

<a name="Шаблоны"></a> 

### Шаблоны. Динамические названия для файлов

На сайте Webpack'а:
Concepts => Output => Multiple Entry Points

В браузер встроены механизмы оптимизации, котораые кэшируют файлы и 
позволяют достаточно быстро их отдавать из кэша, не загружая их каждый раз откуда-то с сервера

```
module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, 'src', 'index.js'),
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build')
  },

}
```

Видим в `build` `main.js` - это дефолтное название для entry point'а\
Entry point'ов мб несколько или один с другим названием например:
![random](/images/random.jpg)
Но нам это не нужно, и один entry point нас вполне устраивает\
Итак вернемся к проблеме с кэшированием:\
Если у нас каждый раз одно и то же название файла, браузер каждыый раз его кэширует
и каждый раз отдает старый файл\
Но что, если мы выкатили новую версию нашего приложения, а пользователю все равно будет отдаваться старая?\
В таком случае можно отдать вот такой вот шаблон `filename: '[name].[contenthash].js'`:

```
module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, 'src', 'index.js'),
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'build')
  },

}
```
И в зависимости от содержимого будут генерироваться уникальные индефикаторы, уникальные названия и проблема с кэшированием  решена.
![hash](/images/hash.jpg)

Обратите внимание, что при каждой сборке  у нас получается большое количество файлов и по-хорошему их надо подчищать.
Для этого мы можем использовать у `output` свойство  `clean: true`: все лишнее удаляется, остается только финальная сборка.
```
output: {
  filename: '[name].[contenthash].js',
  path: path.resolve(__dirname, 'build'),
  clean: true,
},
```
------------------------------------------
Итак на данный момент наш `webpack.config` умеет работать с js-файлами:
- он умеет их собирать,
- использовать импорты, экспорты
- и в итоге выдавать нам минимизированный или development код

Но. так же в нашем приложении, поскольку мы разрабатываем frontend, у нас должен быть html-файлик\
Для этого мы создадим папку `public` и в ней `index.html`: ` !+Enter `\
Это будет наш корневой html-файл, с которого будет начинаться наше приложение\
Сразу создадим в body блок с классом root. В него мы будем имплементировать наше react-приложение

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <div class="root"></div>
</body>
</html>
```
<!-- lesson 3: 8:23 -->
Теперь webpack'у необходимо сообщить, где этот файлик лежит.\
И помимо того в этот файлик надо будет встраивать те самые js-скрипты, которые мы будем писать\
И для этого у webpack'а есть потрясающий механизм плагинов, которые могут выполнять различные операции\
(Сайт webpack'а: Concepts => Plugins)


<a name="setPlugins"></a>

## Подключение плагинов

<a name="HTMLWebpackPlugin"></a>

### HTMLWebpackPlugin

```
npm i -D html-webpack-plugin@5.5.0
```
Плагин установили, тем его нужно подключить в наш `webpack` \
Для этого есть свойство `plugins` - это массив, т к плагинов мб много \
Но для того, чтобы подключить установленный плагин, в первую очередь его нужно сюда импортировать:

```
const HTMLWebpackPlugin = require('html-webpack-plugin');
```

Так же сразу импортируем сюда `webpack`, чуть позже нам это понадобится.

```
const webpack = require('webpack');
```

Сайт Webpack'а: => Plugins (сверху в шапочке)\
Здесь весь официальный список плагинов\
В поиске пишем `HTMLWebpackPlugin`, открываем страницу и здесь подробное описание, того как он работает и как его настраивать\

`HTMLWebpackPlugin`, который мы импортировали - это класс.\ 
Нам необходимо создать объект из этого класса, поэтому мы используем конструкцию `new HTMLWebpackPlugin()`:

```
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');


module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, 'src', 'index.js'),
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'build'),
    clean: true,
  },
  plugins: [
    new HTMLWebpackPlugin(),
  ],

}
```

Давайте выполним скрипт `webpack`, чтобы выполнить сборку: `npm run start`
В папке `build` видим файлик `index.html` - это как раз работа `HTMLWebpackPlugin`'а.\
мы видим дефольную структуру файла, но без блока root
![htmlWebpackPlugin_index](/images/htmlWebpackPlugin_index.jpg)






