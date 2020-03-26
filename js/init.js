const base = '/FateBoard/';
const cardsDir = 'cards/';
const cover = 'Cover';
const prefix = 'card-';
const ext = '.png';
const cards = [
    {
        name: 'Archer',
        attr: {
            atk: 5,
            life: 11,
            shield: 0
        }
    },
    {
        name: 'Archer2',
        attr: {
            atk: '?',
            life: 11,
            shield: 0
        }
    },
    {
        name: 'Archer3',
        attr: {
            atk: 5,
            life: 11,
            shield: 0
        }
    },
    {
        name: 'Archer3.1',
        attr: {
            atk: 4,
            life: 14,
            shield: 0
        }
    },
    {
        name: 'Archer4',
        attr: {
            atk: 4,
            life: 11,
            shield: 0
        }
    },
    {
        name: 'Assassin',
        attr: {
            atk: 3,
            life: 7,
            shield: 0
        }
    },
    {
        name: 'Assassin2',
        attr: {
            atk: 3,
            life: 7,
            shield: 0
        }
    },
    {
        name: 'Assassin3',
        attr: {
            atk: 0,
            life: 7,
            shield: 3
        }
    },
    {
        name: 'Assassin4',
        attr: {
            atk: 3,
            life: 7,
            shield: 0
        }
    },
    {
        name: 'Baserker',
        attr: {
            atk: 4,
            life: 21,
            shield: 2
        }
    },
    {
        name: 'Baserker2',
        attr: {
            atk: 6,
            life: 21,
            shield: 0
        }
    },
    {
        name: 'Baserker3',
        attr: {
            atk: 3,
            life: 11,
            shield: 0
        }
    },
    {
        name: 'Baserker4',
        attr: {
            atk: 4,
            life: 28,
            shield: 0
        }
    },
    {
        name: 'Caster',
        attr: {
            atk: 2,
            life: 14,
            shield: 0
        }
    },
    {
        name: 'Caster2',
        attr: {
            atk: 0,
            life: 11,
            shield: 2
        }
    },
    {
        name: 'Caster3',
        attr: {
            atk: 0,
            life: 11,
            shield: 2
        }
    },
    {
        name: 'Caster4',
        attr: {
            atk: 2,
            life: 11,
            shield: 0
        }
    },
    {
        name: 'Golem1',
        attr: {
            atk: 4,
            life: 14,
            shield: 0
        }
    },
    {
        name: 'Lancer',
        attr: {
            atk: 3,
            life: 14,
            shield: 0
        }
    },
    {
        name: 'Lancer2',
        attr: {
            atk: 3,
            life: 11,
            shield: 0
        }
    },
    {
        name: 'Lancer3',
        attr: {
            atk: 3,
            life: 14,
            shield: 0
        }
    },
    {
        name: 'Lancer4',
        attr: {
            atk: 4,
            life: 11,
            shield: 0
        }
    },
    {
        name: 'Lancer4.1',
        attr: {
            atk: 1,
            life: 18,
            shield: 1
        }
    },
    {
        name: 'Rider',
        attr: {
            atk: 3,
            life: 14,
            shield: 1
        }
    },
    {
        name: 'Rider2',
        attr: {
            atk: 4,
            life: 11,
            shield: 0
        }
    },
    {
        name: 'Rider3',
        attr: {
            atk: 4,
            life: 14,
            shield: 2
        }
    },
    {
        name: 'Rider4',
        attr: {
            atk: 3,
            life: 11,
            shield: 0
        }
    },
    {
        name: 'Ruler',
        attr: {
            atk: 3,
            life: 14,
            shield: 2
        }
    },
    {
        name: 'Saber',
        attr: {
            atk: 4,
            life: 14,
            shield: 1
        }
    },
    {
        name: 'Saber2',
        attr: {
            atk: 3,
            life: 14,
            shield: 2
        }
    },
    {
        name: 'Saber3',
        attr: {
            atk: 4,
            life: 11,
            shield: 2
        }
    },
    {
        name: 'Saber4',
        attr: {
            atk: 4,
            life: 14,
            shield: 1
        }
    }
];
const maxAmountCardsInHand = 3;
const maxAmountCardsRecallsInTurn = 2;
const maxAmountCardsInField = 7;
const manaPerTurn = 2;
const costPerCall = 1;
const wrapper = document.getElementById('i__wrapper');
const currentHand = document.getElementById('i__hand');
const btnChangePlayer = document.getElementById('i__change-player');
const btnReduceSp = document.getElementById('i__reduce-sp');
const currentPlayerSp = document.getElementById('i__current-player-sp');

