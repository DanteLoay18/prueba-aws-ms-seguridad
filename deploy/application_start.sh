#!/bin/bash


sudo pm2 delete index

cd /home/ubuntu/prueba-aws-ms-seguridad

sudo pm2 start src/index.js