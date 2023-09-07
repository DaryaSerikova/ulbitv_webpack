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
- [webpack.ProgressPlugin](#ProgressPlugin)
- [Настройка HTMLWebpackPlugin'а (template для root)](#HTMLWebpackPluginTemplate)

[Typescript](#Typescript)
- [resolve](#resolve)
- [rules](#rules)
- [ts-loader](#tsLoader)
- [Configuration Languages. Настройка typescript для webpack.config](#configurationLanguages)
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
//package.json

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
//webpack.config.js

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
//webpack.config.js

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
`entry` - по дефолту называется `main.js`, но это название мы можем поправить и даже указать несколько entry point'ов, если такие существуют
```
//entry это main.js
entry: path.resolve(__dirname, 'src', 'index.js') 
```

```
//entry RANDOM.js
entry: {
  RANDOM: path.resolve(__dirname, 'src', 'index.js') 
}
```
Entry point'ов мб несколько или один с другим названием например:
![random](/images/random.jpg)

Но нам это не нужно, и один entry point нас вполне устраивает\
Итак вернемся к проблеме с кэшированием:\
Если у нас каждый раз одно и то же название файла, браузер каждыый раз его кэширует
и каждый раз отдает старый файл\
Но что, если мы выкатили новую версию нашего приложения, а пользователю все равно будет отдаваться старая?\
В таком случае можно отдать вот такой вот шаблон `filename: '[name].[contenthash].js'`:

```
//webpack.config.js

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

- [HTMLWebpackPlugin](#HTMLWebpackPlugin)
- [webpack.ProgressPlugin](#ProgressPlugin)
- [Настройка HTMLWebpackPlugin'а (template для root)](#HTMLWebpackPluginTemplate)

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
мы видим дефольную структуру файла, но без блока div с классом root
![htmlWebpackPlugin_index](/images/htmlWebpackPlugin_index.jpg)

Но если присмотреть, видим script, у которогов src тот самый файл, который webpack получил в результате сборки
Т е нам не пришлось его подключать вручную

```
<script defer src="main.d34e9f13b9f2412d7324.js"></script>
```

Если скриптов много, нам не приходится следить за их порядком и не приходится добовлять их вручную

Опять возврвщаемся к документации подключим еще один плагин

<a name="ProgressPlugin"></a>

### webpack.ProgressPlugin

Сайт webpack'а: => Plugins (слева, sidebar)
Суть плагина. Сейчас у нас сборка происходит за доли секунды. 
Но когда проект разрастется, сборка может занимать 10, 20, 30 секунд, минуту..
И по-хорошему нужно за сборкой как-то следить, понимать сколько процентов сборки уже произошло

![webpackPlugin2.jpg](/images/webpackPlugin2.jpg)

Добавим этот плагин в наш список

```
  plugins: [
    new HTMLWebpackPlugin(),
    new webpack.ProgressPlugin(),
  ],
```

Как видите, он по дефолту идет в пакете вебпак
<a name="HTMLWebpackPluginTemplate"></a> 

### Настройка HTMLWebpackPlugin'а (template для root)
Теперь решим проблему с тем, что блок root не появляется

Сайт Webpack'а: => Plugins (сверху в шапочке) => [HTMLWebpackPlugin](https://webpack.js.org/plugins/html-webpack-plugin) => [Configuration (под ней ссылочка на доку)](https://github.com/jantimon/html-webpack-plugin#options)

здесь есть список опций: `filename`, `title`, `template` и т д
И сейчас нас конкретно интересует `template`
Мф хотим html из папки public использовать, как шаблон, чтобы в него встраивались скрипты
Указываем путь к этому файлу `template: path.resolve(__dirname, 'public', 'index.html')`:

```
  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html')
    }),
    new webpack.ProgressPlugin(),
  ],
```

<a name="Typescript"></a> 

## Typescript

Следующая проблема, которую нам надо решить: типизация.\
Сейчас мы можем работать с `Javascript`, но не с `Typescript`.\
Поэтому нам надо подготовить `webpack`.\
На сайте webpack'а: [Typescript](https://webpack.js.org/guides/typescript/)
```
npm i -D typescript@4.5.5 ts-loader@9.2.6
```
Теперь нам необходимо создать конфиг `tsconfig.json`, а во-вторых поменять расширение файлов на `.ts`
ну и чтобы убелиться, что `typescript` у нас будет работать, перепишем файлик `index.ts`:
```
export function someFn(arg: number): string {
  console.log('RANDOM FUNCTION')
  return '';
}
```
В `entry` point меняем `.js` на `.ts`

`tsconfig.js` копируем из документации:
```
{
  "compilerOptions": {
    "outDir": "./dist/",
    "noImplicitAny": true,
    "module": "es6",
    "target": "es5",
    "jsx": "react",
    "allowJs": true,
    "moduleResolution": "node"
  }
}
```
копируем в `webpack.config.js`
```
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
```

<!-- 15:37 еще ошибка не передан аргумент typescript, и мб где еще не сменен js на ts -->

<a name="resolve"></a> 

### resolve
В поле `resolve` мы указываем расширения, для которых при импорте мы не будем указывать расширение, т е по сути это файл с исходням кодом
```
import Component from './component'
```

<a name="rules"></a> 

### rules 
Это одно из самых важных полей в `webpack`'е, здесь мы конфигурируем `loader`'ы.\
Они предназначены для того, чтобы обрабаотывать файлы, которые выходят за рамки `javascript`, т е это `png`, `jpeg`, `gif`, `svg`, `css`, `scss`.\
Т е любая обработка файла, которая выходит за рамки `javascript`.\
Мы добавим много `loader`'ов.
Добавим `loader` для `typescript`

<a name="tsLoader"></a> 

### ts-loader

```
  rules: [
    {
      test: /\.tsx?$/,
      use: 'ts-loader',
      exclude: /node_modules/,
    },
  ],
```

- `test` - указываем регулярное выражение, по которому мы будем находить файлы, которые надо пропустить через loader.\ 
(`test: /\.tsx?$/,` в данном случае это файлы с расширением `.tsx`).\
[regex101.com](https://regex101.com/)
Если подсвечивается синим, то регулярка его ловит (т е `.ts` и `.tsx`)\
- `use` -  указывается loader, который необходимо использовать (`use: 'ts-loader',`)
- `exclude` - исключаем `node_modules` (`exclude: /node_modules/,`)

#### Совет: 
Не пытайтесь все это запомнить. Поймите общую концепцию, и вы потом по документации все это повторить сможете.\
Запоминать отдельные названия полей, плагинов не стоит. Запоминайте концепуию и тогда обучение у вас будет легким.

<!-- 18:28 -->

Итак `loader` мы подключили, расширение поменяли, `extension`'ы внизу настроили. И в принципе этого уже должно быть достаточно, чтобы `Typescript` у нас работал.\
Запускаем сборку, проверяем в консольке, что все успешно (В папке build есть файлик index.html, тащим его в браузер: по сути мы просто открываем файл index.html в браузере).

Видим в итоге вот это:

![index_check_1.jpg](/images/index_check_1.jpg)
![index_check_2.jpg](/images/index_check_2.jpg)

Итак, двигаемся дальше.


<a name="configurationLanguages"></a> 

### Configuration Languages. Настройка typescript для webpack.config

Сейчас мы сделали `webpack` для исходного кода, но хотелось бы писать сам `config` для `webpack`'а писать на `typescript`. \
Для этого нужны дополнительные махинации.

Забиваем в гугле: `webpack typescrip config file`, открываем первую ссылку. Здесь мы видим: [Configuration Languages](https://webpack.js.org/configuration/configuration-languages/). (И нам нужен именно `typescript`)

>Сакцентирую на том, что видете, Я ЭТО ВСЕ НЕ ЗАПОМИНАЮ. Я вот точно так же открываю доку и прям иду по пунктам. Потому что запоминать это абсолютно  смысла нет.

Итак документация советует нам установить скрипт, копируем, вставляем:
```
<!-- npm install --save-dev typescript ts-node @types/node @types/webpack -->
npm i -D typescript@4.5.5 ts-node@10.4.0 @types/node@20.5.9 @types/webpack@5.28.2
```

А КАКИЕ У ULBI ВЕРСИИ ???????\
Итак с этого момента я угадываю версии UlbiTV, возможно они будут отличаться. Но с этими версиями у меня сборка прошла успешно.\



Пакеты установились, теперь нужно поменять расширение файла `webpack.config.js` с `.js` на `.ts`.

Проверяем, что ничего не сломали (`webpack`)


Сейчас конфиг `webpack`'а выглядит вот так:

```
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');


module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, 'src', 'index.ts'),
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'build'),
    clean: true,
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html')
    }),
    new webpack.ProgressPlugin(),
  ],

}
```

Давайте поменяем эти `require`'ы на привычные `export`'ы и `import`'ы.\
Заменяем вот эту красоту:

```
// webpack.config.js
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
```

на вот эту:

```
// webpack.config.ts
import * as path from 'path';
import * as  webpack from 'webpack';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
```

Импортируем все через `* as` - многие наверняка с этим не встрнчались.
Дело в том, что эти пакеты изначально предназначены для `Node.js`, `tsconfig` у нас для обычных импортов сейчас не предназначен

















