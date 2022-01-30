
const http = require('http');
const axios = require('axios');
const fs = require('fs');
const chalk = require('chalk');
const moment = require('moment');
const _ = require('lodash');
const { v4: uuidv4 } = require("uuid");
const { userInfo } = require('os');
const userFile='usuarios.txt';


http
    .createServer((req, res) => {
        axios.get("https://randomuser.me/api/?inc=name")
            .then((data) => {
                const resData = data.data.results;
                const  moment1=( moment().format('DD MMM YY'));
                const id = uuidv4();
                const shortid=id.slice(id.length-6);
                const name=(`-Nombre: ${resData[0].name.first} -Apellido: ${resData[0].name.last} -ID:${shortid} -Timestamp: ${moment1} \n`);
                console.log(chalk.blue.bgWhite(name));
                res.write('revisar consola para ver los usuarios registrados');
                res.end();

                const path =  `./${userFile}`;
               
                try {
                    if (fs.existsSync(path)) {
                        fs.appendFile(userFile, name, (err, data) => {
                            if (err) {
                                console.log('no se pudo actualizar');
                            } else {
                                console.log('archivo actualizado');
                            }
                        })
                    } else {
                        fs.writeFile(userFile,'',(err, data) => {
                            if (err) {
                                console.log('no se pudo crear');
                            } else {
                                console.log('archivo creado');
                            }
                        })
                    }
                } catch (error) {  
                    console.log(`algo muy malo paso: ${error.toString()}`);
                }
                
             
                  console.log(fs.readFile(userFile, 'utf-8', (err, data) => {
                     if (err) {
                         console.log('no se pudo leer');
                    } else {
                         console.log(chalk.blue.bgWhite(data));
                    }
                  }))
                
                
                let arr=[fs.readFile(userFile, 'utf-8', (err, data) => {
                    if (err) {
                        console.log('no se pudo leer')
                    } else {
                        console.log(chalk.blue.bgWhite(data));
                    }
                 })]
                _.forOwn(arr, function (value, key) {
                    console.log(value);
                })

            })
            .catch((e) => {
                console.log(e);
            });
        
}).listen(3000,()=>console.log('UP!'));