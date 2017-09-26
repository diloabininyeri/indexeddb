var sc=new WebSocket("ws://echo.websocket.org");


sc.onmessage=function (a) {


   alert(a.data)
}

sc.onopen=function () {




  sc.send("merhaba nasılsın")

}

