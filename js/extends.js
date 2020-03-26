(function () {
    function removeContents(class_selector) {
        let contents = this.getElementsByClassName(class_selector);
        while (contents.length) {
            this.removeChild(contents[0]);
        }
    }
    if (Object.defineProperty) {
        Object.defineProperty(Element.prototype, "removeNodes", {
            value: removeContents,
            enumerable: false,
            configurable: true
        });
    } else {
        Element.prototype.__defineGetter__("removeNodes", removeContents);
    }
}());

(function () {
    function hideEvent() {
        let cover = this.getElementsByClassName('c__card_cover');
        if (cover.length < 1) {
            return;
        }
        setTimeout(function () {
            cover[0].className = cover[0].className.replace(/( flip-diagonal-2-br-reverse)/, '');
            cover[0].className += ' flip-diagonal-2-br-normal';
            cover[0].src = cover[0].parentNode.imageCover;
        }, 1000);
    }
    function showEvent() {
        let cover = this.getElementsByClassName('c__card_cover');
        if (cover.length < 1) {
            return;
        }
        setTimeout(function () {
            cover[0].className = cover[0].className.replace(/( flip-diagonal-2-br-normal)/, '');
            cover[0].className += ' flip-diagonal-2-br-reverse';
            cover[0].src = cover[0].parentNode.imageCard;
        }, 1000);
    }
    function inactive() {
        this.getElementsByClassName('c__card_cover')[0].className += ' m__inactive-card';
        this.disabled = true;
        this.getElementsByClassName('l__card_controls')[0].style.display = 'none';
    }
    if (Object.defineProperty) {
        Object.defineProperty(Element.prototype, "faceDown", {
            value: hideEvent,
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Element.prototype, "faceUp", {
            value: showEvent,
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Element.prototype, "dead", {
            value: inactive,
            enumerable: false,
            configurable: true
        });
    }
}());