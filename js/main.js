var canvasWidth = 900;
var canvasHeight = 500;
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var cardWidth = canvasWidth / 6;
var cardHeight = canvasHeight * .5;
var imgWidth = cardWidth * 0.75;
var imgHeight = cardHeight * 0.75;
var imgTopMargin = cardHeight * 0.1;
var imgLeftMargin = (cardWidth - imgWidth) / 2;
var textTopMargin = imgTopMargin * 2 + imgHeight;
var margin = cardWidth / 7;
var textLeftMargin = cardWidth / 2;

var src = 'http://www.html5canvastutorials.com/demos/assets/darth-vader.jpg';

function Resource(x, y, img, count) {
    var self = {x:x, y:y, img:img, count:count};
    self.render = function() {
        ctx.fillStyle = "black";
        ctx.strokeRect(self.x, self.y, cardWidth, cardHeight, cardWidth / 12);
        var offset = self.x + imgLeftMargin;
        var img = new Image();
        img.onload = function() {
            ctx.drawImage(img, offset, self.y + imgTopMargin, imgWidth, imgHeight);
        };
        img.src = self.img;
        ctx.font = "bold 16px Arial";
        ctx.clearRect(self.x + textLeftMargin - 10, self.y + textTopMargin - 15, 20, 20);
        if(self.count < 10){
            ctx.fillText(self.count, self.x + textLeftMargin - 5, self.y + textTopMargin);
        }
        else {
            ctx.fillText(self.count, self.x + textLeftMargin - 10, self.y + textTopMargin);
        }            
    };        
    return self;
}

function Resources() {
    var self = {cards: {}};
    self.drawCards = function (){
        for(var key in self.cards){
            var obj = self.cards[key];
            obj.render();
        }            
    };

    self.addCard = function(label, img) {
        var x = (Object.keys(self.cards).length + 1) * margin + Object.keys(self.cards).length * cardWidth;
        var y = (canvasHeight - cardHeight) / 2;
        self.cards[label] = Resource(x, y, img, 0);
    };

    self.setCard = function(label, value) {
        self.cards[label].count = value;
        self.cards[label].render();
    };
    return self;
}

var x = Resources();
x.addCard("farm", src);
x.addCard("pasture", src);
x.addCard("brick", src);
x.addCard("stone", src);
x.addCard("wood", src);
x.drawCards();

x.setCard("brick",4);





