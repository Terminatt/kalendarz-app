module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "settings": {
        "import/resolver": {
          "typescript": {}
        }
    },
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "project": __dirname + '/tsconfig.json'
    },
    "extends": [
        "airbnb",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:import/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking"
    ],
    "plugins": [
        "react",
        "@typescript-eslint",
        "import"
    ],
    "rules": {
        "import/no-unresolved": "off",
        "linebreak-style": "off",
        "no-use-before-define": "off",
        "@typescript-eslint/no-use-before-define": ["error"],
        "func-names": "off",
        "react/jsx-filename-extension": [ "warn", {"extensions": [".tsx"]} ],
        "import/extensions": [ "error", "ignorePackages", {"ts": "never", "tsx": "never" }],
        "no-shadow": "off",
        "@typescript-eslint/no-shadow": ["error"],
        "react/function-component-definition": "off",
        "import/prefer-default-export": "off",
        "no-param-reassign": ["error", {"props": true, "ignorePropertyModificationsFor": ["state"] }],
        "indent": ["error", 4],
        "react/jsx-indent": ["error", 4],
        "react/jsx-indent-props": ['error', 4],
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": "warn",
        "react/jsx-props-no-spreading": ['error', {"exceptions": ["Form", "Button"]}],
        "camelcase": ["off"]
    }
}
