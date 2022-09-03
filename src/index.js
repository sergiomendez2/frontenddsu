

import {isWinner} from "./httprequest/HangManHttpsRequest";
import './styles/index.css';
import './styles/hangman.css';
import './styles/MangedUsers.css';
import './styles/tttgame.css'
import {getAllPlayers, listPlayersInTable} from "./httprequest/PlayerHttpRquest";
import { getTicTacToePlayers} from "./httprequest/TTTHTTPRquest";
import buttons from "./httprequest/Buttons";


buttons();
getAllPlayers();
getTicTacToePlayers();
listPlayersInTable();
isWinner();












