# ✨ Kek's welcome Shiz ✨  

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=for-the-badge&logo=prettier)](https://github.com/prettier/prettier)  
[![version: v1.0.69](https://img.shields.io/github/package-json/v/spuuntries/kekwelcome?color=green&logo=semver&logoColor=green&style=for-the-badge)](https://github.com/spuuntries/kekwelcome)  
[![last commit](https://img.shields.io/github/last-commit/spuuntries/kekwelcome?color=yellow&style=flat-square)](https://github.com/spuuntries/kekwelcome)  
[![license: agpl-3.0](https://img.shields.io/github/license/spuuntries/kekwelcome?color=red&logo=gpl&style=flat-square)](https://github.com/spuuntries/kekwelcome)  

> Copyright (C) 2021 kekboi, Art Union org.  
> License Notice:  
> Any code within this repository and any derivatives thereof are to be licensed with Affero GPL as published by the FSF,  
> version 3 only, under `kekboi, Art Union org.`, see `LICENSE.md` for details.  


## Dependencies:
As we're running `d.js` v13 for this, it *is* ***required*** for you to install `node.js` v16 to run this module as is.  

However, you *can* remove all v13 changes and change the `package.json` to run this on v12.


## How it works:
This repo contains kek's welcoming module for Art Union, what it does is it:  
1. Gets an introduction message  
2. Grabs a webhook  
3. Sends a welcome ping and asks the ping role to welcome the new person  

Simple enough, lmao.


## Usage:
`mv` or rename `.env copy` to `.env` and change the variables accordingly.   

### Brief explanation of the configurable message:  
The `welmotes` can be more than two emotes so long as they're all split by a `|`.  
The same thing goes for the `welcomes` messages, with the difference being the addition of `<ping>` placeholder.
