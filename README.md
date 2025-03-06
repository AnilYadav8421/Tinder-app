# React + Vite (Tinder-app)

how to create react app using vite
1. Search vite react
2. scroll down and $ npm create vite@latest [my-vue-app] -- --template [vue]
3. App is now created
    - main.jsx ==> the primary entry point. and all the routes is written here only.
    - app.js => we will build all things here. [Remove all the code from here].
    - Assests, app.css ==> Delete this file we dont need this.
    
4. Before start to code initilize git first.
    - git init

5. install tailwind
    - select [tailwind + vite] and follow steps as shown
    - we have already creted react app so install only Tailwind
    - in terminal [npm install -D tailwindcss postcss autoprefixer] [npx tailwindcss init -p]

6. Also using DaisyUI library
    - [npm i -D daisyui@latest]
    -[ @plugin "daisyui";] add this in index.css

7. Now time to Routing
    - Go for [React Router]
    - [npm i react-router-dom]

8. to call API we using [Axios]

9. to handle CORS install [npm i cors] in backend code

10. installing [Redux toolkit] to store data, For this we have to install two packages
    - 1. redux toolkit
    - 2. react-redux
    - in terminal [npm i @reduxjs/toolkit react-redux]
    - Create store.