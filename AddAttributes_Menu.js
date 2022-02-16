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

    this.attributes.push(new Entry_MetaData("Se", 0.3, 0));
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

    for (let e of this.attributes) {
      if (!e.dragging) {
        e.x = this.x + this.w * e.xp;
        e.y = this.y + this.h * e.yp;
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

    this.xp = xp;
    this.yp = yp;

    this.text_size = 25;

    this.attribute = str(data);

    this.dragging = false;
    this.dragging_offset = [0, 0];
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
    this.w = 8 + textWidth(this.attribute) + 8;
    this.h = this.text_size + 8 * 2;
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
    this.dragging_offset = [x - this.x, y - this.y];
  }
  mouseDragged(x, y) {
    if (this.dragging) {
      this.x = x - this.dragging_offset[0];
      this.y = y - this.dragging_offset[1];
    }
  }
  mouseReleased() {
    this.dragging = false;
  }
}
