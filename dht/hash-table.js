function HashTable() {

  // Hash function
  const hashCode = (key) => {
    let hash = 5381; // Initialize with prime number
    for (let i = 0; i < key.length; i++) {
      hash += hash * 33 + key.charCodeAt(i);
    }
    return hash % 1013;
  }

  // Element instance object
  const ValuePair = function(key, value) {
    this.key = key;
    this.value = value;

    this.toString = function() {
      return `[${this.key} - ${this.value}]`;
    }
  };
  
  const table = [];

  this.put = function(key, value) {
    const position = hashCode(key);

    if (table[position] === undefined) {
      table[position] = new LinkedList();
    }
    table[position].append(new ValuePair(key, value));
  };

  this.remove = function(key) {
    const position = hashCode(key);

    if (table[position] !== undefined) {
      let current = table[position].getHead();

      while (current.next) {
        if (current.element.key === key) {
          table[position].remove(current.element);

          if (table[position].isEmpty()) {
            table[position] = undefined;
          }

          return true;
        }
        current = current.next;
      }

      // Check for first or last element
      if (current.element.key === key) {
        table[position].remove(current.element);
        if (table[position].isEmpty()) {
          table[position] = undefined;
        }

        return true;
      }
    }
    return false;
  }

  this.get = function(key) {
    const position = hashCode(key);

    if (table[position] !== undefined) {

      // Iterate linked list to find key/value
      let current = table[position].getHead();

      while (current.next) {
        if (current.element.key === key) {
          return current.element.value;
        }
        current = current.next;
      }

      // Check first/last element
      if (current.element.key === key) {
        return current.element.value;
      }
    }
    return undefined;
  }
}

function LinkedList() {
  
  const Node = function(element) {
    this.element = element;
    this.next = null;
  }

  let length = 0;
  let head = null;

  this.append = function(element) {
    let node = new Node(element),
        current;

    // First node on list
    if (head === null) {
      head = node;
    }
    else {
      current = head;

      // Loop through list empty
      while (current.next) {
        current = current.next;
      }

      current.next = node;
    }

    length++;
  };

  this.removeAt = function(position) {
    if (position > -1 && position < length) {
      let current = head,
          previous,
          index = 0;

      if (position === 0) {
        head = current.next;
      }
      else {
        while (index++ < position) {
          previous = current;
          current = current.next;
        }

        length--;
        
        // Link pr;evious node with next node
        // Effectively removing current
        previous.next = current.next;
        
        return current.element;
      }
    }
    else {
      return null;
    }
  };

  this.remove = function(index) {
    let i = this.indexOf(index);
    return this.removeAt(i);
  };

  this.indexOf = function(element) {
    let current = head,
        index   = 0;

    while (current) {
      if (element === current.element) {
        return index;
      }

      index++;
      current = current.next;
    }

    return -1;
  }

  this.getHead = function() {
    return head;
  };

  this.size = function() {
    return length;
  };

  this.isEmpty = function() {
    return length === 0;
  };

};

module.exports = HashTable;
