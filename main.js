import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import chalk from 'chalk';
import lodash from 'lodash';
import axios from 'axios';


const app = express();

const usuarios = []

app.get('/', (req, res) => {
    
    console.clear();
    axios.get("https://randomuser.me/api/")
    .then((data) => {const usuario = data.data.results[0];
        const {name,gender} = usuario;
        const {first,last} = name;
        const id = uuidv4().slice(0,6)
        const time = moment().format('MMMM Do YYYY, h:mm:ss a')
        usuarios.push({nombre :first,apellido:last,genero:gender,id:id,time:time})
   
        const usuariosPart = lodash.partition(usuarios, {genero:"male"});

        for(let i = 0;i < usuariosPart.length ; i++) {
            if(i == 0){
                let cont = 1;
                res.write(`
                <div class="container pt-5 pb-3">
                    <h1>Hombres</h1>
                </div>
                `)
                console.log(chalk.blue.bgWhite("Hombres:"));
                usuariosPart[i].forEach((element)=> {
                    const {nombre,apellido,id,time} = element;
                    console.log(chalk.blue.bgWhite(`${cont}. Nombre: ${nombre} - Apellido: ${apellido} - ID: ${id} - Timestamp: ${time}`));
                    res.write(`
                    <html>
                        <head> 
                            <meta charset="UTF-8"> 
                            <meta http-equiv="X-UA-Compatible" content="IE=edge"> 
                            <meta name="viewport" content="width=device-width, initial-scale=1.0"> 
                            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor" crossorigin="anonymous"> 
                            <title>Desafio</title> 
                        </head> 
                        <body> 
                            <div class="container"> 
                                <h1">${cont}. Nombre: ${nombre} - Apellido: ${apellido} - ID: ${id} - Timestamp: ${time}</h1> 
                            </div>
                        </body> 
                    </html>`);
                    cont ++;
                })
                
                
            }else{
                let cont = 1;
                res.write(`
                <div class="container pt-5 pb-3">
                    <h1>Mujeres</h1>
                </div>
                `)
                console.log(chalk.blue.bgWhite("\nMujeres:"));
                usuariosPart[i].forEach((element)=> {
                    const {nombre,apellido,id,time} = element;
                    console.log(chalk.blue.bgWhite(`${cont}. Nombre: ${nombre} - Apellido: ${apellido} - ID: ${id} - Timestamp: ${time}`));
                    res.write(`
                    <html>
                        <head> 
                            <meta charset="UTF-8"> 
                            <meta http-equiv="X-UA-Compatible" content="IE=edge"> 
                            <meta name="viewport" content="width=device-width, initial-scale=1.0"> 
                            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor" crossorigin="anonymous"> 
                            <title>Desafio</title> 
                        </head> 
                        <body> 
                            <div class="container"> 
                                <h1">${cont}. Nombre: ${nombre} - Apellido: ${apellido} - ID: ${id} - Timestamp: ${time}</h1> 
                            </div>
                        </body> 
                    </html>`);
                    cont ++;
                })
            }
        };

        res.end();

    })
    .catch((e) => {
        console.log(e);
    });

    
    
});



app.listen(3000,() => {
    console.log('Servidor arriba en el puerto 3000'); 
})