// https://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    parserOptions: {
        parser: 'babel-eslint'
    },
    env: {
        browser: true,
    },
    extends: [
        'plugin:vue/essential',
        'standard'
    ],
    plugins: [
        'vue'
    ],
    rules: {
        'semi': [
            2,
            'always'
        ],
        'indent': 'off',
        'vue/script-indent': ['error', 4, {
            'baseIndent': 1
        }],
        'space-before-function-paren': [
            'error', {'anonymous': 'ignore', 'named': 'never'}
        ],
        'generator-star-spacing': 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
    },
    'globals': {
        'expect': true,
        'sinon': true,
        'describe': true,
        'xdescribe': true,
        'it': true,
        'xit': true,
        'beforeEach': true
    }
};
