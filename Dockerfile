FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npm install --save-dev @types/ejs @types/nodemailer

COPY . .

RUN npm run build

EXPOSE 8000

CMD ["node", "build/server.js"]
