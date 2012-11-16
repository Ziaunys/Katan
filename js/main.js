var cpu_src = 'images/tile_cpu.png';
var sysadmin_src = 'images/tile_sysadmin.png';
var coffee_src = 'images/tile_coffee.png';
var rack_src = 'images/tile_rack.png';
var cable_src = 'images/tile_cable.png';

var cpu_c = document.getElementById("cpuCanvas");
var sysadmin_c = document.getElementById("sysadminCanvas");
var coffee_c = document.getElementById("coffeeCanvas");
var rack_c = document.getElementById("rackCanvas");
var cable_c = document.getElementById("cableCanvas");

var cardWidth = 200;
var cardHeight = 250;
var imgWidth = cardWidth * 0.75;
var imgHeight = cardHeight * 0.75;
var imgTopMargin = cardHeight * 0.1;
var imgLeftMargin = (cardWidth - imgWidth) / 2;
var textTopMargin = imgTopMargin * 2 + imgHeight;
var margin = cardWidth / 7;
var textLeftMargin = cardWidth / 2;

function Resource(label, canvas, img, count) {
    var ctx = canvas.getContext("2d");
    var self = {img:img, count:count, ctx: ctx, label:label};
    self.render = function() {
        self.ctx.fillStyle = "black";
        self.ctx.strokeRect(0, 0, cardWidth, cardHeight, cardWidth / 12);
        var img = new Image();
        img.onload = function() {
            ctx.drawImage(img, imgLeftMargin, imgTopMargin, imgWidth, imgHeight);
        };
        img.src = self.img;
        self.ctx.font = "bold 16px Arial";
        self.ctx.textAlign = 'center';
        self.ctx.clearRect(imgWidth / 2, textTopMargin - 15, 20, 20);
        self.ctx.fillText(self.count, cardWidth/2, textTopMargin);          
    };

    self.updateCount = function (new_count) {
        self.count = new_count;
        self.render();
    };        
    return self;
}

function ResourcePanel() {
    var self = {
        cpu: Resource("cpus", sheep_src, 0),
        sysadmin: Resource("sysadmins", wood_src, 0),
        coffee: Resource("coffee", stone_src, 0),
        cables: Resource("cables", brick_src, 0),
        racks: Resource("racks", wood_src, 0),
    };

    self.update = function (label, count) {
        self[label].updateCount(count);
    };

    self.fullDraw = function() {
        for(var key in self) {
            var obj = self[key];
            obj.render();
        }
    };

    return self;
}

var c2 = document.getElementById('c').getContext('2d');
var canvasWidth = 300 * 3;
var canvasHeight = 300 * 5;
c2.fillStyle = '#f00';
var src= 'http://www.clker.com/cliparts/8/6/4/1/11949856711586665480racked.svg.thumb.png';

Array.prototype.shuffle = function() {
  var i = this.length, j, tempi, tempj;
    if ( i == 0 ){
          return false;
    }
  while ( --i ) {
     j       = Math.floor( Math.random() * ( i + 1 ) );
     tempi   = this[i];
     tempj   = this[j];
     this[i] = tempj;
     this[j] = tempi;
  }
  return this;
};

function Tile(x, y, img_src) {   
    var self = {x:x, y:y, src:img_src};
    self.render = function() {
        c2.save();
        c2.beginPath();
        c2.moveTo(self.x, self.y + 100);
        c2.lineTo(self.x + 150, self.y);
        c2.lineTo(self.x + 300, self.y + 100);
        c2.lineTo(self.x + 300, self.y + 200);
        c2.lineTo(self.x + 150, self.y + 300);
        c2.lineTo(self.x, self.y + 200);
        c2.lineTo(self.x, self.y + 100);
        c2.closePath();
        c2.stroke();
        var img = new Image();
        img.onload = function () {
            c2.drawImage(img, self.x + 75, self.y + 75, 150, 150);
        };
        img.src = img_src;
    };
    return self;   
}

function makeCoordinates(){
    var coords = [];
    var x_offset = 0;
    var row_count = 0;
    var j = 0;
    var i = 0;
    for(i = 0; i < 5; i++){
        x_offset = 0;
        row_count = 5;       
        if(i=== 0 || i === 4){
            x_offset = 300;
            row_count = 3;
        }
        else if(i%2 != 0) {
            x_offset = 150;
            row_count = 4;
        }
        for(j = 0; j < row_count; j++) {
            coords[coords.length] = {x:x_offset + j*300, y: i*200};
        }
    }
    coords.shuffle();
    return coords;
}

var x = makeCoordinates();

function makeBoard(coordinates){
    var board = new Array();
    for(var i = 0; i < coordinates.length; i++){
        var coord = coordinates[i];
        board[board.length] = Tile(coord.x, coord.y ,src);
    }
    return board;
}
console.log(x.length);
var board = makeBoard(x);

for(var i = 0; i < board.length; i++) {
    board[i].render();
}


    
