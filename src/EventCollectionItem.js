export class EventCollectionItem {
    constructor (target) {
        this.target = target;
        this.listeners = {};
    }

    getListenersByType (type) {
        let listeners = this.listeners[type];
        if (!listeners) {
            listeners = EventCollectionItem.createListenersCollection();
            this.listeners[type] = listeners;
        }
        return listeners;
    }

    addListener (type, listener) {
        let listeners = this.getListenersByType(type);
        if (!listeners.has(listener)) {
            listeners.add(listener);
            return true;
        }
        return false;
    }

    removeListener (type, listener) {
        let listeners = this.getListenersByType(type);
        let result = listeners.delete(listener);
        this.checkEntries();
        return result;
    }

    removeListeners (type) {
        let listeners = this.getListenersByType(type);
        listeners.clear();
        this.checkEntries();
        return true;
    }

    checkEntries () {
        Object.keys(this.listeners).forEach(eventType => {
            if (this.listeners[eventType].size === 0) {
                delete this.listeners[eventType];
            }
        });
    }

    static createListenersCollection () {
        return new Set();
    }
}

