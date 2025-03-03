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
  
  /**
   * allowed options
   *
   * @var array<mixed> $_allowedOptions
   */
  protected array $_allowedOptions = [
  ];

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
  
  function play() {
    $this->commands[] = 'play';
    return $this;
  }

  /**
  * value
  *
  * @param mixed $value
  * @return array<mixed>
  */
  public function value(mixed $value): array {
    $a = [];
    $b = $this->getArrayOfAllowedOptions();
    if (!empty($b)) {
      $a['config'] = $b;
    }
    if (!empty($this->commands)) {
      $a['commands'] = $this->commands;
    }
    $a['value'] = $value;
    return $a;
  }

}
