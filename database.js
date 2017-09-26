"use strict";

window.indexedDB.deleteDatabase("veritabani12");
var req = window.indexedDB.open("veritabani12", 2);
var der;
req.onupgradeneeded = function (e) {

    var db = e.target.result;

    window["db"] = db;

    if (!db.objectStoreNames.contains("tablo")) {

        var store = db.createObjectStore("tablo", {keyPath: "id", autoIncrement: true});


        store.createIndex("ad", "ad", {unique: false});
        store.createIndex("soyad", "soyad", {unique: false});
    }


    var veriler = [

        {ad: "sevda", soyad: "türkü"},
        {ad: "dılo", soyad: "ateş"},
    ];


    var transaction = event.target.transaction;


    var dd = transaction.objectStore("tablo");

    dd.getAll().onsuccess = function (e) {

        console.log(e.target.result)

    }


    for (var a in veriler) {

        store.add(veriler[a]).onsuccess = function () {

            console.log("added data")
        }

    }


}


function eylem(val) {


    req.onsuccess = function (e) {
        console.log("sudcesss")

        var db = e.target.result;
        window["db"] = db;


        var tsx = db.transaction(["tablo"], "readwrite");

        var a = tsx.objectStore("tablo");

        der = a;


        a.put({ad: val || "deniz", soyad: "gezmemiş" + Math.random()});

        a.getAll().onsuccess = function (e) {

            console.log(e.target.result);

        }


    }

}


eylem();


function add(b) {


    db.transaction("tablo", "readwrite").objectStore("tablo").put({ad: b, soyad: "denememeee"})
    db.transaction("tablo", "readwrite").objectStore("tablo").getAll().onsuccess = function (e) {


        console.log(e.target.result)
    }

}


function sil() {

    var indis = window.prompt("id giriniz");
    if (!indis)

        return false;

    var c = db.transaction("tablo", "readwrite").objectStore("tablo");

    console.log(typeof indis)
    c.delete(parseInt(indis));

    c.getAll().onsuccess = function (e) {

        console.log(e.target.result)

    }


}


function guncelle() {

    var syd=window.prompt("soyad giriniz ");
    var upİd=window.prompt("güncelenecek id giriniz");
    upİd=parseInt(upİd);

    if(!upİd || !syd)

        return false;

    var mydb=db.transaction("tablo", "readwrite").objectStore("tablo");

    mydb.openCursor().onsuccess=function (e) {

        var crsr=e.target.result.value;
        var mycursor=e.target.result;

        if(crsr.id==upİd){

            crsr.soyad=syd;
            var bb=Object.assign({},crsr)
            mycursor.update(bb)
          console.log(crsr)
           console.log(crsr.soyad)
        }

        mycursor.continue();

    }

}