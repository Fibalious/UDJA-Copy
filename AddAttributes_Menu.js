class AddAtributesMenu {
  constructor() {
    this.xe = 0;
    this.ye = 0;
    this.we = 0;
    this.he = 0;

    this.x = 0;
    this.y = 0;
    this.w = 0;
    this.h = 0;

    this.xs = 0;
    this.ys = 0;
    this.ws = 0;
    this.hs = 0;

    this.anim_speed = 250;
    this.anim_start = Date.now();

    this.boundry_offset = 8;

    this.attributes = [];

    this.reset();
    this.update_positions();
    this.update();
  }
  reset() {
    this.attributes = [];

    this.attributes.push(new Entry_MetaData("Si", 0, 0));
    this.attributes.push(new Entry_MetaData("Se", 30, 0));
    this.attributes.push(new Entry_MetaData("Ni", 0, 7));
    this.attributes.push(new Entry_MetaData("Ne", 30, 7));

    this.attributes.push(new Entry_MetaData("Ti", 70, 0));
    this.attributes.push(new Entry_MetaData("Te", 100, 0));
    this.attributes.push(new Entry_MetaData("Fi", 70, 7));
    this.attributes.push(new Entry_MetaData("Fe", 100, 7));

    this.attributes.push(new Entry_MetaData("Direct", 0, 15));
    this.attributes.push(new Entry_MetaData("Inform", 0, 21));

    this.attributes.push(new Entry_MetaData("Affiliatve", 100, 15));
    this.attributes.push(new Entry_MetaData("Pragmative", 100, 21));

    this.attributes.push(new Entry_MetaData("Progress", 0, 30));
    this.attributes.push(new Entry_MetaData("Outcome", 0, 37));

    this.attributes.push(new Entry_MetaData("System", 100, 30));
    this.attributes.push(new Entry_MetaData("Interest", 100, 37));

    this.attributes.push(new Entry_MetaData("Initiate", 0, 45));
    this.attributes.push(new Entry_MetaData("Respond", 0, 51));

    this.attributes.push(new Entry_MetaData("Abstract", 100, 45));
    this.attributes.push(new Entry_MetaData("Concrete", 100, 51));

    this.attributes.push(new Entry_MetaData("Soul", 0, 60));
    this.attributes.push(new Entry_MetaData("Body", 0, 67));
    this.attributes.push(new Entry_MetaData("Heart", 100, 60));
    this.attributes.push(new Entry_MetaData("Mind", 100, 67));
  }
  update(scroll = 0) {
    function ParametricBlend(t) {
      let sqt = t * t;
      return sqt / (2.0 * (sqt - t) + 1.0);
    }
    let cur_anim = ParametricBlend(
      minmax((Date.now() - this.anim_start) / this.anim_speed, 0, 1)
    );

    this.x = map(cur_anim, 0, 1, this.xs, this.xe);
    this.y = map(cur_anim, 0, 1, this.ys, this.ye) - scroll;
    this.w = map(cur_anim, 0, 1, this.ws, this.we);
    this.h = map(cur_anim, 0, 1, this.hs, this.he);

    if (cur_anim == 1) {
      this.xs = this.xe;
      this.ys = this.ye;
      this.ws = this.we;
      this.hs = this.he;
      this.anim_start = Date.now();
    }

    textFont("Impact");
    textSize(this.text_size);
    for (let e of this.attributes) {
      if (!e.dragging) {
        e.xe = this.x + ((this.w - e.w) * e.xp) / 100;
        e.ye = this.y + ((this.h - e.h) * e.yp) / 100;
      }
    }
  }
  update_positions() {
    this.anim_start = Date.now() + 100;
    let offset = 0.05;

    let landscape_constant = 0.42;

    if (mobile_mode) {
      this.xe = windowWidth * offset;
      this.ye = windowHeight * offset;
      this.we = windowWidth * (1 - offset * 2);
      this.he = windowHeight * (1 - offset * 2);
    } else {
      this.xe = windowWidth * offset;
      this.ye = windowHeight * offset;
      this.we = windowWidth * (1 - offset * 3) * landscape_constant;
      this.he = windowHeight * (1 - offset * 2);
    }

    if (typeof loading == "boolean") {
      this.xe = windowWidth * -0.2;
      this.ye = windowHeight * offset;
      this.we = windowWidth * 0.2;
      this.he = windowHeight * (1 - offset * 2);

      this.xs = this.xe;
      this.ys = this.ye;
      this.ws = this.we;
      this.hs = this.he;

      this.x = this.xe;
      this.y = this.ye;
      this.w = this.we;
      this.h = this.he;
    }
  }
  detect_inside(x, y) {
    if (
      this.x <= x &&
      x <= this.x + this.w &&
      this.y <= y &&
      y <= this.y + this.h
    ) {
      return true;
    }
    return false;
  }
  mousePressed(x, y) {
    for (let e of this.attributes) {
      e.mousePressed(x, y);
    }
  }
  mouseDragged(x, y) {
    for (let e of this.attributes) {
      e.mouseDragged(x, y);
    }
  }
  mouseReleased() {
    for (let e of this.attributes) {
      e.mouseReleased();
    }
  }
  draw() {
    for (let e of this.attributes) {
      e.draw();
    }
    if (debug) {
      // Bounding Box
      stroke(255, 0, 0);
      strokeWeight(1);
      fill(255, 0, 0, 10);
      rectMode(CORNER);
      rect(this.x - 1, this.y - 1, this.w + 2, this.h + 2);
    }
  }
}

