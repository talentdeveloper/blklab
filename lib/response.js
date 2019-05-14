var ETag = require('etag');
var etag;

function send(data){
    if(!this.headersSent){
        if(this.contentType == 'application/json'){
            data = JSON.stringify(data);
        }
        if(this.etag){
            etag = ETag(data);
            if(etag === this.if_none_match){
                this.status = '304';
            }
            this.setHeader('etag', etag);
        }

        this.setHeader('Content-type', this.contentType);
        this.writeHead(this.status, this.headers);
        this.end(data || '');
    }
}

module.exports = {
    send: send
};
