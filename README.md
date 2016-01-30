# Project 4 Website Optimization
Structure of the directory:
- `./src` source code
- `./dist` production code
- `./gulpfile.js` gulp file

## Part 1: Optimize PageSpeed Insights score for index.html
1. How to run app:
    - checkout `./dist/index.html`
    - run local server on that directory
    - download and install *ngrok*
    - copy the public URL that *ngrok* makes and paste to PageSpeed Insights
2. How to optimize website:
    - HTML: minify html, Web Font Loader, media query ,inline CSS
    - CSS: minify CSS, inline CSS
    - JavaScript: minify JavaScript, async JS
3. How to build tools to optimize website:
    - Using gulp on `./gulpfile.js`
    - Install *npm* and related *gulp* packages on directory `./`
    ```sh
    $ npm install --save-dev gulp-uglify
    $ npm install --save-dev gulp-minify-css
    $ npm install --save-dev gulp-htmlmin
    $ npm install --save-dev gulp-imagemin
    $ npm install --save-dev gulp-pngquant
    $ npm install --save-dev gulp-inline-css
    $ npm install --save-dev gulp-image-resize

    ```

    - On command line, navigate to directory, type `gulp`
    ```sh
    $ gulp
    ```
    - This command will automatically update changes, executes the changes and be watched on terminal screen.
    - The production code on this case is in `./dist` directory
    
## Part 2: Optimize Frames per Second in pizza.html
1. How to run app:
    - checkout and open `./dist/views/pizza.html`on browser
    - open Dev Tool and record to check on TimeLine
2. How to optimize Frames per Second:
    - JavaScript: `./dist/views/js/main.js`
        - fine tune `for` loop on function `changePizzaSizes()`
        - fine tune `for` loop on function `updatePostions()`
        - replace `querySelectorAll` by `getElementsByClassName`
        - reduce the number of pizza when the page loaded and scroll
    - CSS:`./dist/views/css/style.css`
        - add `will-change: transform` to class `.mover`
