module.exports = {
    'env': {
        'node': true,
        'browser': true,
        'commonjs': true,
        'es2021': true
    },
    'extends': 'eslint:recommended',
    'parserOptions': {
        'ecmaVersion': 13
    },
    'rules': {
        'indent': [
            'error',
            4
        ],
        'no-useless-escape': 0,
        'linebreak-style': 0,
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'always'
        ]
    }
};