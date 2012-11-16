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
