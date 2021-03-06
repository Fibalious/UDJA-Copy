class Scroll_bar {
  constructor() {
    this.percent = 0;

    this.offset = 5;
    this.x = 0;
    this.y = 0;
    this.w = 7;
    this.h = 0;

    this.y_min = 0;
    this.y_max = 0;

    this.scrolls = 0;
    this.scrolle = 0;
    this.scroll = 0;

    this.scroll_pages = 1.95;
    this.scroll_max = 1;

    this.dragging = false;
    this.dragging_pos = 0;
    this.scroll_anim_speed = 250;
    this.scroll_anim_start = Date.now();

    this.update_pos();
  }
  update_pos(x, h, y_min, y_max) {
    this.x = x - this.w - this.offset;
    this.h = h;
    this.y_min = y_min;
    this.y_max = y_max;

    this.y = map(
      this.scroll,
      0,
      this.scroll_max,
      this.y_min + this.offset,
      this.y_max - this.offset - this.h
    );
  }
  draw(x, h, y_min, y_max) {
    this.update_pos(x, h, y_min, y_max);

    let hover = int(this.detect_colision(mouseX, mouseY)) * 50;
    hover += int(this.dragging) * 50;

    strokeWeight(4);
    stroke(color_pallet[1] * 3, 55 + hover);
    fill(0, 0);
    rectMode(CORNER);

    rect(this.x, this.y, this.w, this.h, 20);
  }
  detect_colision(x, y) {
    if (this.x <= x && x <= this.x + this.w) {
      if (this.y <= y && y <= this.y + this.h) {
        return true;
      }
    }
    return false;
  }
  mousePressed(x, y) {
    this.dragging = this.detect_colision(x, y);
    this.dragging_pos = y - this.y;
  }
  mouseDragged(x, y) {
    if (this.dragging) {
      let y2 = y - this.dragging_pos;
      this.scroll_anim_start = 0;
      this.scrolle = y2 * (this.scroll_pages - 1);
      this.scrolle = min(max(this.scrolle, 0), this.scroll_max);
    }
  }
  mouseReleased() {
    this.dragging = false;
  }
  update_scroll() {
    function easeOutBack(x) {
      let c1 = 1.70158;
      let c3 = c1 + 1;
      return 1 + c3 * pow(x - 1, 3) + c1 * pow(x - 1, 2);
    }

    let cur_anim = easeOutBack(
      min(
        max((Date.now() - this.scroll_anim_start) / this.scroll_anim_speed, 0),
        1
      )
    );
    this.scroll = map(cur_anim, 0, 1, this.scrolls, this.scrolle);
  }
  send_mwheel_update(scroll) {
    this.scrolls = this.scroll;
    this.scroll_anim_start = Date.now();
    this.scrolle += scroll;
    this.scrolle = min(max(this.scrolle, 0), this.scroll_max);
  }
}
