module.exports = class LazyList {
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

  static cons(head, tail) {
    if(tail instanceof LazyList)
      return new LazyList(() => [head, tail]);
    else
      return new LazyList(() => [head, tail()]);
  }

  drop(num) {
    return new LazyList(() => {
      return num === 0 ? this.value : this.tail.drop(num - 1).value;
    });
  }

  map(fn) {
    return new LazyList(() => [fn(this.head), this.tail.map(fn)]);
  }

  filter(fn) {
    return new LazyList(() => {
      if(fn(this.head))
        return [this.head, this.tail.filter(fn)];
      else
        return this.tail.filter(fn).value;
    }); 
  }

  zipWith(otherList, fn) {
    return new LazyList(() => {
      return [fn(this.head, otherList.head), this.tail.zipWith(otherList.tail, fn)];
    });
  }

  take(num) {
    if(num === 0) return [];
    else return [this.head].concat(this.tail.take(num - 1));
  }
}
