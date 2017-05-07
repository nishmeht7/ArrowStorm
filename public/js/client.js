import io from 'socket.io-client'
import { addNewPlayer } from './create/create'
import d, { localState } from './game'
import { opponentPos } from './update/update'
import createPlayer from './create/player'


var Client = {}
Client.socket = io.connect()

Client.askNewPlayer = function(){
	Client.socket.emit('newPlayer')
}

Client.socket.on('newPlayer', function(data){
	console.log('the d in newplayer', d)
})

// assigning player 1 to first player that logs on
Client.socket.on('assignedPlayer1', function(data){
	d.currentPlayer = "player1"
	console.log('the local player is', localState)
})

// assigning player 2 to second player that logs on
Client.socket.on('assignedPlayer2', function(data){
	d.currentPlayer = "player2"
	console.log('the local player is', localState)
})

// Client.socket.on('remove', function(id){
// 	d.playerMap[id].destroy()
// 	delete d.playerMap[id]
// 	console.log('the playerMap in remove', d.playerMap)
// })

Client.socket.on('opponentHasMoved', function(newOpponentPos){
	opponentPos(newOpponentPos)
})

export function playerMoved(player, x, y, frame, scale) {
	Client.socket.emit('playerHasMoved', {x, y, frame, scale})
}


export default Client


// Client.socket.on('allPlayers', function(data){
// 	console.log('all players in client', data)
// 	for (let i = 0; i < data.length; i++){
// 		//d.playerMap.data = d.game.add.sprite(data[i].x, data[i].y, 'roboraj')
// 		addNewPlayer(d, data[i].id, data[i].x, data[i].y)
// 		//createPlayer(d, 'fatKid', 'player2', {x: 328, y: 0})
// 	}
// })
