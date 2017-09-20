import {EventCollection} from './EventCollection';
import {EventCollectionItem} from './EventCollectionItem';


const EVENT_LISTENERS = new EventCollection();

export class EventTargetExtendable {
    /**
     * @param {Array<string>} eventsArray
     */
    constructor (eventsArray) {
        if (Array.isArray(eventsArray)) {
            let listeners = {};
            eventsArray.forEach(function (eventName) {
                let event = eventName.trim().toLowerCase(),
                    property = 'on' + event;
                Object.defineProperty(this, property, {
                    enumerable: true,
                    configurable: false,
                    get: function () {
                        return listeners[event] || null;
                    },
                    set: function (listener) {
                        let oldListener = listeners[event];
                        if (oldListener) {
                            this.removeEventListener(event, oldListener);
                        }
                        if (typeof listener === 'function') {
                            listeners[event] = listener;
                            this.addEventListener(event, listener);
                        }
                    }
                });
            }, this);
        }
    }

    addEventListener (eventType, listener) {
        if (typeof listener === 'function') {
            let targetItem = findTargetItem(this);
            return targetItem.addListener(eventType, listener);
        }
        return false;
    }

    removeEventListener (eventType, listener) {
        let targetItem = findTargetItem(this);
        let result = targetItem.removeListener(eventType, listener);
        EVENT_LISTENERS.checkEntries(this);
        return result;
    }

    dispatchEvent (eventType) {
        let targetItem = findTargetItem(this),
            listeners = targetItem.getListenersByType(eventType),
            args = Array.prototype.slice.call(arguments, 1),
            _this = this;
        if (listeners) {
            let forExecution = [];
            listeners.forEach(function (listener) {
                if (typeof listener === 'function') {
                    forExecution.push(listener);
                }
            });
            forExecution.forEach(function (listener) {
                listener.apply(_this, args);
            });
        }
    }

    removeAllListeners (type) {
        let targetItem = findTargetItem(this);
        if (type) {
            let result =  targetItem.removeListeners(type);
            EVENT_LISTENERS.checkEntries(this);
            return result;
        } else {
            return EVENT_LISTENERS.remove(targetItem);
        }
    }

}


/**
 * @param {object} target
 * @returns {EventCollectionItem}
 */
function findTargetItem (target) {
    let allForThisTarget = EVENT_LISTENERS.findForTarget(target);
    if (!allForThisTarget) {
        allForThisTarget = new EventCollectionItem(target);
        EVENT_LISTENERS.add(allForThisTarget);
    }
    return allForThisTarget;
}

