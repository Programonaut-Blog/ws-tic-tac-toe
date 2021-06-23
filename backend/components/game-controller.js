const { Field } = require("./field");
const io = require("socket.io");

class GameController {
    players = [];
    field = new Field();

    connectPlayer(playerId) {
        if (players.length == 0) {

        } 
        else if (players.length == 1) {

        }
        else if (players.length >= 2){
            console.error("Something went wrong! To many players tried to connect!")
        }
    }
}

module.exports.GameController = GameController;