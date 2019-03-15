## This is a single markdown parser  

### Develop  

```
npm i
npm run test
```  

### Export Function  

```
const { parse, generateHTML } = require('./src/index');

let parsedHTML = parse('# head1'); 
generateHTML('# header', {
    styleSrc: '', // the style file path
    targetSrc: '' // the target output file path, if not defined, the targetSrc is ./output/index.html
});
```