class Entry_MetaData {
  constructor(data, xp = 0, yp = 0) {
    this.x = 0;
    this.y = 0;
    this.w = 0;
    this.h = 0;

    this.xs = 0;
    this.ys = 0;
    this.ws = 0;
    this.hs = 0;

    this.xe = 0;
    this.ye = 0;
    this.we = 0;
    this.he = 0;

    this.xp = xp;
    this.yp = yp;

    this.text_size = 0;
    this.text_size_s = 0;
    this.text_size_e = 25;

    this.anim_speed = 250;
    this.anim_start = Date.now();

    this.attribute = str(data);

    this.dragging = false;
    this.dragging_offset = [0, 0];

    this.self_destruct = false;
  }
  draw() {
    this.update();
    this.draw_outline();
    this.draw_text();
  }
  draw_outline() {
    strokeWeight(2);
    stroke(color_pallet[1] - 50);
    if (dark_mode) {
      fill(bg * 0.75, 255);
    } else {
      fill(bg + 30, 255);
    }
    rectMode(CORNER);
    rect(this.x, this.y, this.w, this.h, 7);
  }
  draw_text() {
    noStroke();
    if (dark_mode) {
      fill(155);
    } else {
      fill(155);
    }
    textAlign(LEFT, TOP);
    textFont("Impact");

    let x = this.x + 8;
    let y = this.y + 8;

    text(this.attribute, x, y);
  }
  update() {
    textFont("Impact");
    textSize(this.text_size);
    this.we = 8 + textWidth(this.attribute) + 8;
    this.he = this.text_size + 8 * 2;

    function ParametricBlend(t) {
      let sqt = t * t;
      return sqt / (2.0 * (sqt - t) + 1.0);
    }

    let c = (Date.now() - this.anim_start) / this.anim_speed;
    c = minmax(c, 0, 1);
    c = ParametricBlend(c);
    let c2 = 1 - c;

    this.x = this.xs * c2 + this.xe * c;
    this.y = this.ys * c2 + this.ye * c;
    this.w = this.ws * c2 + this.we * c;
    this.h = this.hs * c2 + this.he * c;
    this.text_size = this.text_size_s * c2 + this.text_size_e * c;
  }
  update_positions(x, y, w, h) {
    this.xs = this.x;
    this.ys = this.y;
    this.ws = this.w;
    this.hs = this.h;

    this.xe = x;
    this.ye = y;
    this.we = w;
    this.he = h;
  }
  detect_inside(x, y) {
    if (
      this.x <= x &&
      x <= this.x + this.w &&
      this.y <= y &&
      y <= this.y + this.h
    ) {
      return true;
    }
    return false;
  }
  mousePressed(x, y) {
    this.dragging = this.detect_inside(x, y);
    this.anim_start = this.anim_start * (1 - this.dragging);
    this.dragging_offset = [x - this.x, y - this.y];
  }
  mouseDragged(x, y) {
    if (this.dragging) {
      this.xe = x - this.dragging_offset[0];
      this.ye = y - this.dragging_offset[1];
    }
  }
  mouseReleased(state = 0) {
    if (this.dragging) {
      let inside_row = false;
      for (let e of evidence_chart.entries) {
        if (e.detect_inside()) {
          inside_row = true;
          switch (state) {
            case 0:
              let copy = structuredClone(this);
              e.attributes.push(copy);
              break;
          }
        }
      }
      if (!inside_row && state == 1) {
        this.self_destruct = true;
      }
    }
    this.dragging = false;
    this.anim_start = Date.now();
    this.xs = this.x;
    this.ys = this.y;
    this.ws = this.w;
    this.hs = this.h;
    this.text_size_s = this.text_size;
  }
}

function structuredClone(obj) {
  obj = obj && obj instanceof Object ? obj : "";

  // Handle Date (return new Date object with old value)
  if (obj instanceof Date) {
    return new Date(obj);
  }

  // Handle Array (return a full slice of the array)
  if (obj instanceof Array) {
    return obj.slice();
  }

  // Handle Object
  if (obj instanceof Object) {
    var copy = new obj.constructor();
    for (var attr in obj) {
      if (obj.hasOwnProperty(attr)) {
        if (obj[attr] instanceof Object) {
          copy[attr] = structuredClone(obj[attr]);
        } else {
          copy[attr] = obj[attr];
        }
      }
    }
    return copy;
  }

  throw new Error("Unable to copy obj! Its type isn't supported.");
}
