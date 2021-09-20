# eslint-plugin-clean-testing

ESLint plugin that is designed to enforce certain practices within an Angular project to allow smoother testing. Currently this plugin only requires the inclusion of an id on certain elements. The default checked elements are: `select`, `input`, `textarea`, `button`, and `a` (anchor links).


## Requirements

1. Angular project
2. *(recommended)* ESLint configured with [`@angular-eslint/schematics`](https://github.com/angular-eslint/angular-eslint) (installed via: `ng add @angular-eslint/schematics`)


## Install

To install the plugin run the following command to add the package to the project:

```
npm install eslint-plugin-clean-testing
```

and then add the following line to bottom of the `.eslintrc.json` file within the Angular project. Assuming you just setup the project using `@angular-eslint/schematics`. This adds the recommended rule configuration.

```diff
{
  "root": true,
  "ignorePatterns": ["projects/**/*"],
  "overrides": [
    ...
    {
      "files": ["*.html"],
      "extends": [
        "plugin:@angular-eslint/template/recommended",
+       "plugin:clean-testing/recommended"
      ]
    }
  ]
}
```

To customize the list of elements that the plugin checks, manually add the rule (`clean-testing/elements-require-id`) to the config, and provide a second argument with the list of elements.

```diff
{
  "root": true,
  "ignorePatterns": ["projects/**/*"],
  "overrides": [
    ...
    {
      "files": ["*.html"],
      "extends": [
        "plugin:@angular-eslint/template/recommended",
        "plugin:clean-testing/recommended"
      ],
      "rules": {
+       "clean-testing/elements-require-id": ["error", ["iframe", "canvas" ...]]
      }
    }
  ]
}
```


## Usage

Just run the linter as usual:

```
npm run lint
```

## Example

```html
<!-- src/app/app.component.html -->

<h1>Here are</h1>
<h2>some headers</h2>

<div>Hello</div>

<button>Button</button>

<img src="" />

<select>
  <option *ngFor="let item of list" [value]="item.name">{{ item.name }}</option>
</select>

<a href="">Link</a>

<input />

<textarea></textarea>
```

```text
$ ng lint

Linting "angular-test-project"...

./src/app/app.component.html
   6:1  error  Element button must have an id    clean-testing/elements-require-id
  10:1  error  Element select must have an id    clean-testing/elements-require-id
  14:1  error  Element a must have an id         clean-testing/elements-require-id
  16:1  error  Element input must have an id     clean-testing/elements-require-id
  18:1  error  Element textarea must have an id  clean-testing/elements-require-id

✖ 5 problems (5 errors, 0 warnings)

Lint errors found in the listed files.

error Command failed with exit code 1.
```


## Contributing

Follow the following commands to setup the package for development within an existing Angular project:

```
  1. npm link (inside the dist/ folder of the plugin)
  2. npm link eslint-plugin-clean-testing (inside root folder of the Angular project)
  3. npm run dev (within the plugin project)
```

