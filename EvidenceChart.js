class EvidenceChart {
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

    this.entries = [new AddEntry(), new Save()];

    this.scroll_bar = new Scroll_bar();
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

    for (let entry of this.entries) {
      entry.x = this.x;
      entry.y = this.y;
      entry.w = this.w - 20;
      entry.text_size = minmax(this.h / 20, 0, 25);
      entry.update();
    }
  }
  update_positions() {
    this.anim_start = Date.now() + 100;
    let offset = 0.05;

    let landscape_constant = 0.42;

    if (mobile_mode) {
      this.xe = windowWidth * offset;
      this.ye = windowHeight + 1;
      this.we = windowWidth * (1 - offset * 2);
      this.he = windowHeight * (1 - offset * 2);
    } else {
      this.xe =
        windowWidth * (offset * 2) +
        windowWidth * (1 - offset * 3) * landscape_constant;
      this.ye = windowHeight * offset;
      landscape_constant = 1 - landscape_constant;
      this.we = windowWidth * (1 - offset * 3) * landscape_constant;
      this.he = windowHeight * (1 - offset * 2);
    }

    if (typeof loading == "boolean") {
      if (mobile_mode) {
        this.xe = windowWidth * -0.2;
        this.ye = windowHeight + 1;
        this.we = windowWidth * 0.2;
        this.he = windowHeight * (1 - offset * 2);
      } else {
        this.xe = windowWidth * 1.2;
        this.ye = windowHeight * offset;
        this.we = windowWidth * 0.2;
        this.he = windowHeight * (1 - offset * 2);
      }

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
  detect_inside(x = mouseX, y = mouseY) {
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
    this.scroll_bar.mousePressed(x, y);
    for (let entry of this.entries) {
      entry.mousePressed(x, y);
    }
    if (this.detect_inside(x, y)) {
    }
  }
  mouseDragged(x, y) {
    this.scroll_bar.mouseDragged(x, y);
    for (let entry of this.entries) {
      entry.mouseDragged(x, y);
    }
  }
  mouseReleased() {
    this.scroll_bar.mouseReleased();
    for (let entry of this.entries) {
      entry.mouseReleased();
    }
  }
  keyTyped(output) {
    for (let entry of evidence_chart.entries) {
      entry.typing(output);
    }
  }

  keyPressed(keyCode) {
    for (let entry of evidence_chart.entries) {
      entry.keyPressed(keyCode);
    }
    switch (keyCode) {
      case DOWN_ARROW:
        if (keyIsDown(CONTROL)) {
          let target = 99999;
          for (let e in evidence_chart.entries) {
            if (evidence_chart.entries[e].selected) {
              target = int(e) + 1;
            }
          }
          let length = evidence_chart.entries.length - 2;
          print(target);
          print(length);
          if (target <= length) {
            for (let e of evidence_chart.entries) {
              e.selected = false;
            }
            evidence_chart.entries[target].selected = true;
            evidence_chart.entries[target].mousePressed_part2(9999, 9999);
          }
        }
        break;
      case UP_ARROW:
        if (keyIsDown(CONTROL)) {
          let target = 99999;
          for (let e in evidence_chart.entries) {
            if (evidence_chart.entries[e].selected) {
              target = int(e) - 1;
            }
          }
          if (target >= 0) {
            for (let e of evidence_chart.entries) {
              e.selected = false;
            }
            evidence_chart.entries[target].selected = true;
            evidence_chart.entries[target].mousePressed_part2(9999, 9999);
          }
        }
        break;
    }
  }

  keyReleased(keyCode) {
    for (let entry of evidence_chart.entries) {
      entry.keyReleased(keyCode);
    }
  }
  draw() {
    let y_offset = this.y - this.scroll_bar.scroll;
    for (let entry of this.entries) {
      entry.y = y_offset;
      y_offset = entry.draw().y_end;
    }
    for (let entry of this.entries) {
      entry.draw_attributes();
    }
    this.scroll_bar.scroll_max = max(y_offset, this.h);
    this.scroll_bar.update_scroll();

    noStroke();
    fill(bg);
    rect(this.x - 50, this.y - windowHeight - 5, this.w + 100, windowHeight);
    rect(this.x - 50, this.y + this.h + 5, this.w + 100, windowHeight);

    if (debug) {
      // Bounding Box
      stroke(255, 0, 0);
      strokeWeight(1);
      fill(255, 0, 0, 10);
      rectMode(CORNER);
      rect(this.x - 1, this.y - 1, this.w + 2, this.h + 2);
    }

    this.scroll_bar.draw(
      this.x + this.w,
      windowHeight / 20,
      this.y,
      this.y + this.h
    );
  }
  new_entry(text='') {
    this.entries = insert(this.entries, this.entries.length - 2, new Entry(text));
  }
}

class Entry {
  constructor(entry='') {
    this.x = 0;
    this.y = 0;
    this.w = 0;
    this.h = 0;

    this.attributes = [];

    this.selected = false;
    this.selected_pos = 5;
    this.selected_pos2 = 5;

    this.blink = new Object();
    this.blink.state = false;
    this.blink.start = Date.now();

    this.delete = new Object();
    this.delete.state = false;
    this.delete.start = Date.now();

    this.left_arrow = new Object();
    this.left_arrow.state = false;
    this.left_arrow.start = Date.now();

    this.right_arrow = new Object();
    this.right_arrow.state = false;
    this.right_arrow.start = Date.now();

    this.text_update_cords = [false, 0, 0];
    this.text_size = 25;
    this.text_char_cords = [[0, [0], [0]]];

    this.entry =
      "Hey there! You're here early.\n" +
      "\n" +
      "I have been working on getting this text box working, " +
      "here is your testing area!\n" +
      "\n" +
      "Current TODO List:\n" +
      "- Add the functionality to adapt the entire hitbox based " +
      "on the number of entries added\n" +
      "- Selection, Such as Drag and also Ctrl+A\n" +
      "- Obviously complete the entire features for" +
      "adding and deleting entire rows and so on";
    this.entry = entry;
  }
  update() {
    for (let e of this.attributes) {
      e.text_size_e = this.text_size;
      if (e.self_destruct) {
        this.attributes = removeA(this.attributes, e);
      }
    }
    if (this.text_update_cords[0] == 2) {
      this.mousePressed_part2(
        this.text_update_cords[1],
        this.text_update_cords[2]
      );
      this.text_update_cords[0] = false;
    }
    let entry_length = this.text_char_cords[this.text_char_cords.length - 1];
    entry_length = entry_length[2][entry_length.length - 1];

    if (this.delete.state && Date.now() - this.delete.start >= 500) {
      this.typing_del();
      this.delete.start = Date.now() - (500 - 25);
    }
    if (this.left_arrow.state && Date.now() - this.left_arrow.start >= 500) {
      this.selected_pos--;
      this.selected_pos = minmax(this.selected_pos, 0, entry_length);
      this.left_arrow.start = Date.now() - (500 - 25);
    }
    if (this.right_arrow.state && Date.now() - this.right_arrow.start >= 500) {
      this.selected_pos++;
      this.selected_pos = minmax(this.selected_pos, 0, entry_length);
      this.right_arrow.start = Date.now() - (500 - 25);
    }
  }
  typing(contents) {
    if (this.selected) {
      let a = this.entry.slice(0, this.selected_pos);
      let b = this.entry.slice(this.selected_pos);
      a += contents;
      this.entry = a + b;
      this.blink.state = true;
      this.blink.start = Date.now();
      this.selected_pos += contents.length;
      this.selected_pos = minmax(this.selected_pos, 0, this.entry.length);
    }
  }
  typing_del() {
    if (this.selected) {
      let a = this.entry.slice(0, this.selected_pos);
      let b = this.entry.slice(this.selected_pos);

      a = a.substring(0, a.length - 1);
      this.entry = a + b;
      this.blink.state = true;
      this.blink.start = Date.now();
      this.selected_pos--;
      this.selected_pos = minmax(this.selected_pos, 0, this.entry.length);
    }
  }
  keyPressed(keyCode) {
    if (this.selected) {
      let entry_length = this.text_char_cords[this.text_char_cords.length - 1];
      entry_length = entry_length[entry_length.length - 1];

      switch (keyCode) {
        case BACKSPACE:
          this.left_arrow.state = false;
          this.right_arrow.state = false;

          this.typing_del();
          this.delete.state = true;
          this.delete.start = Date.now();
          break;
        case ESCAPE:
          this.selected = 0;
          break;
        case LEFT_ARROW:
          this.right_arrow.state = false;

          this.left_arrow.state = true;
          this.left_arrow.start = Date.now();

          this.selected_pos--;
          this.selected_pos = minmax(this.selected_pos, 0, entry_length);
          break;
        case RIGHT_ARROW:
          this.left_arrow.state = false;

          this.right_arrow.state = true;
          this.right_arrow.start = Date.now();

          this.selected_pos++;
          this.selected_pos = minmax(this.selected_pos, 0, entry_length);
          break;
        case ENTER:
          if (!keyIsDown(SHIFT)) {
            evidence_chart.new_entry();
            for (let e of evidence_chart.entries) {
              e.selected = false;
            }
            let len = evidence_chart.entries.length;
            evidence_chart.entries[len - 2].selected = true;
          }
          break;
        case 67:
          if (this.selected && keyIsDown(CONTROL)) {
            copyToClipboard(this.entry);
          }
          break;
      }
    }
  }
  keyReleased(keyCode) {
    switch (keyCode) {
      case BACKSPACE:
        this.delete.state = false;
        break;
      case LEFT_ARROW:
        this.left_arrow.state = false;
        break;
      case RIGHT_ARROW:
        this.right_arrow.state = false;
        break;
    }
  }
  paste(e) {
    if (this.selected) {
      this.typing(e);
    }
  }
  draw() {
    this.draw_outline();
    this.h = this.draw_text().new_h;

    let res = new Object();
    res.y_end = this.y + this.h + 8;
    return res;
  }
  draw_attributes() {
    let x_offset = 0;
    let y_offset = 0;
    for (let e of this.attributes) {
      x_offset += e.w;
      if (!e.dragging) {
        e.xe = this.x + this.w - x_offset;
        e.ye = this.y - y_offset;
      }
      e.draw();
    }
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
  detect_inside(x = mouseX, y = mouseY) {
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
    this.selected = false;
    if (this.detect_inside(x, y)) {
      this.text_update_cords = [true, x, y];
    }
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
      e.mouseReleased(1);
    }
  }
  mousePressed_part2(x, y) {
    this.selected = true;
    let row = floor((y - this.text_char_cords[0][0]) / this.text_size) - 1;
    row = minmax(row, 0, this.text_char_cords.length - 1);
    let points = this.text_char_cords[row][1];
    points = points.slice(0, points.length - 1);
    points.push(x);
    points.sort((a, b) => a - b);
    let point = points.findIndex((element) => element == x);
    this.selected_pos = this.text_char_cords[row][2][point];
    this.blink.state = true;
    this.blink.start = Date.now();
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

    textSize(this.text_size);

    let y_offset = -this.text_size + 8;
    let char_count = 0;
    this.text_char_cords = [];

    let print_entry = this.entry.split("\n");

    if (Date.now() >= this.blink.start + 500) {
      this.blink.state = !this.blink.state;
      this.blink.start = Date.now();
    }
    for (let row of print_entry) {
      if (this.text_update_cords) {
        this.text_char_cords.push([this.y + y_offset, [], []]);
      }
      y_offset += this.text_size;
      let x_offset = 8;
      for (let i of row.split(" ")) {
        let target_x = this.x + x_offset;
        let target_y = this.y + y_offset;
        if (target_x + textWidth(i) >= this.x + this.w - 8) {
          y_offset += this.text_size;
          target_y += this.text_size;
          target_x -= x_offset;
          x_offset = 8;
          if (this.text_update_cords) {
            this.text_char_cords.push([this.y + y_offset, [], []]);
          }
        }
        i += " ";
        for (let letter of i) {
          let target_x = this.x + x_offset;
          let target_y = this.y + y_offset;

          text(letter, target_x, target_y);
          if (this.text_update_cords) {
            this.text_char_cords[this.text_char_cords.length - 1][1].push(
              target_x + textWidth(letter) / 2
            );
            this.text_char_cords[this.text_char_cords.length - 1][2].push(
              char_count
            );
          }
          x_offset += textWidth(letter);
          char_count++;
          if (
            this.selected_pos == char_count - 1 &&
            this.blink.state &&
            this.selected
          ) {
            rect(target_x, target_y, 2, this.text_size);
          }
        }
      }
    }
    if (this.text_update_cords[0] == true) {
      this.text_update_cords[0] = 2;
    }
    let res = new Object();
    res.new_h = this.text_size + y_offset + 8;
    return res;
  }
}
class AddEntry {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.w = 0;
    this.h = 0;

    this.text_size = 25;
  }
  update() {}
  detect_inside(x = mouseX, y = mouseY) {
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
    if (this.detect_inside(x, y)) {
      evidence_chart.new_entry();
    }
  }
  mouseDragged() {}
  mouseReleased() {}
  mousePressed_part2() {}
  typing() {}
  typing_del() {}
  keyPressed() {}
  keyReleased() {}
  paste(e) {}
  draw() {
    noStroke();
    if (dark_mode) {
      fill(155);
    } else {
      fill(155);
    }
    textAlign(LEFT, TOP);
    textFont("Impact");
    textSize(this.text_size);

    let txt = "+ Add Entry";
    text(txt, this.x, this.y);

    this.h = this.text_size;
    this.w = textWidth(txt);

    let res = new Object();
    res.y_end = this.y + this.text_size + 8;
    return res;
  }
  draw_attributes() {}
}
class Save {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.w = 0;
    this.h = 0;

