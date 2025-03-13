
;(function ( $, window, document, undefined ) {

    var pluginName = 'howler',
        _search = '.waxed-howler',
        _api = [],
        defaults = {
            propertyName: "value"
        },
        inited = false
        ;

    // https://bulmash.com/code/how-to-change-the-source-in-howler-js/
    Howl.prototype.changeSrc = function(newSrc) {
      var self = this;
      self.unload(true);
      self._duration = 0;
      self._sprite = {};
      self._src = newSrc;
      self.load();
    };
    
    var ID3 = [
      'ACOUSTID_ID',//TXXX:Acoustid Id 	TXXX:Acoustid Id 	----:com.apple.iTunes:Acoustid Id 				
      'ACOUSTID_FINGERPRINT',//TXXX:Acoustid Fingerprint 	TXXX:Acoustid Fingerprint 	----:com.apple.iTunes:Acoustid Fingerprint 				
      'ALBUM', //TALB 	TALB 	©alb 	T=50 TITLE 	WM/AlbumTitle 	IPRD 	
      'ALBUMSORT', //TSOA 	TSOA 	soal 	T=50 SORT_WITH 	WM/AlbumSortOrder 		
      'ALBUMARTIST', //TPE2 	TPE2 	aART 	T=50 ARTIST 	WM/AlbumArtist 		
      'ALBUMARTISTSORT',//TSO2 	TSO2 	soaa 	T=30 			
      'ARTIST',//TPE1 	TPE1 	©art 	T=30 ARTIST 	Author 	IART 	
      'ARTISTSORT',//TSOP 	TSOP 	soar 	T=30 	WM/ArtistSortOrder 		
      'BARCODE',//TXXX:BARCODE 	TXXX:BARCODE 	----:com.apple.iTunes:BARCODE 	T=30 	WM/Barcode 		Field is used when importing via MusicBrainz (since Mp3tag v3.13).
      'BPM',//TBPM 	TBPM 	tmpo 	T=30 	WM/BeatsPerMinute 		
      'CATALOGNUMBER',//TXXX:CATALOGNUMBER 	TXXX:CATALOGNUMBER 	----:com.apple.iTunes:CATALOGNUMBER 	T=30 	WM/CatalogNo 		Field is used when importing via Discogs and MusicBrainz (since Mp3tag v3.13).
      'COMMENT',//COMM 	COMM 	©cmt 	T=30 	Description 	ICMT 	
      'COMPILATION',//TCMP 	TCMP 	cpil 	T=30 			Field that is used by iTunes to mark albums as compilation. Either enter the value 1 or delete the field.
      'COMPOSER',//TCOM 	TCOM 	©wrt 	T=30 	WM/Composer 		
      'COMPOSERSORT',//TSOC 	TSOC 	soco 	T=30 			
      'CONDUCTOR',//TPE3 	TPE3 	©con 	T=30 	WM/Conductor 		
      'CONTENTGROUP',//TIT1 	TIT1 	©grp 	T=30 	WM/ContentGroupDescription 		
      'COPYRIGHT',//TCOP 	TCOP 	cprt 	T=30 	Copyright 	ICOP 	
      'DATE',//TDAT 	TXXX:DATE 					
      'DESCRIPTION',//desc 	T=30 			
      'DISCNUMBER',//TPOS 	TPOS 	disk 	T=50 PART_NUMBER 	WM/PartOfSet 		
      'ENCODEDBY',//TENC 	TENC 	©enc 	T=30 ENCODED_BY 	WM/EncodedBy 		
      'ENCODERSETTINGS',//TSSE 	TSSE 		T=30 	WM/EncodingSettings 		
      'ENCODINGTIME',//	TDEN 		T=30 	WM/EncodingTime 		
      'FILEOWNER',//TOWN 	TOWN 		T=30 PURCHASE_OWNER 			
      'FILETYPE',//TFLT 	TFLT 		T=30 			
      'GENRE',//TCON 	TCON 	©gen | gnre 	T=30 	WM/Genre 	IGNR 	
      'GROUPING',//GRP1 	GRP1 		T=30 			
      'INITIALKEY',//TKEY 	TKEY 		T=30 INITIAL_KEY 	WM/InitialKey 		
      'INVOLVEDPEOPLE',//IPLS 	TIPL 		T=30 			Role1:Person1;Role2:Person2; … e.g., Drums:Jamie Graham;
      'ISRC',//TSRC 	TSRC 		T=30 	WM/ISRC 		
      'LANGUAGE',//TLAN 	TLAN 		T=30 	WM/Language 	ILNG 	
      'LENGTH',//TLEN 	TLEN 		T=30 			
      'LYRICIST',//TEXT 	TEXT 		T=30 			
      'MEDIATYPE',//TMED 	TMED 		T=50 ORIGINAL_MEDIA_TYPE 			
      'MIXARTIST',//TPE4 	TPE4 		T=30 REMIXED_BY 			
      'MOOD',//	TMOO 		T=30 	WM/Mood 		
      'MOVEMENTNAME',//MVNM 	MVNM 	©mvn 	T=20 TITLE 			
      'MOVEMENT',//MVIN 	MVIN 	©mvi 	T=20 PART_NUMBER 			
      'MOVEMENTTOTAL',//MVIN 	MVIN 	©mvc 	T=30 			
      'MUSICBRAINZ_ALBUMARTISTID',//TXXX:MusicBrainz Album Artist Id 	TXXX:MusicBrainz Album Artist Id 	----:com.apple.iTunes:MusicBrainz Album Artist Id 				
      'MUSICBRAINZ_ALBUMID',//TXXX:MusicBrainz Album Id 	TXXX:MusicBrainz Album Id 	----:com.apple.iTunes:MusicBrainz Album Id 				
      'MUSICBRAINZ_ALBUMRELEASECOUNTRY',//TXXX:MusicBrainz Album Release Country 	TXXX:MusicBrainz Album Release Country 	----:com.apple.iTunes:MusicBrainz Album Release Country 				
      'MUSICBRAINZ_ALBUMSTATUS',//TXXX:MusicBrainz Album Status 	TXXX:MusicBrainz Album Status 	----:com.apple.iTunes:MusicBrainz Album Status 				
      'MUSICBRAINZ_ALBUMTYPE',//TXXX:MusicBrainz Album Type 	TXXX:MusicBrainz Album Type 	----:com.apple.iTunes:MusicBrainz Album Type 				
      'MUSICBRAINZ_ARTISTID',//TXXX:MusicBrainz Artist Id 	TXXX:MusicBrainz Artist Id 	----:com.apple.iTunes:MusicBrainz Artist Id 				
      'MUSICBRAINZ_DISCID',//TXXX:MusicBrainz Disc Id 	TXXX:MusicBrainz Disc Id 	----:com.apple.iTunes:MusicBrainz Disc Id 				
      'MUSICBRAINZ_ORIGINALALBUMID',//TXXX:MusicBrainz Original Album Id 	TXXX:MusicBrainz Original Album Id 	----:com.apple.iTunes:MusicBrainz Original Album Id 				
      'MUSICBRAINZ_ORIGINALARTISTID',//TXXX:MusicBrainz Original Artist Id 	TXXX:MusicBrainz Original Artist Id 	----:com.apple.iTunes:MusicBrainz Original Artist Id 				
      'MUSICBRAINZ_RELEASEGROUPID',//TXXX:MusicBrainz Release Group Id 	TXXX:MusicBrainz Release Group Id 	----:com.apple.iTunes:MusicBrainz Release Group Id 				
      'MUSICBRAINZ_RELEASETRACKID',//TXXX:MusicBrainz Release Track Id 	TXXX:MusicBrainz Release Track Id 	----:com.apple.iTunes:MusicBrainz Release Track Id 				
      'MUSICBRAINZ_TRACKID',//UFID:http://musicbrainz.org 	UFID:http://musicbrainz.org 	----:com.apple.iTunes:MusicBrainz Track Id 				
      'MUSICBRAINZ_TRMID',//TXXX:MusicBrainz TRM Id 	TXXX:MusicBrainz TRM Id 	----:com.apple.iTunes:MusicBrainz TRM Id 				
      'MUSICBRAINZ_WORKID',//TXXX:MusicBrainz Work Id 	TXXX:MusicBrainz Work Id 	----:com.apple.iTunes:MusicBrainz Work Id 				
      'MUSICIANCREDITS',//TMCL 		T=30 			Role1:Person1;Role2:Person2; … e.g., Drums:Jamie Graham;
      'NARRATOR',//		©nrt 	T=30 			
      'NETRADIOOWNER',//TRSO 	TRSO 		T=30 			
      'NETRADIOSTATION',//TRSN 	TRSN 		T=30 			
      'ORIGALBUM',//TOAL 	TOAL 		T=30 	WM/OriginalAlbumTitle 		
      'ORIGARTIST',//TOPE 	TOPE 		T=30 	WM/OriginalArtist 		
      'ORIGFILENAME',//TOFN 	TOFN 		T=30 	WM/OriginalFilename 		
      'ORIGLYRICIST',//TOLY 	TOLY 		T=30 	WM/OriginalLyricist 		
      'ORIGYEAR',//TORY 	TDOR 		T=30 	WM/OriginalReleaseYear 		
      'PODCAST',//PCST 	PCST 	pcst 	T=30 			Field that is used by iTunes to mark tracks as podcasts. Either enter the value 1 or delete the field.
      'PODCASTCATEGORY',//TCAT 	TCAT 	catg 	T=30 			
      'PODCASTDESC',//TDES 	TDES 	ldes 	T=30 			
      'PODCASTID',//TGID 	TGID 	egid 	T=30 			
      'PODCASTKEYWORDS',//TKWD 	TKWD 	keyw 	T=30 			
      'PODCASTURL',//WFED 	WFED 	purl 	T=30 			
      'POPULARIMETER',//POPM 	POPM 		T=30 			This description is for only ID3v2 tags. The playcounter is an optional value. The Rating is an integer between 1 (worst) and 255 (best). Syntax: Email|Rating|Playcounter
      'PUBLISHER',//TPUB 	TPUB 	©pub 	T=30 	WM/Publisher 		
      'RATING',// MM
      'POPM',// 	POPM 		T=30 			Abstraction on POPULARIMETER as used in MediaMonkey. Track rating from 1 = Bad to 5 = Very good. You can also enter stars * (and - for half stars) for rating the track. Use Options → Tags → Advanced to always display POPULARIMETER values.
      //RATING WMP
      //POPM 	POPM 		T=30 	WM/SharedUserRating 		Abstraction on POPULARIMETER as used in Windows Media Player. Track rating from 1 = Bad to 5 = Very good. You can also enter stars * for rating the track. Use Options → Tags → Advanced to always display POPULARIMETER values.
      'RELEASETIME',//TDRL 	TDRL 		T=50 DATE_RELEASED 			
      'SETSUBTITLE',//TSST 		T=50 SUBTITLE 			
      'SUBTITLE',//TIT3 	TIT3 		T=30 	WM/SubTitle 		
      'TAGGINGTIME',//	TDTG 		T=30 DATE_TAGGED 			
      'TITLE',//TIT2 	TIT2 	©nam 	T=30 	Title 	INAM 	
      'TITLESORT',//TSOT 	TSOT 	sonm 	T=30 SORT_WITH 	WM/TitleSortOrder 		
      'TRACK',//TRCK 	TRCK 	trkn 	T=30 PART_NUMBER 	WM/TrackNumber 	ITRK 	
      'UNIQUEFILEID',//UFID 	UFID 					
      'UNSYNCEDLYRICS',//USLT 	USLT 	©lyr 	T=30 LYRICS 	WM/Lyrics 		Syntax: xxx||Lyrics where xxx = Language of the lyrics, abbreviated by 3 characters according to ISO-639-2.
      'WWW',//WXXX 	WXXX 		T=30 			
      'WWWARTIST',//WOAR 	WOAR 		T=30 	WM/AuthorURL 		
      'WWWAUDIOFILE',//WOAF 	WOAF 		T=30 	WM/AudioFileURL 		
      'WWWAUDIOSOURCE',//WOAS 	WOAS 		T=30 	WM/AudioSourceURL 		
      'WWWCOMMERCIALINFO',//WCOM 	WCOM 		T=30 PURCHASE_INFO 	WM/PromotionURL 		
      'WWWCOPYRIGHT',//WCOP 	WCOP 		T=30 	CopyrightURL 		
      'WWWPAYMENT',//WPAY 	WPAY 		T=30 PURCHASE_ITEM 			
      'WWWPUBLISHER',//WPUB 	WPUB 		T=30 			
      'WWWRADIOPAGE',//WORS 	WORS 		T=30 			
      'YEAR'//TYER 	TDRC 	©day'
      ];

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
      this.playing = 0;
      this.interval = null;
      this.progress = [];
      this.buttons = [];
      this.spans = [];
      this.id3s = {};
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
        //console.log(rec);
        if (typeof rec.value == 'object') { 
          //this.free();
          //this.cfg.src = rec.value;
          this.loadTracks(rec.value);
          that.sound.changeSrc(this.cfg.src);
          //this.make();          
        } else if (typeof rec.value == 'string') {
          //this.free();
          this.cfg.src = rec.value;
          that.sound.changeSrc(this.cfg.src);
          //this.make();
        };
        if (typeof rec.commands == 'object') {
          //console.log(rec.commands);
          for (var i=0;i<rec.commands.length;i++) {
            if (typeof rec.commands[i].cmd != 'string') continue;
            switch(rec.commands[i].cmd) {
              case 'play':
                //console.log('PLAY');
                if (typeof rec.commands[i].num == 'number') {
                  var n = rec.commands[i].num;
                  if (n>0) this.song = n;
                };
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
      this.loadTracks = function(o) {
        var t = [];
        var id3s = {};
        
        for(var i=0;i<o.length;i++) {
          var id3 = {};
          var fn = '';
          if (typeof(o[i])=='string') {
            fn = o[i];
          } else if (typeof(o[i])=='object') {
            if (typeof(o[i]['url'])=='string') fn = o[i]['url'];
            for (var x in o[i]) {
              if (ID3.includes(x)) id3[x]=o[i][x];
            };
            
          }
          if (fn) {
            t.push(fn);
            id3s[fn] = id3;
          };
        };
        this.cfg.src = t;
        this.id3s = id3s;
        
      },

      this.displayID3 = function(s) {
        if (typeof this.id3s[s] == 'object') {
          var d = this.id3s[s];
          for (var i = 0; i < this.spans.length; i++) {
            var h = $(this.spans[i]).data('howler');
            if (typeof d[h] == 'string') {
              $(this.spans[i]).text(d[h]);
            } else {
              $(this.spans[i]).text('');
            }
          };
          
        };
      },
      
      this.showID3 = function() {
        if ((typeof this.cfg.src == 'object')&&(this.cfg.src.length>this.song)) {
          that.displayID3(this.cfg.src[this.song]);
        };
        if ((typeof this.cfg.src == 'object')&&(this.cfg.src.length==1)) {
          that.displayID3(this.cfg.src[0]);
        };
        if (typeof this.cfg.src == 'string') {
          that.displayID3(this.cfg.src);
        };
        //console.log(this.id3s);
      },
      
      this.play = function() {
        if (that.sound == null) return;
        if (that.playing == 1) return;
        if ((that.song>0)
          &&(typeof that.cfg.src == 'object')
          &&(that.song<that.cfg.src.length)) {
            //console.log('PLAY:', that.song);
          var a = that.sound.play(that.song);
        } else {
          var a = that.sound.play();
        }
        //console.log('?',a);
        that.playing = 1;
        setTimeout(function(){
          if (that.sound.seek()==0) {
            that.playing = 0;
          } else {
            that.showID3();
          };
        },500);
      },
      this.pause = function() {
        if (that.sound == null) return;
        if (!that.playing == 1) {
          that.play();
        } else {
          that.sound.pause();
          that.playing = 0;
        };
      },
      this.stop = function() {
        if (that.sound == null) return;
        if (!that.playing == 1) return;
        that.sound.stop();
        that.playing = 0;
      },
      this.prev = function(ev) {
        if (that.sound == null) return;
        that.stop();
        if(that.song>0)that.song--;
        that.onEvent('prev', ev);
      },
      this.next = function(ev) {
        if (that.sound == null) return;
        that.stop();
        that.song++;
        that.onEvent('next', ev);
      },
      this.mute = function() {
        if (that.sound == null) return;
        that.sound.mute();
      },
      this.volume = function(ev) {
        if (that.sound == null) return;
        //const target = ev.target;
        var p = that.positionPercents(ev);
        $(ev.target).val(p);
        that.sound.volume((1/100)*p);
      },
      this.pan = function(ev) {
        if (that.sound == null) return;
        if(!that.sound.usingWebAudio) return;
        //const target = ev.target;
        var p = that.positionPercents(ev);
        $(ev.target).val(p);
        //console.log('pan',1-((1/50)*p));
        that.sound.stereo(1-((1/50)*p));
      },
      this.seek = function(ev) {
        
        if (that.sound == null) return;
        /*
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
        */
        that.sound.seek((that.sound.duration()/100)*that.positionPercents(ev));
      },
      this.positionPercents = function(ev) {
        const target = ev.target;
        // Get the bounding rectangle of target
        const rect = target.getBoundingClientRect();
        // Mouse position
        const x = ev.clientX - rect.left;
        const y = ev.clientY - rect.top;
        const w = $(target).width();
        const h = $(target).height();
        return (x/w)*100;
      },
      this.onEvent = function(name, a,b,c) {
        //console.log(name,a,b,c);
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
            var h = $(a).data('howler');
            if (h!='seek') return;
            $(a).val(width);
          });
        },100);        
        that.sound.on('stop', function(ev){that.onEvent('stop', ev);});
        that.sound.on('end', function(ev){that.playing = 0;that.song++;that.onEvent('end', ev);});
      },
      
      this.free = function() {
        if (that.sound == null) return;
        clearInterval(this.interval);
        //console.log(that.sound);
        that.sound.unload();
        that.sound = null;
        //console.log(that.sound);
      },

      this.init=function() {
        
        //console.log($(that.element));


        $(that.element).find('progress').each(function(i,a){
          that.progress.push(a);
          var h = $(a).data('howler');
          switch(h) {
            case 'seek':
              $(a).on('click', that.seek);
              break;
            case 'volume':
              $(a).on('click', that.volume);
              break;
            case 'pan':
              $(a).on('click', that.pan);
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
            case 'prev':
              $(a).on('click', that.prev);
              break;
            case 'next':
              $(a).on('click', that.next);
              break;
          }
        });
        $(that.element).find('span').each(function(i,a){
          var h = $(a).data('howler');
          if (!h) return;
          that.spans.push(a);
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
