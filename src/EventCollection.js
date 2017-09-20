export class EventCollection {
    constructor () {
        this.collection = new Map();
    }

    /**
     * @param {object} target
     * @returns {EventCollectionItem}
     */
    findForTarget (target) {
        return this.collection.get(target) || null;
    }

    add (item) {
        this.collection.set(item.target, item);
    }

    remove (item) {
        return this.collection.delete(item.target);
    }

    checkEntries (target) {
        let targetItem = this.findForTarget(target);
        if (targetItem) {
            let eventCount = Object.keys(targetItem.listeners).length;
            if (eventCount === 0) {
                this.remove(targetItem);
            }
        }
    }
}