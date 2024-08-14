#!/bin/bash

sudo pm2 kill

cd /home/ubuntu/prueba-aws-ms-seguridad

sudo pm2 start src/index.js

# node --watch src/index.js