  let g:vigun_mappings = [
        \ {
        \   'pattern': '.test.js$',
        \   'all': './node_modules/.bin/mocha #{file}',
        \   'nearest': './node_modules/.bin/mocha --fgrep #{nearest_test} #{file}',
        \   'debug-all': './node_modules/.bin/mocha --inspect-brk --no-timeouts #{file}',
        \   'debug-nearest': './node_modules/.bin/mocha --inspect-brk --no-timeouts --fgrep #{nearest_test} #{file}',
        \ }
        \]
