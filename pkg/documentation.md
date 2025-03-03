# Howler

Audio library for the modern web - within WaxedPHP environment.

https://howlerjs.com/

MIT license

---
### PHP:

```php
use \Waxedphp\Howler\Setter as Howler;
$obj = new Howler($this->waxed);
$obj->play();
$this->waxed->pick('section1')->display([
  'howler' =>  $obj->value('/snd/blyskanie-20250215.mp3'),
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

