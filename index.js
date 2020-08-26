module.exports = class Stream {
  constructor(fn) {
    this.visited = false;
    this.fn = fn;
  }
  get value() {
    if(!this.visited) {
      this._value = this.fn();
      this.visited = true;
    }
    return this._value;
  }
  get head() {
    return this.value[0];
  }
  get tail() {
    return this.value[1];
  }
  get isEmpty() {
    return this.value === Stream.EmptySymbol;
  }

  static EmptySymbol = Symbol('Empty');

  static Empty = new Stream(() => Stream.EmptySymbol);

  static cons(head, tail) {
    if(tail instanceof Stream)
      return new Stream(() => [head, tail]);
    else
      return new Stream(() => [head, tail()]);
  }

  static list(x, ...xs) {
    if(x === undefined)
      return Stream.Empty;
    return Stream.cons(x, Stream.list(...xs));
  }

  map(fn) {
    return new Stream(() => {
      if(this.isEmpty)
        return this.value;
      return [fn(this.head), this.tail.map(fn)];
    });
  }

  filter(fn) {
    return new Stream(() => {
      if(this.isEmpty)
        return this.value;
      if(fn(this.head))
        return [this.head, this.tail.filter(fn)];
      else
        return this.tail.filter(fn).value;
    }); 
  }

  zipWith(otherList, fn) {
    return new Stream(() => {
      if(this.isEmpty || otherList.isEmpty)
        return Stream.Empty.value;
      return [fn(this.head, otherList.head), this.tail.zipWith(otherList.tail, fn)];
    });
  }

  concat(otherList) {
    return new Stream(() => {
      if(this.isEmpty)
        return otherList.value;
      return [this.head, this.tail.concat(otherList)];
    });
  }

  flatten() {
    return new Stream(() => {
      if(this.isEmpty)
        return this.value;
      return this.head.concat(this.tail.flatten()).value;
    });
  }

  bind(fn) {
    return this.map(fn).flatten();
  }

  drop(num) {
    return new Stream(() => {
      if(this.isEmpty && num !== 0)
        throw new Error('No more element to drop');
      return num === 0 ? this.value: this.tail.drop(num - 1).value
    });
  }

  take(num) {
    if(num === 0) return [];
    if(this.isEmpty)
      throw new Error('No more element to take');
    return [this.head].concat(this.tail.take(num - 1));
  }

  takeAll() {
    if(this.isEmpty)
      return [];
    return [this.head].concat(this.tail.takeAll());
  }
}
