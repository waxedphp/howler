# Howler

Audio library for the modern web - within WaxedPHP environment.

https://howlerjs.com/

MIT license

---
### PHP:

```php
use \Waxedphp\Howler\Setter as Howler;
$obj = new Howler($this->waxed);
$obj->setRoute('/snd/{PATH}');
$obj->addTrack('blyskanie-20250215.mp3', ['TITLE' => 'Blýskanie']);
$obj->addTrack('gwyneth-20250215.mp3', ['TITLE' => 'Gwynetkina sviečka']);
$obj->addTrack('kym-zaspis-20250215.mp3', ['TITLE' => 'Kým zaspíš']);
$obj->addTrack('styri-veze-20250215.mp3', ['TITLE' => 'Štyri veže, jedna dáma.']);
$obj->play();
$this->waxed->pick('section1')->display([
  'howler' =>  $obj->value(),
],$this->tpl.'/howler');


```
---
### HTML:

```html

<div class="waxed-howler" 
  data-name="howler" data-url="{{:ajax}}"
  data-action="howler" >

  <progress value="30" max="100" data-howler="seek" 
    style="cursor:pointer;" ></progress>
  <br>
  <button data-howler="play" >Play</button>
  <button data-howler="pause" >Pause</button>
  <button data-howler="stop">Stop</button>
  <button data-howler="mute" >Mute</button>

</div>


```
---
---

### PHP methods:

```php
use \Waxedphp\Howler\Setter as Howler;

$obj = new Howler($this->waxed);

$obj->setRoute('/snd/{PATH}');
// Sets the URL route, from which files should be served.

$obj->addTrack('blyskanie-20250215.mp3', ['TITLE' => 'Blýskanie']);
// adds one file to play, additional ID3 tags could be provided.

$obj->addFolder('/home/music/', "./*/*.{mp3,ogg}");
// adds whole folder of files to play.

$obj->play();
// Play. This would work, only if page was activated already with user interaction (see autoplay lock).

$obj->stop();
// Stop

```
