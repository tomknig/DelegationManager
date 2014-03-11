/**
* DelegationManager
* provides customizeable delegate methods for any events
*
* @author Tom König
* @copyright Tom König 2014
* @link www.github.com/TomKnig/DelegationManager
* @license MIT
* @version 1.0.0
*/

function DelegationManager(userSettings) {
    'use strict';
    /*jslint browser: true*/
    
    var currentArguments,
        delayToDelegateEventChange = -1,
        timeout = null,
        settings = {fps: 10,
                    latencyToEndEvent: 200
                   },
        delegate = {eventDidStart: function (parameterContainer) { return; },
                    eventDidChange: function (parameterContainer) { return; },
                    eventDidEnd: function (parameterContainer) { return; }
                   };
    
    function init() {
        var property;
        
        //overwrite those settings that where set by the user
        for (property in userSettings) {
            if (userSettings.hasOwnProperty(property) && settings.hasOwnProperty(property)) {
                if (typeof settings[property] === typeof userSettings[property]) {
                    settings[property] = userSettings[property];
                }
            }
        }
    
        delayToDelegateEventChange = 1000 / settings.fps;
    }
    
    init();
        
    
    function eventDidChange() {
        if (timeout) {
            delegate.eventDidChange.apply(undefined, currentArguments);
            
            setTimeout(function () {
                eventDidChange();
            }, delayToDelegateEventChange);
        }
    }
    
    function eventDidTick() {
        var didStart = false;
        if (!timeout) {
            didStart = true;
        }

        currentArguments = arguments;
        
        clearTimeout(timeout);
        timeout = setTimeout(function () {
            delegate.eventDidEnd.apply(undefined, arguments);
            timeout = null;
        }, settings.latencyToEndEvent);

        if (didStart) {
            delegate.eventDidStart.apply(undefined, arguments);
            eventDidChange.apply(undefined, arguments);
        }
    }

    return {
        tick: function () {
            eventDidTick.apply(undefined, arguments);
        },
        setEventDidStart: function (eds) {
            if (typeof eds === typeof delegate.eventDidStart) {
                delegate.eventDidStart = eds;
            }
        },
        setEventDidChange: function (edc) {
            if (typeof edc === typeof delegate.eventDidChange) {
                delegate.eventDidChange = edc;
            }
        },
        setEventDidEnd: function (ede) {
            if (typeof ede === typeof delegate.eventDidEnd) {
                delegate.eventDidEnd = ede;
            }
        }
    };
}
