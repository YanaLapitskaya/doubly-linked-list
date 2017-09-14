const Node = require('./node');

class LinkedList {
    constructor() {
        this.length=0;
        this._head=null;
        this._tail=null;
    }

    append(data) {
        var node = new Node(data);

        if(this.length){
            this._tail.next=node;
            node.previous=this._tail;
            this._tail=node;
        }
        else{
            this._tail=node;
            this._head=node;
        }

        this.length++;

        return this;
    }

    head() { return this._head.data; }

    tail() { return this._tail.data; }

    at(index) {
        var curIndex=0;
        var curElem;

        if(!curElem) {
            curElem=this._head;
            curIndex++;
        }

        while(curIndex<=index){
            curElem=curElem.next;
            curIndex++;
        }

        return curElem.data;
    }

    insertAt(index, data) {
        var curIndex=0;
        var curElem;
        var newNode=new Node(data);

        if(!curElem) {
            curElem=this._head;
            curIndex++;
        }

        while(curIndex<=index){
            curElem=curElem.next;
            curElem.previous.next=newNode;
            newNode.previous=curElem.previous;
            curElem.previous=newNode;
            newNode.next=curElem;
            curIndex++;
        }

        return this;
    }

    isEmpty() {return !this.length; }

    clear() { 
        this.length=0;
        this._head.data=null;
        this._tail.data=null;

        return this;
    }

    deleteAt(index) {
        var curIndex=0;
        var curElem,prevElem,nextElem;

        if((this.length===1)||(!this.length)) return;

        if(!curElem) {
            curElem=this._head;
            curIndex++;
        }

        while(curIndex<=index){
            curElem=curElem.next;
            curIndex++;
        }

        prevElem=curElem.previous;
        nextElem=curElem.next;
        prevElem.next=nextElem;
        nextElem.previous=prevElem;
        this.length--;

        return this;
    }

    reverse() {
        var curElem=this._tail;
        this._head=curElem;

        for(var i=0;i<this.length;i++){
            var next=curElem.next;
            curElem.next=curElem.previous;
            curElem.previous=next;
            if(curElem.next){
                curElem=curElem.next;
                continue;
            }
        }

        this._tail=curElem;

        return this;

    }

    indexOf(data) {
        var i=0;
        var curElem;

        if(!curElem) {
            curElem=this._head;
            if(curElem.data===data){
                return i;
            }
            i++;
        }
        for(i;i<this.length;i++){
            curElem=curElem.next;
            if(curElem.data===data){
                return i;
            }
        }

        return -1;
    }
}

module.exports = LinkedList;

(function(){
    const list = new LinkedList();

            function fn() {
                list.append(4).reverse().deleteAt(0).clear().insertAt(0, 3);
            }

            fn();

})
