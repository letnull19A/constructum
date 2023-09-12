FROM node

EXPOSE 3689

COPY ./packages ./app/packages 
COPY ./auth ./app/auth
COPY ./identify ./app/identify

WORKDIR /app/identify
RUN ["npm", "i", "-g", "typescript@next"]
RUN ["npm", "i", "-g", "rimraf"]
RUN ["npm", "i"]

ENTRYPOINT ["npm", "run", "start"]