if (! info){
    var info = {};
}

if (! info.aaronland){
    info.aaronland = {};
}

if (! info.aaronland.oEmbed){
    info.aaronland.oEmbed = {};
}

info.aaronland.oEmbed = function(args){
    this.args = args;
    this.canhas_console = (typeof(console) == 'object') ? 1 : 0;
};

info.aaronland.oEmbed.prototype.fetch = function(url, oembed_args, doThisOnSuccess){

    // who what where

    var req = this.args['service'];
    req += '?url=' + encodeURIComponent(url);
    req += '&format=json';
    req += '&jsoncallback=_jsonCallback';

    if (oembed_args){
        for (key in oembed_args){
            req += '&' + encodeURIComponent(key) + '=' + encodeURIComponent(oembed_args[key]);
        }
    }

    req += '&noCacheIE' + (new Date()).getTime();

    // callback-fu

    var _self = this;

    _jsonCallback = function(rsp){
        _self.log("dispatch returned for " + req);

        if (doThisOnSuccess){
            doThisOnSuccess(rsp);
        }
    };

    // make it so

    this.log("dispatch request for " + req);

    var skip_ie_cachebuster=1;
    this.json_request(req, skip_ie_cachebuster);
};

info.aaronland.oEmbed.prototype.json_request = function(url, skip_ie_cachebuster){
                    
    jsr = new JSONscriptRequest(url); 

    if (skip_ie_cachebuster){
       jsr.noCacheIE = '';
    }

    jsr.buildScriptTag(); 
    jsr.addScriptTag();
};

info.aaronland.oEmbed.prototype.log = function(msg){

    if (! this.args['enable_logging']){
        return;
    }

    // sudo make me work with (not firebug)

    if (! this.canhas_console){
        return;
    }

    console.log('[oembed] ' + msg);
};

// -*-java-*-