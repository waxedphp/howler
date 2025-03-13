<?php
namespace Waxedphp\Howler;

class Setter extends \Waxedphp\Waxedphp\Php\Setters\AbstractSetter {

/*
Methods
play([sprite/id])

Begins playback of a sound. Returns the sound id to be used with other methods. Only method that can't be chained.

    sprite/id: String/Number optional Takes one parameter that can either be a sprite or sound ID. If a sprite is passed, a new sound will play based on the sprite's definition. If a sound ID is passed, the previously played sound will be played (for example, after pausing it). However, if an ID of a sound that has been drained from the pool is passed, nothing will play.

pause([id])

Pauses playback of sound or group, saving the seek of playback.

    id: Number optional The sound ID. If none is passed, all sounds in group are paused.

stop([id])

Stops playback of sound, resetting seek to 0.

    id: Number optional The sound ID. If none is passed, all sounds in group are stopped.

mute([muted], [id])

Mutes the sound, but doesn't pause the playback.

    muted: Boolean optional True to mute and false to unmute.
    id: Number optional The sound ID. If none is passed, all sounds in group are stopped.

volume([volume], [id])

Get/set volume of this sound or the group. This method optionally takes 0, 1 or 2 arguments.

    volume: Number optional Volume from 0.0 to 1.0.
    id: Number optional The sound ID. If none is passed, all sounds in group have volume altered relative to their own volume.

fade(from, to, duration, [id])

Fade a currently playing sound between two volumes. Fires the fade event when complete.

    from: Number Volume to fade from (0.0 to 1.0).
    to: Number Volume to fade to (0.0 to 1.0).
    duration: Number Time in milliseconds to fade.
    id: Number optional The sound ID. If none is passed, all sounds in group will fade.

rate([rate], [id])

Get/set the rate of playback for a sound. This method optionally takes 0, 1 or 2 arguments.

    rate: Number optional The rate of playback. 0.5 to 4.0, with 1.0 being normal speed.
    id: Number optional The sound ID. If none is passed, playback rate of all sounds in group will change.

seek([seek], [id])

Get/set the position of playback for a sound. This method optionally takes 0, 1 or 2 arguments.

    seek: Number optional The position to move current playback to (in seconds).
    id: Number optional The sound ID. If none is passed, the first sound will seek.

loop([loop], [id])

Get/set whether to loop the sound or group. This method can optionally take 0, 1 or 2 arguments.

    loop: Boolean optional To loop or not to loop, that is the question.
    id: Number optional The sound ID. If none is passed, all sounds in group will have their loop property updated.

state()

Check the load status of the Howl, returns a unloaded, loading or loaded.
playing([id])

Check if a sound is currently playing or not, returns a Boolean. If no sound ID is passed, check if any sound in the Howl group is playing.

    id: Number optional The sound ID to check.

duration([id])

Get the duration of the audio source (in seconds). Will return 0 until after the load event fires.

    id: Number optional The sound ID to check. Passing an ID will return the duration of the sprite being played on this instance; otherwise, the full source duration is returned.

on(event, function, [id])

Listen for events. Multiple events can be added by calling this multiple times.

    event: String Name of event to fire/set (load, loaderror, playerror, play, end, pause, stop, mute, volume, rate, seek, fade, unlock).
    function: Function Define function to fire on event.
    id: Number optional Only listen to events for this sound id.

once(event, function, [id])

Same as on, but it removes itself after the callback is fired.

    event: String Name of event to fire/set (load, loaderror, playerror, play, end, pause, stop, mute, volume, rate, seek, fade, unlock).
    function: Function Define function to fire on event.
    id: Number optional Only listen to events for this sound id.

off(event, [function], [id])

Remove event listener that you've set. Call without parameters to remove all events.

    event: String Name of event (load, loaderror, playerror, play, end, pause, stop, mute, volume, rate, seek, fade, unlock).
    function: Function optional The listener to remove. Omit this to remove all events of type.
    id: Number optional Only remove events for this sound id.

load()

This is called by default, but if you set preload to false, you must call load before you can play any sounds.
unload()
Unload and destroy a Howl object. This will immediately stop all sounds attached to this sound and remove it from the cache.
* 
*/

  /**
   * @var array<mixed> $setup
   */
  private array $setup = [
  ];

  protected array $commands = [
  ];

  protected array $tracks = [
  ];
  
  private string $route = '/tracks/{PATH}';
  
  /**
   * allowed options
   *
   * @var array<mixed> $_allowedOptions
   */
  protected array $_allowedOptions = [
  ];
  
  function setRoute(string $value) {
    $this->route = $value;
    return $this;
  }

  function setValue($value) {
    $this->setup['value'] = $value;
    return $this;
  }

  function setMode($mode) {
    $this->setup['mode'] = $mode;
    return $this;
  }

  function setTheme($theme) {
    $this->setup['theme'] = $theme;
    return $this;
  }
  
  function play(int $n = 0) {
    $this->commands[] = [
      'cmd' => 'play',
      'num' => intval($n),
    ];
    return $this;
  }

  function stop() {
    $this->commands[] = [
      'cmd' => 'stop'
    ];
    return $this;
  }

  function addTrack(string|array $value, array $data = []) {
    $allowedParams = [
      'thumb', 'image',
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
      'YEAR',//TYER 	TDRC 	©day'
    ];
    $d = [];
    if (is_string($value)) {
      $value = str_replace('{PATH}', $value, $this->route);
      $d['url'] = $value;
    } else if (is_array($value)) {
      $data = array_merge($data, $value);
    };
    if (!empty($data)) {
      foreach ($data as $k => $v) {
        if (in_array($k, $allowedParams)) {
          $d[$k] = $v;
        }
      };
    };
    $this->tracks[] = $d;
    return $this;
  }
  
  function addFolder(string $dir, string $pattern = '*.{mp3,ogg}') {
    $prevDir = getcwd();//"./*/*.{mp3,ogg}"
    if (is_dir($dir)) {
      chdir($dir);
      //echo "DIR! " . $dir;
      foreach (glob($pattern, \GLOB_BRACE) as $filename) {
          //echo "$filename\n";
          $this->addTrack($filename);
      }
      chdir($prevDir);
    } else {
      //echo "NOT DIR!";
    }
    return $this;
  }

  /**
  * value
  *
  * @param mixed $value
  * @return array<mixed>
  */
  public function value(mixed $value = null): array {
    $a = [];
    $b = $this->getArrayOfAllowedOptions();
    if (!empty($b)) {
      $a['config'] = $b;
    }
    if (!empty($this->commands)) {
      $a['commands'] = $this->commands;
    }
    if (!is_null($value)) {
      $a['value'] = $value;
    } else {
      if (!empty($this->tracks)) {
        $a['value'] = $this->tracks;
      };
    };
    return $a;
  }

}
