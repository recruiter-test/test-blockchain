FROM       node:alpine 

MAINTAINER https://github.com/recruiter-test/test-blockchain

EXPOSE     3000

WORKDIR    /test-blockchain 

COPY       package.json /test-blockchain

RUN        npm install

COPY       . /test-blockchain

CMD        ["node", "bin/www"]