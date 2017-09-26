var request = window.indexedDB.open("testDB", 2);
var db;
request.onerror = function(event){
    console.log("Error opening DB", event);
}
request.onupgradeneeded   = function(event){
    console.log("Upgrading");
    db = event.target.result;
    var transaction = db.transaction(["students"],"readwrite");
    transaction.oncomplete = function(event) {
        console.log("Success");
    };
    var objectStore = db.createObjectStore("students", { keyPath : "rollNo" });
};
request.onsuccess  = function(event){
    console.log("Success opening DB");


}




transaction.onerror = function(event) {
    console.log("Error");
};