    this.text_size = 25;
  }
  update() {}
  detect_inside(x = mouseX, y = mouseY) {
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
    if (this.detect_inside(x, y)) {
      const data = new Object();
      data.entries = evidence_chart.entries;
      data.udjatest = udjatest;
      var sus = LJSON.stringify(data)
      print(sus)
      download("ENTER_NAME_HERE", sus);
    }
  }
  mouseDragged() {}
  mouseReleased() {}
  mousePressed_part2() {}
  typing() {}
  typing_del() {}
  keyPressed() {}
  keyReleased() {}
  paste(e) {}
  draw() {
    noStroke();
    if (dark_mode) {
      fill(155);
    } else {
      fill(155);
    }
    textAlign(LEFT, TOP);
    textFont("Impact");
    textSize(this.text_size);

    let txt = "> Save";
    text(txt, this.x, this.y);

    this.h = this.text_size;
    this.w = textWidth(txt);

    let res = new Object();
    res.y_end = this.y + this.text_size + 8;
    return res;
  }
  draw_attributes() {}
}

const insert = (arr, index, newItem) => [
  ...arr.slice(0, index),
  newItem,
  ...arr.slice(index),
];
const minmax = (x, mi, ma) => min(max(x, mi), ma);

function removeA(arr) {
  var what,
    a = arguments,
    L = a.length,
    ax;
  while (L > 1 && arr.length) {
    what = a[--L];
    while ((ax = arr.indexOf(what)) !== -1) {
      arr.splice(ax, 1);
    }
  }
  return arr;
}
