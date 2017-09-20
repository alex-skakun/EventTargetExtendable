describe('With predefined events', function () {

    'use strict';

    let test;

    class Test extends EventTargetExtendable {
        constructor () {
            super([
                'test1',
                'test2'
            ]);
        }
    }

    

    beforeEach(function () {
        test = new Test();
    });

    afterEach(function () {
        test.removeAllListeners();
    });

    it('Instance should extends EventTargetExtendable', function () {
        expect(test instanceof EventTargetExtendable).toBe(true);
    });

    it('Should add event listener', function () {
        let res = 0;
        test.ontest1 = function () {
            res = 1;
        };
        test.dispatchEvent('test1');
        expect(res).toBe(1);
    });

    it('Should remove event listener', function () {
        let res = 0;
        test.ontest1 = function () {
            res++;
        };
        test.dispatchEvent('test1');
        expect(res).toBe(1);
        test.ontest1 = null;
        test.dispatchEvent('test1');
        expect(res).toBe(1);
    });

    it('Should work with both ways', function () {
        let res = 0;
        test.ontest1 = function () {
            res++;
        };
        test.addEventListener('test1', function () {
            res++;
        });
        test.dispatchEvent('test1');
        expect(res).toBe(2);
        test.ontest1 = null;
        test.dispatchEvent('test1');
        expect(res).toBe(3);
    });

    it('Should not be able to add listener from predefined listener', function () {
        let res = 0;
        test.ontest1 = function () {
            res++;
        };
        let added = test.addEventListener('test1', test.ontest1);
        expect(added).toBe(false);
        test.dispatchEvent('test1');
        expect(res).toBe(1);
        test.ontest1 = null;
        test.dispatchEvent('test1');
        expect(res).toBe(1);
    });

});