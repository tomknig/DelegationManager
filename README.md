# DelegationManager

## Demo

* [Demo](http://lab.tomknig.de/DelegationManager/)

## Usage

#### Required Implementation

* Import the ScrollView script:
```html
<script src='delegationManager.js'></script>
```

* Initialize a DelegationManager:
```javascript
var yourDelegationManager = new DelegationManager();
```

* Choose something to observe:
```javascript
function functionThatIsHeavilyOftenCalled(a, b, ...) {
    //call the tick method on your DelegationManager within the observed method
    yourDelegationManager.tick(a, b, ...);
};
```

#### Optional Implementation

* Bind custom methods to delegate methods:
    - `eventDidStart` called when the event starts
    - `eventDidStart` called when the event did start and keeps changing. `settings.fps` times per second.
    - `eventDidStart` called when the event did start but did not change for `settings.latencyToEndEvent`ms.

* Assign custom methods to handle event states. Use same parameters as you did for `tick(a, b, ...);`
```javascript
yourDelegationManager.setEventDidStart(function (a, b, ...) {
    console.log('DelegationManager: Event did start'); 
});

yourDelegationManager.setEventDidChange(function (a, b, ...) {
    console.log('DelegationManager: Event did change'); 
});

yourDelegationManager.setEventDidEnd(function (a, b, ...) {
    console.log('DelegationManager: Event did end'); 
});
```


#### Example

* Observe the `window.onchange` event and print the event states to a div:
```html
<div id="log">Resize will start ;-)</div>
```
```javascript
var settings = {
    fps: 20
};

/* @required: initialize my DelegationManager */
var windowResizeDelegate = new DelegationManager(settings);

window.onresize = function (e) {
    windowResizeDelegate.tick(e);
};

windowResizeDelegate.setEventDidStart(function (e) {
    document.getElementById('log').innerHTML = 'Resize did start'; 
});

windowResizeDelegate.setEventDidChange(function (e) {
    document.getElementById('log').innerHTML = 'Resize did change'; 
});

windowResizeDelegate.setEventDidEnd(function (e) {
    document.getElementById('log').innerHTML = 'Resize did end'; 
});
```

## Settings 

* `fps: int` Amount of times that `eventDidChange` is being fired per second. Default is 10.
* `latencyToEndEvent: int` Timeout after a `tick()` in ms to assume that the observed method did finish. Default is 200.

## API

* `tick(params)` Notify DelegationManager that the observed method did do something.
* `setEventDidStart(delegateMethod(params))` Set the delegateMethod for `eventDidStart`.
* `setEventDidChange(delegateMethod(params))` Set the delegateMethod for `eventDidChange`.
* `setEventDidEnd(delegateMethod(params))` Set the delegateMethod for `eventDidEnd`.

Note: `params` Is a list of Parameters. The List should be used consistently within every DelegationManager.

## Contact

Follow me on Twitter ([@TomKnig](https://twitter.com/TomKnig))

## License

DelegationManager is available under the MIT license. See the LICENSE file for more info.