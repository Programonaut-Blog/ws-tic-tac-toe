const socket = io("ws://localhost:3000");
const token = {
    1: "cross",
    2: "circle"
};
let clientId;
let activeId;

// get client id
socket.on('clientId', (id) => {
    clientId = id;
})

// get the first active player id and set up html for game
socket.on('start', (startId) => {
    activeId = startId;

    document.getElementById('current-turn').classList.remove('hide');
    document.getElementById('clientId').innerHTML = clientId == activeId ? 'your' : 'not your';
});

// get the active player and get field state
socket.on('continue', (active, field) => {
    activeId = active;
    for (let x = 0; x < field.length; x++) {
        for (let y = 0; y < field.length; y++) {
            setField(x, y, field[y][x]);
        }
    }

    document.getElementById('current-turn').classList.remove('hide');
    document.getElementById('clientId').innerHTML = clientId == activeId ? 'your' : 'not your';
})

// update field with turn information
socket.on('turn', (turn) => {
    const {x, y, next} = turn;
    setField(x, y, activeId);

    activeId = next;
    document.getElementById('clientId').innerHTML = clientId == activeId ? 'your' : 'not your';
})

// show popup with win information
socket.on('over', (overObj) => {
    winnerId = overObj['id']
    if (winnerId != 0)
        document.getElementById('winnerId').innerHTML = clientId == winnerId ? 'won' : 'lost';
    else
        document.getElementById('winnerId').innerHTML = 'draw';
    
    socket.disconnect();

    document.getElementById('popup').classList.remove('hide');
    document.getElementById('current-turn').classList.add('hide');
})


// send turn event to server
function turn(x, y) {
    if (activeId != clientId) return;
    if (getField(x,y).classList.contains(token[1]) || getField(x,y).classList.contains(token[2])) return;
    console.log('send')
    socket.emit("turn", {
        "x": x,
        "y": y
    })
}

// get field
function getField(x, y) {
    return document.getElementById(`x${x}y${y}`)
}

// update css for field
function setField(x, y, id) {
    let field = getField(x,y);
    field.classList.add(`${token[id]}`);
}

// restart the game
function restart() {
    window.location.reload();
}