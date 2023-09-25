# UlbiTV

## Содержание
[Usage](#)\
[1 Basic setup](#basicSetup)
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

[2 Декомпозиция конфига. Опции конфигурации](#decompositionConfig)
- [buildPlugins](#buildPlugins)
- [buildLoaders](#buildLoaders)
- [buildResolvers](#buildResolvers)
- [buildWebpackConfig.ts - общая функция конфгурации с опциями](#buildWebpackConfig)



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

<!-- [buildWebpackConfig.ts - общая функция конфгурации с опциями](#buildWebpackConfig) -->
<a name="buildWebpackConfig"></a> 

### buildWebpackConfig.ts

Запускаем сборку и видим ошибку
![decompositionError.jpg](/images/decompositionError.jpg)

По сообщению об ошибке можно понять, что не удается распознать файлик index.html
И это логично, т к мы перенесли плагин (он теперь находится в другой папке, по другому пути) и этот путь больше неактуален (`path.resolve(__dirname, 'public', 'index.html')`)
![pathError.jpg](/images/pathError.jpg)
Можно его, конечно, тут захардкодить, но мы хотим сделать качественно. Поэтому создадим такой механизм, по которому мы сможем эти пути задавать еще до сборки. Т е  конфигурировать конфиг, задавать опции из-вне. Например, порт, пути, адрес ip, режим (developmemt/production) - т е всем этим хорошо бы уметь управлять из-вне.
И первое с чего мы начнем это создадим тип, в котором опишем вот эти вот опции.

Создадим в папке `build` папку `types` и в ней файл `config.ts`.
Первая опция - это `mode` соответственно `developmemt` или `prodaction`
`paths` - путь до `entry point`'а, путь до папки (куда мы делаем сборку), путь до html - т е любые пути, которые будут использоваться в нашей сборке, в нашей конфигурации, будут располагаться как раз вот в этом свойстве.
`entry` - первый путь до `entry point`'а
`build` - второй до папки со сборкой (это папка `build`)
`html` - путь до файлика `html`, который лежит в папке `public`

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
И сюда перенесем всю конфигурацию, которую мы делали в корне проекта.
И вот как раз вот эта вот функция, которая будет конфиг собирать, она будет принимать набор опций, для которых мы собрали соответствующий тип `BuildOptions`.
B разумеется, что эта функция будет возвращать тип `webpack.Configuration`.

![configuration.jpg](/images/configuration.jpg)