let deck;
let turn;
let currentPlayer;
let player1;
let player2;

listenerBoard();
initGame();

function initGame() {
    deck = cards;
    turn = 0;
    initPlayers();
    shuffle();
    initTurn();
}

function initPlayers() {
    player1 = {
        board: document.getElementById('i__board-player-1'),
        field: [],
        hand: [],
        sp: 0,
        cardsRecallInTurn: 0
    };
    player2 = {
        board: document.getElementById('i__board-player-2'),
        field: [],
        hand: [],
        sp: 0,
        cardsRecallInTurn: 0
    };
    currentPlayer = undefined;
}

function initTurn() {
    turn++;
    if (currentPlayer === undefined) {
        currentPlayer = player1;
    } else if (turn % 2 === 0) {
        player1 = currentPlayer;
        currentPlayer = player2;
    } else {
        player2 = currentPlayer;
        currentPlayer = player1;
    }
    verifyLose();
    if (turn < 3 && !currentPlayer.hand.length) {
        buyInitialHand(3);
    }
    if (turn > 2) {
        buyCard();
    }
    if(turn === 1){
        currentPlayer.sp--;
    }
    currentPlayer.cardsRecallInTurn = 0;
    currentPlayer.sp += manaPerTurn;
    renderSP();
    renderHand();
    activeCurrentPlayer();
}

function activeCurrentPlayer() {
    if (turn % 2 === 0) {
        player1.board.className = player1.board.className.replace(/( m__board-active)/, '');
        wrapper.style.transform = 'rotate(180deg)';
    } else {
        player2.board.className = player2.board.className.replace(/( m__board-active)/, '');
        wrapper.style.transform = 'rotate(0deg)';
    }
    currentPlayer.board.className += ' m__board-active';
}

function verifyLose() {
    let deads = 0;
    currentPlayer.field.forEach(function (card) {
        if (card.attr.current_life !== undefined ||
                card.attr.current_life === 0) {
            deads++;
        }
    });
    if (deads === maxAmountCardsInField) {
        let playerWin = turn % 2 === 0 ? 'Jogador 1' : 'Jogador 2';
        alert(`O ${playerWin} ganhou o jogo!`);
        location.reload();
    }
}

function renderSP() {
    currentPlayerSp.innerHTML = currentPlayer.sp;
}

function renderHand() {
    let box_cards = currentHand.getElementsByClassName('l__box-cards')[0];
    box_cards.removeNodes('l__card');
    currentPlayer.hand.forEach(function (c) {
        let card = c__card(c, undefined, false, false, true);
        box_cards.appendChild(card);
        card.faceUp();
    });
}

function renderField() {
    let box_cards = currentPlayer.board.getElementsByClassName('l__box-cards')[0];
    box_cards.removeNodes('l__card');
    currentPlayer.field.forEach(function (card_obj) {
        let card = c__card(card_obj, undefined, true, true, false);
        box_cards.appendChild(card);
        card.faceUp();
        if (card_obj.attr.current_life === 0) {
            card.dead();
        }
    });
}

function buyInitialHand(amount) {
    if (amount > maxAmountCardsInHand) {
        alert(`O jogador não pode ter ${amount} cartas na mão. Máximo de ${maxAmountCardsInHand}`);
        return;
    }
    //currentPlayer.hand = [];
    do {
        buyCard();
    } while (currentPlayer.hand.length < amount);
}

function buyCard() {
    if (currentPlayer.hand.length === maxAmountCardsInHand) {
        return;
    }
    currentPlayer.hand.push(deck.shift());
}

function recallCard(card) {
    if (turn < 3) {
        alert('Você não pode dar Recall no seu primeiro Turno');
        return;
    }
    if ((currentPlayer.field.length < 6 && currentPlayer.cardsRecallInTurn === maxAmountCardsRecallsInTurn)) {
        alert(`Você atingiu o máximo de ${maxAmountCardsRecallsInTurn} Recalls neste Turno`);
        return;
    }
    if (currentPlayer.field.length === maxAmountCardsInField) {
        alert(`Você não pode mais fazer Recall porque já completou sua Facção de Servos`);
        return;
    }
    let index_card = getIndexCard(currentPlayer.hand, card);
    deck.push(currentPlayer.hand[index_card]);
    currentPlayer.hand.splice(index_card, 1);
    //shuffle();
    currentPlayer.cardsRecallInTurn++;
    buyCard();
    renderHand();
}

