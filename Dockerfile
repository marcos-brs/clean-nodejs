FROM node:11
WORKDIR /usr/src/service
COPY . .
RUN npm install
RUN npm run build
EXPOSE 3335
CMD ["npm", "run", "start"]
