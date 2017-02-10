var List = module.exports = function(head, fn) {
  this.head = head;
  this.tail = () => {
    if(!this._tail) this._tail = this.getTail();
    return this._tail;
  };
  this.getTail = () => new List(fn(head), fn);
}

List.make = function(head, tailfn) {
  var list = new List(head);
  list.getTail = tailfn;
  return list;
}
List.prototype.drop = function(num) {
  if(num == 0) return this;
  else return this.tail().drop(num - 1);
};
List.prototype.map = function(fn) {
  return List.make(fn(this.head), () => this.tail().map(fn));
};
List.prototype.filter = function(fn) {
  if(fn(this.head)) return List.make(this.head, () => this.tail().filter(fn));
  else return this.tail().filter(fn);
};
List.prototype.zipWith = function(list, fn) {
  return List.make(fn(this.head, list.head), () => this.tail().zipWith(list.tail(), fn));
};
List.prototype.take = function(num) {
  if(num == 0) return [];
  else return [this.head].concat(this.tail().take(num - 1));
};
