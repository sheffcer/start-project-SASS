# Стартовый проект с gulp  ![Test Status](https://travis-ci.org/nicothin/NTH-start-project.svg?branch=master) [![devDependencies Status](https://david-dm.org/nicothin/NTH-start-project/dev-status.svg)](https://david-dm.org/nicothin/NTH-start-project?type=dev) [![dependencies Status](https://david-dm.org/nicothin/NTH-start-project/status.svg)](https://david-dm.org/nicothin/NTH-start-project)

<table>
  <thead>
    <tr>
      <th>Команда</th>
      <th>Результат</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%"><code>npm i</code></td>
      <td>Установить зависимости</td>
    </tr>
    <tr>
      <td><code>npm start</code></td>
      <td>Запустить сборку, сервер и слежение за файлами</td>
    </tr>
    <tr>
      <td><code>npm start ЗАДАЧА</code></td>
      <td>Запустить задачу с названием ЗАДАЧА (список задач в <code>./gulpfile.js</code>)</td>
    </tr>
    <tr>
      <td></td>
      <td>Оптимизация изображений из папки <code>./src/img</code> (или любой другой)</td>
    </tr>
    <tr>
      <td><code>npm run build</code></td>
      <td>Сборка проекта без карт кода (сжатый вид, как результат работы)</td>
    </tr>
    <tr>
      <td><code>npm run deploy</code></td>
      <td>Сборка проекта без карт кода и отправка содержимого папки сборки на github-pages</td>
    </tr>
    <tr>
      <td><code>npm run test:style</code></td>
      <td>Проверка стилевой составляющей проекта <a href="https://stylelint.io/">stylelint</a></td>
    </tr>
  </tbody>
</table>

Предполагается, что все команды вы выполняете в bash (для OSX и Linux это самый обычный встроенный терминал, для Windows это, к примеру, Git Bash). В Windows установку пакетов (`npm i`) нужно выполять в терминале, запущенном от имени администратора.



## Как начать новый проект c этим репозиторием

1. Клонировать этот репозиторий в новую папку (`git@github.com:sheffcer/start-project-SASS.git`, см. [шпаргалку](https://github.com/nicothin/web-development/tree/master/git#%D0%9A%D0%BB%D0%BE%D0%BD%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5-%D1%80%D0%B5%D0%BF%D0%BE%D0%B7%D0%B8%D1%82%D0%BE%D1%80%D0%B8%D1%8F)) и зайти в неё (`cd new-project`).
2. Стереть историю разработки этого репозитория (`rm -rf .git`), инициировать новый (`git init`), создать удалённый репозиторий и привязать его (`git remote add origin АДРЕС`, см. [шпаргалку](https://github.com/nicothin/web-development/tree/master/git#%D0%A3%D0%B4%D0%B0%D0%BB%D1%91%D0%BD%D0%BD%D1%8B%D0%B5-%D1%80%D0%B5%D0%BF%D0%BE%D0%B7%D0%B8%D1%82%D0%BE%D1%80%D0%B8%D0%B8)).
3. Отредактировать `README.md`, `package.json` (название проекта, автор, лицензия, сторонние пакеты и пр.).
4. Установить зависимости (`npm i`).
5. Запустить сервер разработки (`npm start`).

 [линтером](http://jsonlint.com/)).


## Парадигма

- Именование классов по БЭМ, разметка в [pug](https://pugjs.org/) и стилизация [Sass](http://sass-lang.com/). См. [Как работать с CSS-препроцессорами и БЭМ](http://nicothin.github.io/idiomatic-pre-CSS/)
- Каждый БЭМ-блок в своей папке внутри `./src/blocks/`.
- Список использованных в проекте БЭМ-блоков и доп. файлов указан в `./projectConfig.json`. Это главный конфигурационный файл проекта.
- Есть глобальные файлы: стилевые (стили печати), js (по умолчанию пуст), шрифты, картинки.
- Диспетчер подключения стилей `./src/scss/style.scss` генерируется автоматически при старте любой gulp-задачи (на основе данных из `./projectConfig.json`).

## Разметка
HTML никак не обрабатывается.

## Стили

Файл-диспетчер подключений (`./src/scss/style.scss`) 


## Назначение папок

``` bash
build/          # - Папка сборки, здесь работает сервер автообновлений.
  blocks/       # - блоки проекта.
  css/          # - добавочные css-файлы
  favicon/      # - файлы для фавиконок и смежных технологий.
  fonts/        # - шрифты проекта (будут автоматически скопированы в папку сборки).
  img/          # - картинки
  js/           # - js-файлы
  scss/         # - стили (файл style.scss скомпилируется

  
```
