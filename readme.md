
# How to run this server  
Make sure this server is running to make your client functional. 
Dapat irun ninyo ni nga server para mugana inyong frontend, or para mugana ang frontend.

## Pre-requisites
Make sure you have NodeJS installed on your machine.
1. Dapat mag install mo daan ug NodeJS (https://nodejs.org/en/download/)
2. Inag human ninyo ug install, pag open mo ug ``Command Prompt``, dayun itype ni nga command:
    - ``npm install -g localtunnel``
    - ``npm install -g nodemon``

## Starting local server 🚀  
To run local server, simply open up a command prompt from the project's directory, then run `npm run start`  

1. I-Download ni ninyo na code, iclick ang ``code`` na button sa taas, dayun iclick ang ``Download ZIP``.
2. I-Extract ninyo ang downloaded file, dayun ang mew na folder kay isave sa desktop (Make sure pag open sa mew na folder, ang mga codes na dayun ang makita).
3. Pag-open ug ``Command Prompt``, dayun itype ni nga commands:
    - ``cd desktop``
    - ``cd mew``
    - ``npm install``
    - ``npm run start``

## Tunnel your local server 🚀 
To make this server accessible in public, you have to setup a tunneling service, make sure you install localtunnel globally by running `npm install -g localtunnel`, after installing, open up a separate command prompt then execute this command: `lt --host --port 3000 --subdomain resortserver` or simply run `npm run tunnel` from the project's directory.

1. Pag-open ug isa ka ``Command Prompt``.
2. dayun itype ni nga commands:
    - ``cd desktop``
    - ``cd mew``
    - ``npm run tunnel``


