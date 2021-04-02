# specify the node base image with your desired version node:<version>
FROM node:14

# Application setup
COPY . /var/

WORKDIR /var/authService

RUN npm install

# Networking
# EXPOSE 9229
EXPOSE 80

CMD npm run dev