function convoke(card) {
    if (!currentPlayer.sp) {
        alert('Você não tem Mana para Convocar');
        return;
    }

    if (currentPlayer.field.length === maxAmountCardsInField) {
        alert('Você atingiu o limite máximo de Servos no Campo');
        return;
    }

    currentPlayer.hand.forEach(function (card_obj, index) {
        if (card_obj.name === card.cname) {
            if (hasFateClassInField(getFateClassName(card_obj.name))) {
                alert('Você não pode ter mais de um Herói da mesma classe no campo');
                return;
            }
            currentPlayer.sp -= costPerCall;
            renderSP(currentPlayer.sp);
            currentPlayer.hand.splice(index, 1);
            currentPlayer.field.push(card_obj);
            renderField();
            renderHand();
            return;
        }
    });
}

function hasFateClassInField(fateClass) {
    let has = false;
    currentPlayer.field.forEach(function (card) {
        if (fateClass === getFateClassName(card.name)) {
            has = true;
            return;
        }
    });
    return has;
}

function hasFateInField(card) {
    let has = false;
    currentPlayer.field.forEach(function (f_card) {
        if (card.cname === f_card.name) {
            has = true;
            return;
        }
    });
    return has;
}

function shuffle() {
    let cards_tmp = deck;
    deck = [];
    do {
        //console.log(cards_tmp.length);
        let salt = parseInt(Math.random() * cards_tmp.length);
        deck.push(cards_tmp[salt]);
        cards_tmp.splice(salt, 1);
    } while (cards_tmp.length);
}

/* UTILS */

function getIndexCard(collection, card) {
    let index_card;
    collection.forEach(function (c, i) {
        if (card.cname === c.name) {
            index_card = i;
        }
    });
    return index_card;
}

function parseCard2Url(card_name) {
    return `${location.origin}${base}${cardsDir}${prefix}${card_name}${ext}`;
}

function getCoverUrl() {
    return `${location.origin}${base}${cardsDir}${prefix}${cover}${ext}`;
}

function getFateClassName(card_name) {
    //console.log(card_name.replace(/(\d|\.)/g, '').toLowerCase());
    return card_name.replace(/(\d|\.)/g, '').toLowerCase();
}

function format_number_10(number) {
    return number.toString().length === 1 ? `0${number}` : number;
}

/* COMPONENTS */

function c__card(card_obj, alt, hide_add, hide_remove, hide_life) {
    let card = document.createElement('div');
    let card_controls = c__card_controls(hide_add, hide_remove, hide_life);
    let card_image = c__card_image(alt);
    let life = document.createElement('p');
    let atk = document.createElement('p');
    let def = document.createElement('p');
    let current_life = card_obj.attr.current_life !== undefined ? card_obj.attr.current_life : card_obj.attr.life;

    atk.innerHTML = format_number_10(card_obj.attr.atk);
    atk.className = 'c__card-attr c__card-attr-atk';
    life.innerHTML = format_number_10(current_life);
    life.className = 'c__card-attr c__btn-danger c__card-attr-life';
    def.innerHTML = format_number_10(card_obj.attr.shield);
    def.className = 'c__card-attr c__card-attr-shield';

    card.cname = card_obj.name;
    card.fateClass = getFateClassName(card_obj.name);
    card.imageCover = card_image.src;
    card.imageCard = parseCard2Url(card_obj.name);
    card.className = 'l__card';
    card.appendChild(card_controls);
    card.appendChild(card_image);
    card.appendChild(atk);
    card.appendChild(life);
    card.appendChild(def);

    listener_actions_card(card);

    return card;
}

function c__card_image(alt) {
    let card_cover = document.createElement('img');
    card_cover.className = 'c__card_cover scale-up-bottom';
    card_cover.src = getCoverUrl();
    card_cover.alt = alt === undefined ? '' : alt;
    return card_cover;
}

