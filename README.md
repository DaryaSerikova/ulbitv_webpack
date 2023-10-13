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

[5. Стили (css-modules)](#cssModules)
- [5.1 mini-css-extract-plugin](#miniCssExtractPlugin) (Создает файл `css` из файла `js`)
- [5.2 Подходы изоляции стилей](#stylesIzolationWays) : БЭМ и css-modules
- [5.3 Настройка css-modules (begin)](#setupCSSModulesBegin)
- [5.4 Явная декларация файлов (global.d.ts)](#globalDTs)
- [5.5 Cоздание глобального файла стилей index.scss](#globalStylesFile)
- [5.6 Написание условия модульности. Различия между .scss и .module.scss ](#scssAndModulesDeviding)
- [5.7 Итог](#conclusion5)

[6. Часть файла с версиями ](#versionsFile1)

[7. Роутинг. Сode splitting Lazy Suspence](#routingCodeSplitting)
- [7.1 Добавление роутинга](#routingAdding)
- [7.2 webpack-dev-server(--history-api-fallback)](#historyApiFallback). Привязка запросов к корневой странице (index.html)
- [7.3 Разделение на бандлы. Теория. Зачем это нужно.](#devidingByBandlesTheory)
- [7.4 Практика. Lazy и Suspence](#lazySuspence). Асинхронная подгрузка каждой из страниц отдельно.
- [7.5 Итог](#conclusion6)

[8. Организация стилей. Добавляем темы.](#stylesStructureAddThemes)
- [8.1 Подготовка структуры стилей](#stylesStructure)
- [8.2 Переменные (variabels)](#cssVariabels): создание и подключение переменных
- [8.3 Темы. Цветовая гамма приложения](#appThemesColors): dark и light темы, подключение и toggle
- [8.4 Context для Theme](#contextForTheme): ThemeContext, ThemeProvider, оборачивание приложения в контекст
- [8.5 хук useTheme](#useThemeHook): чтобы было по феншую
- [8.6 Итог](#conclusion8)






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

<a name="cssModules"></a> 

## 5. Стили (css-modules)

Давайте попробуем сделать сборку в режиме dev. 
`npm run build:dev`
Открываем build, видим css прям внутри js-файла, чего не должно быть. Стили должны находиться в отдельном css-файле.
![cssInJs.jpg](/images/cssInJs.jpg)
Для этого есть специальный плагин `mini-css-extract-plagin`

<a name="miniCssExtractPlugin"></a> 

### 5.1 mini-css-extract-plugin

Посмотрим, как его подключить. [На страничке](https://webpack.js.org/plugins/): ctrl+F, вводим: `minicss`

Опиание: Создает файл `css` для каждого файла `js`, для которого нужен `css`

Переходим на [страничку](https://webpack.js.org/plugins/mini-css-extract-plugin)

Копируем команду для установки
`npm install --save-dev mini-css-extract-plugin`
`npm i -D mini-css-extract-plugin@2.5.3`
<!-- 1:12 -->

Пролистав нижу мы можем увидеть, что `plugin` содержит в себе `loader`
```
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  plugins: [new MiniCssExtractPlugin()],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
};
```
Причем подключаем мы его перед `css-loader`'ом вместо `style-loader`'а

Итак, добавим `new MiniCssExtractPlugin(),` в buildPlugins и `import MiniCssExtractPlugin from 'mini-css-extract-plugin';`
Насколько я знаю, порядок плагинов, в котором мы их добавляем, значения особого не имеет. А вот лоадеры важно добавлять в определенном порядке

Здесь мы кстати, сразу можем указать названия файлов и где они будут располагаться. Аналогично тому, что мы указывали в output
Пишем шаблон для получения названия файла, для получения содержимого. Это опять же все делается для кэширования.
И так же можем сразу указать название для `chankFilename` - это когда мы будем разбивать файлы на асинхронные и у нас будут появлятьс отдельные чанки, которые будут асинхронно подгружаться и соответственно для них тоже нужно указать название.

В файле buildLoaders заменяем `style-loader` на `MiniCssExtractPlugin.loader`

Запускаем `npm run build:dev`, видим, что в `js`-файле больше нет `padding`'ов - они переехали в папку `css`.

Возникает ризонный вопрос: нужно ли нам генерировать `css`-файлы в режиме разработки? Я думаю, что нет. Поэтому:
В `buildLoaders` достаем `options: BuildOptions`
Меняем `MiniCssExtractPlugin.loader,` на `options.isDev ? 'style-loader' : MiniCssExtractPlugin.loader,` - те если у нас режим development, то мы используем  `style-loader`, иначе  `MiniCssExtractPlugin.loader`

Ну и так же необходимо передать в саму функцию buildLoaders опции `rules: buildLoaders(),` => `rules: buildLoaders(options),` (в `buildWebpackConfig`)


<!-- 3:47 -->
<!-- [Подходы изоляции стилей](#stylesIzolationWays) -->

<a name="stylesIzolationWays"></a> 

### 5.2 Подходы изоляции стилей

Теперь поговорим про проблему изоляции стилей.

Есть 2 компоненты с одинаковым названием в стилях. Они начинают конфликтовать, поэтому нам нужно соблюдать уникальность селекторов.

- `БЭМ` - распространенный подход для изоляции стилей
Т е мы используем методологию Блок, Элемент, Модификатор.

С `БЭМ` мы получем вместо двух `open`'ов: `.modal__content_open` и `.dropdown__content_open`.\
Подход хороший, но его минус в том, что названия раздуваются и они увеличивают размер bandle'а

- `css-modules`
Мы пишем абсолютно привычный для нас css: наши два `open`'а\
Но в момент, когда мы делаем сборку приложения,`webpack` для каждого такого класса генерирует уникальные идентификаторы.\
Засчет того, что каждый такой идентификатор уникальный, нам гарантируется изоляция стилей, т е они не будут перекрывать друг друга и накладываться.\
Соответственно название превращается из 20-30 символов (как это есть в `БЭМ`) в 8-10 - в зависимости от того, как настроим `webpack`.

Я предлагаю настроить `webpack` таким образом, чтобы мы могли поддерживать, как `scss`-файлы, так и `css-modules`.

Файлы с `css-modules` должны иметь особое название - это `[название компоненты].module.css`\
Переименуем `Counter.scss` => `Counter.module.scss`\
А импорт будет выглядеть вот таким образом: `import classes from './Counter.module.scss';`\
<!-- 5:53 -->
И эти `classes` - это объект с полями (классами, которые мы будем описывать)

```
import React, { useState } from 'react';
// import './Counter.scss';
import classes from './Counter.module.scss';

export const Counter = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  }

  return (
    <div className={classes?.button}>
      <h1>{count}</h1>
      <button onClick={increment}>increment</button>
    </div>
  )
}
```

<a name="setupCSSModulesBegin"></a> 

### 5.3 Настройка css-modules (begin)

Теперь обратимся к документации и посмотрмим, как `css modules` в `webpack`'е настраиваются
Гугл: `webpack css modules`

Кликаем на первую вкладку про [css-loader](https://webpack.js.org/loaders/css-loader/)
<!-- 6:27 -->
И здесь, если мы поищем есть подраздел `modules` 
(Справа чуть проскролить вниз `Sidebar`, далее: `CSS` => `css-loader` => `options` => [modules](https://webpack.js.org/loaders/css-loader/#modules))

Пролистаем чуть ниже до вот такого кода
```
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        loader: "css-loader",
        options: {
          modules: true,
        },
      },
    ],
  },
};
```
В самом простом случае нужно добавить  только вот такую опцию:
```
  options: {
    modules: true,
  },
```
и все: `css-modules` будут работать. 

Здесь (если пролистать выше), конечно, есть ряд свойств, управляненя всякими штуами .. в общем, давайте сейчас будем это настраивать
<!-- 6:56 -->
Переходим в `buildLoaders`
`loaders` можно передавать простым способом (как строку) или передавать, как объект


```
//buildLoaders.ts (до)
  const cssLoaders = {
    test: /\.s[ac]ss$/i,
    use: [
      options.isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
      "css-loader",
      "sass-loader",
    ],
  }
```

Чтобы `webpack` понимал, что это за `loader`, необходимо указать свойство `loader` и указать название. В нашем случае это `css-loader`.
И так же в поле options мы можем передавать какие-нибудь настройки это лоадера
```
  const cssLoaders = {
    test: /\.s[ac]ss$/i,
    use: [
      options.isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
      // "css-loader",
      {
        loader: "css-loader",
        options: {
          
        }
      },
      "sass-loader",
    ],
  } 
```
Последуем примеру из документации и сделаем поле modules со значение `true `(`modules: true`)

<!-- [5.4 Явная декларация файлов (global.d.ts)](#globalDTs) -->

<a name="globalDTs"></a> 

### 5.4 Явная декларация файлов (global.d.ts)

Отвлечемся. Заметичает в видосе, что вебшторм подсветил ошибку в файле `Сounter`. 
Он не понимает, что мы хотим из `scss` импортировать.
![errorModules.jpg](/images/errorModules.jpg)

Чтобы явно определить тип, который должен импортироваться из таких файлов, мы можем создать явную декларацию файлов.
`src` => создаем файл (на уровне с `index.tsx`) `global.d.ts`

Я не помню, как задать тип для возращаемого значения (`.module.scss`)
Поиск в гугле: `css modules typescript`
Открываем первую ссылку, [здесь](https://stackoverflow.com/questions/41336858/how-to-import-css-modules-with-typescript-react-and-webpack) люди предлагают добавить вот такой вот тип
```
declare module '*.css' {
  interface IClassNames {
    [className: string]: string
  }
  const classNames: IClassNames;
  export = classNames;
}
```
Копируем его и добавляем в файл `global.d.ts`, но заменяем css на scss:
```
declare module '*.scss' {
  interface IClassNames {
    [className: string]: string
  }
  const classNames: IClassNames;
  export = classNames;
}
```

B видим, что ошибка у нас пропала. И появились автоподсказки селекторов, которые есть в файле стиля. Автокомплит настроен.
заменим в файле стилей button на .btn, и в Counter `className={classes?.btn}`
```
.btn {
  padding: 20px;
  color: green;
}
```

Проверим сборку: `npm run build:prod`
Сборка прошла успешно. Предлагаю открыть css-файл, который у нас получился.
![cssFileProd.jpg](/images/cssFileProd.jpg)

Минимизированный, вместо класса `.btn` мы видим абракадабру: `.WJfas66YqMo9vlVy3cDg`
<!-- 9;17 -->

Давайте попробуем запустить приложение и посмотрим, как это работает на самой странице: `npm run start`
Пока приложение запускается создадим корневой компонент `App.tsx` (в корне `src` )

```
//App.tsx
import React from 'react'
import { Counter } from './components/Counter'

const App = () => {
  return (
    <div className='app'>
      <Counter />
    </div>
  )
}

export default App;
```
И соответственно меняем index.tsx:
```
//index.tsx (до)
import { render } from "react-dom";
import { Counter } from "./components/Counter";

render(
  <div>
    <Counter />
  </div>,
  document.getElementById('root')
)
```

на вот такой:
```
//index.tsx (после)
import { render } from "react-dom";
import App from "./App";

render(
  <App/>,
  document.getElementById('root')
)
```

<a name="globalStylesFile"></a> 

### 5.5 Cоздание глобального файла стилей index.scss

Следующим этапом мы создадим файлик `index.scss` файл (в корне папки `src`). 
И мы хотим, чтобы в нем `css-modules` не было. Грубо говоря, это у нас такой файлик с глобальными стилями и мы хотим, чтобы н распространялся на все приложение.
```
//index.scss
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app {
  font-size: 30px;
  
}
```

Добавим какой-нибудь текст в `App.tsx` и не забываем импортировать файл `scss`.
```
//App.tsx
import React from 'react'
import { Counter } from './components/Counter';
import './index.scss';

const App = () => {
  return (
    <div className='app'>
      jfhdjkfh
      <Counter />
    </div>
  )
}

export default App;
```

Открываем браузер. Cтили не применились. 
Смотрим сборку `npm run buld:prod`
![errorUsualStyles.jpg](/images/errorUsualStyles.jpg)
Они не применились, потому что `сss-modules` распространились и на обычный файл без модулей.

<!-- [5.6 Написание условия модульности. Различия между .scss и .module.scss ](#scssAndModulesDeviding) -->

<a name="scssAndModulesDeviding"></a> 

### 5.6 Написание условия модульности. Различия между .scss и .module.scss 

Предлагаю это исправить. Применять модульный подход только к тем файлам, которые в названии имеют расширение `.module.scss`
Открываем опять [документацию](https://webpack.js.org/loaders/css-loader/#modules)

Видим в ней свойство auto:
```
  auto: boolean | regExp | ((resourcePath: string) => boolean);
```
C помощью него или по регулярке, или с помощью вот такой вот (`resourcePath`) функции мы можем определять для какого файла применять, а для какого не применять.
И так же сейчас у нас такие большие и непонятные названия, хотелось бы в `dev` режиме, чтобы они были нормальными. читабельными. Чтобы в случае чего мы могли нормально дебажить, изменять стили и понимать в принципе с какими стилями мы работаем.

Откроем опять документацию и определим значение свойства `auto`
Здесь, наверно, стоило пойти более простым путем и определить с помощью регулярки, но я почему-то решил пойти более сложным и пошел через функцию. Но разница, опять же незнчительная.
<!-- 12:07 -->

Эта функция принимает в аргументы путь до файла. Ну и проверка здесь достаточно простая. 
Проверяем с помощью includes: если в участке пути `.module.` то возвращаем true, иначе false
```
//buildLoaders.ts

  const cssLoaders = {
    test: /\.s[ac]ss$/i,
    use: [
      options.isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
      // "css-loader",
      {
        loader: "css-loader",
        options: {
          modules: true,
          auto: (resPath: string) => Boolean(resPath.includes('.module.')),
        }
      },
      "sass-loader",
    ],
  } 
```
С этим разобрались. Теперь обычные файлы, которые не включают в себя `.module.` по идее должны обрабатываться, как обычные `css`-файлы.
Cледующим этапом нужно разобраться с названиями

`options` => `{isDev}`

здесь названия можно генерировать точно так же по шаблонам в `output`
`dev`: Первая часть названия - путь до компонента, затем название класса и хэш
`prod`: хэш 8 символов

В [документации](https://webpack.js.org/loaders/css-loader/#object-2)
```
localIdentName: "[path][name]__[local]--[hash:base64:5]",
```

Замечаем, что нужно писать поле auto в modules, а не рядом. Исправляем
```
//buildLoaders

  const cssLoaders = {
    test: /\.s[ac]ss$/i,
    use: [
      isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
      // "css-loader",
      {
        loader: "css-loader",
        options: {
          modules: {
            auto: (resPath: string) => Boolean(resPath.includes('.module.')),
            localIdentName: isDev 
              ? '[path][name]__[local]--[hash:base64:5]' 
              : '[hash:base64:8]'
          },
        }
      },
      "sass-loader",
    ],
  } 
```

А весь файл выглядит так:
```
//buildLoaders.ts
import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BuildOptions } from './types/config';

export function buildLoaders({isDev}: BuildOptions): webpack.RuleSetRule[] {

  const cssLoaders = {
    test: /\.s[ac]ss$/i,
    use: [
      isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
      // "css-loader",
      {
        loader: "css-loader",
        options: {
          modules: {
            auto: (resPath: string) => Boolean(resPath.includes('.module.')),
            localIdentName: isDev 
              ? '[path][name]__[local]--[hash:base64:5]' 
              : '[hash:base64:8]'
          },
        }
      },
      "sass-loader",
    ],
  } 

  const typescriptLoader = {
    test: /\.tsx?$/,
    use: 'ts-loader',
    exclude: /node_modules/,
  };

  return [
    typescriptLoader,
    cssLoaders,
  ]
}
```

Cобираем `npm run build:prod`. Сборка успешна.
Смотрим `css`-файл
![cssFileProd2.jpg](/images/cssFileProd2.jpg)

Проблема решена

Перезапускаем приложение. `npm run start`. Cтили применились. И в девтулзе стили выглядят не как абракадабра, а вполне то, что так как мы настроили.
![devToolsCssModules.jpg](/images/devToolsCssModules.jpg)

<a name="conclusion5"></a> 

### 5.7 Итог

мы чуть-чуть улучшили работу с `css`\
добавили `miniCSSExtractPlugin`\
настроили `css-modules`\


<a name="versionsFile1"></a> 

## 6. Часть файла с версиями 
```
"devDependencies": {
  "@types/node": "^17.0.21",
  "@types/react": "^17.0.39",
  "@types/react-dom": "^17.0.11",
  "@types/webpack": "^5.28.0",
  "@types/webpack-dev-server": "^4.7.2",
  "css-loader": "^6.6.0",
  "html-webpack-plugin": "^5.5.0",
  "mini-css-extract-plugin": "^2.5.3",
  "sass": "^1.49.9",
  "sass-loader": "^12.6.0",
  "style-loader": "^3.3.1",
  "ts-loader": "^9.2.6",
  "ts-node": "^10.5.0",
  "typescript": "^4.5.5",
  "webpack": "^5.69.1",
  "webpack-cli": "^4.9.2",
  "webpack-dev-server": "^4.7.4",
},
"dependencies": {
  "react": "^17.0.2",
  "react-dom": "^17.0.2",
  "react-router-dom": "^6.2.1"
} 
```

<a name="routingCodeSplitting"></a> 

## 7. Роутинг. Сode splitting Lazy Suspence


<a name="routingAdding"></a> 

### 7.1 Добавление роутинга

`npm i react-router-dom@6.2.1`
`npm i -D @types/react-router-dom@5.3.3`

В `index.ts` оборачиваем в `BrouserRouter` наше приложение.
```
//index.tsx
import { render } from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

render(
  <BrowserRouter>
    <App/>
  </BrowserRouter>,
  document.getElementById('root')
)
```

Следующим этапом добавим пару страниц

```
//App.tsx
import React from 'react'
import { Routes, Route } from 'react-router-dom';
import { Counter } from './components/Counter';
import './index.scss';

const App = () => {
  return (
    <div className='app'>
      <Routes>
        <Route path={'/about'} />
        <Route path={'/'} />

      </Routes>
    </div>
  )
}

export default App;
```

В src создадим папку `pages` и в ней две папки `MainPage` и `AboutPage` и в каждом одноименные `tsx`-файлы

```
//AboutPage.tsx
import React from 'react'

const AboutPage = () => {
  return (
    <div>AboutPage</div>
  )
}

export default AboutPage;
```

```
//MainPage
import React from 'react'

const MainPage = () => {
  return (
    <div>MainPage</div>
  )
}

export default MainPage;
```

```
//App.tsx
import React from 'react'
import { Routes, Route, Link } from 'react-router-dom';
import { Counter } from './components/Counter';
import './index.scss';
import AboutPage from './pages/AboutPage/AboutPage';
import MainPage from './pages/MainPage/MainPage';

const App = () => {
  return (
    <div className='app'>
      <Link to='/'>Главная</Link>
      <Link to='/about'>О сайте</Link>
      <Routes>

        <Route path={'/about'} element={<AboutPage />}/>
        <Route path={'/'} element={<MainPage />}/>

      </Routes>
    </div>
  )
}

export default App;

```

`npm run start`

![routing.jpg](/images/routing.jpg)
Роутинг в базовом варианте работает

<a name="historyApiFallback"></a> 

### 7.2 webpack-dev-server(--history-api-fallback) 

Все хорошо, но при обновлении страницы about появляется такая ошибка
![errorRoutingDevServer.jpg](/images/errorRoutingDevServer.jpg)
<!-- 3:22 -->
Это проблема `dev-server`'а

Предлагаю открыть документацию
Поиск гугл: `webpack-dev-server`, 2 ссылка - [гит этого пакета](https://github.com/webpack/webpack-dev-server)

Кстати, именно им я пользовался при настройке dev-server'а
Кликаем на раздел [`With TypeSctipt`](https://github.com/webpack/webpack-dev-server#with-typescript)
Вот эту строку `import type { Configuration as DevServerConfiguration } from "webpack-dev-server";` я взял отсюда

И вот тут чуть выше, если пролистать, есть ряд опций

Сtrl+F `history`

Находим `--history-api-fallback `:
`Allows to proxy requests through a specified index page (by default 'index.html'), useful for Single Page Applications that utilise the HTML5 History API.`

Это свойство позволяет проксировать запросы через index page, т е через корневую страницу
И это то, что нам нужно, т к мы делаем `Single Page Application`, где фактически есть всего одна `html`-ка

Идем в `buildDevServer`, добавляем это свойство `historyApiFallback: true,` и перезапускаяем сервак (`npm run start`)

К сожалению, при изменении конфига, перезапускать сервак нужно каждый раз. Но мы напишем его 1 раз и больше возвращатьс к нему не будем.
Открываем страницу, тыкаем, обновляем. Больше ошибки нет.

Возвращаемся обратно к приложению.

<a name="devidingByBandlesTheory"></a> 

### 7.3 Разделение на бандлы. Теория. Зачем это нужно.

Cделаем сборку в dev режиме (`npm run build:dev`)

Обратите внимание, что у нас 2 страницы, но всего 1 bundle, то есть обе страницы попали в сборку.

И прежде чем продолжать поговорим о том, почему это плохо
Представим, что у нас приложение и в нем 5 страниц. Каждая страничка объемная, в них много логики и вес каждой, допустим 200кб.

Пользователь заходит на одну из страниц и остальные страницы его не интересуют. 
Но у нас один бандл весом в 1МБ, т к все 5 страниц попадают в это  единый бандл, в одну сборку.
И вместо 200Кб, мы отдаем пользователю целый мегабайт! Во-первых. это долго будет загружаться, во-вторых мы выжираем трафик пользователя.

Хотелось бы иметь какой-то такой механизм.. 
Допустим, сборка весит всего 100Кб и в ней находится информация о роутинге.\
Мы подгрузили эти 100Кб и затем подгружаем только те страницы, на которые переходим.

И такой механизм есть. Это называется Асинхронные чанки, `code splitting`, `lazy loading` - называется по-разному. но суть одна.
В react'е это делается с помощью специальных функций, комонентов `lazy` и suspence.

<!-- [Практика. Lazy и Suspence](#lazySuspence) -->

<a name="lazySuspence"></a> 

### 7.4 Практика. Lazy и Suspence

Давайте посмотрим на практике
В папке AboutPage создадим файл `AboutPage.async.tsx` (или `lazy` - главное, чтоб понималась суть)

Гугл: `react lazy`
Открываем [доку про Code Splitting](https://legacy.reactjs.org/docs/code-splitting.html)

Листаем вниз вот до [сюда](https://legacy.reactjs.org/docs/code-splitting.html#reactlazy)
Это пример асинхронной подгрузки компонента
Давайте это скопируем
```
const OtherComponent = React.lazy(() => import('./OtherComponent'));
```

Лично у меня выскочила ошибка:
`Dynamic imports are only supported when the '--module' flag is set to 'es2020', 'es2022', 'esnext', 'commonjs', 'amd', 'system', 'umd', 'node16', or 'nodenext'.ts(1323)`
`module "/Users/Daria/Desktop/sibers/ulbi-tv-middle/Webpack/src/pages/AboutPage/AboutPage"`
Нашла ответ [тут](https://bobbyhadz.com/blog/typescript-dynamic-imports-only-supported-when-module)
Заменяем в `tsconfig.json`  `"module": "es6",` на `"module": "es2020"` - ошибка пропадает

И сделаем по аналогии для нашей страницы
```
import { lazy } from 'react';

export const AboutPageAsync = lazy(() => import('./AboutPage'));
```

В `import` по сути мы передаем путь до нашего компонента
Важное замечание: компоент должен экспортироваться по дефолту.

То же делаем для 

В App.tsx:
```
  <Route path={'/about'} element={<AboutPage />}/>
  <Route path={'/'} element={<MainPage />}/>
```
```
    <Route path={'/about'} element={<AboutPageAsync />}/>
    <Route path={'/'} element={<MainPageAsync />}/>
```



<!-- 7:50 -->
`npm run build:dev` - Белая пустая страница, снова ошибки, но это потому что все нужно обернуть в `Suspence` вот так:

```
//App.tsx
const App = () => {
  return (
    <div className='app'>
      <Link to='/'>Главная</Link>
      <Link to='/about'>О сайте</Link>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>

          <Route path={'/about'} element={<AboutPageAsync />}/>
          <Route path={'/'} element={<MainPageAsync />}/>

        </Routes>
      </Suspense>
    </div>
  )
}
```
Предлагаю в `devTools`'е открыть вкладку `Network` и посмотреть, как выглядит подгрузка теперь
Обновляем страницу. Видим, что подгрузился `main` и `mainPage` чанки.
![chankLoading1.jpg](/images/chankLoading1.jpg)
Затем переходим на страницу `AboutPage`: видим подгрузку еще и `aboutPage`
![chankLoading2.jpg](/images/chankLoading2.jpg)

Обратите внимание, что если мы один раз их загрузили, то заново прогрузка не происходит.

Сейчас файлы очень маленькие, у нас все локально и загрука мгновенная. 
Поэтому давайте искусственно сделаем задержку, чтобы увидеть, как подгрузка чанка происходит и как это будет влиять на пользователя
```
import { lazy } from 'react';

export const MainPageAsync = lazy(() => new Promise(resolve => {
  //@ts-ignore
  setTimeout(() => resolve(import('./MainPage')), 1500)
}));
```
Видим, что при загрузке страницы отображается `Loading` - за него отвечает `Suspence`


<a name="conclusion6"></a> 

### 7.5 Итог
В этом уроке мы:\
- добавили роутинг, \ 
- добавили пакет `react-router-dom`, \
- и научились разбивать наш большой бандл на маленькие чанки, т е мы научились использовать стандартные механизмы реакта для разбиения кода, так называемого code `splitting`'а - это `react lazy` и `suspence`\


<a name="stylesStructureAddThemes"></a> 

## 8. Организация стилей. Добавляем темы.


<a name="stylesStructure"></a> 

### 8.1 Подготовка структуры стилей

В этом уроке мы поработаем со стилями и зададим такую структуру стилей, при которой мы сможем легко внедрять новые темы, изменять размеры шрифтов глобально в во всем приложении сразу, работать с переменными и т д.

В папке src создаем папку styles. Файл index.scss отправляем в эту папку.
Как вы знаете, у некоторых элементов изначально заложены какие-то стили. И обычно делают какой-то файлик, который эти стили обнуляет.

Так, создаем в папку styles файл reset.scss:
```
//reset.scss
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

input, 
button, 
textarea,
select {
  margin: 0;
  
  font: inherit;
}
```

В файлике index.scss удалим все для *, оставим только .app:
```
//index.scss
.app {
  font-size: 30px;
}
```

Подготовим удобную структуру с css-переменными. И мы ее подготовим таким образом, что внедрить какую-то новую тему будет достаточно просто буквально за пару минут.\
В папке styles создадим папки variables и themes. \
В папке themes создадим два файла: dark.scss и normal.scss\
В папке variables создадим файл global.scss - здесб будут глобальные переменные, например, размеры шрифтов.\

![themesStructure.jpg](/images/themesStructure.jpg)

И теперь все файлы, которые мы сделали, необходимо импортировать в наш главный index.scss-файл, который будет являться корневым. \
Грубо говоря, это точка входа для стилей, а сам файл index.scss импортируем в App.tsx, чтобы эти стили применились для всех вложенных компонентов 

```
//index.scss
@import "reset";
@import "variables/global.scss";
@import "themes/normal.scss";
@import "themes/dark.scss";

.app {
  font-size: 30px;
}
```

<a name="cssVariabels"></a> 

### 8.2 Переменные (variabels)

Переменные в css это очень важная штука, которая позволяет гибко в ходе редизайна изменить во всем приложении практически за пару минут какие-то главные аспекты.

Например, размер шрифта или какие-то цвета

#### Создание переменных

Переменная в css создается так --[название переменной]

В папке variables, файл global.scss 

`--font-size-m`- в данном случае переменная для размера шрифта `m` - это средний размер шрифта, который будет использоваться по умолчанию во всех текстах приложения.
Например, `--font-size-l` будем использовать в заголовках

Так же сразу создадим переменную для шрифта `--font-family-main`
`--font-line-m: 24px;` - размер для высоты линии шрифта. Обычно ее делают на 8px больше шрифта
  
`--font-m: var(--font-size-m) / var(--font-line-m) var(--font-family-main);` - объединяющая переменная, которая включает в себя размер шрифта, размер линии и сам шрифт
```
//global.scss 

:root {
  --font-family-main: Consolas, "Times New Roman", Serif;

  --font-size-m: 16px;
  --font-line-m: 24px;
  --font-m: var(--font-size-m) / var(--font-line-m) var(--font-family-main);

  --font-size-l: 24px;
  --font-line-l: 32px;
  --font-l: var(--font-size-l) / var(--font-line-l) var(--font-family-main);

}
```

Отлично! С размерами шрифтов разобрались, осталось их только подключить

#### Подключение переменных

Захолим в index.scss, в корневом классе (.app) для свойства font зададим var(--font-m) - этот шрифт будет использоваться во всех текстах в приложении по умолчанию

```
@import "reset";
@import "variables/global.scss";
@import "themes/normal.scss";
@import "themes/dark.scss";

.app {
  // font-size: 30px;
  font: var(--font-m);
}
```

<a name="appThemesColors"></a> 

### 8.3 Темы. Цветовая гамма приложения

<!-- 4:09 -->
Навешивать тему мы будем на тот же блок, нв котором сейчас весит .app
Так же можно навешивать на сам body. Здесь, я думаю, это не столь важно.

#### dark-тема. Темная

styles => themes => dark.scss

`--bg-color` - цвет заднего фона
`--primary-color` - главный цвета приложения. Цвет шрифта, который делает какие-то акценты - это заголовки, кнопки, ссылки
`--secondary-color` - второстепенный цвет шрифта. Обычный текст, какие-то параграфы, в общем, то на что не стоит делать акцент.
Грубо говоря `primary` - это заголовок, `secondary` - это описание к заголовку
```
.app.dark {
  --bg-color: rgb(0, 0, 112);

  --primary-color: rgb(0, 109, 0);
  --secondary-color: rgb(0, 205, 0);
}
```

### light-тема. Светлая

```
.app.light {
  --bg-color: rgb(231, 231, 231);

  --primary-color: rgb(13, 23, 138);
  --secondary-color: rgb(39, 31, 206);
}
```

#### Подключение
Теперь переменные надо подключить: `background: var(--bg-color)`, `color: var(--primary-color)`
И добавим `min-height: 100vh;`
```
//index.scss
@import "reset";
@import "variables/global.scss";
@import "themes/normal.scss";
@import "themes/dark.scss";

.app {
  // font-size: 30px;
  font: var(--font-m);

  background: var(--bg-color);
  color: var(--primary-color);

   min-height: 100vh;
}
```
Проверяем, что все работает

#### Toggle для смены темы

<!-- 7:10 -->
```
//App.tsx
import React, { useState, Suspense } from 'react'
import { Routes, Route, Link } from 'react-router-dom';
import './styles/index.scss';
import { AboutPageAsync } from './pages/AboutPage/AboutPage.async';
import { MainPageAsync } from './pages/MainPage/MainPage.async';


export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}

const App = () => {
  const [theme, setTheme] = useState<Theme>(Theme.LIGHT);

  const toggleTheme = () => {
    setTheme( theme === Theme.DARK ? Theme.LIGHT : Theme.DARK)
  }

  return (
    <div className={`app ${theme}`}>
      <button onClick={toggleTheme}>TOGGLE</button>
      <Link to='/'>Главная</Link>
      <Link to='/about'>О сайте</Link>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>

          <Route path={'/about'} element={<AboutPageAsync />}/>
          <Route path={'/'} element={<MainPageAsync />}/>

        </Routes>
      </Suspense>
    </div>
  )
}

export default App;
```

Теперь у нас работает toggle: при нажатии на кнопку меняется цвет шрифта

<!-- [8.4 Context для Theme](#contextForTheme) -->

<a name="contextForTheme"></a> 

### 8.4 Context для Theme

#### ThemeContext

Сейчас у нас функция, переключающая состояние находится в корневом компоненте, но вдруг мы захотим получить доступ, например, в sidebar'е
или в какой-нибудь кнопке.
И по-хорошему нужно иметь доступ к этой теме. Для этого в реакте используется контекст, поэтому давайте его создадим.

В папке src создаем папку theme и в ней файлик ThemeContext.ts
```
//ThemeContext.ts
import { createContext } from "react";

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}

export interface ThemeContextProps {
  theme?: Theme;
  setTheme?: (theme: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextProps>({});


export const LOCAL_STORAGE_THEME_KEY = "theme";
```

Поскольку важно сохранять значение выбранной темы даже после того, как пользователь закрыл браузер, нам понадобится сохранять значение этой темы в localStorage. Поэтому для ключа создадим отдельную переменную, чтобы в нужных местах ее могли импользовать.



Теперь, чтобы работать с контекстом, нам необходимо сделать Provider
Если мы обернем наше приложение в провайдер, то мы с можем в любой точке приложения иметь доступ к выбранной теме.

Получать тему мы будем из localStorage и мы сделали уже для этоко ключ (LOCAL_STORAGE_THEME_KEY)
defaultTheme - берем инфу о теме из localStorage, но если он пуст, то устанавливаем светлую тему.

#### ThemeProvider
```
//ThemeProvider.tsx

import React, { useState } from 'react'
import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from './ThemeContext';


const defaultTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme || Theme.LIGHT;

export const ThemeProvider = () => {
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  // const defaultProps = useMemo()

  return (
    <ThemeContext.Provider
      value={{
        theme: theme,
        setTheme: setTheme,
      }}
    >ThemeProvider</ThemeContext.Provider>
  )
}
```

Обратите внимание, что вот здесь, в Provider, в value мы передаем объект. И по сути НА КАЖДЫЙ РЕНДЕР компонента у нас этот ОБЪЕКТ БУДЕТ ИНИЦИАЛИЗИРОВАТЬ ЗАНОВО .
То есть объект будет КАЖДЫЙ РАЗ новый, ссылка на него будет новая и КОМПОНЕНТ БУДЕТ ПЕРЕРИСОВЫВАТЬСЯ


```
  return (
    <ThemeContext.Provider
      value={{
        theme: theme,
        setTheme: setTheme,
      }}
    >ThemeProvider</ThemeContext.Provider>
  )
```

Здесь это не столь важно, но этим примером я хочу научить пользоваться useMemo()
useMemo() позволяет мемоизировать значения какого-то объекта, массива. 
И каждый раз не создавать новый, а возвращать уже существующий, если из массива зависимостей ничего не изменилось

```
//ThemeProvider.tsx

import React, { FC, useState, useMemo } from 'react'
import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from './ThemeContext';


const defaultTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme || Theme.LIGHT;

export const ThemeProvider: FC = ({children}) => {
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  const defaultProps = useMemo(() => ({
    theme: theme,
    setTheme: setTheme,
  }), [theme]);

  return (
    <ThemeContext.Provider value={defaultProps}>
      {children}
    </ThemeContext.Provider>
  )
}
```

Провайдер готов. Осталось обернуть в него наше приложение.

#### Оборачивание приложения в контекст

```
//index.tsx
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ThemeProvider } from "./theme/ThemeProvider";

render(
  <BrowserRouter>
    <ThemeProvider>
      <App/>
    </ThemeProvider>
  </BrowserRouter>,
  document.getElementById('root')
)
```

Теперь с помощью хука useContext в App мы можем получить до темы доступ

```
//App.tsx
import React, { useState, Suspense, useContext } from 'react'
import { Routes, Route, Link } from 'react-router-dom';
import { AboutPageAsync } from './pages/AboutPage/AboutPage.async';
import { MainPageAsync } from './pages/MainPage/MainPage.async';
import { ThemeContext, Theme } from './theme/ThemeContext';
import './styles/index.scss';



const App = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    setTheme( theme === Theme.DARK ? Theme.LIGHT : Theme.DARK)
  }

  return (
    <div className={`app ${theme}`}>
      <button onClick={toggleTheme}>TOGGLE</button>
      <Link to='/'>Главная</Link>
      <Link to='/about'>О сайте</Link>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>

          <Route path={'/about'} element={<AboutPageAsync />}/>
          <Route path={'/'} element={<MainPageAsync />}/>

        </Routes>
      </Suspense>
    </div>
  )
}

export default App;
```

<a name="useThemeHook"></a> 

### 8.5 хук useTheme

Чтобы все было по феншую вот эту логику по получению темы из контекста и по переключению темы вынести в отдельный хук useTheme.

src => theme => useTheme.ts

В момент переключения темы нам нужно сохранять ее в localStorage. Не просто менять состояние, а сохранять.

```
import { useContext } from "react";
import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from "./ThemeContext";

interface useThemeResult {
  toggleTheme: () => void;
  theme: Theme;
}

export function useTheme(): useThemeResult {
  const { theme, setTheme } = useContext(ThemeContext);

  const newTheme = theme === Theme.DARK ? Theme.LIGHT : Theme.DARK;

  const toggleTheme = () => {
    setTheme(newTheme);
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
  }
  return {
    theme,
    toggleTheme,
  }
}
```

У нас есть хук, который мы можем использовать. \
В любой точке нашего приложения, в любой компоненте мы этот хук можем использовать. \
При этом мы не указываем и не импортируем каждый раз контекст. \
Нам о нем знать в принципе вообще не обязательно, достаточно знать о существовании хука useTheme().


```
import React, { Suspense } from 'react'
import { Routes, Route, Link } from 'react-router-dom';
import { AboutPageAsync } from './pages/AboutPage/AboutPage.async';
import { MainPageAsync } from './pages/MainPage/MainPage.async';
import './styles/index.scss';
import { useTheme } from './theme/useTheme';



const App = () => {
  const {theme, toggleTheme} = useTheme();

  return (
    <div className={`app ${theme}`}>
      <button onClick={toggleTheme}>TOGGLE</button>
      <Link to='/'>Главная</Link>
      <Link to='/about'>О сайте</Link>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>

          <Route path={'/about'} element={<AboutPageAsync />}/>
          <Route path={'/'} element={<MainPageAsync />}/>

        </Routes>
      </Suspense>
    </div>
  )
}

export default App;
```
<!-- [8.6 Итог](#conclusion8) -->

<a name="conclusion8"></a> 

### 8.6 Итог
- мы сделали два файла с переменными под разные темы (.dark и .light)
- мы сделали общий файл, в котором храним общие переменные (общие цвета, размеры шрифтов..)
- для того, чтобы внедрить какую-то новую тему, нам достаточно создать еще один scss файл с теми же переменными, переопределить их и добавить эту тему в наш хук, в котором мы эти тем переключаем







