# UlbiTV

## Содержание
[Usage](#)\
[1. Basic setup](#basicSetup) ([entry](#entry), [output](#output), [ЧТОБЫ ЗАПУСТИТЬ СБОРКУ](#Запуск))
  * [Шаблоны. Динамические названия для файлов](#Шаблоны)
  * [Подключение плагинов](#setPlugins)
    - [HTMLWebpackPlugin](#HTMLWebpackPlugin)
    - [webpack.ProgressPlugin](#ProgressPlugin) - полоса загрузки
    - [Настройка HTMLWebpackPlugin'а (template для root)](#HTMLWebpackPluginTemplate)
  * [Typescript](#Typescript)
    - [resolve](#resolve)
    - [rules](#rules)
    - [ts-loader](#tsLoader)
    - [Configuration Languages. Настройка typescript для webpack.config](#configurationLanguages)

[2. Декомпозиция конфига. Опции конфигурации](#decompositionConfig)
- [buildPlugins](#buildPlugins)
- [buildLoaders](#buildLoaders)
- [buildResolvers](#buildResolvers)
- [buildWebpackConfig.ts - общая функция конфгурации с опциями](#buildWebpackConfig)

[3. Webpack-dev-server. Переменные оружения](#mainWebpackDevServer)
- [inline-source-map](#inlineSourceMap) - карта исходного кода для поиска ошибок в едином объединенном файле html
- [webpack-dev-server](#webpackDevServer) - автооткрывание страницы

[4. React и первое подключение стилей (scss)](#reactAndScss)
- [react](#react) - ts: typescriptLoader(уже обрабатывает), js: babel-loader
- [scss](#scss) - style-loader, css-loader, sass-loader




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
>Небольшая ремарка: `npm install --save-dev typescript ts-node @types/node @types/webpack` по ссылке вы увидете что-то вроде этого, но пока идет этот курс пишем конкретные версии. Поэтому копируем версии ниже \
>Итак с этого момента я угадываю версии UlbiTV, возможно они будут отличаться. Но с этими версиями у меня сборка прошла успешно.\
```
npm i -D typescript@4.5.5 ts-node@10.4.0 @types/node@20.5.9 @types/webpack@5.28.2
```


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

Читаем вот это вот сообщение в [документации](https://webpack.js.org/configuration/configuration-languages/)
![typescript_spec.jpg](/images/typescript_spec.jpg)

Значит, нам нужно добавить два флага (`esModuleInterop` и `allowSyntheticDefaultImports`) в ts.config.json и именно они сделают наши импорты более привычными.
```
{
  "compilerOptions": {
    "outDir": "./dist/",
    "noImplicitAny": true,
    "module": "es6",
    "target": "es5",
    "jsx": "react",
    "allowJs": true,
    "moduleResolution": "node",
    
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
  }
}
```

`esModuleInterop` - позволяет работать с пакетамиБ которые используют common js как с обычными пакета с помощью import export (require() module.export) = commomjs.

`allowSyntheticDefaultImports` - позволяет использовать default'ный импорты, даже если в используемой библиотеке их нет. Без `* as`
Многие библиотеки, особенно те, которые написаны на ноде не поддерживают дефолтный импорт. И нам нужно явно писать `* as`, сообщая что мы хотим явно все импортировать из этого пакета (т е с нодой мы должны писать `import * as path from 'path';`, но теперь можно так `import path from 'path';`). 

`moduleResolution` - это простое свойство. Оно определяет, какие импорты будут. Здесь всего два свойтва: `node` и `classic`. И в 99% случаев используется `node`

`allowJs` - позволяет обрабатывать не только `ts`-файлы, но и `js`

`jsx` - это у нас `React`. Это делается для того, чтобы мы писать конструкции `jsx`

`target` - в `target` указывается версия стандарта ECMAScript, в которую по итогу код будет компилироваться. Обычно компилируется либо в 5ую, либо в 6ую версию. Делается это для того, чтобы большинство браузеров могло поддерживать наш код

`module` - в `module` указывается модульная система. Это как раз `CommonJS`, `es6`, `ESNext` - различные способы модульной сборки. Обычно используют `ESNext` или `es6`. На backend'е можно использовать `CommonJS`.

`noImplicitAny` - не позволяет нам использвать переменные без явного указания типа (можно указать any, но лучше так не делать) 

`outDir` - то, куда производится сборка `"outDir": "./dist/",`. В нашем случае она не так важна, потому что собирается она с помощью вебпака.

<!-- 25:19 -->
`tsconfig` мы разобрали. Со временем мы будем пополнять, расширять, усложнять.
Вернемся к нашему `webpack.config`'у

Используя `allowSyntheticDefaultImports` перепишем это:
```
import * as path from 'path';
import * as webpack from 'webpack';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
```
На это:
```
import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
```

Сейчас наш webpack.config выглядит так: 

```
import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

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
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html')
    }),
    new webpack.ProgressPlugin(),
  ],

}
```

Для конфига создадим отдельную переменную `config`.
и закинем в нее наш объект с конфигурацией.
И теперь мы используем не `module.exports`, а `export default`.\
и так же по-хорошему для конфига нужно указать тип (`const config: webpack.Configuration`), чтобы пользоваться прелестями автокомплита.
Этот тип импортируется из вебпака и называется он `Configuration`.\

```
import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const config: webpack.Configuration = {
  mode: 'development',
  //entry - стартовая точка нашего приложения. В нашем случае это './src/index.js',
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

  // output - 'то настройка того, куда и как мы будем делать сборку нашего приложения
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'build'),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html')
    }),
    new webpack.ProgressPlugin(),
  ],

}

export default config;
```

Теперь все типы, среда разработки сама подсказывает. И разрабатывать мы будем не интуитивно, а понимая чано где и какой тип нам нужен.
Но как видите при попытке собрать проект, у нас все равно сборка падает.
И если мы почитаем сообщение, то увидим, что как раз ругается на эти импорты:
```
  SyntaxError: Cannot use import statement outside a module
```
Но давайте вернемся обратно к [документации](https://webpack.js.org/configuration/configuration-languages/), потому что секцию мы еще не закончили.

![noteCommonJs.jpg](/images/noteCommonJs.jpg)
Здесь написано, что если в `module` мы указали `commomJS`, то настройка окончена. 
Если нет, то нужна дополнительная настройка, потому что `ts-node` по умолчанию понимает только `commomJS`.

У нас есть 3 пути:\
Изменить `tsconfig.json`.
Изменить `tsconfig.json` и добавить настрйоки для `ts-node`.
Установить `tsconfig-paths`.

Но самый простой случай - это оставить `ESNext` и добавить лополнительные настройки для `ts-node`.
копируем эти строки из документации:
```
"ts-node": {
  "compilerOptions": {
    "module": "CommonJS"
  }
}
```
Теперь наш tsconfig выглядит так:
```
{
  "compilerOptions": {
    "outDir": "./dist/",
    "noImplicitAny": true,
    "module": "es6",
    "target": "es5",
    "jsx": "react",
    "allowJs": true,
    "moduleResolution": "node",
    
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true

  },
  "ts-node": {
    "compilerOptions": {
      "module": "CommonJS"
    }
  }
}
```
И сразу же пробуем сделать сборку еще раз (webpack - в видео/npm run start - в моем проекте)
Теперь мы можем писать большой, полноценный сложный конфиг с использованием `typescript`'а

### Итог: 
Мы настроили небольшой конфиг, научились работать с `typescript` и при этом перевели нашу конфигурацию (наш webpack.config) так же на `typescript`.
И сконфигурировали небольшой `tsconfig`

<a name="decompositionConfig"></a> 

## 2. Декомпозиция конфига. Опции конфигурации

Продолжаем конфигурировать наше приложение. И на текущий момент, конфиг начинает разрастаться. 
Хотя по сути мы только начали конфигурировать наше приложение: есть всего 2 плагина и 1 loader.
Плюс ко всему рано или поздно нам придется разделать prodaction и dev-сборку и конфиг будет совсем страшным.
Поэтому сейчас мы будем его декомпозировать и приводить к читабельному, хорошему виду.

В корне проекта создадим папочку `congig`. Здесь будет храниться вся конфигурация приложения: тестовой среды, `Storybook`'а, `Webpack`.
Внутри папки config уже будут лежать подпапки, в которых мы будем конфигурировать ту или иную среду. Например, `jest`, `eslint`, `build`.
![decompositionConfig.jpg](/images/decompositionConfig.jpg)

В папке `build` мы будем описывать какие-то сценарии конфигурации нашего `webpack.config`'а.
Здесь для каждого вебпак-свойства мы будем создавать отдельный файлик. 

![buildPlugins.jpg](/images/buildPlugins.jpg)


<a name="buildPlugins"></a> 

### buildPlugins

Например, buildPlugins - это простая функция, которая будет возвращать нам список плагинов.
Давайте из конфига этот массив просто вырежем и перенесем в buildPlugins и добавим импорты. Не забываем про тип 
```
import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export function buildPlugins():webpack.WebpackPluginInstance[] {
  return [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html')
    }),
    new webpack.ProgressPlugin(),
  ]
}
```
А в основном конфиге пишем так `plugins: buildPlugins(),`;


<a name="buildLoaders"></a> 

### buildLoaders

То же самое мы делаем с loader'ами. Создаем отдельный файлик 
![buildLoaders.jpg](/images/buildLoaders.jpg)
Вырезаем эти лоадеры, вставляем вместо них `buildLoaders()`.
Вырезанные лоадеры вставляем в `buildLoaders`. и не забываем про типизацию, чтобы среда разработки сама нам подсказывала
```
//webpack.config.ts
  module: {
    rules: buildLoaders(),
  },
```
```
//buildLoaders.ts
import webpack from 'webpack';

export function buildLoaders(): webpack.RuleSetRule[] {
  return [
    {
      test: /\.tsx?$/,
      use: 'ts-loader',
      exclude: /node_modules/,
    },
  ]
}
```

Еще один важный момент, на который надо сакцентрировать внимание - это то, что порядок, в котором лоадеры возвращаются в массиве имеет значение.
И по-хорошему выносить вот так вот отдельные лоадеры в переменные нужно, чтобы потом чутко видеть последовательность этих лоадеров в массиве.
```
import webpack from 'webpack';

export function buildLoaders(): webpack.RuleSetRule[] {
  const typescriptLoader = {
    test: /\.tsx?$/,
    use: 'ts-loader',
    exclude: /node_modules/,
  };

  return [
    typescriptLoader,
  ]
}
```

<a name="buildResolvers"></a> 

### buildResolvers
Делаем все по аналогии. Копируем этот кусок в функцию buildresolvers.

![buildresolvers.jpg](/images/buildresolvers.jpg)

Вместо него втавляем `buildResolvers()`

```
import { ResolveOptions } from "webpack";

export function buildResolvers(): ResolveOptions {
  return {
      extensions: ['.tsx', '.ts', '.js'],
    }
}
```

```
import path from 'path';
import webpack from 'webpack';
import { buildPlugins } from './config/build/buildPlugins';
import { buildLoaders } from './config/build/buildLoaders';
import { buildResolvers } from './config/build/buildResolvers';

const config: webpack.Configuration = {
  mode: 'development',
  //entry - стартовая точка нашего приложения. В нашем случае это './src/index.js',
  entry: path.resolve(__dirname, 'src', 'index.ts'),
  module: {
    rules: buildLoaders(),
  },
  resolve: buildResolvers(),

  // output - 'то настройка того, куда и как мы будем делать сборку нашего приложения
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'build'),
    clean: true,
  },
  plugins: buildPlugins(),

}

export default config;
```

<a name="buildWebpackConfig"></a> 

### buildWebpackConfig.ts

Запускаем сборку и видим ошибку
![decompositionError.jpg](/images/decompositionError.jpg)

По сообщению об ошибке можно понять, что не удается распознать файлик index.html
И это логично, т к мы перенесли плагин (он теперь находится в другой папке, по другому пути) и этот путь больше неактуален (`path.resolve(__dirname, 'public', 'index.html')`)
![pathError.jpg](/images/pathError.jpg)
Можно его, конечно, тут захардкодить, но мы хотим сделать качественно. Поэтому создадим такой механизм, по которому мы сможем эти пути задавать еще до сборки. Т е  конфигурировать конфиг, задавать опции из-вне. Например, порт, пути, адрес ip, режим (developmemt/production) - т е всем этим хорошо бы уметь управлять из-вне.\
И первое с чего мы начнем это создадим тип, в котором опишем вот эти вот опции.

Создадим в папке `build` папку `types` и в ней файл `config.ts`.\
Первая опция - это `mode` соответственно `developmemt` или `prodaction`\
`paths` - путь до `entry point`'а, путь до папки (куда мы делаем сборку), путь до html - т е любые пути, которые будут использоваться в нашей сборке, в нашей конфигурации, будут располагаться как раз вот в этом свойстве.\
`entry` - первый путь до `entry point`'а\
`build` - второй до папки со сборкой (это папка `build`)\
`html` - путь до файлика `html`, который лежит в папке `public`\

```
//config => build => types => config.ts
export type BuildMode = 'prodaction' | 'development';

export interface BuildPath {
  entry: string;
  build: string;
  html: string;
}

export interface BuildOptions {
  mode?: BuildMode;
  paths: BuildPath;
}
```

Следующим этапом создадим в папке `build` файлик `buildWebpackConfig.ts`. 
И сюда перенесем всю конфигурацию, которую мы делали в корне проекта.\
И вот как раз вот эта вот функция, которая будет конфиг собирать, она будет принимать набор опций, для которых мы собрали соответствующий тип `BuildOptions`.\
B разумеется, что эта функция будет возвращать тип `webpack.Configuration`.\

Вырезаем конфигурацию из webpack.config.ts в корне проекта
![configuration.jpg](/images/configuration.jpg)
Вставляем в buildWebpackConfig:
```
import { BuildOptions } from "./types/config";
import webpack from 'webpack';
import path from 'path';
import { buildPlugins } from "./buildPlugins";
import { buildLoaders } from "./buildLoaders";
import { buildResolvers } from "./buildResolvers";

export function buildWebpackConfig(options: BuildOptions): webpack.Configuration {
 return {
    mode: 'development',
    entry: path.resolve(__dirname, 'src', 'index.ts'),
    module: {
      rules: buildLoaders(),
    },
    resolve: buildResolvers(),

    output: {
      filename: '[name].[contenthash].js',
      path: path.resolve(__dirname, 'build'),
      clean: true,
    },
    plugins: buildPlugins(),

  }
}
```

Тем временем в webpack.config.ts:
```
const config: webpack.Configuration = buildWebpackConfig({

});
```

Теперь при вызове функции `buildWebpackConfig`, нам необходимо передать следующие опции:\ 
`'developmemnt'` или `'prodaction'` `mode`\
и список путей `paths`\
```
//webpack.config.ts
import path from 'path';
import webpack from 'webpack';
import { buildWebpackConfig } from './config/build/buildWebpackConfig';
import { BuildPath } from './config/build/types/config';


const paths: BuildPath = {
  entry: path.resolve(__dirname, 'src', 'index.ts'),
  build: path.resolve(__dirname, 'build'),
  html: path.resolve(__dirname, 'public', 'index.html'),
}

const config: webpack.Configuration = buildWebpackConfig({
  mode: 'development',
  paths
});

export default config;
```

Вернемся к `buildWebpackConfig`. Первое, что сделаем: деструктуризировать объект с опциями, чтобы использовать свойства более удобно.\

Заменяем в нем `mode` и `paths` на переменные

```
import { BuildOptions } from "./types/config";
import webpack from 'webpack';
import { buildPlugins } from "./buildPlugins";
import { buildLoaders } from "./buildLoaders";
import { buildResolvers } from "./buildResolvers";

export function buildWebpackConfig(options: BuildOptions): webpack.Configuration {

  const {paths, mode} = options;

  return {
    mode: mode,
    entry: paths.entry,
    module: {
      rules: buildLoaders(),
    },
    resolve: buildResolvers(),

    output: {
      filename: '[name].[contenthash].js',
      path: paths.build,
      clean: true,
    },
    plugins: buildPlugins(),

  }
}
```
Осталось только заменить путь для `html`, в файле `buildPlugins `
buildPlugins.ts: `{paths}: BuildOptions` - добавили options (точнее деструктуризацию из `options` - `paths` и тип)
buildWebpackCoтfig.ts: `plugins: buildPlugins(options)` - добавили options

```
import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { BuildOptions } from './types/config';

export function buildPlugins({paths}: BuildOptions):webpack.WebpackPluginInstance[] {
  return [
    new HtmlWebpackPlugin({
      template: paths.html,
    }),
    new webpack.ProgressPlugin(),
  ]
}
```
Таким образом пути мы нигде не указываем явным образом, только передаем из-вне как аргумент в функцию `buildWebpackConfig`.\
Так же предлагаю добавить еще одно поле в опции (options) - это isDev (исключительно для удобства)
```
// config => build => types => config.ts
export interface BuildOptions {
  mode?: BuildMode;
  paths: BuildPath;
  isDev: boolean;
}
```

```
//webpack.config.ts
...

const mode = 'development';
const isDev = mode === 'development'; 

const config: webpack.Configuration = buildWebpackConfig({
  mode: 'development',
  paths,
  isDev, //это поле нужно исключительно для удобства
});
```

Пробуем собрать. Сборка успешна

### Итог: 
Мы декомпозировали конфиг, \
сделали опции, с помощью которых мы можем управлять сборкой \
И это все в дальнейшем сильно упростит жизнь, наш конфиг будет читабельным, он не будет разрастаться до огромных масштабов, которые поддерживать просто нереально.


<a name="mainWebpackDevServer"></a> 

## 3. Webpack-dev-server. Переменные оружения

Сейчас мы будем настраивать dev-server. \
Но сначала поймем, для чего он нам нужен.\

1. Откроем файлик index.html в браузере видим в консоли `'RANDOM FUNCTION'`.
2. Допишем изменим это значение на `'RANDOM FUNCTION 123456789'`.
3. И чтобы увидеть в браузере изменения, которые мы добавили, нам нужно заново сделать сборку и заново открыть html-файлик и только потом мы увидим изменения, которые мы добавили в код.

Вот для этого `Webpack-dev-server` и нужен. Он будет автоматически перезапускать сборку и отдавать нам уже обновленные файлы.

Поисковая строка гугла: `webpack dev server` \

Открываем документацию: [DevServer](https://webpack.js.org/configuration/dev-server/) => [development guide](https://webpack.js.org/guides/development/) (ссылка в первых предложениях, подсвеченная фраза) \

Заходим в `development guide` и прям идем по порядку. \
Листамем вниз, видим, что нам рекомендуют установить `developmet mode` и так же какие-то `source map`. \


<a name="inlineSourceMap"></a> 

### inline-source-map

Что такое `source map` (кратко)? \

Когда webpack делает сборку, у нас много файлов, например 10. А на выходе мы можем иметь всего один файл. \
Так вот отследить, где произошла ошибка, в таком случе становится сложно. \
Именно поэтому webpack делает вот такие (`devtool: 'inline-source-map'`) карты исходного кода, по которым мы можем четко по `stack trace`'у четку увидеть: где, в какой функции, в каком файле произошла ошибка и соответственно эту ошибку поправить.

Поэтому давайте в `config => build => buildWebpackConfig.ts` добавим в конце `return`'а `devtool: 'inline-source-map',`

```
export function buildWebpackConfig(options: BuildOptions): webpack.Configuration {

  const {paths, mode} = options;

  return {
    mode: mode,
    entry: paths.entry,
    module: {
      rules: buildLoaders(),
    },
    resolve: buildResolvers(),
    output: {
      filename: '[name].[contenthash].js',
      path: paths.build,
      clean: true,
    },
    plugins: buildPlugins(options),
    devtool: 'inline-source-map',
  }
}
```

Теперь мы сможем четко видеть, где в коде у нас произошла ошибка.

[webpack-dev-server](#webpackDevServer)

<a name="webpackDevServer"></a> 

### webpack-dev-server
Следующим шагом нам предлагают выбрать инструмент для разработки.

1. `webpack's Watch Mode` (простой)
2. `webpack-dev-server` (средний)
3. `webpack-dev-middleware` (продвинутый)

`webpack-dev-server` (средний) и удволетворит все наши потребности. Копируем ссылку на установку и добавляем `@types`
```
npm i -D webpack-dev-server@4.7.4 @types/webpack-dev-server@4.7.2
```

Не забываем ставить флаги `devDepemdencies`. Это важно! Чтобы все эти пакеты, которые весят немало случайно не попали в `production`.

Теперь будем настраивать наш `dev-server`. \

Cоздаем новый файлик `buildDevServer`. Пишем аналогично одноименную функцию.
Типы у options такие же BildOptions. Тип для функциии `import { Configuration } from "webpack-dev-server"`, но у нас уже есть тип с таким названием (из `webpack`), поэтому переименуем его `import { Configuration as DevServerConfiguration } from "webpack-dev-server"`;

```
import { BuildOptions } from "./types/config";
import { Configuration as DevServerConfiguration } from "webpack-dev-server";

export function buildDevServer(options: BuildOptions): DevServerConfiguration {
  // return 
}

```

Теперь опишем `return`

`port`
`port` хотелось бы устанавливать на уровне `build`-опций
```
//config => build => types => congig.ts
export interface BuildOptions {
  mode?: BuildMode;
  paths: BuildPath;
  isDev: boolean;
  
  port: number;
}
```
И вот здесь из-вне будем это свойство передавать. Добавляем в `webpack.config.ts`:  `const PORT = 3000; ` и `port: PORT,`
```
//webpack.config.ts
const PORT = 3000; 

const config: webpack.Configuration = buildWebpackConfig({
  mode: 'development',
  paths,
  isDev, //это поле нужно исключительно для удобства
  
  port: PORT,
});
```
Чуть позже мыы будем его передавать из переменных окружения.

Вернемся к buildDevServer, теперь мы можем доставать `port` из `options`.
```
//buildDevServer
...

export function buildDevServer(options: BuildOptions): DevServerConfiguration {
  return {
    port: options.port,
    
  }
}
```

`open` - оно будет автоматически открывать страницу в браузере с нашим приложением

В принципе этого достаточно. Чуть позже мы будем этот dev-server дополнять.

В основной конфиг (`buildWebpackConfig.ts`) добавляем свойство `devServer` и вызываем функцию (`buildDevServer`), которую мы сделали:
`devServer: buildDevServer(options),`

```
//buildWebpackConfig.ts
export function buildWebpackConfig(options: BuildOptions): webpack.Configuration {

  const {paths, mode} = options;

  return {
    mode: mode,
    entry: paths.entry,
    module: {
      rules: buildLoaders(),
    },
    resolve: buildResolvers(),
    output: {
      filename: '[name].[contenthash].js',
      path: paths.build,
      clean: true,
    },
    plugins: buildPlugins(options),
    devtool: 'inline-source-map',

    devServer: buildDevServer(options),
  }
}
```
Вернемся к [документации](https://webpack.js.org/guides/development/), посмотрим, как мы можем этот devServer запустить.
Листаем чуть ниже, видим `package.json`: 
```
//package.json в документации
"scripts": {
  ...
  "start": "webpack serve --open",
  ...
},
```
Флаг `--open` в нашем случае необязательно передавать, потому что мы задали его уже на уровне конфигурации 
Открываем наш package.json и добавляем скрипт:
```
"scripts": {
  ...
  "start": "webpack serve",
  ...
},
```

Запускаем сборку. И, все идет не по плану, у меня ошибка, а в курсе все нормально.
![devServerError.jpg](/images/devServerError.jpg)

Шарим в гугле, есть предложение повысить версию с `"webpack-cli": "^4.9.2"` до `"webpack-cli": "4.10.0",`
Повышать версию бы не хотелось, потому что мы слишком жестко привязаны к каждой версии пакета.

Шарим еще, и узнаем, что скорее всего похерились пути. И это логично. У нас установлен `webpack`, но `zsh: command not found: webpack`.
bin, path и все дела - надо это добро настроить.

блаблабла, короче выбираем варинт с поднятием версии webpacl-cli, запускаем, все работает, двигаем дальше

Теперь посмотрим: как работает dev-server на прктике. Добавляем в index.ts строчку `document.body.innerHTML ='<div>HELLO WORLD!</div>'`
Нажимаем ctrl+s. Смотрим localhost:3000 и видим HELLO WORLD!
Можно без ctrl+s

Следующи этапом хотелось бы разделять dev-сборку от prodaction-сборки. Сейчас мы это все хардкодим в фвйлике `webpacl.config.ts`
Но хотело бы управлять этим на уровне скриптов и Для этого у нас есть переменные окружения
Которые активно используются и на бэке, и на фронте и используются при сборке. 

В поисковике: `webpack env variables`
Попадаем в [документацию](https://webpack.js.org/guides/environment-variables/)

В webpack'е использовать переменные окружения достатно легко
Когда мы выполняем сборку мы можем передать флаг `--env` и сколь угодно много переменных окружения при запуске передать

Из строчки документации:
`npx webpack --env goal=local --env production --progress`
скопируем кусок `--env goal=local --env production` и перенесем в наш `package.json`

До изменений:
```
  "start": "webpack serve",
```
После изменений:
```
"start": "webpack serve --env port=3000",
"build:prod": "webpack --env mode=production",
"build:dev": "webpack --env mode=development",
```

Итак скрипты мы сделали. Теперь необходимо эти переменные окружения при сборке получать
Возвращаемся в [документацию](https://webpack.js.org/guides/environment-variables/) 
Здесь есть явные примеры. Мы экспортируем не сам конфиг, а функцию. И эта функция как раз переменные окружения аргументом  и принимает

`webpack.config.ts`

```
export default config;
```

```
export default (env) => {
  return config;
}
```

```
//webpack.config.ts
export default (env: BuildEnv) => {
  const paths: BuildPath = {
    entry: path.resolve(__dirname, 'src', 'index.ts'),
    build: path.resolve(__dirname, 'build'),
    html: path.resolve(__dirname, 'public', 'index.html'),
  }
  
  const mode = env.mode || 'development';
  const PORT = env.port || 3000; 

  const isDev = mode === 'development';
  
  const config: webpack.Configuration = buildWebpackConfig({
    mode: mode,
    paths,
    isDev, //это поле нужно исключительно для удобства
    port: PORT,
  });

  return config;
}
```

npm run build:prod

Вилим в папке build index.html минимизированный файл, значит все ок

Но в js файлике вы можете заметить вот такой вот комментарий
`//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi45ZTBmOTBhMzBhNTQ1YWE5YWViOC5qcyIsIm1hcHBpbmdzIjoibUJBQ0lBLFFBQVFDLElBQUksbUJDQ2hCQyxTQUFTQyxLQUFLQyxVQUFZLGlEIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vV2VicGFjay8uL3NyYy90ZXN0LnRzIiwid2VicGFjazovL1dlYnBhY2svLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGZ1bmN0aW9uIHNvbWVGbihhcmcpIHtcbiAgICBjb25zb2xlLmxvZygnUkFORE9NIEZVTkNUSU9OJyk7XG4gICAgcmV0dXJuICcnO1xufVxuIiwiaW1wb3J0IHsgc29tZUZuIH0gZnJvbSBcIi4vdGVzdFwiO1xuc29tZUZuKDEyMyk7XG5kb2N1bWVudC5ib2R5LmlubmVySFRNTCA9IFwiPGRpdiBzdHlsZT0nYmFja2dyb3VuZDogcmVkJz5IRUxMTyBXT1JMRCE8L2Rpdj5cIjtcbiJdLCJuYW1lcyI6WyJjb25zb2xlIiwibG9nIiwiZG9jdW1lbnQiLCJib2R5IiwiaW5uZXJIVE1MIl0sInNvdXJjZVJvb3QiOiIifQ==`

Это те самые source map^ которые нам нужны чтобы отслеживать ошибки
но в прод сборке нам не нужен source map и dev server, поэтому:
config => build => buildWebpackConfig.ts

`const {paths, mode} = options;` => `  const {paths, mode, isDev} = options;`
```
  devtool: 'inline-source-map',
  devServer: buildDevServer(options),
```

```
  devtool: isDev ? 'inline-source-map' : undefined,
  devServer: isDev ? buildDevServer(options) : undefined,
```

<a name="reactAndScss"></a> 

## 4.React и первое подключение стилей (scss)


[react](#react)

<a name="react"></a> 

### react

```
npm i react@17.0.2 react-dom@17.0.2
npm i -D @types/react@17.0.39 @types/react-dom@17.0.11 
```
т к мы используем в нашем приложении jsx, нам нужно подключить специальные лоадеры, но поскольку мы используем typescript
нам достаточно typescriptLoader - он уже умеет обрабатывать jsx
Если бы мы писали на нативном js, то нам бы еще понадобился babel-loader (он еще работает с jsx)

Откроем index.ts файл.

Стираем это
```
import { someFn } from "./test";

someFn(123);

document.body.innerHTML = `<div style='background: red'>HELLO WORLD!</div>`
```

И попробуем отрендерить наш первый react-компонент: rend + Enter (снипет)
```
import { render } from "react-dom";

render(
  <div></div>
)
```

VSCode начинает ругаться, что у нас не то расширение

`Expected 2-3 arguments, but got 1.ts(2554)
index.d.ts(69, 9): An argument for 'container' was not provided.
Cannot find name 'div'.ts(2304)
type div = /*unresolved*/ any`

Но по сообщению это непонятно.
Меняем расширение ts на tsx у файла index.ts. И нам нужно поменять путь до entry point'а

```
//webpack.config.ts
  ...
  const paths: BuildPath = {
    entry: path.resolve(__dirname, 'src', 'index.ts'),
    build: path.resolve(__dirname, 'build'),
    html: path.resolve(__dirname, 'public', 'index.html'),
  }
  ...
```
Меняем ts на tsx 
`entry: path.resolve(__dirname, 'src', 'index.ts'),` => `entry: path.resolve(__dirname, 'src', 'index.tsx'),`

```
//webpack.config.ts
  ...
  const paths: BuildPath = {
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    build: path.resolve(__dirname, 'build'),
    html: path.resolve(__dirname, 'public', 'index.html'),
  }
  ...
```

Продолжим. Пишем блок div с рандомным текстом и добавляем то, куда будет рендериться наш текст (по умолчанию это блок root, который находится в index.html `<div class="root"></div>` - только поправим ошибку: `<div id="root"></div>`)
```
import { render } from "react-dom";

render(
  <div>kkfnkf</div>,
  document.getElementById('root')
)
```

но у нас все еще подсвечивается красным ошибка, давайте разбираться. Гуглим. 
Нам предлагают в ts-config'е в compilerOptions  в поле jsx поменять на 
```
//до
  "compilerOptions": {
    ...
    "jsx": "react",
    ...
  }
```
```
//после
  "compilerOptions": {
    ...
    "jsx": "react-jsx",
    ...
  }
```

Проверим сборку npm start. Все работает
Добавим что-нибудь в рандоный текст, проверяем. Да. текст изменился

Предлагаю протестировать какой-нибудь уже полноценный компонент.
Создадим в src папочку components. Внутри создадим файлик Сounter.tsx - типичный счетчик.
```
import React, { useState } from 'react'

export const Counter = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  }

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={increment}>increment</button>
    </div>
  )
}
```
Рендерим в index.tsx:
```
import { render } from "react-dom";
import { Counter } from "./components/Counter";

render(
  <div>
    <Counter />
  </div>,
  document.getElementById('root')
)
```
И видим это
![counter.jpg](/images/counter.jpg)

Тыкаем, счетчик увеличивается, т е хуки у нас рботают, компонент работает -  те в принципе мы можем начать разрабатывать react-приложение
<!-- [scss](#scss) -->

<a name="scss"></a> 

### Стили (scss)

Попробуем написать стили для счетчика. Создаем Counter.css:
```
button {
  padding: 20px;
  color: green;
}
```

Импортируем файл в наш рекат компонент `import './Counter.css';`
И видим, что сборка падает с ошибкой, потому что не хватает loader'а, который способен обработать файлы с расширением .css

Обращаемся к документации, гуглим `webpack css`
Но давайте лучше сразу `webpack scss`
Видим [sass-loader](https://webpack.js.org/loaders/sass-loader/), что нам нужно установить несколько зависимостей и добавить еще одно правило, которое включает в себя использование трех лоадеров. Это как раз лоадеры, которые будут обрабатывать наши css-файлы

Копируем этот скриптик и вставляем в терминал
`npm install sass-loader sass webpack --save-dev`
Но т к это страничка по настройке scss, то здесь отсутствует еще пара лоадеров style-loader и css-loader
`npm install sass-loader sass webpack style-loader css-loader --save-dev`

Но в списке правил в документации они есть:
```
module.exports = {
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
    ],
  },
};
```
Устанавливаем их. Затем копируем правила в buildLoaders, создаем там новую переменную и добавляем ее в return:
```
//buildLoaders

  const cssLoaders = {
    test: /\.s[ac]ss$/i,
    use: [
      // Creates `style` nodes from JS strings
      "style-loader",
      // Translates CSS into CommonJS
      "css-loader",
      // Compiles Sass to CSS
      "sass-loader",
    ],
  } 

  ...

    return [
    typescriptLoader,

    cssLoaders,
  ]
```

Обратим внимание, что настроены они именно на sass и scss файлы. 
И обратите внимание, что эти лоадеры идут в определенном порядке. Это очень важно.
Создает стили из js строк, транслирует css в comonJs и затем преобразовывает sass в css

Меняем расширение на scss у Counter

Запускаем сборку. Все работает
У нас полностью настроена работа с scss

### Стили (css-modules)