function c__card_controls(hide_add, hide_remove, hide_life) {
    let card_controls = document.createElement('div');
    let btn_add = c__btn('<i class="fas fa-angle-double-up"></i>', 'c__btn c__btn-success i__btn-convoke-card', undefined, hide_add);
    let btn_remove = c__btn('<i class="fas fa-inbox"></i>', 'c__btn c__btn-danger i__btn-recall-card', undefined, hide_remove);
    let btn_zoom = c__btn('<i class="fas fa-search-plus"></i>', 'c__btn i__btn-zoom-card', undefined, false);
    let btn_minus_life = c__btn('<i class="fas fa-heart-broken"></i>', 'c__btn c__btn-danger i__btn-minus-life', undefined, hide_life);
    let btn_plus_life = c__btn('<i class="fas fa-heart"></i>', 'c__btn c__btn-success i__btn-plus-life', undefined, hide_life);

    card_controls.className = 'l__card_controls';
    card_controls.appendChild(btn_add);
    card_controls.appendChild(btn_remove);
    card_controls.appendChild(btn_zoom);
    card_controls.appendChild(btn_minus_life);
    card_controls.appendChild(btn_plus_life);

    return card_controls;
}

function c__btn(label, classes, id, hiden) {
    let btn = document.createElement('button');
    btn.className = classes;
    btn.innerHTML = label;
    btn.type = 'button';
    if (id !== undefined) {
        btn.id = id;
    }
    if (hiden) {
        btn.style.display = 'none';
    }
    return btn;
}

function c__zoom_card(card) {
    let zoom_container = document.createElement('div');
    let zoom_img = document.createElement('img');
    let btn_close = document.createElement('button');

    zoom_img.src = card.imageCard;
    zoom_img.className = 'c__zoom-card_image';
    btn_close.className = 'c__btn c__zoom-card_btn-close';
    btn_close.innerHTML = '<i class="fas fa-times-circle"></i>';
    zoom_container.className = 'c__zoom-card flip-vertical-right';
    zoom_container.id = 'i__zoom-card';
    zoom_container.appendChild(btn_close);
    zoom_container.appendChild(zoom_img);

    btn_close.addEventListener('click', function (e) {
        zoom_container.parentNode.removeChild(zoom_container);
    });
    return zoom_container;
}

/* Listeners */

function listenerBoard() {
    btnChangePlayer.addEventListener('click', function () {
        initTurn();
    });
    btnReduceSp.addEventListener('click', function () {
        if (currentPlayer.sp === 0) {
            alert('Você não tem mana sulficiente');
            return;
        }
        currentPlayer.sp--;
        renderSP();
    });
}

function listener_actions_card(card) {
    card.getElementsByClassName('i__btn-convoke-card')[0].addEventListener('click', function (e) {
        convoke(card);
    });

    card.getElementsByClassName('i__btn-recall-card')[0].addEventListener('click', function (e) {
        recallCard(card);
    });

    card.getElementsByClassName('i__btn-zoom-card')[0].addEventListener('click', function (e) {
        let zoom_card = c__zoom_card(card);
        if (document.getElementById('i__zoom-card') !== null) {
            document.getElementById('i__zoom-card').remove();
        }
        document.getElementsByTagName('body')[0].appendChild(zoom_card);
    });

    card.getElementsByClassName('i__btn-minus-life')[0].addEventListener('click', function (e) {
        let current_life = parseInt(card.getElementsByClassName('c__card-attr-life')[0].innerHTML);
        let index_card = getIndexCard(player1.field, card);
        current_life--;
        if (index_card === undefined) {
            index_card = getIndexCard(player2.field, card);
            player2.field[index_card].attr.current_life = current_life;
        } else {
            player1.field[index_card].attr.current_life = current_life;
        }
        card.getElementsByClassName('c__card-attr-life')[0].innerHTML = current_life.toString().length === 1 ? `0${current_life}` : current_life;
        if (current_life === 0) {
            card.dead();
        }
    });
    card.getElementsByClassName('i__btn-plus-life')[0].addEventListener('click', function (e) {
        let current_life = parseInt(card.getElementsByClassName('c__card-attr-life')[0].innerHTML);
        let index_card = getIndexCard(player1.field, card);
        let max_life;
        current_life++;
        if (index_card === undefined) {
            index_card = getIndexCard(player2.field, card);
            max_life = player2.field[index_card].attr.life;
            player2.field[index_card].attr.current_life = current_life;
        } else {
            max_life = player1.field[index_card].attr.life;
            player1.field[index_card].attr.current_life = current_life;
        }
        if (current_life <= max_life) {
            card.getElementsByClassName('c__card-attr-life')[0].innerHTML = current_life.toString().length === 1 ? `0${current_life}` : current_life;
        }
    });
}