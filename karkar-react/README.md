## Available Scripts

In the project directory, you can run:

- `yarn start` - runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

- `yarn test` - launches the test runner in the interactive watch mode.


## Redux configuration

The template provides basic Redux configuration with [feature based](https://redux.js.org/style-guide/style-guide/#structure-files-as-feature-folders-or-ducks) folder structure. You can use [Redux devtools browser extension](http://extension.remotedev.io/). Sample feature included in `src/features` folder, note technology agnostic `features` folder name. Based on Redux maintainers recommendation.

## Testing

Testing is done with [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/).

## [Prettier](https://prettier.io/)

I added `prettier` to force consistent formatting. Don't like trailing semicolons? Feel free to [tweak prettier rules](https://prettier.io/docs/en/configuration.html) inside `.prettierrc` file to match your code style.

## Styles/CSS/Styling

Just for the styling purpose of the example app, I used [Materialize](https://materializecss.com/). The template is shipped with the Materialize by default. I want to make sure that this template is style agnostic so you can plugin any CSS-in-JS or whatever library/framework you want to use for styles on your own.


## Eslint configurations

The template extends CRA ESLint rules with a custom set, tailored for the reasonable and clean development process.