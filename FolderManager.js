// Html Manager
class HM {
  constructor() {
    this.files = {};
  }
  makeFolders() {
    var folder = document.createElement("div");
    folder.class = "";
    folder.setAttribute("id","");
  }

  addFolders(list) {
    for(let i of list) {
       document.getElementById("Folder-Box").appendChild(i);
    }
  }
}

// CSS Manager
class CM {
  constructor() {
    
  }
  addAttribute(style) {
    
  }
}

// XML Manager
class XM {
  constructor() {
    
  }
  getFolders() {
    // Using xml
    var xmlreq = new XMLHttpRequest();
    // when the request finnaly receives something 
    // == 0 for those using firefox
    xmlreq.onreadystatechange = function() {
      if(xml.readyState == 4 && (xml.status == 0 ||  xml.status == 200)) {

      }
    }
    xmlreq.open("GET",folders.xml,);
    xmlreq.send();
  }
  addFolders() {
     
  }
}

// LocalStorage Manager
window.fakeStorage = {
  _data: {},

  setItem: function (id, val) {
    return this._data[id] = String(val);
  },

  getItem: function (id) {
    return this._data.hasOwnProperty(id) ? this._data[id] : undefined;
  },

  removeItem: function (id) {
    return delete this._data[id];
  },

  clear: function () {
    return this._data = {};
  }
};
class LSM {
  constructor() {
    this.storage = this.localStorageSupported() ? window.localStorage : window.fakeStorage;
  }
  getFolder(x,y) {
    this.storage.getItem("Folder "+x+' '+y);
  }
  setFolder(x,y) {
    this.storage.setItem("Folder "+x+" "+y, );
  }
  clearFolder() {
    this.storage.remove()
  }
  removeFile(x,y,file) {
    this.storage.setItem() 
  }
  get(item) {
    this.storage.getItem(item);
  }
  set(item, Wanted) {
    this.storage.setItem(item,Wanted);
  }
  del(item) {
     
  }
  
  localStorageSupported() {
    var testKey = "test";
    var storage = window.localStorage;

    try {
      storage.setItem(testKey, "1");
      storage.removeItem(testKey);
      return true;
    } catch (error) {
      return false;
    }
  };
}
