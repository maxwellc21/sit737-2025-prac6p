FROM node:18
WORKDIR /app
COPY . .
RUN npm install
RUN mkdir -p uploads
EXPOSE 5007
CMD ["node", "index.js"]
