# Project 4 Website Optimization
Structure of the directory:
- `./src` source code
- `./dist/` production code for Part 1 (index.html)
- `./gulpfile.js` gulp file for Part 1
- `./src/views/` production code for Part 2 (pizza.html)

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
4. Details how to optimize website:

    - Minify JavaScript file: (gulpfile.js)
    ```sh
    gulp.task('scripts', function() {
    return gulp.src(paths.scripts)
        .pipe(uglify())
        .pipe(gulp.dest('dist/js/'));
    });
    ```
    - Minify CSS file: (gulpfile.js)
    ```sh     
    gulp.task('styles', function() {
    return gulp.src(paths.styles)
        .pipe(minifyCSS())
        .pipe(gulp.dest('dist/css/'));
    });
    ```
    - Inline CSS to HTML: (gulpfile.js)
    ```sh
    gulp.task('inlinecss', function() {
    return gulp.src(paths.contents)
        .pipe(inlineCSS())
        .pipe(gulp.dest('dist/'));
    });
    ```
    - Optimize images: (gulpfile.js)
    ```sh
    gulp.task('images1', function() {
    return gulp.src(paths.images[0])
        .pipe(imagemin({
            progressive: true,
            use: [pngquant()]
        }))
        .pipe(gulp.dest('dist/img/'));
    });

    gulp.task('images2', function() {
    return gulp.src(paths.images[1])
        .pipe(imagemin({
            progressive: true,
            use: [pngquant()]
        }))
        .pipe(imageResize({
            width: 115,
            height: 55,
            crop: true,
            upscale: false
        }))
        .pipe(gulp.dest('dist/views/images/'));
    });
    ```
    - Minify Html: (gulpfile.js)
    ```sh
    gulp.task('contents', ['scripts', 'styles', 'inlinecss', 'images1', 'images2'], function() {
    return gulp.src('dist/index.html')
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true
        }))
        .pipe(gulp.dest('dist/'));
      });
      ```
    - Using Web Font Loader (on index.html)
    ```sh

    <script type="text/javascript">
        WebFontConfig = {
            google: {
                families: ['Open+Sans:400,700:latin']
            }
        };
        (function() {
            var wf = document.createElement('script');
            wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
                '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
            wf.type = 'text/javascript';
            wf.async = 'true';
            var s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(wf, s);
        })();
    </script>
    ```
    - Media query CSS:
    ```sh
    media = 'print'
    ```
    - Async JavaScript:
    ```sh
    <script async src="http://www.google-analytics.com/analytics.js"></script>
   <script async src="js/perfmatters.js"></script>
    ```

## Part 2: Optimize Frames per Second in pizza.html
1. How to run app:
    - checkout and open `./src/views/pizza.html`on browser
    - open Dev Tool and record to check on TimeLine
2. How to optimize Frames per Second on `./src/views/js/main.js`
    - function `changePizzaSizes()` to optimize JavaScript by:
        - omit the function `determineDx()`
        - optimize the `for` loop by declare an array length variable `len= randomPizzas.length`
        - replace `querySelector` by `getElementById`
        - replace `querySelectorAll` by `getElementsByClassName`
        ```sh
        var resizePizzas = function(size) {
        'use strict';
        window.performance.mark("mark_start_resize");  
        // Changes the value for the size of the pizza above the slider
        function changeSliderLabel(size) {
        'use strict';
        switch(size) {
          case "1":
            document.getElementById("pizzaSize").innerHTML = "Small";
            return 25;
          case "2":
            document.getElementById("pizzaSize").innerHTML = "Medium";
            return 33.3;
          case "3":
            document.getElementById("pizzaSize").innerHTML = "Large";
            return 50;
          default:
            console.log("bug in changeSliderLabel");
        }
        }
         changeSliderLabel(size);
      // Iterates through pizza elements on the page and changes their widths
        function changePizzaSizes(size) {
            'use strict';
            var newWidth = changeSliderLabel(size);
            var randomPizzas =                                     document.getElementsByClassName("randomPizzaContainer");
            for (var i = 0, len = randomPizzas.length; i<len; i++) {
                randomPizzas[i].style.width = newWidth + "%";
            }
        }
        changePizzaSizes(size);
        ```
    - declare variable `pizzasDiv = document.getElementById("randomPizzas")` outside the `for` loop
        ```sh
        var pizzasDiv = document.getElementById("randomPizzas");
        for (var i = 2; i < 100; i++) {
            pizzasDiv.appendChild(pizzaElementGenerator(i));
        }
        ```
    - function `updatePositions()`
        - replace `querySelectorAll` by `getElementsByClassName`
        - declare `var scrollTop = document.body.scrollTop/1250;` to avoid repetition code inside the `for` loop
        - declare an array variable `phase` contains 5 values related to `i%5`
        ```sh
        function updatePositions () {
        'use strict';
        frame ++;
        window.performance.mark("mark_start_frame");
        var items = document.getElementsByClassName('mover');
        var scrollTop = document.body.scrollTop/1250;
        var phase = [];
        for (var i =0; i<5; i++) {
          phase.push(Math.sin(scrollTop + i));
        }
        for (var i =0, len = items.length; i<len; i++) {
          items[i].style.left = items[i].basicLeft + 100*phase[(i%5)] + 'px';
        }
        ```
    - document.addEventListener()
        - declare variable `rows` calculates the numbers of row needed
        - declare variable `nums = cols*rows` calculates the numbers of pizzas to show off on screens, reducing the original numbers from 200 to about 32
        - declare variable `elem` outside the `for` loop
        - declare `var movingPizzas1 = document.getElementById('movingPizzas1');` outside the `for` loop
        ```sh
        document.addEventListener('DOMContentLoaded', function() {
        'use strict';
      var cols = 8;
      var rows = window.screen.height / 200;
      var nums = cols*rows
      var s = 256;
      var elem;
      var movingPizzas1 = document.getElementById('movingPizzas1');
      for (var i = 0; i < nums; i++) {
            elem = document.createElement('img');
            elem.className = 'mover';
            elem.src = "images/pizza.png";
            elem.style.height = "100px";
            elem.style.width = "73.333px";
            elem.basicLeft = (i % cols) * s;
            elem.style.top = (Math.floor(i / cols) * s) + 'px';
            movingPizzas1.appendChild(elem);
        }
        ```
3. How to optimize Frames per Second on `./src/views/css/style.css`
    - Insert `backface-visibility: hidden`, `transform: translateZ(0)` and `will-change: transform` on `.mover`
        ```sh
        .mover {
          backface-visibility: hidden;
          transform: translateZ(0);
          will-change: transform;
          position: fixed;
          width: 256px;
          z-index: -1;
        }
        ```
    - Add vendor prefixes:
