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
- [8.1 Подготовка структуры стилей](#stylesStructure): файл reset и глобальный корневой index.scss с импортированнными файлами scss
- [8.2 Переменные (variabels)](#cssVariabels): создание и подключение переменных
- [8.3 Темы. Цветовая гамма приложения](#appThemesColors): dark и light темы, подключение и toggle
- [8.4 Context для Theme](#contextForTheme): ThemeContext, ThemeProvider, оборачивание приложения в контекст
- [8.5 хук useTheme](#useThemeHook): чтобы было по феншую
- [8.6 Итог](#conclusion8)

[9. classNames. Создаем git репозиторий](#classNamesGit)
- [9.1 Создание функции classNames](#classNamesFuncCreating)
- [9.2[404NotFound]](#9.2[404NotFound])
- [9.3 Cоздание .gitignore](#gitignoreCreating)

[10. Архитектура. Введение. Теория](#arhitectureBeginingTheory)

[11. Архитектура. Начинаем внедрять. Основы.](#arhitectureBeginingPractice)
- [11.1 Настройка путей. tsconfig](#tsconfigSettingsPaths)
- [11.2 Настройка путей. Webpack, resolve](#webpackSettingsPaths): resolve.preferAbsolute, resolve.modules, resolve.alias
- [11.3 Приводим в порядок pages](#clearPages)
- [11.4 helpers и shared](#helpersAndShared)
- [11.5 Итог](#conclusion11)

[12. AppRouter. Конфиг для роутера.](#appRouterCongig)
- [12.1 Папка router](#fileRouter): index.ts-файл и ui => AppRouter.tsx (app => providers)  
- [12.2 config router'а (shared)](#configRouter)
- [12.3 Cоединяем AppRouter и config](#connectAppRouterAndConfig)

[13. Navbar.Шаблоны для разработки. Первый UI Kit элемент](#navbarSnippetsFirstUiKit)
- [13.1 Navbar.](#navbar)
- [13.2 Кастомные сниппеты VSCode](#snippets)
- [13.3 Подправляем стили, переменная высоты для Navbar](#fixStylesHightVariable)
- [13.4 Ссылка - классический пример shared-компонента](#linkSharedComponent)
- - [Создание компоненты AppLink](#appLinkCreating)
- - [Стилизация AppLink](#appLinkStyling)
- - [Создание inverted цветов](#invertedColorsCreating)
- - [Чтобы применить новую тему](#applyNewTheme)
- [13.5 Итог](#conclusion13)

[14. Svg loader. File loader. Button UI kit](#svgLoaderFileLoaderButton)
- [14.1 Создание ThemeSwitcher (widgets)](#themeSwitcherCreating)
- - [Холиварный момент: ThemeSwitcher в widgets или в shared?](#pointOfContentionWidgetsShared)
- - [Для чего нужен этот пропс classname (как additional) в classNames?](#classnameAdditional)
- [14.2 Добавляем svg-файлы. Вспроизведение ошибки](#addSvgFilesError)
- [14.3 Настройка Webpack для Svg-файлов](#svgFilesWebpackSettings)
- [14.4 Настройка Webpack для png, jpg, jpeg, gif](#pngJpegGifFilesWebpackSettings)
- [14.5 Замечание: woff и woff2 - шрифты в fileLoader](#woffWoff2WebpackSettings)
- [14.6 Настройка TypeSript: svg, png, jpg, jpeg](#svgPngJpegTypeSriptSettings)
- - [Правка Theme, ThemeProvider](#14.6fixThemeProvider)
- [14.7 Button - shared компонент](#ButtonIsSharedComponent)
- [14.8 Итог](#Conclusion14)

[15. Sidebar.Layout](#SidebarLayout)
- [15.1 Cоздание Sidebar](#SidebarCreating)
- [15.2 Обустраиваем Sidebar в App.tsx](#SidebarAppTsx)
- [15.2 Обустраиваем Sidebar в App.tsx](#SidebarAppTsx)
- [15.3 Collapsed: сворачивание Sidebar'а](#SidebarCollapsed)
- [15.4 Перенос ThemeSwitcher из Navbar в Sidebar](#ThemeSwitcherFromNavbarToSidebar)

[16. i18n. Интернационализация. Define plugin. Плагин переводов.](#i18nDefinePluginTranslationPlugin)












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

В папке `src` создаем папку `styles`. Файл `index.scss` отправляем в эту папку.
Как вы знаете, у некоторых элементов изначально заложены какие-то стили. И обычно делают какой-то файлик, который эти стили обнуляет.

Так, создаем в папку `styles` файл `reset.scss`:
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

В файлике `index.scss` удалим все для *, оставим только `.app`:
```
//index.scss
.app {
  font-size: 30px;
}
```

Подготовим удобную структуру с `css`-переменными. И мы ее подготовим таким образом, что внедрить какую-то новую тему будет достаточно просто буквально за пару минут.\
В папке `styles` создадим папки `variables` и `themes`. \
В папке `themes` создадим два файла: `dark.scss` и `normal.scss`\
В папке `variables` создадим файл `global.scss` - здесб будут глобальные переменные, например, размеры шрифтов.\

![themesStructure.jpg](/images/themesStructure.jpg)

И теперь все файлы, которые мы сделали, необходимо импортировать в наш главный `index.scss`-файл, который будет являться корневым. \
Грубо говоря, это точка входа для стилей, а сам файл `index.scss` импортируем в` App.tsx`, чтобы эти стили применились для всех вложенных компонентов 

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

Переменные в `css` это очень важная штука, которая позволяет гибко в ходе редизайна изменить во всем приложении практически за пару минут какие-то главные аспекты.

Например, размер шрифта или какие-то цвета

#### Создание переменных

Переменная в `css` создается так `--[название переменной]`

В папке `variables`, файл `global.scss `

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

Захолим в `index.scss`, в корневом классе (`.app`) для свойства font зададим `var(--font-m)` - этот шрифт будет использоваться во всех текстах в приложении по умолчанию

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
Навешивать тему мы будем на тот же блок, нв котором сейчас весит `.app`
Так же можно навешивать на сам `body`. Здесь, я думаю, это не столь важно.

#### dark-тема. Темная

`styles` => `themes` => `dark.scss`

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

Теперь у нас работает `toggle`: при нажатии на кнопку меняется цвет шрифта

<!-- [8.4 Context для Theme](#contextForTheme) -->

<a name="contextForTheme"></a> 

### 8.4 Context для Theme

#### ThemeContext

Сейчас у нас функция, переключающая состояние находится в корневом компоненте, но вдруг мы захотим получить доступ, например, в `sidebar`'е
или в какой-нибудь кнопке.
И по-хорошему нужно иметь доступ к этой теме. Для этого в реакте используется контекст, поэтому давайте его создадим.

В папке `src` создаем папку theme и в ней файлик `ThemeContext.ts`
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

Поскольку важно сохранять значение выбранной темы даже после того, как пользователь закрыл браузер, нам понадобится сохранять значение этой темы в `localStorage`. Поэтому для ключа создадим отдельную переменную, чтобы в нужных местах ее могли импользовать.



Теперь, чтобы работать с контекстом, нам необходимо сделать `Provider`
Если мы обернем наше приложение в провайдер, то мы с можем в любой точке приложения иметь доступ к выбранной теме.

Получать тему мы будем из `localStorage` и мы сделали уже для этоко ключ (`LOCAL_STORAGE_THEME_KEY`)
`defaultTheme` - берем инфу о теме из `localStorage`, но если он пуст, то устанавливаем светлую тему.

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

Обратите внимание, что вот здесь, в` Provider`, в `value` мы передаем объект. И по сути НА КАЖДЫЙ РЕНДЕР компонента у нас этот ОБЪЕКТ БУДЕТ ИНИЦИАЛИЗИРОВАТЬ ЗАНОВО .
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

Здесь это не столь важно, но этим примером я хочу научить пользоваться `useMemo()`
`useMemo()` позволяет мемоизировать значения какого-то объекта, массива. 
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

Чтобы все было по феншую вот эту логику по получению темы из контекста и по переключению темы вынести в отдельный хук `useTheme`.

`src` => `theme` => `useTheme.ts`

В момент переключения темы нам нужно сохранять ее в `localStorage`. Не просто менять состояние, а сохранять.

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
Нам о нем знать в принципе вообще не обязательно, достаточно знать о существовании хука `useTheme()`.


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

<a name="conclusion8"></a> 

### 8.6 Итог
- мы сделали два файла с переменными под разные темы (`.dark` и `.light`)
- мы сделали общий файл, в котором храним общие переменные (общие цвета, размеры шрифтов..)
- для того, чтобы внедрить какую-то новую тему, нам достаточно создать еще один scss файл с теми же переменными, переопределить их и добавить эту тему в наш хук, в котором мы эти тем переключаем


<a name="classNamesGit"></a> 

## 9. classNames. Создаем git репозиторий

`src` => создаем папку `helpers` => создаем файл `classNames.ts`

гугл: `classnames react`
[GitHub](https://github.com/JedWatson/classnames) на эту библиотеку


<!-- [9.1 Создание функции classNames](#classNamesFuncCreating) -->

<a name="classNamesFuncCreating"></a> 

### 9.1 Создание функции classNames

```
export function classNames(cls: string, mods, additional: string[]): string {

}
```
Функция `classNames` должна возвращать строку классов,
Аргументы:
`cls` - главный класс (например, `app`)
`mods` - объект с модами (ключ - название класса, значение - булиан флаг, если true - класс добавляем, иначе - удаляем)
`additional` - массив каких-то дополнительных классов (например padding не завивсит от условий, он нужен всегла)

```
classNames('remove-btn', { hovered: true, selectable: true, red: false }, ['pdg']);
//'remove-btn hovered selectable pdg'
```

`hovered` - :hover
`selectable` - выбран

```
type Mods = Record<string, boolean | string>

//Example
const obj: Mods = {
  'hovered': true,
  'selectable': 'djfhjdfh',
}
```

```
type Mods = Record<string, boolean | string>

export function classNames(cls: string, mods: Mods, additional: string[]): string {
  return [
    cls,
    ...additional,
    ...Object.entries(mods)
      .filter(([className, value]) => Boolean(value)) //[key, value]
      .map(([className]) => className) //[key, value]
  ].join(' ')
}

// classNames('remove-btn', { hovered: true, selectable: true, red: true }, ['pdg']);
//'remove-btn hovered selectable pdg'
```
По сути это самописная библиотека classNames


<a name="9.2[404NotFound]"></a> 

### 9.2


Откроем компонент App
До:
```
const App = () => {
  const {theme, toggleTheme} = useTheme();

  return (
    <div className={`app ${theme}`}>
      ...
    </div>
  )
}
```

После:
```
const App = () => {
  const {theme, toggleTheme} = useTheme();

  return (
    <div className={classNames('app', {}, [theme])}>
      ...
    </div>
  )
}
```

<a name="gitignoreCreating"></a> 

### 9.3 Cоздание .gitignore

```
./build
./node_modules
.idea
```
`./build` - нет смысла заливать сборку на гит
`./node_modules` - очевидно
`.idea` - для тех, кто работает с вебшторм. Скрытая папка создается автоматически в корне проекта.

Бесполезная ссылка на репозиторий, потому что приватная
`https://github.com/utimur/production-project`


```
/build
node_modules
.idea
```

`/build` - это означает, что гит проигнорирует только верхний build в корне проекта, а внутри конфига будет непроигнорирована



### Из lesson 14 Navbar

1. mods и additional - это опциональные штуки, их нужно поправить, добавить знак вопроса.
Или просто их проинициализировать. Мы выбираем 2ой путь
меняем это
`export function classNames(cls: string, mods: Mods, additional: string[]): string {`
на это
`export function classNames(cls: string, mods: Mods = {}, additional: string[] = []): string {`

2. Т к в additional могут прилетать undefined'ы, поскольку className необязательный, то по-хорошему его надо фильтровать по Boolean фильтру
`...additional,`
`...additional.filter(Boolean),`

```
//до изменений
type Mods = Record<string, boolean | string>

export function classNames(cls: string, mods: Mods, additional: string[]): string {
  return [
    cls,
    ...additional,
    ...Object.entries(mods)
      .filter(([className, value]) => Boolean(value)) //[key, value]
      .map(([className]) => className) //[key, value]
  ].join(' ')
}
```

```
//после изменений
type Mods = Record<string, boolean | string>

export function classNames(cls: string, mods: Mods = {}, additional: string[] = []): string {
  return [
    cls,
    ...additional.filter(Boolean),
    ...Object.entries(mods)
      .filter(([className, value]) => Boolean(value)) //[key, value]
      .map(([className]) => className) //[key, value]
  ].join(' ')
}
```


<a name="arhitectureBeginingTheory"></a> 

## 10. Архитектура. Введение. Теория

Мы будем пользоваться методологией `feature sliced`

[Документация по Feature Sliced Design](https://feature-sliced.design/)

Можно посмотреть типы архитектур, в том числе и FSD [здесь](https://www.youtube.com/watch?v=c3JGBdxfYcU&t=4s&ab_channel=UlbiTV)


<!-- [11. Архитектура. Начинаем внедрять. Основы.](#arhitectureBeginingPractice) -->

<a name="arhitectureBeginingPractice"></a> 

## 11. Архитектура. Начинаем внедрять. Основы.

Создаем в src папки: app, widgets, features, shared, entities

Затем:
- файл App.tsx отправляется (в src => app)
- папка styles(глобальные стили) отправляется (в src => app)
- создаем папку types (в src => app) и отправляем туда файл global.d.ts

- папку components можно удалять, это был пример с Counter'ом, он нам не нужен

Разберемся с темами. Для таких провайдеров, глобальных оберток существует папка providers.

- src => providers в нем создаем папку ui и index.ts. В папку ui перекидываем (из папки theme) ThemeProvider.tsx.
```
//(src => providers => ThemeProvider) index.ts

import { ThemeProvider } from "./ui/ThemeProvider";

export { ThemeProvider };
```

В src => providers в файле index.ts 
Далее осталось разобраться с остатками в папке ThemeContext.ts и useTheme.ts.
Либо мы пихаем их в providers, либо в shared => config
- отправляем папку theme в shared => config
- создадим в app => providers => ThemeProvider создадим папку lib и перенесем туда хук useTheme и ThemeContext.ts из папки theme. Добавляем экспорт, в index.ts
(оставшаяся пустая папка theme удаляется )

```
//(src => providers => ThemeProvider) index.ts

import { ThemeProvider } from "./ui/ThemeProvider";
import { useTheme } from "./lib/useTheme";

export { ThemeProvider, useTheme };
```

<!-- [11.1 Настройка путей. tsconfig](#tsconfigSettingsPaths) -->

<a name="tsconfigSettingsPaths"></a> 

### 11.1 Настройка путей. tsconfig

Вы могли заметить, что с этим подходом импорты у нас выглядят вот так
```
import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from '../../../../shared/config/theme/ThemeContext';
```

Cтрашные экспорты, залазим в самые кишки, вылезаем на несколько уровней назад.
Хочется, чтобы во-первых, все это было более симпатично, во-вторых, поскльку у нас будет `public api`, хотелось бы, чтобы из этого `publuc api`, с верхнего уровня абсолютными импортами доставать то, что нам необходимо.
Для этого:
1. Раскомментируем в `tscofig.json` `".baseUrl": ".",`
2. Добавим еще одно поле path, оно говорит нам, что все экспорты, импорты абсолютные будут идти из папки `src`
```
//tscofig.json
  ...
  "baseUrl": ".",
  "paths": {
    "*": ["./src/*"]
  },
  ...
```

Теперь наш страшный импорт можно написать таким образом:
```
import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from 'shared/config/theme/ThemeContext';
```

заменим импорты на абсолютные в useTheme и ThemeProvider
заменим и в index.tsx (на самом верхнем корневом уровне)
```
// import { ThemeProvider } from "./app/providers/ThemeProvider/ui/ThemeProvider";
import { ThemeProvider } from "app/providers/ThemeProvider";
```

Вот этот index.ts-файл и есть `public api` (app => providers => index.ts) - он регулирует то, что мы отдаем наружу, он не отдает вспомиогательные интерфейсы

#### Еще ВАЖНЫЙ МОМЕНТ. Абсолютные и относительные пути
Рекомендуется внутри самого модуля рекомендуется писать относительные пути, чтобы в любой момент мы могли этот модуль переместить и по сути импорты у нас не поменяются, потому что они все сосредоточены относительно модуля
А вот когда экспортируем наружу, мы используем абсолютные импорты до index.ts файла.
-----
Абсолютный путь показывает точное местонахождение файла, а относительный показывает путь к файлу относительно какой-либо "отправной точки" (файл, программа и т. д.).
-----
src => app => App.tsx поменяем абсолютные на относительные пути
```
// import { AboutPageAsync } from '../pages/AboutPage/AboutPage.async';
// import { MainPageAsync } from '../pages/MainPage/MainPage.async';
// import { useTheme } from './providers/ThemeProvider/lib/useTheme';
// import { classNames } from '../helpers/classNames';
import { AboutPageAsync } from 'pages/AboutPage/AboutPage.async';
import { MainPageAsync } from 'pages/MainPage/MainPage.async';
import { useTheme } from 'app/providers/ThemeProvider/';
import { classNames } from 'helpers/classNames';
```

<a name="webpackSettingsPaths"></a> 

### 11.2 Настройка путей. Webpack, resolve

`npm run start` - видим, что куча ошибок и все эти ошибки связаны с абсолютными путями.
Все дело в том, что `tsconfig.json` мы настроили, а вот `webpack` пока ничего об абсолютных импортах не знает.

И нам надо соглосовать webpack с тем, что мы написали в `tsconfig`'е 

За это отвечает resolvers (у нас они в config => build => buildResolvers.ts )

Но как их настраивать?
гугл: `webpack absolute imports`

Жмем первую ссылку и попадаем [сюда](https://webpack.js.org/concepts/module-resolution/)
Находим подсвеченные слова [resolve.modules](https://webpack.js.org/configuration/resolve/#resolvemodules) и [resolve.alias](https://webpack.js.org/configuration/resolve/#resolvealias) - это ссылки на документацию
<!-- 6:51 -->

Тычем на [элиасы](https://webpack.js.org/configuration/resolve/#resolvealias)

Во-первых, нам нужно будет добавить (пока только смотрим, не добавляем) в resolve такие вот alias'ы:

```
const path = require('path');

module.exports = {
  //...
  resolve: {
    alias: {
      Utilities: path.resolve(__dirname, 'src/utilities/'),
      Templates: path.resolve(__dirname, 'src/templates/'),
    },
  },
};
```
#### resolve.preferAbsolute
А пока, если пролистать ниже, наткнемся на свойство [resolve.preferAbsolute](https://webpack.js.org/configuration/resolve/#resolvealias)

`preferAbsolute: true,` - значит, что абсолютные пути в приоритете
Добавляем эту строчку в `buildResolvers`

```
//config => build => buildResolvers.ts
import { ResolveOptions } from "webpack";

export function buildResolvers(): ResolveOptions {
  return {
      extensions: ['.tsx', '.ts', '.js'],
      preferAbsolute: true,
    }
}
```

#### resolve.modules
[resolve.modules](https://webpack.js.org/configuration/resolve/#resolvemodules)

Так же нам необходимо указать modules. 
В него нам надо будет передать путь до папки src, а значит, что нам нужны options.
Достаем в аргументах `options: BuildOptions`, 
Переходим в файл BuildOptions (нажимаем на BuildOptions правой кнопкой мыши и Go to defenition)

Здесь есть interface BuildPath
```
export interface BuildPath {
  entry: string;
  build: string;
  html: string;
}
```
Добавляем в него новую строчку:
`src: string;` - это путь до папки с исходным кодом
```
export interface BuildPath {
  entry: string;
  build: string;
  html: string;
  
  src: string;
}
```

Затем идем в webpack.config.ts

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

Добавляем в webpack.config.ts, в BuildPath `src: path.resolve(__dirname, 'src'),`

```
//webpack.config.ts
...

  const paths: BuildPath = {
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    build: path.resolve(__dirname, 'build'),
    html: path.resolve(__dirname, 'public', 'index.html'),
    
    src: path.resolve(__dirname, 'src'),
  }

...
```

Теперь в buildResolvers мы можем из опций этот путь вытащить.
Для этого добавим строку 
`modules: [options.paths.src, 'node_modules'],`
в наш `buildResolvers.ts`

```
//config => build => buildResolvers.ts

import { ResolveOptions } from "webpack";
import { BuildOptions } from "./types/config";

export function buildResolvers(options: BuildOptions): ResolveOptions {
  return {
      extensions: ['.tsx', '.ts', '.js'],
      preferAbsolute: true,

      modules: [options.paths.src, 'node_modules'],
    }
}
```

#### resolve.alias
[resolve.alias](https://webpack.js.org/configuration/resolve/#resolvealias)

Следуя документациии, нам нужно указать еще и элиасы
В качестве элиаса часто указывают знак `@`
Например: `@/shared/classNames`

Но если оставить элиасы пустыми `alias: {},`
(`/shared/classNames`)
И при этом указать modules и preferAbsolute, то в таком случае мы сможем обращаться к папкам напрямую без указания каких-либо дополнительных знаков, элиасов

Можно пойти по любому из этих двух путей, но мы будем пользоваться напрямую.

Добавляем новые строчки в `buildResolvers`

`mainFiles: ['index'],` - явное указание главного файла
`alias: {},` - пустой элиас

```
import { ResolveOptions } from "webpack";
import { BuildOptions } from "./types/config";

export function buildResolvers(options: BuildOptions): ResolveOptions {
  return {
      extensions: ['.tsx', '.ts', '.js'],
      preferAbsolute: true,
      modules: [options.paths.src, 'node_modules'],

      mainFiles: ['index'],
      alias: {},
    }
}
```

Пробуем запустить
`npm run start`

Выпадает ошибка: забыли передать опции в buildResolvers

![resolveBuildOptionsError.jpg](/images/resolveBuildOptionsError.jpg)

В buildWebpackConfig заменяем в `return`: 
`resolve: buildResolvers(),` на `resolve: buildResolvers(options),`

Пробуем запустить `npm run start` - все ок, toggle работает
<!-- 
1) Сделать приоритетными абсолютные пути
2) Разобраться с модулями
3) Разобраться с элиасами -->

На даный момент структура приложения выглядит так
![structurePart1.jpg](/images/structurePart1.jpg)

<!-- 9:34 -->

<!-- [11.3 Приводим в порядок pages](#clearPages) -->

<a name="clearPages"></a> 

### 11.3 Приводим в порядок pages

С самым верхним сдлоем мы разобрались, к нему мы вернемся чуть позже. 
Теперь давайте наведем порядок в папке pages

Руководствуясь методологией, для каждого слоя должны быть сегменты и слайсы (за исключением слоя `shared`), а так же `public api`

`public api` - `index.ts`-файл

В папке `AboutPage` создаем папку `ui`, туда переносим сами компоненты (`AboutPage.tsx` и `AboutPage.async.tsx`) и оставляем снаружи `index.ts`

В `index.ts` наружу выносим только асинхронный компонент, сам `AboutPage`  у нас остается внутри, потому что наружу нам нужен асинхронный чанк, потому что мы используем его в роутинге, чтобы уменьшить размер бандла.

Но сверху нам необязательно знать, что это асинхронный компонент, поэтому отдать наверх мы его можем с названием ``

```
import { AboutPageAsync } from "./ui/AboutPage.async";

export { AboutPageAsync as AboutPage}
```

#### Замечание по export'ам

Перед тем как эспортировать компонент, мы его сначала заимпортировали
Есть альтернативный способ

`export { AboutPageAsync } from "./ui/AboutPage.async";`

Это прямой экспорт без лишнего импорта.
В начале он об этом забыл, но позже перешел чисто на такие импорты.

Заходим в App.tsx

```
import React, { Suspense } from 'react'
import { Routes, Route, Link } from 'react-router-dom';
import { AboutPageAsync } from 'pages/AboutPage/ui/AboutPage.async';
import { MainPageAsync } from 'pages/MainPage/MainPage.async';
import { useTheme } from 'app/providers/ThemeProvider/';
import { classNames } from 'helpers/classNames';
import './styles/index.scss';



const App = () => {
  const {theme, toggleTheme} = useTheme();

  return (
    <div className={classNames('app', {}, [theme])}>
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

Нам нужно заменить вот эти две вещи
`import { AboutPageAsync } from 'pages/AboutPage/ui/AboutPage.async';`
`<Route path={'/about'} element={<AboutPageAsync />}/>`

Обратите внимание, что в предложении экспорта есть и абсолютный путь, и относительный. Нам нужно доставать из модуля, а не из этих кишков
![routerRelativePath.jpg](/images/routerRelativePath.jpg)

Поэтому заменяем те строки на эти:
`import { AboutPage } from 'pages/AboutPage';`
`<Route path={'/about'} element={<AboutPage/>}/>`

Проделываем тоже самое для MainPage: компоненты в ui и создаем index.ts-файл

После в App.tsx исправляем на новые строки:

`import { MainPage } from 'pages/MainPage';`
` <Route path={'/'} element={<MainPage/>}/>`

`npm run start` - все работает
Хотя лично у меня появилась ошибка, но она вообще не мешает работе: toggle рфботает и rout'ы тоже работают
![FSerror1.jpg](/images/FSerror1.jpg)

<a name="helpersAndShared"></a> 

### 11.4 helpers и shared

итак, со слоем app мы пока что разобрадись, со слоем pages мы разобрались.
Еще у нас осталась папочка helpers. 
В ней у нас лежит единственная функция classNames 
![FSclassNames1.jpg](/images/FSclassNames1.jpg)

И ее (папку classNames) мы перенесем на shared (в папку lib/ в слайс lib) слой, поскольку эта функция будет использоваться абсолютно везде.
![FSclassNames2.jpg](/images/FSclassNames2.jpg)

В shared, в папке lib у нас будут всякие helper'ы, переиспользуемые хуки и прочее

<a name="conclusion11"></a> 

### 11.5 Итог
Подведем итоги

У нас теперь выстраивается четкая структура по FSD, состоящая из 6ти слоев
![FSconclusion.jpg](/images/FSconclusion.jpg)


<a name="appRouterCongig"></a> 

## 12. AppRouter. Конфиг для роутера.

Давайте наведем порядок в компоненте `App` - это корень нашего приложения и он должен быть максимально чистым


<!-- [12.1 Папка router](#fileRouter): index.ts-файл и ui => AppRouter.tsx (app => providers)  -->

<a name="fileRouter"></a> 

### 12.1 Папка router: index.ts-файл и ui => AppRouter.tsx (app => providers)

`routing` - это такая глобальная штука, поэтому ее вынесем на уровень `provider`'а (`src` => `app` => `providers`), рядышком с `ThemeProvider`'ом

Создаем папку `router` в `src` => `app` => `providers`. Внутри нее создаем `index.ts`-файл и папку `ui`.
Внутри папки `ui` создаем `AppRouter.tsx`

```
//AppRouter.tsx
import React from 'react'

const AppRouter = () => {
  return (
    <div>
      
    </div>
  )
}

export default AppRouter;
```

Теперь заходим в наш `App.tsx`
```
//на данный момент App.tsx
import React, { Suspense } from 'react'
import { Routes, Route, Link } from 'react-router-dom';

import { AboutPage } from 'pages/AboutPage';
import { MainPage } from 'pages/MainPage';
import { useTheme } from 'app/providers/ThemeProvider/';
import { classNames } from 'shared/lib/classNames/classNames';
import './styles/index.scss';



const App = () => {
  const {theme, toggleTheme} = useTheme();

  return (
    <div className={classNames('app', {}, [theme])}>
      <button onClick={toggleTheme}>TOGGLE</button>
      <Link to='/'>Главная</Link>
      <Link to='/about'>О сайте</Link>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>

          <Route path={'/about'} element={<AboutPage/>}/>
          <Route path={'/'} element={<MainPage/>}/>

        </Routes>
      </Suspense>
    </div>
  )
}

export default App;
```

Вырезаем из `App.tsx` все. что касается `router`'а :

```
  <Suspense fallback={<div>Loading...</div>}>
    <Routes>

      <Route path={'/about'} element={<AboutPage/>}/>
      <Route path={'/'} element={<MainPage/>}/>

    </Routes>
  </Suspense>
```

И вставляем в наш `AppRouter`
Поправлем все импорты и получаем это:
```
import React, { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom';
import { AboutPage } from 'pages/AboutPage';
import { MainPage } from 'pages/MainPage';


const AppRouter = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>

        <Route path={'/about'} element={<AboutPage/>}/>
        <Route path={'/'} element={<MainPage/>}/>

      </Routes>
    </Suspense>
  )
}

export default AppRouter;

```


В `index.ts` 
```
import AppRouter from "./ui/AppRouter";

export {
  AppRouter
}
```

И теперь добавляем `AppRouter` в наш `App.tsx`

```
import React, { Suspense } from 'react'
import { Routes, Route, Link } from 'react-router-dom';

import { useTheme } from 'app/providers/ThemeProvider/';
import { classNames } from 'shared/lib/classNames/classNames';
import './styles/index.scss';
import { AppRouter } from './providers/router';



const App = () => {
  const {theme, toggleTheme} = useTheme();

  return (
    <div className={classNames('app', {}, [theme])}>
      <button onClick={toggleTheme}>TOGGLE</button>
      <Link to='/'>Главная</Link>
      <Link to='/about'>О сайте</Link>
      <AppRouter />
    </div>
  )
}

export default App;

```

<a name="configRouter"></a> 

### 12.2 config router'а (shared)

Сейчас у нас роуты описаны способом, который вы видете выше.
Т е они описаны прям в компоненте. 
Но хотелось бы иметь какой-то конфиг, внутри которого мы список роутов определим, а в `AppRouter`'е просто декларативным способом по этому конфигу пройдемся и отрисуем каждый нужный компонент.

Сделаем этот конфиг в папке `shared`.

Идем в папку `shared` => `config` => `routeConfig` =>  создаем `routeConfig.tsx`

В этом файле создадим перечисление enum, внутри которого мы объявим список роутов, которые есть в нашем приложении и названий для них.
Это необходимо, если мы вдруг захотим хранить информацию о маршрутах в `Redux`, `stat`'е

```
//src => shared => config => routeConfig => routeConfig.tsx

export enum AppRoutes {
  MAIN = 'main',
  ABOUT = 'about',
}
```

Создадим объект, в котором мы для каждого маршрута из `enum` `AppRoutes` укажем путь до соответствующего компонента.

```
//routeConfig.tsx
...

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN] : '/',
  [AppRoutes.ABOUT] : '/about',
}
```

Следующим этапом необходимо объявить сами роуты.
Т е маршрут до них, компонент, который мы должны отрисовывать. И эту константу уже мы назовем `routeConfig`

Для понимания, что такое `RouteProps` - это тот самый, который мы используем, когда передаем пропсы в компонент `Route `
Например, здесь пропсы `path` и `element`
`<Route path={'/about'} element={<AboutPage/>}/>`

А сам он выглядит так

```
export interface RouteProps {
    caseSensitive?: boolean;
    children?: React.ReactNode;
    element?: React.ReactNode | null;
    index?: boolean;
    path?: string;
}
```

Продолжаем. Напишем сам компонент роут
```
export const routeConfig: Record<AppRoutes, RouteProps> = {
  [AppRoutes.MAIN]: {
    path: RoutePath.main,
    element: <MainPage />
  },
  [AppRoutes.ABOUT]: {
    path: RoutePath.about,
    element: <AboutPage />
  }
}
```
Все готово для применения.

```
//готовый конфиг
import { AboutPage } from "pages/AboutPage"
import { MainPage } from "pages/MainPage"
import { RouteProps } from "react-router-dom"

export enum AppRoutes {
  MAIN = 'main',
  ABOUT = 'about',
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN] : '/',
  [AppRoutes.ABOUT] : '/about',
}

export const routeConfig: Record<AppRoutes, RouteProps> = {
  [AppRoutes.MAIN]: {
    path: RoutePath.main,
    element: <MainPage />
  },
  [AppRoutes.ABOUT]: {
    path: RoutePath.about,
    element: <AboutPage />
  }
}
```


<a name="connectAppRouterAndConfig"></a> 

### 12.3 Cоединяем AppRouter и config


Так выглядит сейчас `routeConfig` без переменных:

```
const routeConfig = {
  'main': {
    path: '/',
    element: <MainPage/>
  },
  'about': {
    path: '/about',
    element: <AboutPage/>
  }
}
```


Этот кусок можно удалить, т к мы будем пробегаться по массиву роутов
```
  <Route path={'/about'} element={<AboutPage/>}/>
  <Route path={'/'} element={<MainPage/>}/>
```

`routeConfig` - это объект, а нам нужен массив, причем массив значений.
Поэтому воспользуемся `Object.values()`


```
import React, { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom';
import { routeConfig } from 'shared/config/routeConfig/routeConfig';


const AppRouter = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>

        {Object.values(routeConfig).map(({element, path}) => (
        <Route 
            key={path}
            path={path}
            element={element}
          />
        ))}

      </Routes>
    </Suspense>
  )
}

export default AppRouter;

```


<a name="navbarSnippetsFirstUiKit"></a> 

## 13. Navbar.Шаблоны для разработки. Первый UI Kit элемент

Мы вынесли `AppRouter` из `App.tsx`, теперь вынесем навигационную модель, `Нeader`, `Navbar` и кнопку по переключению тем

```
//App.tsx
import React, { Suspense } from 'react'
import { Routes, Route, Link } from 'react-router-dom';

import { useTheme } from 'app/providers/ThemeProvider/';
import { classNames } from 'shared/lib/classNames/classNames';
import './styles/index.scss';
import { AppRouter } from './providers/router';



const App = () => {
  const {theme, toggleTheme} = useTheme();

  return (
    <div className={classNames('app', {}, [theme])}>
      <button onClick={toggleTheme}>TOGGLE</button>
      <Link to='/'>Главная</Link>
      <Link to='/about'>О сайте</Link>
      <AppRouter />
    </div>
  )
}

export default App;

```

<a name="navbar"></a> 

### 13.1 Navbar.

Начнем с `NavBar`'а.
`NavBar` по своей логике - это `widget`

Поэтому `widgets` => создаем папку `Navbar` => создаем `index.ts`-файл и папку `ui` => в папке` ui` cоздаем `Navbar.tsx` и `Navbar.module.scss`

```
//Navbar.tsx

import React from 'react'

export const Navbar = () => {
  return (
    <div>
      
    </div>
  )
}

```

#### Замечание
компоненты, которые не требуют асинхронного чанка, мы будем экспортировать не по дефолту, а именованным образом

```
//index.ts
import { Navbar } from "./ui/Navbar";

export {
  Navbar,
}
```

===

Продолжаем

Заходим в `App.tsx`, заменяем  это (этот кусок отправляется в навбар)
```
  <Link to='/'>Главная</Link>
  <Link to='/about'>О сайте</Link>
```

на это `<Navbar />`

```
import React, { Suspense } from 'react'
import { Routes, Route, Link } from 'react-router-dom';

import { AppRouter } from './providers/router';
import { useTheme } from 'app/providers/ThemeProvider/';
import { Navbar } from 'widgets/Navbar';
import { classNames } from 'shared/lib/classNames/classNames';
import './styles/index.scss';



const App = () => {
  const {theme, toggleTheme} = useTheme();

  return (
    <div className={classNames('app', {}, [theme])}>
      <button onClick={toggleTheme}>TOGGLE</button>
      <Navbar />
      <AppRouter />
    </div>
  )
}

export default App;

```


```
import React from 'react';
import { Link } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames/classNames';

export const Navbar = () => {
  return (
    <div className={classNames('navbar', {}, [])}>
      <Link to='/'>Главная</Link>
      <Link to='/about'>О сайте</Link>
    </div>
  )
}
```


```
import React from 'react';
import { Link } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Navbar.module.scss';

interface NavbarProps {
  className?: string;

}

export const Navbar = ({className}: NavbarProps) => {
  return (
    <div className={classNames(cls.navbar, {}, [className])}>
      <Link to='/'>Главная</Link>
      <Link to='/about'>О сайте</Link>
    </div>
  )
}

```


--bg-color светлый  - это  --inverted-bg-color у темной
и наоборот
```
.app.light {
  --bg-color: rgb(231, 231, 231);
  --inverted-bg-color: rgb(0 0 47);

  --primary-color: rgb(13, 23, 138);
  --secondary-color: rgb(39, 31, 206);
}
```

```
//dark.scss
.app.dark {
  --bg-color: rgb(0 0 47);
  --inverted-bg-color: rgb(231, 231, 231);

  --primary-color: rgb(0, 109, 0);
  --secondary-color: rgb(0, 205, 0);
}
```

<!-- 3:46 -->


<a name="snippets"></a> 

### 13.2 Кастомные сниппеты VSCode

В левом нижнем углу тычем в шестеренку, выскакивает список.
Ищем в нем `UserSnippets`

![userSnippets.jpg](/images/userSnippets.jpg)

После сверху по середине выскакивает список с полем ввода, нажимаем на `New Global Snippets file`
![userSnippets2.jpg](/images/userSnippets2.jpg)

Далее видем поле ввода, в него нужно вписать название вашего файла. В этот файл вы можете написать кучу разных сниппетов, поэтому лучше сделать общее название
![userSnippets3.jpg](/images/userSnippets3.jpg)

Далее видим это - куча комментариев с примером сниппета

![userSnippets4.jpg](/images/userSnippets4.jpg)

`scope` - это среда, в которой будет работать сниппет, например, `scss`,`javascript`
`prefix` - комманда для сниппета или триггер
`body` - то, что будет выводиться после запуска команды (например: `rc + Tab`), но в `json`-формате
`description` - описание команды, объяснение (подсказка в `VSCode`, когда увидете в спсике команд)

Самый простой пример - это однострочный
![userSnippets5.jpg](/images/userSnippets5.jpg)

Если здесь возникли проблемы, то [видео](https://www.youtube.com/watch?v=eE1b9E0meNo) в помощь. Я здесь (`Emmet: Show Expanded Abbreviation`) заменяла always на never (шестеренка => `Settings` => в инпуте `emmet`)
Но это сомнительное решение, т к после этого у меня перестал работать `df` - `display: flex`, пришлось откатать все обратно. 


Сложный пример. 
Для него потребуется генератор сниппетов: [snippet-generator.app](https://snippet-generator.app/)

Заполняем поля, как показано ниже (или похоже)
Вставляем код, который хотим, чтобы был шаблоном

```
import React from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Navbar.module.scss';

interface NavbarProps {
  className?: string;
}

export const Navbar = ({className}: NavbarProps) => {
  return (
    <div className={classNames(cls.navbar, {}, [className])}>

    </div>
  )
}
```
![userSnippets6.jpg](/images/userSnippets6.jpg)
Получаем это:
```
"create ts react component": {
  "prefix": "rc",
  "body": [
    "import React from 'react';",
    "import { classNames } from 'shared/lib/classNames/classNames';",
    "import cls from './Navbar.module.scss';",
    "",
    "interface NavbarProps {",
    "  className?: string;",
    "}",
    "",
    "export const Navbar = ({className}: NavbarProps) => {",
    "  return (",
    "    <div className={classNames(cls.navbar, {}, [className])}>",
    "",
    "    </div>",
    "  )",
    "}"
  ],
  "description": "create ts react component"
}
```
Но нам бы хотелось, чтобы название файла было названием компонента. То же касается названия пропсов и т д.
Гуглим: `vscode live templates get filename`

Второй ссылкой видим сайт [VSCode](https://code.visualstudio.com/docs/editor/userdefinedsnippets)

Находим переменные ([Variables](https://code.visualstudio.com/docs/editor/userdefinedsnippets#_variables))
`TM_FILENAME_BASE The filename of the current document without its extensions`

Заменяем все места с `Navbar` на `${TM_FILENAME_BASE}`

Почти все. Осталось решить момент с `navbar`

Листаем ниже. Находим [Transform examples](https://code.visualstudio.com/docs/editor/userdefinedsnippets#_transform-examples)

Видим пример для `uppercase`: `"${TM_FILENAME/(.*)/${1:/upcase}/}"`
Гуглим для `lowercase`: `${TM_FILENAME_BASE/(.*)/${1:/downcase}/}`

В итоге получаем такой сниппет:
```
"create ts react component": {
  "prefix": "rc",
  "body": [
    "import React from 'react';",
    "import { classNames } from 'shared/lib/classNames/classNames';",
    "import cls from './${TM_FILENAME_BASE}.module.scss';",
    "",
    "interface ${TM_FILENAME_BASE}Props {",
    "  className?: string;",
    "}",
    "",
    "export const ${TM_FILENAME_BASE} = ({className}: ${TM_FILENAME_BASE}Props) => {",
    "  return (",
    "    <div className={classNames(cls.${TM_FILENAME_BASE/(.*)/${1:/downcase}/}, {}, [className])}>",
    "",
    "    </div>",
    "  )",
    "}"
  ],
  "description": "create ts react component"
}
```
Для ленивых [полуготовый сниппет без переменных](https://snippet-generator.app/?description=create+ts+react+component&tabtrigger=rc&snippet=import+React+from+%27react%27%3B%0Aimport+%7B+classNames+%7D+from+%27shared%2Flib%2FclassNames%2FclassNames%27%3B%0Aimport+cls+from+%27.%2FNavbar.module.scss%27%3B%0A%0Ainterface+NavbarProps+%7B%0A++className%3F%3A+string%3B%0A%7D%0A%0Aexport+const+Navbar+%3D+%28%7BclassName%7D%3A+NavbarProps%29+%3D%3E+%7B%0A++return+%28%0A++++%3Cdiv+className%3D%7BclassNames%28cls.navbar%2C+%7B%7D%2C+%5BclassName%5D%29%7D%3E%0A%0A++++%3C%2Fdiv%3E%0A++%29%0A%7D&mode=vscode)

Готово! Пользуйтесь!

<!-- 7:26 -->


<a name="fixStylesHightVariable"></a> 

### 13.3 Подправляем стили, переменная высоты для Navbar

Navbar.module.scss
```
.navbar {
  width: 100%;
  height: 50px;
  background: var(--inverted-bg-color);

  display: flex;
  align-items: center;
  padding: 20px;
}
```

`app` => `styles` => `variables` => `global.scss`
Добавим переменную для высоты навбара

```
:root {
  --font-family-main: Consolas, "Times New Roman", Serif;

  --font-size-m: 16px;
  --font-line-m: 24px;
  --font-m: var(--font-size-m) / var(--font-line-m) var(--font-family-main);

  --font-size-l: 24px;
  --font-line-l: 32px;
  --font-l: var(--font-size-l) / var(--font-line-l) var(--font-family-main);

  //Размеры
  --navbar-height: 50px;
}
```
И применим ее в Navbar.module.scss
```
.navbar {
  width: 100%;
  height: var(--navbar-height);
  background: var(--inverted-bg-color);

  display: flex;
  align-items: center;
  padding: 20px;
}
```

```
//Navbar.tsx
...
export const Navbar = ({className}: NavbarProps) => {
  return (
    <div className={classNames(cls.navbar, {}, [className])}>
      <div className={cls.links}>
        <Link to='/' className={cls.mainLink}>Главная</Link>
        <Link to='/about'>О сайте</Link>
      </div>
    </div>
  )
}
```


<a name="linkSharedComponent"></a> 

### 13.4 Ссылка - классический пример shared-компонента

`shared` => создаем папку `ui` => создаем папку `AppLink` => создаем файлы `AppLink.tsx` и `AppLink.module.scss`

<a name="appLinkCreating"></a> 

#### Создание компоненты AppLink

С помощью сниппета разворачиваем компонент (`rc + Tab`)

```
import React from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './AppLink.module.scss';

interface AppLinkProps {
  className?: string;
}

export const AppLink = ({className}: AppLinkProps) => {
  return (
    <div className={classNames(cls.applink, {}, [className])}>

    </div>
  )
}
```

А теперь немного его подправим: 
1) `div` на `Link`
2) подготовка для `children: FC `
3) У `Link` есть свои пропсы, заложенные разработчиками `react-router-dom`, поэтому `extends LinkProps`

```
import React, { FC } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './AppLink.module.scss';

interface AppLinkProps extends LinkProps {
  className?: string;
}

export const AppLink: FC<AppLinkProps> = (props) => {
  const { to, className, children, ...otherProps} = props;
  return (
    <Link 
      to={to}
      className={classNames(cls.applink, {}, [className])}
      {...otherProps}
      >
      {children}
    </Link>
  )
}
```

Теперь идем в `Navbar` и заменяем `Link` на наш `AppLink`

```
//navbar до
import React from 'react';
import { Link } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Navbar.module.scss';

interface NavbarProps {
  className?: string;
}

export const Navbar = ({className}: NavbarProps) => {
  return (
    <div className={classNames(cls.navbar, {}, [className])}>
      <div className={cls.links}>
        <Link to='/' className={cls.mainLink}>Главная</Link>
        <Link to='/about'>О сайте</Link>
      </div>
    </div>
  )
}
```


```
//navbar после
import React from 'react';
import { Link } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Navbar.module.scss';
import { AppLink } from 'shared/ui/AppLink/AppLink';

interface NavbarProps {
  className?: string;
}

export const Navbar = ({className}: NavbarProps) => {
  return (
    <div className={classNames(cls.navbar, {}, [className])}>
      <div className={cls.links}>
        <AppLink to='/' className={cls.mainLink}>Главная</AppLink>
        <AppLink to='/about'>О сайте</AppLink>
      </div>
    </div>
  )
}
```

<!-- [Создание компоненты AppLink](#appLinkCreating) -->
<!-- [Стилизация AppLink](#appLinkStyling) -->


<a name="appLinkStyling"></a> 

#### Стилизация AppLink

```
// AppLink.module.scss
.AppLink {
  color: var(--primary-color);
}
```

И вот здесь мы приходим к различным темам для `UIKit`'а
На примере кнопки: кнопка с рамкой, кнопка без рамки, кнопка с цветом заднего фона.

В случае с ссылкой мы сделаем тему с `inverted` цветом и с обычным цветом

```
//AppLink сейчас
import React, { FC } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './AppLink.module.scss';

interface AppLinkProps extends LinkProps {
  className?: string;
}

export const AppLink: FC<AppLinkProps> = (props) => {
  const { to, className, children, ...otherProps} = props;
  return (
    <Link 
      to={to}
      className={classNames(cls.applink, {}, [className])}
      {...otherProps}
      >
      {children}
    </Link>
  )
}
```
<!-- 13:29 место с найденной ошибкой и исправлением на cls[theme]-->
Почему такая странная передача темы: `cls[theme]`? Потому что, есои передать просто `theme`, то вместо названия темы получим `'theme'`. нам нужна переменная, а не конкретное значение `'theme'`

```
//AppLink.tsx
import React, { FC } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './AppLink.module.scss';

export enum AppLinkTheme {
  PRIMARY = 'primary',
  SECONDARY = 'secondary'
}

interface AppLinkProps extends LinkProps {
  className?: string;
  theme?: AppLinkTheme;
}

export const AppLink: FC<AppLinkProps> = (props) => {
  const { 
    to, 
    className, 
    children, 
    theme = AppLinkTheme.PRIMARY, 
    ...otherProps
  } = props;

  return (
    <Link 
      to={to}
      className={classNames(cls.applink, {}, [className, cls[theme]])}
      {...otherProps}
      >
      {children}
    </Link>
  )
}
```

Теперь давайте добавим красный цвет просто, чтобы убедиться, что наша конструкция работает.

```
//AppLink.module.scss
.AppLink {
  color: var(--primary-color);
}

.primary {
  color: red;
}

.secondary {

}
```
Теперь нормальные цвета

```
.AppLink {
  color: var(--primary-color);
}

.primary {
  color: var(--primary-color);
}

.secondary {
  color: var(--secondary-color);
}
```

Идем в `navbar`
```
import React from 'react';
import { Link } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Navbar.module.scss';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';

interface NavbarProps {
  className?: string;
}

export const Navbar = ({className}: NavbarProps) => {
  return (
    <div className={classNames(cls.navbar, {}, [className])}>
      <div className={cls.links}>
        <AppLink to='/' className={cls.mainLink}>Главная</AppLink>
        <AppLink to='/about'>О сайте</AppLink>
      </div>
    </div>
  )
}
```

Добавляем в `AppLink` тему:
Это `<AppLink to='/' className={cls.mainLink}>Главная</AppLink>`
превращается в:
`<AppLink theme={AppLinkTheme.SECONDARY} to='/' className={cls.mainLink}>Главная</AppLink>`

А это `<AppLink to='/about'>О сайте</AppLink>`
превращается в: `<AppLink theme={AppLinkTheme.SECONDARY} to='/about'>О сайте</AppLink>`

```
//Navbar новый
import React from 'react';
import { Link } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Navbar.module.scss';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';

interface NavbarProps {
  className?: string;
}

export const Navbar = ({className}: NavbarProps) => {
  return (
    <div className={classNames(cls.navbar, {}, [className])}>
      <div className={cls.links}>
        <AppLink 
          theme={AppLinkTheme.SECONDARY} 
          to='/' 
          className={cls.mainLink}
          >
            Главная
          </AppLink>
        <AppLink 
          theme={AppLinkTheme.SECONDARY} 
          to='/about'
          >
            О сайте
          </AppLink>
      </div>
    </div>
  )
}
```

<a name="invertedColorsCreating"></a> 

#### Создание inverted цветов

```
//normal.scss
.app.light {
  --bg-color: rgb(231, 231, 231);
  --inverted-bg-color: rgb(0 0 47);

  --primary-color: rgb(13, 23, 138);
  --secondary-color: rgb(39, 31, 206);

  --inverted-primary-color: rgb(0, 109, 0);
  --inverted-secondary-color: rgb(0, 205, 0);
}
```

```
//dark.scss
.app.dark {
  --bg-color: rgb(0 0 47);
  --inverted-bg-color: rgb(231, 231, 231);

  --primary-color: rgb(0, 109, 0);
  --secondary-color: rgb(0, 205, 0);

  --inverted-primary-color: rgb(13, 23, 138);
  --inverted-secondary-color: rgb(39, 31, 206);
}
```

Идем в `AppLink.module.scss` и меняем в `secondary` цвет на `inverted`
```
.AppLink {
  color: var(--primary-color);
}

.primary {
  // color: red;
  color: var(--primary-color);
}

.secondary {
  color: var(--inverted-primary-color);
}

```

<a name="applyNewTheme"></a> 

#### Чтобы применить новую тему

1. Добавляем тему в перечисление `enum` (в `AppLink.tsx`)
```
export enum AppLinkTheme {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',

  RED = 'red',
}
```
2. Добавляем еще один класс (в `AppLink.module.scss` сразу под `.secondary`) 
```
.red {
  color: red;
}
```

3. Идем в `Navbar.tsx`, чтобы ее применить

```
...
    <AppLink 
      // theme={AppLinkTheme.SECONDARY} 
      theme={AppLinkTheme.RED} 
      to='/about'
      >
        О сайте
      </AppLink>
...
```

Проверяем: из двух зеленых ссылок одна стала красной - все как надо 
![addNewTheme.jpg](/images/addNewTheme.jpg)


<a name="conclusion13"></a> 

### 13.5 Итог

Мы разработали первый виджет: `Header` или `Navbar`
Разработали первый `UI` компонент - ссылку.
Добавили для ссылки несколько тем и научились их использовать.



<a name="svgLoaderFileLoaderButton"></a> 

## 14. Svg loader. File loader. Button UI kit

Сегодня мы перенесем кнопку для переключения темы в виджеты.
Т к это никакая не сущность и никакая не бизнес-фича

<!-- [14.1 Создание ThemeSwitcher (widgets)](#themeSwitcherCreating) -->

<a name="themeSwitcherCreating"></a> 

### 14.1 Создание ThemeSwitcher (widgets)

`widgets` => создаем папку `ThemeSwitcher` => в ней создаем `index.ts`-файл и  папку `ui` => в папке `ui`: создаем `ThemeSwitcher.tsx` и `ThemeSwitcher.module.scss`

Заходим в `ThemeSwitcher.tsx`: `rc + Tab`

```
//ThemeSwitcher.tsx
import React from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ThemeSwitcher.module.scss';

interface ThemeSwitcherProps {
  className?: string;
}

export const ThemeSwitcher = ({className}: ThemeSwitcherProps) => {
  return (
    <div className={classNames(cls.themeswitcher, {}, [className])}>

    </div>
  )
}
```
Заходим в `App.tsx` и вырезаем `<button onClick={toggleTheme}>TOGGLE</button>`

```
//App.tsx
import React, { Suspense } from 'react'
import { Routes, Route, Link } from 'react-router-dom';

import { AppRouter } from './providers/router';
import { useTheme } from 'app/providers/ThemeProvider/';
import { Navbar } from 'widgets/Navbar';
import { classNames } from 'shared/lib/classNames/classNames';
import './styles/index.scss';



const App = () => {
  const {theme, toggleTheme} = useTheme();

  return (
    <div className={classNames('app', {}, [theme])}>
      <Navbar />

      <button onClick={toggleTheme}>TOGGLE</button>

      <AppRouter />
    </div>
  )
}

export default App;

```

Заменяем `div` на `button` в `ThemeSwitcher.tsx`

```
//ThemeSwitcher.tsx
import React from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ThemeSwitcher.module.scss';

interface ThemeSwitcherProps {
  className?: string;
}

export const ThemeSwitcher = ({className}: ThemeSwitcherProps) => {
  return (
    <button onClick={toggleTheme}>TOGGLE</button>
  )
}
```

```
import React from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ThemeSwitcher.module.scss';
import { useTheme } from 'app/providers/ThemeProvider';

interface ThemeSwitcherProps {
  className?: string;
}

export const ThemeSwitcher = ({className}: ThemeSwitcherProps) => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button
      className={classNames(cls.ThemeSwitcher, {}, [className])}
      onClick={toggleTheme}
    >
        TOGGLE
    </button>
  )
}
```

```
//index.ts
import { ThemeSwitcher } from "./ui/ThemeSwitcher";

export { 
  ThemeSwitcher, 
}
```

<a name="pointOfContentionWidgetsShared"></a> 

#### Холиварный момент: ThemeSwitcher в widgets или в shared?
Здесь он переносит всю папку из `widgets` в `shared`
Но сам же говорит, что во время монатажа посмотрел, подумал и решил, что он не прав и стоит свитчер оставить в `widgets`.
Такие моменты плохо задокументированы в `FSD` и из-за этого рождаются такие холиварные моменты.
Но как-то кардинально на архитектуру это не влияет
===

Заходим в `Navbar.tsx` и добавляем `<ThemeSwitcher />`

```
//Navbar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Navbar.module.scss';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { ThemeSwitcher } from 'widgets/ThemeSwitcher';

interface NavbarProps {
  className?: string;
}

export const Navbar = ({className}: NavbarProps) => {
  return (
    <div className={classNames(cls.navbar, {}, [className])}>
      
      <ThemeSwitcher />

      <div className={cls.links}>
        <AppLink 
          theme={AppLinkTheme.SECONDARY} 
          to='/' 
          className={cls.mainLink}
          >
            Главная
          </AppLink>
        <AppLink 
          // theme={AppLinkTheme.SECONDARY} 
          theme={AppLinkTheme.RED} 
          to='/about'
          >
            О сайте
          </AppLink>
      </div>
    </div>
  )
}
```

Проверям: toggle отлично работает


<a name="classnameAdditional"></a> 

#### Для чего нужен этот пропс classname (как additional) в classNames?

Мы сейчас в `Navbar.tsx`

Например, я хочу поменять расположение этой кнопки (`<ThemeSwitcher />`)
добавляю ей className: `<ThemeSwitcher className={'jhjh'}/>`

```
//Navbar.tsx

...

export const Navbar = ({className}: NavbarProps) => {
  return (
    <div className={classNames(cls.navbar, {}, [className])}>
      
      <ThemeSwitcher className={'jhjh'}/>

      <div className={cls.links}>
        ...
      </div>
    </div>
  )
}
```

У кнопки есть основной класс `ThemeSwitcher` и дополнительный (`additional`) - `classname`. И вот засчет `className` мы можем распологать кнопку как нам нужно, менять размеры и всякое такое.

```
//ThemeSwitcher.tsx
export const ThemeSwitcher = ({className}: ThemeSwitcherProps) => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button
      className={classNames(cls.ThemeSwitcher, {}, [className])}
      onClick={toggleTheme}
    >
        TOGGLE
    </button>
  )
}
```

===

<!-- 2:44 -->

<a name="addSvgFilesError"></a> 

### 14.2 Добавляем svg-файлы. Вспроизведение ошибки

В папке `shared` => создаем папку `assets` => создаем папку `icons` => в нее закидываем заранее подготовленные иконки: `theme-light.svg` и `theme-dark.svg`

Заходим в `ThemeSwitcher.tsx`, импортируем иконки
```
import LightIcon from "../../../shared/assets/icons/theme-light";
import DarkIcon from "../../../shared/assets/icons/theme-dark";
```


`TypeScript` начинает ругаться, он не понимает, что это за файлы такие `svg`.
![svgThemeTsError.jpg](/images/svgThemeTsError.jpg)

```
  'LightIcon' is declared but its value is never read.ts(6133)
  Cannot find module '../../../shared/assets/icons/theme-light' or its corresponding type declarations.ts(2307)
```

И сборка тоже падает и ругается на импорты `svg`-файлов
![svgThemesError.jpg](/images/svgThemesError.jpg)


<a name="svgFilesWebpackSettings"></a> 

### 14.3 Настройка Webpack для Svg-файлов

`Webpack` никак не обрабатывает `svg`-файлы. И мы в настройках это никак не указали.

`config => build => buildLoaders.ts`

<!-- 4:47 -->

Нам нужно добавить `svgLoader`

```
//buildLoaders.ts
import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BuildOptions } from './types/config';

export function buildLoaders({isDev}: BuildOptions): webpack.RuleSetRule[] {

  const svgLoader = {
    
  }

  const cssLoaders = {
    ...
  } 

  const typescriptLoader = {
    ...
  };

  return [
    typescriptLoader,
    cssLoaders,
  ]
}
```

Гуглим: `svgr webpack`

`svgr` - это название лоадера

Здесь во [второй ссылке](https://react-svgr.com/docs/webpack/) - документация
Тычем в первую ссылку: [npm пакет](https://www.npmjs.com/package/@svgr/webpack)

В видео:

`
  npm install @svgr/webpack --save-dev
`

Подобрала версию:
`
npm install @svgr/webpack@6.2.1 --save-dev
`

Листаем ниже, видим это и копируем в наш buildLoaders
```
//Usage
//In your webpack.config.js:

{
  test: /\.svg$/,
  use: ['@svgr/webpack'],
}
```

```
//buildLoaders.ts
...
  const svgLoader = {
    test: /\.svg$/,
    use: ['@svgr/webpack'],
  }
...
```

Но обратите внимание, что этот лоудер предназначен только для `svg`.
Т е если вы захотите добавить картинку `jpeg, png` - он их обработать не сможет

<a name="pngJpegGifFilesWebpackSettings"></a> 

### 14.4 Настройка Webpack для png, jpg, jpeg, gif


Гуглим: `webpack file loader`
`webpack file loader` - для png

Jткрываем [первую ссылку](https://v4.webpack.js.org/loaders/file-loader/)
В документации:
`
  npm install file-loader --save-dev
`

Подобранная - на данный момент до сих пор последняя версия
`
npm install file-loader@v6.2.0 --save-dev 
`
//v6.2.0
<!-- 6:21 -->

Отсюда копируем объект с самим лоадером

```
module.exports = {
  module: {
    rules: [

      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },

    ],
  },
};
```
И добавляем в `buildLoaders.ts`
```
//buildLoaders.ts
...
  const fileLoader = {
    test: /\.(png|jpe?g|gif)$/i,
    use: [
      {
        loader: 'file-loader',
      },
    ],
  };
...
```

И не забываем добавить в `return `наши 2 новых лоадера

```
//buildLoaders.ts
...
  return [
    fileLoader,
    svgLoader,
    typescriptLoader,
    cssLoaders,
  ]
```

<a name="woffWoff2WebpackSettings"></a> 

### 14.5 Замечание: woff и woff2 - шрифты в fileLoader

Если нам вдруг нужны шрифты, мы можем в регулярку добавить еще `woff` и `woff2`
```
  const fileLoader = {
    // test: /\.(png|jpe?g|gif)$/i,
    test: /\.(png|jpe?g|gif|woff2|woff)$/i,
    use: [
      {
        loader: 'file-loader',
      },
    ],
  };
```

```
//buildLoaders.ts
import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BuildOptions } from './types/config';

export function buildLoaders({isDev}: BuildOptions): webpack.RuleSetRule[] {

  const svgLoader = {
    test: /\.svg$/,
    use: ['@svgr/webpack'],
  }

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

  const fileLoader = {
    // test: /\.(png|jpe?g|gif)$/i,
    test: /\.(png|jpe?g|gif|woff2|woff)$/i,
    use: [
      {
        loader: 'file-loader',
      },
    ],
  };

  return [
    fileLoader,
    svgLoader,
    typescriptLoader,
    cssLoaders,
  ]
}
```

Итак, на данный момент мы научили `Webpack` работать с `svg, png, jpg, jpeg, gif, woff` и `woff2`


<a name="svgPngJpegTypeSriptSettings"></a> 

### 14.6 Настройка TypeSript: svg, png, jpg, jpeg


Но `TypeScript` по-прежнему ругается

Гуглим: `import svg typescript `

[Первая ссылка](https://stackoverflow.com/questions/44717164/unable-to-import-svg-files-in-typescript)

//importSvgTs.jpg
![importSvgTs.jpg](/images/importSvgTs.jpg)

```
declare module "*.svg" {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}
```

custom.d.ts to tsconfig.json
`"include": ["src/components", "src/custom.d.ts"]`

[source](https://webpack.js.org/guides/typescript/#importing-other-assets)

В source видим это и копируем это добро:
```
declare module '*.svg' {
  const content: any;
  export default content;
}

```

И идем в `app => types => global.d.ts`

```
//global.d.ts
declare module '*.scss' {
  interface IClassNames {
    [className: string]: string
  }
  const classNames: IClassNames;
  export = classNames;
}

declare module '*.svg' {
  const content: any;
  export default content;
}

```

В принципе мы можем часть из этого убрать: 

```
declare module '*.svg' {
  const content: any;
  export default content;
}
```

чтобы осталась только декларация: `declare module "*.svg";`

Yо по-хорошему6 чтобы у нас тип был правильный, вспомните, у нас импортируется специальный компонент, который мы можем использовать, а вот подобную декларацию мы можем оставить для `png` и `jpeg`

```
//global.d.ts
declare module '*.scss' {
  interface IClassNames {
    [className: string]: string
  }
  const classNames: IClassNames;
  export = classNames;
}

declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";

```


Гуглим: `svgr webpack typescript`
[Первая ссылка](https://github.com/gregberge/svgr/issues/546)

Находим это, копируем
```
declare module "*.svg" {
  import React from "react";
  const SVG: React.VFC<React.SVGProps<SVGSVGElement>>;
  export default SVG;
}
```

И вставляем в `global.d.ts`
```
declare module '*.scss' {
  interface IClassNames {
    [className: string]: string
  }
  const classNames: IClassNames;
  export = classNames;
}

declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";

declare module "*.svg" {
  import React from "react";
  const SVG: React.VFC<React.SVGProps<SVGSVGElement>>;
  export default SVG;
}
```

Теперь ошибки должны пропасть, идем проверять в `ThemeSwitcher.tsx`
```
import LightIcon from "../../../shared/assets/icons/theme-light";
import DarkIcon from "../../../shared/assets/icons/theme-dark";
```
Они не пропали, но потому что я забыла указать расширение .svg
Добавляем расширение 
```
import LightIcon from "../../../shared/assets/icons/theme-light.svg";
import DarkIcon from "../../../shared/assets/icons/theme-dark.svg";
```
и ошибки исчезают
<!-- 8:50 -->

Давайте проверим, что типизация работает правильно
svgLoader преобразовывает обычные иконки в react-компоненты

`ThemeSwitcher.tsx`
Добавим туда иконку ` <DarkIcon />` и посмотрим пропсы

![iconTsProps.jpg](/images/iconTsProps.jpg)

Мы видим, что пропсы правильные (`fill, stroke, width`..)

`npm run start` - все нормально, видим иконку и темы работают
Добавим условие для иконки в зависмости от темы
<!-- 9:59 -->

<a name="14.6fixThemeProvider"></a> 

#### Правка Theme, ThemeProvider

```
//providers => ThemeProvider => index.ts

// import { ThemeProvider } from "src/theme/ThemeProvider";
import { ThemeProvider } from "./ui/ThemeProvider";
import { useTheme } from "./lib/useTheme";
// import { Theme } from 'app/providers/ThemeProvider/lib/ThemeContext';
import { Theme } from './lib/ThemeContext';



export { 
  ThemeProvider, 
  useTheme,
  Theme, 
};

```

===

Возвращаемся в `ThemeSwitcher`

добавляем тернарный оператор на иконки в зависимости от темы
`{theme === Theme.DARK ? <DarkIcon /> : <LightIcon />}`

Обратите внимание, как импортируется Theme:
```
import { Theme, useTheme } from 'app/providers/ThemeProvider';
// import { Theme } from 'app/providers/ThemeProvider/lib/ThemeContext';
```
Теперь `Theme` импортируется через `public api`



```
//ThemeSwitcher.tsx
import React from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Theme, useTheme } from 'app/providers/ThemeProvider';
// import { Theme } from 'app/providers/ThemeProvider/lib/ThemeContext';
import cls from './ThemeSwitcher.module.scss';

import LightIcon from "../../../shared/assets/icons/theme-light.svg";
import DarkIcon from "../../../shared/assets/icons/theme-dark.svg";


interface ThemeSwitcherProps {
  className?: string;
}

export const ThemeSwitcher = ({className}: ThemeSwitcherProps) => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button
      className={classNames(cls.ThemeSwitcher, {}, [className])}
      onClick={toggleTheme}
    >

        {/* TOGGLE */}
        {theme === Theme.DARK ? <DarkIcon /> : <LightIcon />}

    </button>
  )
}
```

`npm run start` - все работает - toggle переключает темы
<!-- [14.7 Button - shared компонент](#ButtonIsSharedComponent) -->

<a name="ButtonIsSharedComponent"></a> 

### 14.7 Button - shared компонент

по аналогии с AppLink
shared => ui => создаем папку Button => Button.tsx и Button.module.scss

rc+Tab
```
//Button.tsx
import React from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Button.module.scss';

interface ButtonProps {
  className?: string;
}

export const Button = ({className}: ButtonProps) => {
  return (
    <div className={classNames(cls.Button, {}, [className])}>

    </div>
  )
}
```

```
//Button.module.scss
.Button {
  
}
```

```
import React, {ButtonHTMLAttributes, FC} from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export const Button: FC<ButtonProps> = (props) => {
  const { 
    className, 
  } = props;
  
  return (
    <button className={classNames(cls.Button, {}, [className])}>

    </button>
  )
}
```

Делаем кнопку:
```
//Button.tsx
import React, {ButtonHTMLAttributes, FC} from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Button.module.scss';


export enum ThemeButton {
  CLEAR = 'clear',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  theme?: ThemeButton;
}

export const Button: FC<ButtonProps> = (props) => {
  const { 
    className,
    children,
    theme,
    ...otherProps 
  } = props;

  return (
    <button  
      className={classNames(cls.Button, {}, [className, cls[theme]])}
      {...otherProps}
    >
      {children}
    </button>
  )
}
```

```
//Button.module.scss
.Button {
  cursor: pointer;
}

.clear {
  padding: 0;
  margin: 0;
  border: none;
  background: none;
  outline: none;
}
```

Теперь идем в ThemeSwitcher.tsx, чтобы заменить обычную кнопку button на нашу кастомную Button

```
//до ThemeSwitcher
...

export const ThemeSwitcher = ({className}: ThemeSwitcherProps) => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button
      className={classNames(cls.ThemeSwitcher, {}, [className])}
      onClick={toggleTheme}
    >

        {/* TOGGLE */}
        {theme === Theme.DARK ? <DarkIcon /> : <LightIcon />}

    </button>
  )
}
```

<a name="Conclusion14"></a> 

### 14.8 Итог
В этом ролике мы сделали навигационную панель
компонент для переключения тем
научились работать с svg
научились импортировать png jpeg jpg файлы с помощью fileloader'а


<a name="SidebarLayout"></a> 

## 15. Sidebar.Layout

Сегодня создаем левую менюшку, которую можно развернуть, свернуть

widgets => папка Sidebar => undex.ts-файл и папка ui

поскольку Sidebar - это уже более сложный компонент, здесь мб много компонентов. 
То мы файлы будем создавать не напрямую в папке ui, а создаем подпапку Sidebar (рядом могут лежать SidebarHeader, SidebarFooter) и в ней создаем файл Sidebar.tsx и Sidebar.module.scss


<a name="SidebarCreating"></a> 

### 15.1 Cоздание Sidebar

`collapsed`

```
//Sidebar.tsx

import React from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Theme, useTheme } from 'app/providers/ThemeProvider';
// import { Theme } from 'app/providers/ThemeProvider/lib/ThemeContext';
import cls from './ThemeSwitcher.module.scss';

import LightIcon from "../../../shared/assets/icons/theme-light.svg";
import DarkIcon from "../../../shared/assets/icons/theme-dark.svg";
import { Button, ThemeButton } from 'shared/ui/Button/Button';


interface ThemeSwitcherProps {
  className?: string;
}

export const ThemeSwitcher = ({className}: ThemeSwitcherProps) => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <Button
      theme={ThemeButton.CLEAR}
      className={classNames(cls.ThemeSwitcher, {}, [className])}
      onClick={toggleTheme}
    >

        {/* TOGGLE */}
        {theme === Theme.DARK ? <DarkIcon /> : <LightIcon />}

    </Button>
  )
}


```

`className={classNames(cls.sidebar, {[cls.collapsed]: collapsed}, [className])}`
Если collapsed - true, тогда навешиваем класс `collapsed`

```
//Sidebar.tsx
import React, { useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Sidebar.module.scss';

interface SidebarProps {
  className?: string;
}

export const Sidebar = ({className}: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  
  const onToggle = () => {
    setCollapsed(prev => !prev);
  }

  return (
    <div 
      className={classNames(cls.sidebar, {[cls.collapsed]: collapsed}, [className])}
    >
      <button
        onClick={onToggle}
      >toggle</button>
    </div>
  )
}
```

```
.Sidebar {
  height: calc(100vh - var(--navbar-height));
  //от всей высоты браузера отнимаем высоту навбара
  width: 300px;
  background: var(--inverted-bg-color);

  position: relative;
}
```

Давайте проверим, как все работает. 

Экспортируем его в index.tsx
```
import { Sidebar } from "./ui/Sidebar/Sidebar";

export {
  Sidebar,
}
```

<!-- [15.2 Обустраиваем Sidebar в App.tsx](#SidebarAppTsx) -->

<a name="SidebarAppTsx"></a> 

### 15.2 Обустраиваем Sidebar в App.tsx

Зайдем в App.tsx и вставим туда наш Sidebar (оборачиваем его в div и пихаем туда же роутер)

```
import React, { Suspense } from 'react'
import { Routes, Route, Link } from 'react-router-dom';

import { AppRouter } from './providers/router';
import { useTheme } from 'app/providers/ThemeProvider/';
import { Navbar } from 'widgets/Navbar';
import { classNames } from 'shared/lib/classNames/classNames';
import './styles/index.scss';
import { Sidebar } from 'widgets/Sidebar';
// import { Sidebar } from 'widgets/Sidebar/ui/Sidebar/Sidebar';



const App = () => {
  const {theme, toggleTheme} = useTheme();

  return (
    <div className={classNames('app', {}, [theme])}>
      <Navbar />
      <div className='content-page'>
        <Sidebar />
        <AppRouter />
      </div>
    </div>
  )
}

export default App;
```

app => styles => index.scss - глобальные стили

Добавляем content-page и page-wrapper
```
//app => styles => index.scss - глобальные стили
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

.content-page {
  display: flex;
}

.page-wrapper {
  flex-grow: 1;
}
```

Теперь нам нужно найти куда добавить кдасс page-wrapper

Идем в AppRouter (app => providers => router => ui)

```
//AppRouter.tsx
...


const AppRouter = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>

        {Object.values(routeConfig).map(({element, path}) => (
          <Route 
            key={path}
            path={path}
            element={element}
          />
        ))}

      </Routes>
    </Suspense>
  )
}

export default AppRouter;

```

Находим `element={element}` и на него навешиваем див с нужным классом, т е 
```
  element={
    <div className='page-wrapper'>
      element
    </div>
  }
```

Теперь часть рядом с sidebar (я бы назвала ее body) растянута на всю ширину

Две картинки: зачем нужен flex-grow: 1;
![flexGrow1.jpg](/images/flexGrow1.jpg)
![flexGrow2.jpg](/images/flexGrow2.jpg)

//flexGrow1.jpg
<!-- flexGrow2.jpg -->


```
//app => styles => index.scss - глобальные стили
...

.page-wrapper {
  flex-grow: 1;
  padding: 20px;
}
```

<a name="SidebarCollapsed"></a> 

### 15.3 Collapsed: сворачивание Sidebar'а

//Sidebar.module.scss

```
.Sidebar {
  height: calc(100vh - var(--navbar-height));
  //от всей высоты браузера отнимаем высоту навбара
  width: 300px;
  width: var(--sidebar-width);
  background: var(--inverted-bg-color);

  position: relative;
}

.collapsed {
  // width: 80px;
  width: var(--sidebar-width-collapsed);

}
```

Теперь надо создать переменные, которые мы только что использовали `var(--sidebar-width)` и `var(--sidebar-width-collapsed)`

Идем в файл styles => variables => `global.scss`;

```
//styles => variables => `global.scss`
:root {
  --font-family-main: Consolas, "Times New Roman", Serif;

  --font-size-m: 16px;
  --font-line-m: 24px;
  --font-m: var(--font-size-m) / var(--font-line-m) var(--font-family-main);

  --font-size-l: 24px;
  --font-line-l: 32px;
  --font-l: var(--font-size-l) / var(--font-line-l) var(--font-family-main);

  //Размеры
  --navbar-height: 50px;
}
```

Дополняем

```
//styles => variables => `global.scss`
:root {
  --font-family-main: Consolas, "Times New Roman", Serif;

  --font-size-m: 16px;
  --font-line-m: 24px;
  --font-m: var(--font-size-m) / var(--font-line-m) var(--font-family-main);

  --font-size-l: 24px;
  --font-line-l: 32px;
  --font-l: var(--font-size-l) / var(--font-line-l) var(--font-family-main);

  //Размеры
  --navbar-height: 50px;

  --sidebar-width: 300px;
  --sidebar-width-collapsed: 80px;
}
```

Проверяем, что sidebar сворачивается, все ок
Теперь добавим плавности, анимация: `transition: width 0.3s;`
```
//Sidebar.module.scss

.Sidebar {
  height: calc(100vh - var(--navbar-height));
  //от всей высоты браузера отнимаем высоту навбара
  // width: 300px;
  width: var(--sidebar-width);
  background: var(--inverted-bg-color);
  position: relative;

  transition: width 0.3s;
}

.collapsed {
  width: var(--sidebar-width-collapsed);

}
```

<a name="ThemeSwitcherFromNavbarToSidebar"></a> 

### 15.4 Перенос ThemeSwitcher из Navbar в Sidebar

```
//Navbar.tsx
...

export const Navbar = ({className}: NavbarProps) => {
  return (
    <div className={classNames(cls.navbar, {}, [className])}>
      
      <ThemeSwitcher className='jhjh'/>

      <div className={cls.links}>
        <AppLink 
          theme={AppLinkTheme.SECONDARY} 
          to='/' 
          className={cls.mainLink}
          >
            Главная
          </AppLink>
        <AppLink 
          // theme={AppLinkTheme.SECONDARY} 
          theme={AppLinkTheme.RED} 
          to='/about'
          >
            О сайте
          </AppLink>
      </div>
    </div>
  )
}
```
Оборачиваем ThemeSwitcher в div, т к еще в этом диве будет лежать переключатель языков. Навешаем класс switchers
```
//Sidebar.tsx
...
import { ThemeSwitcher } from 'widgets/ThemeSwitcher';
...

export const Sidebar = ({className}: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  
  const onToggle = () => {
    setCollapsed(prev => !prev);
  }

  return (
    <div 
      className={classNames(cls.Sidebar, {[cls.collapsed]: collapsed}, [className])}
    >
      <button onClick={onToggle}>toggle</button>

      <div className={cls.switchers}>
        <ThemeSwitcher/>
        {/* Переключатель языков */}
      </div>
    </div>
  )
}
```

Сразу напишем стили на класс switchers

```
.switchers {
  position: absolute;
  bottom: 20px;
  display: flex; 
  justify-content: center;
  width: 100%;
}
```

```
//Sidebar.module.scss
.Sidebar {
  height: calc(100vh - var(--navbar-height));
  //от всей высоты браузера отнимаем высоту навбара
  // width: 300px;
  width: var(--sidebar-width);
  background: var(--inverted-bg-color);
  position: relative;

  transition: width 0.3s;
}

.collapsed {
  width: var(--sidebar-width-collapsed);

}

.switchers {
  position: absolute;
  bottom: 20px;
  display: flex; 
  justify-content: center;
  width: 100%;
}
```

<!-- [16. i18n. Интернационализация. Define plugin. Плагин переводов.](#i18nDefinePluginTranslationPlugin) -->

<a name="i18nDefinePluginTranslationPlugin"></a> 

## 16. i18n. Интернационализация. Define plugin. Плагин переводов.

Настало время довать в наше приложение еще один язык.
Гуглим: `i18n react`

Тычем в первую [ссылку](https://react.i18next.com/)

Перейдем во вкладку [Get started](https://react.i18next.com/getting-started)

### 16.1 Документация. Примеры для старта i18n

По документации:
` npm install react-i18next i18next --save`
<!-- /////?? вообще хз -->
<!-- 11.15.5 react-i18next -->
<!-- 21.6.12 i18next -->

`npm i react-i18next@11.15.5 i18next@21.6.12 -D`

shared => config => создаем папку i18n => создаем файл i18n.ts

#### Basic sample
Если пролистать чуть ниже, то найдем [basic sample](https://react.i18next.com/getting-started#basic-sample)

```
import React from "react";
import { createRoot } from 'react-dom/client';
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources: {
      en: {
        translation: {
          "Welcome to React": "Welcome to React and react-i18next"
        }
      }
    },
    lng: "en", // if you're using a language detector, do not define the lng option
    fallbackLng: "en",

    interpolation: {
      escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    }
  });

function App() {
  const { t } = useTranslation();

  return <h2>{t('Welcome to React')}</h2>;
}

// append app to dom
const root = createRoot(document.getElementById('root'));
root.render(
  <App />
);
```

#### Quick start

Давайте перейдем во вкладку [Quick start](https://react.i18next.com/guides/quick-start)
Это такой простенький вариант

```
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
      "Welcome to React": "Welcome to React and react-i18next"
    }
  },
  fr: {
    translation: {
      "Welcome to React": "Bienvenue à React et react-i18next"
    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;
```

#### Step by step

Перейдем в [Step by step](https://react.i18next.com/latest/using-with-hooks)
Его и копируем в файл i18n.ts


i18next-http-backend - пакет с помощью которого можно асинхронно чанками подгружать только тот язык, который нам нужен и не тянуть ненужные языки в сборку

```
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
// don't want to use this?
// have a look at the Quick start guide 
// for passing in lng and translations on init

i18n
  // load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
  // learn more: https://github.com/i18next/i18next-http-backend
  // want your translations to be loaded from a professional CDN? => https://github.com/locize/react-tutorial#step-2---use-the-locize-cdn
  .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: 'en',
    debug: true,

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    }
  });


export default i18n;
```

### 16.? Добавляем в наш проект i18n

Видим подсвеченные `i18next-http-backend` и `i18next-browser-languagedetector`.

Cверху в документации есть команда загрузки этих скриптов:
`npm install i18next-http-backend i18next-browser-languagedetector --save`

1.3.2 i18next-http-backend
6.1.3 i18next-browser-languagedetector

`npm i i18next-http-backend@1.3.2 i18next-browser-languagedetector@6.1.3 -D`

Поудаляем лишние комментарии.Получаем:

```
//i18n.ts

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';


i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'ru',
    debug: true,

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    }
  });


export default i18n;
```

`use` - это подключение плагинов
i18n поддерживает большое количество плагинов. Даже можно их писать самому

`fallbackLng: 'ru',` - язык по умолчанию русский
`debug: true,` - будет спамить в консоль про: подгрузку переводов, отсутствующие ключи (в общем все, что связано с дебагом)  
Нам хотелось бы заменить эту конструкцию на что-то вроде 
`debug: isDev ? true : false,`



Но как это сделать непосредственно в коде самого приложения?

### 16.? DefinePlugun - для прокидывания переменных сборки в приложение

Для этого у webpack'а есть плагин DefinePlugun -  с помощью него в приложении можно прокидывать глобальные переменные

Идем в buildPlugins.ts (config => build => buildPlugins.ts)
```
import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BuildOptions } from './types/config';

export function buildPlugins({paths}: BuildOptions):webpack.WebpackPluginInstance[] {
  return [
    new HtmlWebpackPlugin({
      template: paths.html,
    }),
    new webpack.ProgressPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      // chankFilename: 'css/[name].[contenthash:8].css',
    }),

    
    new webpack.DefinePlugin({

    })
  ]
}
```

Гуглим: `DefinePlugin`

Тычем на [первую ссылку](https://webpack.js.org/plugins/define-plugin/)
<!-- 2:18 -->

Пролистываем чуть ниже и видим примеры испольщования этого плагина:

```
new webpack.DefinePlugin({
  PRODUCTION: JSON.stringify(true),
  VERSION: JSON.stringify('5fa3b9'),
  BROWSER_SUPPORTS_HTML5: true,
  TWO: '1+1',
  'typeof window': JSON.stringify('object'),
  'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
});
```
По сути таким образом прокидываются какие-то глобальные переменные: версия, production или development

В buildPlugins: достаем переменную isDev из BuildOptions в аргументах и прописываем ее с DefinePlugin таким образом:

```
//buildPlugins.ts
...
export function buildPlugins({paths, isDev}: BuildOptions):webpack.WebpackPluginInstance[] {

return [
    ...,
    new webpack.DefinePlugin({
      __IS_DEV__: JSON.stringify(isDev),
    }),

  ]
}
```
`__IS_DEV__` - обычно глобальные переменные сборки я называю вот так большими с нижними подчеркиваниями, чтобы их четко отделять от переменных в самом приложении
```
//buildPlugins.ts
import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BuildOptions } from './types/config';

export function buildPlugins({paths, isDev}: BuildOptions):webpack.WebpackPluginInstance[] {

  return [
    new HtmlWebpackPlugin({
      template: paths.html,
    }),
    new webpack.ProgressPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      // chankFilename: 'css/[name].[contenthash:8].css',
    }),


    new webpack.DefinePlugin({
      __IS_DEV__: JSON.stringify(isDev),
    }),
  ]
}
```
По сути мы присвоили значение isDev переменной `__IS_DEV__` и она теперь доступна в коде.

Идемв shared => config => i18n => i18n.ts

```
//i18n.ts

  ...

  // debug: true,
  debug: __IS_DEV__ ? true : false,

  ...
```
Видим, что ts ругается
![webpackVarTsError.jpg](/images/webpackVarTsError.jpg)

Все дело в том, что TypeScript ничего про наш config не знает и с ним он никак не связан

B опять же мы в глобальном файле с дкларациями должны эту константу `__IS_DEV__` объявить 
Идем в app => types => global.d.ts

`declare const __IS_DEV__: boolean;`



```
//global.d.ts

declare module '*.scss' {
  interface IClassNames {
    [className: string]: string
  }
  const classNames: IClassNames;
  export = classNames;
}

declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.svg" {
  import React from "react";
  const SVG: React.VFC<React.SVGProps<SVGSVGElement>>;
  export default SVG;
}

declare const __IS_DEV__: boolean;
```

Вернемся к файлику i18n.ts и видим, что теперь TypeScript не ругается

Таким образом debug интернационализации будет работать только в dev режиме, если мы сделаем production сборку, то в консоль никакого спама не будет


### 16.? mkdhjkdhfkjdhkfhkdf

Возвращаемся к [документации](https://react.i18next.com/latest/using-with-hooks)

Конфигурацию мы добавили, теперь ее нужно импортировать в index.tsx файлик (src => index.tsx)

Вот этот, самый верхний из всех
![indexTsxI18n.jpg](/images/indexTsxI18n.jpg)

```
//index.tsx 
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./app/App";
import { ThemeProvider } from "app/providers/ThemeProvider";


render(
  <BrowserRouter>
    <ThemeProvider>
      <App/>
    </ThemeProvider>
  </BrowserRouter>,
  document.getElementById('root')
)
```

`import i18n from "shared/config/i18n/i18n";`

```
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./app/App";
import { ThemeProvider } from "app/providers/ThemeProvider";

import i18n from "shared/config/i18n/i18n";


render(
  <BrowserRouter>
    <ThemeProvider>
      <App/>
    </ThemeProvider>
  </BrowserRouter>,
  document.getElementById('root')
)
```

Теперь проверим, что все, что мы сейчас наподключали работает
Протестируем в App.tsx (app => App.tsx)

<!-- 4:27 -->
Вернемся к [документации](https://react.i18next.com/latest/using-with-hooks)

Пролистаем чуть ниже [до хука](https://react.i18next.com/latest/using-with-hooks#translate-your-content)

Мы видим, что используется хук `useTranslation`
`const { t, i18n } = useTranslation();`

И то, что компоненты, в которых используются переводы нужно оборачивать в Suspence
Поскольку переводы будут чанками подгружаться асинхронно

```
import React, { Suspense } from 'react';
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t, i18n } = useTranslation();

  return <h1>{t('Welcome to React')}</h1>
}

// i18n translations might still be loaded by the http backend
// use react's Suspense
export default function App() {
  return (
    <Suspense fallback="loading">
      <MyComponent />
    </Suspense>
  );
}
```

Это можно сделать глобально, обернув все в компоненте App в Suspense один раз
Переходим в App.tsx

```
//App.tsx
import React, { Suspense } from 'react'
import { AppRouter } from './providers/router';
import { useTheme } from 'app/providers/ThemeProvider/';
import { Navbar } from 'widgets/Navbar';
import { classNames } from 'shared/lib/classNames/classNames';
import './styles/index.scss';
import { Sidebar } from 'widgets/Sidebar';



const App = () => {
  const {theme, toggleTheme} = useTheme();

  return (
    <div className={classNames('app', {}, [theme])}>
      <Navbar />
      <div className='content-page'>
        <Sidebar />
        <AppRouter />
      </div>
    </div>
  )
}

export default App;
```

Оборачиваем в suspense. оставим пустой fallback, потому что файлы с переводами должны весить мало в нашем приложении
```
import React, { Suspense } from 'react'
...

const App = () => {
  const {theme, toggleTheme} = useTheme();

  return (
    <div className={classNames('app', {}, [theme])}>
      <Suspense fallback="">

        <Navbar />
        <div className='content-page'>
          <Sidebar />
          <AppRouter />
        </div>
        
      </Suspense>
    </div>
  )
}

export default App;

```

Добавим компонент с useTranslation
Для того, чтобы переводы работали, нужно использовать функцию t и в нее передавать ключ для перевода

```
import { useTranslation } from 'react-i18next';

const Component = () => {
  const { t, i18n } = useTranslation();

  return (
    <div>{t('Тестовый перевод')}</div>
  )
}
```

Пока оставим так, как и добавим этот компонент в App

```
const App = () => {
  const {theme, toggleTheme} = useTheme();

  return (
    <div className={classNames('app', {}, [theme])}>
      <Suspense fallback="">

        <Navbar />
        <Component />
        <div className='content-page'>
          <Sidebar />
          <AppRouter />
        </div>

      </Suspense>
    </div>
  )
}

export default App;
```

===

<!-- 6:10 -->
### 16.? Как перевести? И где хранить переводы?

Опять листаем [документацию](https://react.i18next.com/latest/using-with-hooks#translation-files)

Видим, что нужно в папке public => создать папку locales и там по коду языка поместить файлик translation.json
`Create a new file public/locales/<language_code>/translation.json with the following sample content.`


Итак в папке public => создаем папку locales => в ней создаем две папки en и ru => и в каждой папке создаем свой файлик translation.json

Вот так

![i18nLocales.jpg](/images/i18nLocales.jpg)









