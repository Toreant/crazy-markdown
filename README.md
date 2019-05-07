## This is a single markdown parser

### Develop  

```
npm i
yuhuajie

npm run test

yuhuajie
```  

### Export Function  


    const { parse, generateHTML } = require('./src/index');

    let parsedHTML = parse('# head1'); 
    generateHTML('# header', {
        styleSrc: '', // the style file path
        targetSrc: '' // the target output file path, if not defined, the targetSrc is ./output/index.html
    });

    1. yuhuajie
    2. yuhuajie


1. one
2. two