'use strict';

/**
 * @author Allan Cutler <iamcutler@icloud.com>
 */

/**
 * Class that represents events
 */
class Events {
    constructor() {
        this.events = {};
    }

    /**
     * Publish event
     *
     * @param {string} topic
     * @param {*} payload
     */
    publish(topic, payload) {
        if(!this.events[topic]) return;

        this.events[topic].forEach(event => {
            if(typeof event === 'function') event(payload);
        });
    }

    /**
     * Subscribe to event
     *
     * @param {string} topic
     * @param {function} listener
     * @returns {{remove: remove}}
     */
    subscribe(topic, listener) {
        if(!this.events[topic]) this.events[topic] = [];

        let index = this.events[topic].push(listener) - 1;

        return {
            remove: () => {
                delete this.events[topic][index];
            }
        };
    }
}

/**
 * Implementation Example
 */
let events = new Events();

const subscribe = events.subscribe('general:update:name', (data) => {
    // Console name that was published
    console.info('My name is:', data.name);
});

setTimeout(() => {
    events.publish('general:update:name', {
        name: 'John Smith'
    });

    // unsubscribe to changes if desired
    subscribe.remove();
}, 1000);
