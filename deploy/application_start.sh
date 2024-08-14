#!/bin/bash


cd /home/ubuntu/prueba-aws-ms-seguridad

sudo pm2 start src/index.js

# node --watch src/index.js