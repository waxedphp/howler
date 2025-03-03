
;(function ( $, window, document, undefined ) {

    var pluginName = 'howler',
        _search = '.waxed-howler',
        _api = [],
        defaults = {
            propertyName: "value"
        },
        inited = false
        ;

    Howl.prototype.changeSrc = function(newSrc) {
          var self = this;
          self.unload(true);
          self._duration = 0;
          self._sprite = {};
          self._src = newSrc;
          self.load();
    };

    function Instance(pluggable,element,dd){
      var that = this;
      this.pluggable = pluggable;
      this.element = element;
      this.o = element;
      this.t = pluginName;
      this.dd = dd;
      this.name = '';
      this.sound = null;
      this.song = 0;
      this.interval = null;
      this.progress = [];
      this.buttons = [];
      this.cfg = {
        src: '/snd/blyskanie.mp3',
        html5: true
      };

      this.invalidate = function(RECORD){

      },

      this.setRecord = function(RECORD){
        if (typeof that.dd.name == 'undefined') return;
        var rec = that.pluggable.getvar(that.dd.name, RECORD);
        if (typeof rec != 'object') { return; };
        console.log(rec);
        if (typeof rec.value == 'object') { 
          //this.free();
          this.cfg.src = rec.value;
          that.sound.changeSrc(this.cfg.src);
          //this.make();          
        } else if (typeof rec.value == 'string') {
          //this.free();
          this.cfg.src = rec.value;
          that.sound.changeSrc(this.cfg.src);
          //this.make();
        };
        if (typeof rec.commands == 'object') {
          console.log(rec.commands);
          for (var i=0;i<rec.commands.length;i++) {
            switch(rec.commands[i]) {
              case 'play':
                console.log('PLAY');
                setTimeout(that.play, 1000);
                break;
              case 'pause':
                this.pause();
                break;
              case 'stop':
                this.stop();
                break;
            };
            
            
          }
          
          
        };

      },
      
      this.play = function() {
        if (that.sound == null) return;
        that.sound.seek(-1);
        that.sound.play();
      },
      this.pause = function() {
        if (that.sound == null) return;
        that.sound.pause();
      },
      this.stop = function() {
        if (that.sound == null) return;
        that.sound.stop();
      },
      this.mute = function() {
        if (that.sound == null) return;
        that.sound.mute();
      },
      this.seek = function(ev) {
        if (that.sound == null) return;
        const target = ev.target;

        // Get the bounding rectangle of target
        const rect = target.getBoundingClientRect();

        // Mouse position
        const x = ev.clientX - rect.left;
        const y = ev.clientY - rect.top;
        const w = $(target).width();
        const h = $(target).height();
        var p = (x/w)*100;
        //console.log(p,x,y,w,h,ev);
        //that.sound.seek();
        that.sound.seek((that.sound.duration()/100)*p);
      },
      this.onEvent = function(name, a,b,c) {
        console.log(name,a,b,c);
        if ((typeof that.dd.url == 'string')&&(typeof that.dd.name == 'string')&&(typeof that.dd.action == 'string')) {
          var o = {
            'action' : that.dd.action+'/'+name
          };
          o['src'] = that.cfg.src;
          o['name'] = that.dd.name;
          o['song'] = this.song;
          that.pluggable.sendData(o,that.dd.url,that);
        };
      },
      
      this.make = function() {
        /*
         * {
          src: ['/snd/blyskanie.mp3'],
          html5: true
          //onend: function() {that.free();}
        }*/
        that.sound = new Howl(this.cfg);
        this.interval = setInterval(function() {
          if (that.sound == null) return;
          const width = (that.sound.seek() / that.sound.duration()) * 100;
          $(that.progress).each(function(i,a){
            if (isNaN(width)) return;
            if ((width<0)||(width>100)) return;
            $(a).val(width);
          });
        },100);        
        that.sound.on('stop', function(ev){that.onEvent('stop', ev);});
        that.sound.on('end', function(ev){that.song++;that.onEvent('end', ev);});
      },
      
      this.free = function() {
        if (that.sound == null) return;
        clearInterval(this.interval);
        console.log(that.sound);
        that.sound.unload();
        that.sound = null;
        console.log(that.sound);
      },

      this.init=function() {
        
        console.log($(that.element));


        $(that.element).find('progress').each(function(i,a){
          that.progress.push(a);
          var h = $(a).data('howler');
          switch(h) {
            case 'seek':
              $(a).on('click', that.seek);
              break;
          }
        });
        $(that.element).find('button').each(function(i,a){
          that.buttons.push(a);
          var h = $(a).data('howler');
          switch(h) {
            case 'play':
              $(a).on('click', that.play);
              break;
            case 'pause':
              $(a).on('click', that.pause);
              break;
            case 'stop':
              $(a).on('click', that.stop);
              break;
            case 'mute':
              $(a).on('click', that.mute);
              break;
          }
        });
        
        that.make();

        

        inited = true;
      },
      this._init_();
    }

    $.waxxx(pluginName, _search, Instance, _api);


})( jQuery, window, document );
/*--*/
//# sourceURL: /js/jam/boilerplate/plugin.js
