# PriceBin
Vue/TypeScript app made to help make students and other budget-constrained people's lives easier.

![GitHub top language](https://img.shields.io/github/languages/top/panasweb/pricebin)
![Lines of code](https://tokei.rs/b1/github/panasweb/pricebin?category=code)

## Correr el proyecto (desarrollo):
```
yarn serve
```

**Importante:**
En el proyecto de la [REST API](https://github.com/panasweb/pricebin-api) debe de estar corriendo en la máquina local (puerto 3010).
Se corre con `npm run devstart`.

## Si no tienes yarn instalado:
```
npm install --global yarn
```

## Instalar dependencias
```
yarn install
```

### Compilar para Producción
```
yarn build
```

### Lints / fixes
```
yarn lint
```
...

[Configuration Reference](https://cli.vuejs.org/config/).



.env    

VUE_APP__API_URL='http://localhost:3010'

