
        // still need to finish:

        // initionalize board
        // reset the game

        // and events like: 

        // select piece if its players turn, 
        // clear button for a game reset id="cleargame"
        // find tile obj being clicked
        // do double and tripple jumps EX: somthing like if its in range "var inRange = tile.inRange(piece) " (and another error check) "if (inRange != 'wrong') "
        // make statement for single jump or an alert to make a jump when possable
        // 



window.onload = function () {
        //The initial setup
        //1's are player 1
        //2's are player 2
        var gameBoard = [
            [0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 1],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [2, 0, 2, 0, 2, 0, 2, 0],
            [0, 2, 0, 2, 0, 2, 0, 2],
            [2, 0, 2, 0, 2, 0, 2, 0]
        ];
        //store the instances
        var pieces = [];
        var tiles = [];

        //distance formula? i think thats right


        var dist = function (x1, y1, x2, y2) {
            return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
        }

        function Piece(element, position) {
            // when jump exist, regular move is not allowed
            // all pieces are allowed to move initially
            this.allowedtomove = true;
            this.element = element;
            this.position = position;
            this.player = '';

            //figure out player by piece id
            if (this.element.attr("id") < 12)
                this.player = 1;
            else
                this.player = 2;


            //make the king

            /*
            this.king = false;
            this.makeKing = function () {
               

            */



            //makes a king
            this.king = false;
            this.makeKing = function () {

                //add this later
                // this.element.css("backgroundImage", "url('img/king" + this.player + ".png')");


                this.king = true;
            }

            //moves the pieces, "remove consoles"
            this.move = function (tile) {
                this.element.removeClass('selected');
                if (!Board.isValidPlacetoMove(tile.position[0], tile.position[1])) return false;
                //make sure piece cant go backwards if it's not a king
                if (this.player == 1 && this.king == false) {
                    if (tile.position[0] < this.position[0]) return false;
                } else if (this.player == 2 && this.king == false) {
                    if (tile.position[0] > this.position[0]) return false;
                }

                Board.board[this.position[0]][this.position[1]] = 0;
                Board.board[tile.position[0]][tile.position[1]] = this.player;
                this.position = [tile.position[0], tile.position[1]];
                
                //change the css using board's dictionary
                this.element.css('top', Board.dictionary[this.position[0]]);
                this.element.css('left', Board.dictionary[this.position[1]]);


                //end of the row on opposite side crown it a king
                if (!this.king && (this.position[0] == 0 || this.position[0] == 7))
                    this.makeKing();
                return true;
            };

            //tests if piece can jump anywhere
            this.canJumpAny = function () {
                return (this.canOpponentJump([this.position[0] + 2, this.position[1] + 2]) ||
                    this.canOpponentJump([this.position[0] + 2, this.position[1] - 2]) ||
                    this.canOpponentJump([this.position[0] - 2, this.position[1] + 2]) ||
                    this.canOpponentJump([this.position[0] - 2, this.position[1] - 2]))
            };

            this.canOpponentJump = function (newPosition) {
                //find what the displacement is
                var dx = newPosition[1] - this.position[1];
                var dy = newPosition[0] - this.position[0];

                //check if king, if not, dont move backword
                if (this.player == 1 && this.king == false) {
                    if (newPosition[0] < this.position[0]) return false;
                } else if (this.player == 2 && this.king == false) {
                    if (newPosition[0] > this.position[0]) return false;
                }

                //must be in bounds
                if (newPosition[0] > 7 || newPosition[1] > 7 || newPosition[0] < 0 || newPosition[1] < 0) return false;

                //middle tile where the piece to be conquered sits
                var tileToCheckx = this.position[1] + dx / 2;
                var tileToChecky = this.position[0] + dy / 2;

                if (tileToCheckx > 7 || tileToChecky > 7 || tileToCheckx < 0 || tileToChecky < 0) return false;
                //check for collision 
                if (!Board.isValidPlacetoMove(tileToChecky, tileToCheckx) && Board.isValidPlacetoMove(newPosition[0], newPosition[1])) {
                    //find which object instance is sitting there
                    for (let pieceIndex in pieces) {
                        if (pieces[pieceIndex].position[0] == tileToChecky && pieces[pieceIndex].position[1] == tileToCheckx) {
                        if (this.player != pieces[pieceIndex].player) {
                                //return the piece sitting there
                                return pieces[pieceIndex];
                            }
                        }
                    }
                }
                return false;
            };

            this.opponentJump = function (tile) {
                var pieceToRemove = this.canOpponentJump(tile.position);
                //if there is a piece to be removed, remove it
                if (pieceToRemove) {
                    pieceToRemove.remove();
                    return true;
                }
                return false;
            };

            //remove and declare, win condition
            this.remove = function () {
                //remove it and delete it
                this.element.css("display", "none");
                if (this.player == 1) {
                   // $('#player2').append("<div class='capturedPiece'></div>");
                    Board.score.player2 += 1;
                }
                if (this.player == 2) {
                   // $('#player1').append("<div class='capturedPiece'></div>");
                    Board.score.player1 += 1;
                }
                Board.board[this.position[0]][this.position[1]] = 0;

                //remove the piece and delete 






                //reset the stupid position so it doesn't get picked up by the for loop, in the canOpponentJump method
                this.position = [];
                var playerWon = Board.checkifAnybodyWon();
                if (playerWon) {
                    //   $('#winner').html("Player " + playerWon + " has won!");
                }
            }
        }

        function Tile(element, position) {
            //linked DOM element
            this.element = element;
            //position in gameboard
            this.position = position;
            //if tile is in range from the piece
            this.inRange = function (piece) {
                for (let k of pieces)
                    if (k.position[0] == this.position[0] && k.position[1] == this.position[1]) return 'wrong';
                if (!piece.king && piece.player == 1 && this.position[0] < piece.position[0]) return 'wrong';
                if (!piece.king && piece.player == 2 && this.position[0] > piece.position[0]) return 'wrong';
                if (dist(this.position[0], this.position[1], piece.position[0], piece.position[1]) == Math.sqrt(2)) {
                    //regular move
                    return 'regular';
                } else if (dist(this.position[0], this.position[1], piece.position[0], piece.position[1]) == 2 * Math.sqrt(2)) {
                    //jump move
                    return 'jump';
                }
            };
        }

        //2nd attempt at a board
        var Board = {
                board: gameBoard,
                score: {
                    player1: 0,
                    player2: 0
                },
                playerTurn: 1,
                jumpexist: false,
                continuousjump: false,
                tilesElement: $('div.tiles'),



                //convert postion in board
                dictionary: ["0vmin", "10vmin", "20vmin", "30vmin", "40vmin", "50vmin", "60vmin", "70vmin", "80vmin", "90vmin"],



                //8 by 8 grid
                initalize: function () {
                    var countPieces = 0;
                    var countTiles = 0;
                    for (let row in this.board) { //row set index
                        for (let column in this.board[row]) { //column set index
                            //tiles and pieces should be placed on the board
                            if (row % 2 == 1) {
                                if (column % 2 == 0) {
                                    countTiles = this.tileRender(row, column, countTiles)
                                }
                            } else {
                                if (column % 2 == 1) {
                                    countTiles = this.tileRender(row, column, countTiles)
                                }
                            }
                            if (this.board[row][column] == 1) {
                                countPieces = this.playerPiecesRender(1, row, column, countPieces)
                            } else if (this.board[row][column] == 2) {
                                countPieces = this.playerPiecesRender(2, row, column, countPieces)
                            }
                        }
                    }
                },

                // tileRender: function (row, column, countTiles) {
                //     this.tilesElement.append("<div class='tile' id='tile" + countTiles + "' style='top:" + this.dictionary[row] + ";left:" + this.dictionary[column] + ";'></div>");
                //     tiles[countTiles] = new Tile($("#tile" + countTiles), [parseInt(row), parseInt(column)]);
                //     return countTiles + 1
                //   },

                //   playerPiecesRender: function (playerNumber, row, column, countPieces) {
                //     $(`.player${playerNumber}pieces`).append("<div class='piece' id='" + countPieces + "' style='top:" + this.dictionary[row] + ";left:" + this.dictionary[column] + ";'></div>");
                //     pieces[countPieces] = new Piece($("#" + countPieces), [parseInt(row), parseInt(column)]);
                //     return countPieces + 1;
                //   },
                


                //check if the location has an object
                isValidPlacetoMove: function (row, column) {

                    // console.log(row); console.log(column); console.log(this.board);

                    if (row < 0 || row > 7 || column < 0 || column > 7) return false;
                    if (this.board[row][column] == 0) {
                        return true;
                    }
                    return false;
                },

                //more css stuff, just a placeholder


                //change the active player - also changes div.turn's CSS
            changePlayerTurn: function () {
                    if (this.playerTurn == 1) {
                        this.playerTurn = 2;
                        // $('.turn').css("background", "linear-gradient(to right, transparent 50%, #BEEE62 50%)");
                    } else {
                        this.playerTurn = 1;
                        // $('.turn').css("background", "linear-gradient(to right, #BEEE62 50%, transparent 50%)");
                    }
                    this.check_if_jump_exist()
                    return;
                },
                checkifAnybodyWon: function () {
                    if (this.score.player1 == 12) {
                        return 1;
                    } else if (this.score.player2 == 12) {
                        return 2;
                    }
                    return false;
                },

        //reset game
        // clear,

};
