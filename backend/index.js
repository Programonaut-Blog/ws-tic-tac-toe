const options = { /* ... */ };
const io = require("socket.io")(options);
const { Field } = require("./components/field");

const field = new Field();

io.on("connection", socket => {
    let clientId = io.sockets.sockets.size;

    socket.on("turn", (turn) => {
        // set the field
        field.setCell(turn.x, turn.y, clientId);
        console.log(field.field);

        //  check if won
        let won = field.checkWin(clientId);
        if(won)
            socket.broadcast.emit('win', clientId);
    });


    if (clientId > 2){
        console.error("Something went wrong! To many players tried to connect!");
        socket.disconnect("Something went wrong! To many players tried to connect!");
    }
});

io.listen(3000);
console.log("Sever listening on port 3000!")