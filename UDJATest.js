class UDJATest {
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

    this.estj = false;
    this.estp = false;
    this.entj = false;
    this.enfj = false;
    this.esfj = false;
    this.esfp = false;
    this.entp = false;
    this.enfp = false;
    this.istj = false;
    this.istp = false;
    this.intj = false;
    this.infj = false;
    this.isfj = false;
    this.isfp = false;
    this.intp = false;
    this.infp = false;

    this.button_states = [
      this.estj,
      this.estp,
      this.entj,
      this.enfj,
      this.esfj,
      this.esfp,
      this.entp,
      this.enfp,
      this.istj,
      this.istp,
      this.intj,
      this.infj,
      this.isfj,
      this.isfp,
      this.intp,
      this.infp,
    ];

    this.types_on_off = [];
    this.types_on_off_date = Date.now();
    for (let x = 0; x < 16; x++) {
      this.types_on_off.push([1, 1]);
    }

    this.abstract = 0;
    this.concrete = 0;

    this.types = [
      ["ESTJ", [245, 68, 40], [245, 68, 40], "Te Si Ne Fi", "Delta"],
      ["ESTP", [63, 78, 175], [65, 86, 160], "Se Ti Fe Ni", "Beta"],
      ["ENTJ", [107, 175, 24], [107, 175, 24], "Te Ni Se Fi", "Gamma"],
      ["ENFJ", [210, 224, 56], [238, 201, 58], "Fe Ni Se Ti", "Beta"],
      ["ESFJ", [38, 147, 62], [58, 150, 46], "Fe Si Ne Ti", "Alpha"],
      ["ESFP", [255, 73, 165], [255, 73, 143], "Se Fi Te Ni", "Gamma"],
      ["ENTP", [223, 81, 255], [129, 41, 145], "Ne Ti Fe Si", "Alpha"],
      ["ENFP", [98, 146, 196], [124, 164, 201], "Ne Fi Te Si", "Delta"],
      ["ISTJ", [126, 200, 211], [93, 197, 198], "Si Te Fi Ne", "Delta"],
      ["ISTP", [245, 110, 28], [245, 110, 28], "Ti Se Ni Fe", "Beta"],
      ["INTJ", [255, 109, 255], [219, 66, 241], "Ni Te Fi Se", "Gamma"],
      ["INFJ", [134, 129, 242], [39, 123, 177], "Ni Fe Ti Se", "Beta"],
      ["ISFJ", [255, 112, 195], [248, 149, 224], "Si Fe Ti Ne", "Alpha"],
      ["ISFP", [108, 245, 55], [108, 245, 55], "Fi Se Ni Te", "Gamma"],
      ["INTP", [88, 248, 143], [88, 248, 143], "Ti Ne Si Fe", "Alpha"],
      ["INFP", [250, 174, 73], [250, 174, 73], "Fi Ne Si Te", "Delta"],
    ];
    this.encrypt_attributes();

    this.attributes = [
      ["Se Ni", [150, 150, 150], [150, 150, 150]],
      ["Si Ne", [150, 150, 150], [150, 150, 150]],
      ["Direct", [150, 150, 150], [150, 150, 150]],
      ["Informative", [150, 150, 150], [150, 150, 150]],
      ["Progress", [150, 150, 150], [150, 150, 150]],
      ["Outcome", [150, 150, 150], [150, 150, 150]],
      ["Initiating", [150, 150, 150], [150, 150, 150]],
      ["Responding", [150, 150, 150], [150, 150, 150]],
      ["Te Fi", [150, 150, 150], [150, 150, 150]],
      ["Ti Fe", [150, 150, 150], [150, 150, 150]],
      ["Affiliative", [150, 150, 150], [150, 150, 150]],
      ["Pragmatic", [150, 150, 150], [150, 150, 150]],
      ["Systematic", [150, 150, 150], [150, 150, 150]],
      ["Interest", [150, 150, 150], [150, 150, 150]],
      ["Abstract", [150, 150, 150], [150, 150, 150]],
      ["Concrete", [150, 150, 150], [150, 150, 150]],
      ["Crusader", [150, 150, 150], [150, 150, 150]],
      ["Philosopher", [150, 150, 150], [150, 150, 150]],
      ["Templar", [150, 150, 150], [150, 150, 150]],
      ["Wayfarer", [150, 150, 150], [150, 150, 150]],
      ["Soul", [150, 150, 150], [150, 150, 150]],
      ["Heart", [150, 150, 150], [150, 150, 150]],
      ["Mind", [150, 150, 150], [150, 150, 150]],
      ["Body", [150, 150, 150], [150, 150, 150]],
    ];
    for (let item of this.attributes) {
      item.push(0);
    }

    let width2 = this.w / 2;
    let y2 =
      this.y + 4 * (height + this.boundry_offset) + this.boundry_offset * 3;
    let height2 = this.h - (y2 - this.y) - height * 0.75;
    height = (height2 - this.boundry_offset * 8) / 6;
    width = (this.w - this.boundry_offset) / 2;

    this.buttons_on = [];
    this.buttons_on_temp = [];

    this.buttons = [];
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 2; col++) {
        this.buttons.push(
          new button_attributes(
            this.x,
            this.y,
            this.w,
            this.h,
            this.boundry_offset,
            row,
            col,
            this.attributes
          )
        );
      }
    }
    for (let row = 4; row < 6; row++) {
      let col = 0;
      this.buttons.push(
        new button_attributes_four(
          this.x,
          this.y,
          this.w,
          this.h,
          this.boundry_offset,
          row,
          col,
          this.attributes
        )
      );
    }
  }
  update(scroll = 0) {
    function ParametricBlend(t) {
      let sqt = t * t;
      return sqt / (2.0 * (sqt - t) + 1.0);
    }
    let cur_anim = ParametricBlend(
      min(max((Date.now() - this.anim_start) / this.anim_speed, 0), 1)
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

    for (let i in this.buttons) {
      this.buttons[i].x = this.x;
      this.buttons[i].y = this.y;
      this.buttons[i].w = this.w;
      this.buttons[i].h = this.h;
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
  draw() {
    this.update_button_array();

    for (let i in this.buttons) {
      this.buttons[i].update();
      this.buttons[i].draw();
    }

    let width = (this.w - 3 * this.boundry_offset) / 4;
    let height = this.h * (85 / 1058);
    for (let col = 0; col < 4; col++) {
      for (let row = 0; row < 4; row++) {
        let wh_biger = min(
          height * 1.5,
          Math.pow((height * 0.6 * width) / height, 1.11)
        );

        strokeWeight(2);
        stroke(color_pallet[1] - 50);
        if (dark_mode) {
          fill(bg * 0.75, 255);
        } else {
          fill(bg + 30, 255);
        }
        rectMode(CORNER);
        rect(
          this.x + col * (width + this.boundry_offset),
          this.y + row * (height + this.boundry_offset),
          width,
          height,
          7
        );

        noStroke();
        if (dark_mode) {
          fill(this.types[row * 4 + col][1]);
        } else {
          fill(this.types[row * 4 + col][2]);
        }
        textAlign(LEFT, BASELINE);
        textSize(wh_biger / 3);
        textFont("Impact");
        text(
          this.types[row * 4 + col][0],
          this.x + this.boundry_offset + col * (width + this.boundry_offset),
          this.y + this.boundry_offset + row * (height + this.boundry_offset),
          width
        );
        if (dark_mode) {
          fill(255, 50);
        } else {
          fill(150, 125);
        }
        text(
          this.types[row * 4 + col][0],
          this.x + this.boundry_offset + col * (width + this.boundry_offset),
          this.y + this.boundry_offset + row * (height + this.boundry_offset),
          width
        );
        if (dark_mode) {
          fill(100);
        } else {
          fill(185);
        }
        textAlign(LEFT, BOTTOM);
        textSize(wh_biger / 4.2);
        textFont("Impact");
        text(
          this.types[row * 4 + col][3],
          this.x + this.boundry_offset + col * (width + this.boundry_offset),
          this.y + height + row * (height + this.boundry_offset)
        );

        // Button On/Off
        let index = row * 4 + col;
        let aim = 1 - int(this.button_states[index]);
        let start = this.types_on_off[index][1];
        let time_passed = Date.now() - this.types_on_off_date;

        function ParametricBlend(t) {
          let sqt = t * t;
          return sqt / (2.0 * (sqt - t) + 1.0);
        }
        let input = ParametricBlend(min(max(time_passed / 150, 0), 1));
        let opacity = 1 - map(input, 0, 1, start, aim);
        this.types_on_off[index][0] = 1 - opacity;

        strokeWeight(4);
        stroke(bg, 210 * opacity);
        fill(bg, 210 * opacity);
        rectMode(CORNER);
        rect(
          this.x + col * (width + this.boundry_offset),
          this.y + row * (height + this.boundry_offset),
          width,
          height,
          7
        );
      }
    }

    // Submit and Reset Button
    width = (this.w - this.boundry_offset * 4 * 3) / 2;
    height = this.h * (85 / 1058);
    let y2 =
      this.y + 4 * (height + this.boundry_offset) + this.boundry_offset * 3;
    height = this.h - (y2 - this.y) - height * 0.75;
    height = (height - this.boundry_offset * 16) / 6;

    strokeWeight(2);
    stroke(color_pallet[1] - 50);
    if (dark_mode) {
      fill(bg * 0.75, 255);
    } else {
      fill(bg + 30, 255);
    }
    rectMode(CORNER);
    rect(
      this.x + this.boundry_offset * 4,
      this.y + this.h - height,
      width,
      height,
      7
    );
    rect(
      this.x + width + this.boundry_offset * 8,
      this.y + this.h - height,
      width,
      height,
      7
    );

    noStroke();
    if (dark_mode) {
      fill(this.attributes[0][1]);
    } else {
      fill(this.attributes[0][2]);
    }
    textAlign(CENTER, CENTER);
    textSize(min(height * 0.5, width / 10));
    textFont("Impact");
    // text(
    //   'Submit',
    //   this.x + width / 2 + this.boundry_offset * 4,
    //   this.y + this.h - height / 2
    // );
    text(
      "Reset",
      this.x + width * 1.5 + this.boundry_offset * 8,
      this.y + this.h - height / 2
    );

    if (debug) {
      // Bounding Box
      stroke(255, 0, 0);
      strokeWeight(1);
      fill(255, 0, 0, 10);
      rectMode(CORNER);
      rect(this.x - 1, this.y - 1, this.w + 2, this.h + 2);
    }
  }
  mousePressed(x, y) {
    let offset = 8;
    let width = (this.w - 3 * this.boundry_offset) / 4;
    let height = this.h * (85 / 1058);
    if (
      this.x <= x &&
      x <= this.x + this.w &&
      this.y <= y &&
      y <= this.y + height * 4 + this.boundry_offset * 3
    ) {
      let posx = x - this.x - 2;
      let posy = y - this.y - 2;

      if (
        posx % (width + this.boundry_offset) <= width &&
        posy % (height + this.boundry_offset) <= height
      ) {
        let col = Math.floor(posx / (width + this.boundry_offset));
        let row = Math.floor(posy / (height + this.boundry_offset));
        let selection = row * 4 + col;

        switch (selection) {
          case 0:
            this.estj = !this.estj;
            break;
          case 1:
            this.estp = !this.estp;
            break;
          case 2:
            this.entj = !this.entj;
            break;
          case 3:
            this.enfj = !this.enfj;
            break;
          case 4:
            this.esfj = !this.esfj;
            break;
          case 5:
            this.esfp = !this.esfp;
            break;
          case 6:
            this.entp = !this.entp;
            break;
          case 7:
            this.enfp = !this.enfp;
            break;
          case 8:
            this.istj = !this.istj;
            break;
          case 9:
            this.istp = !this.istp;
            break;
          case 10:
            this.intj = !this.intj;
            break;
          case 11:
            this.infj = !this.infj;
            break;
          case 12:
            this.isfj = !this.isfj;
            break;
          case 13:
            this.isfp = !this.isfp;
            break;
          case 14:
            this.intp = !this.intp;
            break;
          case 15:
            this.infp = !this.infp;
            break;
        }
      }
    }

    let y2 =
      this.y + 4 * (height + this.boundry_offset) + this.boundry_offset * 3;
    let height2 = this.h - (y2 - this.y) - height * 0.75;
    height = (height2 - this.boundry_offset * 8) / 6;
    width = (this.w - this.boundry_offset) / 2;

    if (
      this.x <= x &&
      x <= this.x + this.w &&
      y2 <= y &&
      y <= y2 + height * 6 + this.boundry_offset * 5
    ) {
      let posx = x - this.x - 2;
      let posy = y - y2 - 2;

      if (
        posx % (width + this.boundry_offset) <= width &&
        posy % (height + this.boundry_offset) <= height
      ) {
        let col = Math.floor((2 * posx) / (width + this.boundry_offset));
        let row = Math.floor(posy / (height + this.boundry_offset));
        let selection = row * 4 + col;

        // debug
        // this.types[15][0] = selection;

        this.type_opacity_animation();

        let num = 0;
        let side = 0;
        switch (selection) {
          case 0:
            num = 0;
            side = 0;
            break;
          case 1:
            num = 0;
            side = 1;
            break;
          case 2:
            num = 1;
            side = 0;
            break;
          case 3:
            num = 1;
            side = 1;
            break;
          case 4:
            num = 2;
            side = 0;
            break;
          case 5:
            num = 2;
            side = 1;
            break;
          case 6:
            num = 3;
            side = 0;
            break;
          case 7:
            num = 3;
            side = 1;
            break;
          case 8:
            num = 4;
            side = 0;
            break;
          case 9:
            num = 4;
            side = 1;
            break;
          case 10:
            num = 5;
            side = 0;
            break;
          case 11:
            num = 5;
            side = 1;
            break;
          case 12:
            num = 6;
            side = 0;
            break;
          case 13:
            num = 6;
            side = 1;
            break;
          case 14:
            num = 7;
            side = 0;
            break;
          case 15:
            num = 7;
            side = 1;
            break;
          // Quadra
          case 16:
            num = 8;
            side = 0;
            break;
          case 17:
            num = 8;
            side = 1;
            break;
          case 18:
            num = 8;
            side = 2;
            break;
          case 19:
            num = 8;
            side = 3;
            break;
          // Temples
          case 20:
            num = 9;
            side = 0;
            break;
          case 21:
            num = 9;
            side = 1;
            break;
          case 22:
            num = 9;
            side = 2;
            break;
          case 23:
            num = 9;
            side = 3;
            break;
        }
        this.buttons[num].x2s = this.buttons[num].x2;
        this.buttons[num].x3s = this.buttons[num].x3;
        this.buttons[num].anim_start = Date.now();
        switch (this.buttons[num].outpute) {
          default:
            this.buttons[num].outpute = side;
            break;
          case side:
            this.buttons[num].outpute = null;
            break;
        }
      }
    }

    // Submit and Reset Button
    width = (this.w - this.boundry_offset * 4 * 3) / 2;
    height = this.h * (85 / 1058);
    y2 = this.y + 4 * (height + this.boundry_offset) + this.boundry_offset * 3;
    height = this.h - (y2 - this.y) - height * 0.75;
    height = (height - this.boundry_offset * 16) / 6;

    let x_obj = this.x + this.boundry_offset * 4;
    let y_obj = this.y + this.h - height;
    if (x_obj <= x && x <= x_obj + width && y_obj <= y && y <= y_obj + height) {
      // This is where Submit stuff will go
    }

    x_obj = this.x + width + this.boundry_offset * 8;
    if (x_obj <= x && x <= x_obj + width && y_obj <= y && y <= y_obj + height) {
      this.buttons_on = [];
      for (let e of this.buttons) {
        e.reset();
        this.type_opacity_animation();
      }
      evidence_chart.entries = [new AddEntry(), new Save()];
    }
  }
  type_opacity_animation() {
    this.types_on_off_date = Date.now();
    for (let i in this.types_on_off) {
      this.types_on_off[i][1] = this.types_on_off[i][0];
    }
  }
  buttons_on_to_types(buttons_on) {
    let res = [];
    let types = this.types.map(function (value, index) {
      return value[0];
    });
    for (let type in types) {
      let val = this.types[type][5];
      let running = 1;

      if (running) {
        for (let x in this.buttons_on) {
          let test = this.buttons_on[x];
          let out = val.indexOf(test);
          if (out == -1) {
            running = 0;
          }
        }
      }
      res.push(running);
    }
    return res;
  }
  update_type_states(states, invert = 0) {
    this.estj = invert - states[0];
    this.estp = invert - states[1];
    this.entj = invert - states[2];
    this.enfj = invert - states[3];
    this.esfj = invert - states[4];
    this.esfp = invert - states[5];
    this.entp = invert - states[6];
    this.enfp = invert - states[7];
    this.istj = invert - states[8];
    this.istp = invert - states[9];
    this.intj = invert - states[10];
    this.infj = invert - states[11];
    this.isfj = invert - states[12];
    this.isfp = invert - states[13];
    this.intp = invert - states[14];
    this.infp = invert - states[15];

    this.button_states = [
      this.estj,
      this.estp,
      this.entj,
      this.enfj,
      this.esfj,
      this.esfp,
      this.entp,
      this.enfp,
      this.istj,
      this.istp,
      this.intj,
      this.infj,
      this.isfj,
      this.isfp,
      this.intp,
      this.infp,
    ];
  }
  format_to_format2(t) {
    let sel = t;
    switch (t) {
      case 0:
        sel = 0;
        break;
      case 1:
        sel = 1;
        break;
      case 2:
        sel = 8;
        break;
      case 3:
        sel = 9;
        break;
      case 4:
        sel = 2;
        break;
      case 5:
        sel = 3;
        break;
      case 6:
        sel = 10;
        break;
      case 7:
        sel = 11;
        break;
      case 8:
        sel = 4;
        break;
      case 9:
        sel = 5;
        break;
      case 10:
        sel = 12;
        break;
      case 11:
        sel = 13;
        break;
      case 12:
        sel = 6;
        break;
      case 13:
        sel = 7;
        break;
      case 14:
        sel = 14;
        break;
      case 15:
        sel = 15;
        break;
    }
    return sel;
  }
  update_button_array() {
    for (let i in this.buttons) {
      if (this.buttons[i].outpute != this.buttons[i].output) {
        let button = 0;
        if (i != 9) {
          button = i * 2;
        } else {
          button = i * 2 + 2;
        }

        if (i < 8) {
          // this.buttons[i].output = this.buttons[i].outpute;
          this.buttons_on = this.buttons_on.filter((e) => e !== button);
          this.buttons_on = this.buttons_on.filter((e) => e !== button + 1);

          if (this.buttons[i].outpute != null) {
            this.buttons_on.push(button + this.buttons[i].outpute);
          }
        } else {
          // this.buttons[i].output = this.buttons[i].outpute;
          this.buttons_on = this.buttons_on.filter((e) => e !== button);
          this.buttons_on = this.buttons_on.filter((e) => e !== button + 1);
          this.buttons_on = this.buttons_on.filter((e) => e !== button + 2);
          this.buttons_on = this.buttons_on.filter((e) => e !== button + 3);

          if (this.buttons[i].outpute != null) {
            this.buttons_on.push(button + this.buttons[i].outpute);
          }
        }
      }
    }
    if (this.buttons_on_to_types(this.buttons_on).indexOf(1) != -1) {
      this.buttons_on_temp = this.buttons_on;
      for (let i of this.buttons) {
        i.output = i.outpute;
      }
    } else {
      this.buttons_on = this.buttons_on_temp;
      for (let i in this.buttons) {
        let button = 0;
        if (i != 9) {
          button = i * 2;
        } else {
          button = i * 2 + 2;
        }
        if (this.buttons[i].output != this.buttons[i].outpute) {
          let sel = this.format_to_format2(button + this.buttons[i].outpute);
          this.attributes[sel][3] = Date.now();
        }
        this.buttons[i].outpute = this.buttons[i].output;
      }
    }
    this.update_type_states(this.buttons_on_to_types(this.buttons_on_temp), 1);
  }
  encrypt_attributes() {
    let attributes_numbers = [
      "Se",
      "Si",
      "Fi",
      "Fe",
      "Dir",
      "Inform",
      "Affil",
      "Prag",
      "Prog",
      "Out",
      "Syst",
      "Inter",
      "Init",
      "Resp",
      "Abst",
      "Conc",
      "Crus",
      "Phil",
      "Temp",
      "Way",
      "Soul",
      "Heart",
      "Mind",
      "Body",
    ];

    let types_attributes = [
      ["ESTJ", ["Struct", "SJ", "D", "Mind"]],
      ["ESTP", ["Struct", "SP", "B", "Soul"]],
      ["ENTJ", ["Struct", "NT", "G", "Body"]],
      ["ENFJ", ["Struct", "NF", "B", "Mind"]],
      ["ESFJ", ["Start", "SJ", "A", "Body"]],
      ["ESFP", ["Start", "SP", "G", "Heart"]],
      ["ENTP", ["Start", "NT", "A", "Heart"]],
      ["ENFP", ["Start", "NF", "D", "Soul"]],
      ["ISTJ", ["Finish", "SJ", "D", "Soul"]],
      ["ISTP", ["Finish", "SP", "B", "Mind"]],
      ["INTJ", ["Finish", "NT", "G", "Heart"]],
      ["INFJ", ["Finish", "NF", "B", "Soul"]],
      ["ISFJ", ["Back", "SJ", "A", "Heart"]],
      ["ISFP", ["Back", "SP", "G", "Body"]],
      ["INTP", ["Back", "NT", "A", "Body"]],
      ["INFP", ["Back", "NF", "D", "Mind"]],
    ];
    for (let j in types_attributes) {
      let res = [];
      for (let i in types_attributes[j][1]) {
        find = types_attributes[j][1][i];

        let x = [find];
        switch (find) {
          case "Struct":
            x = ["Dir", "Init", "Out"];
            break;
          case "Start":
            x = ["Inform", "Init", "Prog"];
            break;
          case "Finish":
            x = ["Dir", "Resp", "Prog"];
            break;
          case "Back":
            x = ["Inform", "Resp", "Out"];
            break;

          case "SJ":
            x = ["Conc", "Syst", "Affil"];
            break;
          case "SP":
            x = ["Conc", "Inter", "Prag"];
            break;
          case "NT":
            x = ["Abst", "Syst", "Prag"];
            break;
          case "NF":
            x = ["Abst", "Inter", "Affil"];
            break;

          case "A":
            x = ["Crus", "Si", "Fe"];
            break;
          case "B":
            x = ["Temp", "Se", "Fe"];
            break;
          case "D":
            x = ["Phil", "Si", "Fi"];
            break;
          case "G":
            x = ["Way", "Se", "Fi"];
            break;
        }

        for (let z in x) {
          let found = attributes_numbers.indexOf(x[z]);
          if (found != -1) {
            res.push(found);
          } else {
            print("ERRRORR WTHHHH: " + x[z]);
          }
        }
      }
      res.sort(function (a, b) {
        return a - b;
      });
      this.types[j].push(res);
    }
  }
}

class button_attributes {
  constructor(x, y, w, h, boundry_offset, row, col, attributes) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.boundry_offset = boundry_offset;
    this.row = row;
    this.col = col;
    this.attributes = attributes;

    this.output = null;
    this.outpute = null;

    this.x2 = 0;
    this.x2s = 0;
    this.x2e = 0;

    this.x3 = 1;
    this.x3s = 1;
    this.x3e = 1;

    this.anim_speed = 250;
    this.anim_start = Date.now();
  }
  reset() {
    this.outpute = null;

    this.x2s = this.x2;
    this.x3s = this.x3;
    this.anim_start = Date.now();
  }
  update() {
    function ParametricBlend(t) {
      let sqt = t * t;
      return sqt / (2.0 * (sqt - t) + 1.0);
    }
    let cur_anim = ParametricBlend(
      min(max((Date.now() - this.anim_start) / this.anim_speed, 0), 1)
    );

    switch (this.output) {
      case null:
        this.x2e = 0;
        this.x3e = 1;
        break;
      case 0:
        this.x2e = 0;
        this.x3e = 6 / 11;
        break;
      case 1:
        this.x2e = 5 / 11;
        this.x3e = 1;
        break;
    }

    this.x2 = map(cur_anim, 0, 1, this.x2s, this.x2e);
    this.x3 = map(cur_anim, 0, 1, this.x3s, this.x3e);
  }
  draw() {
    let width = (this.w - 3 * this.boundry_offset) / 4;
    let height = this.h * (85 / 1058);
    let width2 = this.w / 2;
    let y2 =
      this.y + 4 * (height + this.boundry_offset) + this.boundry_offset * 3;
    let height2 = this.h - (y2 - this.y) - height * 0.75;
    height = (height2 - this.boundry_offset * 8) / 6;
    width = (this.w - this.boundry_offset) / 2;

    this.draw_mainbody(y2, width, height);
    this.draw_right_text(y2, width, height);
    this.draw_left_text(y2, width, height);
    this.draw_overlay(y2, width, height);
  }
  draw_mainbody(y2, width, height) {
    strokeWeight(2);
    stroke(color_pallet[1] - 50);
    if (dark_mode) {
      fill(bg * 0.75, 255);
    } else {
      fill(bg + 30, 255);
    }
    rectMode(CORNER);
    rect(
      this.x + this.col * (width + this.boundry_offset),
      y2 + this.row * (height + this.boundry_offset),
      width,
      height,
      7
    );
  }
  draw_overlay(y2, width, height) {
    strokeWeight(5);
    rectMode(CORNER);
    if (dark_mode) {
      fill(bg, 210);
      stroke(bg, 210);
    } else {
      fill(bg, 210);
      stroke(bg, 210);
    }
    if (this.x2 > 0) {
      rect(
        this.x + this.col * (width + this.boundry_offset) - 5,
        y2 + this.row * (height + this.boundry_offset) - 5,
        width * this.x2 + 5,
        height + 10
      );
    }
    if (this.x3 < 1) {
      rect(
        this.x + this.col * (width + this.boundry_offset) + width * this.x3,
        y2 + this.row * (height + this.boundry_offset) - 5,
        width * (1 - this.x3) + 5,
        height + 10
      );
    }
    strokeWeight(2);
    stroke(color_pallet[1] - 50);
    noFill();
    rect(
      this.x + this.col * (width + this.boundry_offset) + width * this.x2,
      y2 + this.row * (height + this.boundry_offset),
      width * (this.x3 - this.x2),
      height,
      7
    );
  }
  draw_left_text(y2, width, height) {
    push();
    let shake =
      Date.now() - this.attributes[(this.col * 4 + this.row) * 2][3] < 250;
    if (shake) {
      translate(random(-5, 5), random(-5, 5));
    }
    noStroke();
    if (dark_mode) {
      fill(this.attributes[(this.col * 4 + this.row) * 2][1]);
    } else {
      fill(this.attributes[(this.col * 4 + this.row) * 2][2]);
    }
    textAlign(LEFT, CENTER);
    textSize(min(height * 0.4, width / 10));
    textFont("Impact");
    text(
      this.attributes[(this.col * 4 + this.row) * 2][0],
      this.x + this.col * (width + this.boundry_offset) + this.boundry_offset,
      y2 + this.row * (height + this.boundry_offset) + height / 2,
      width
    );
    pop();
  }
  draw_right_text(y2, width, height) {
    push();
    let shake =
      Date.now() - this.attributes[(this.col * 4 + this.row) * 2 + 1][3] < 250;
    if (shake) {
      translate(random(-5, 5), random(-5, 5));
    }
    noStroke();
    if (dark_mode) {
      fill(this.attributes[(this.col * 4 + this.row) * 2 + 1][1]);
    } else {
      fill(this.attributes[(this.col * 4 + this.row) * 2 + 1][2]);
    }
    textAlign(RIGHT, CENTER);
    textSize(min(height * 0.4, width / 10));
    textFont("Impact");
    text(
      this.attributes[(this.col * 4 + this.row) * 2 + 1][0],
      this.x +
        this.col * (width + this.boundry_offset) -
        this.boundry_offset / 2,
      y2 + this.row * (height + this.boundry_offset) + height / 2,
      width
    );
    pop();
  }
}
class button_attributes_four {
  constructor(x, y, w, h, boundry_offset, row, col, attributes) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.boundry_offset = boundry_offset;
    this.row = row;
    this.col = col;
    this.attributes = attributes;

    this.output = null;
    this.outpute = null;

    this.x2 = 0.1;
    this.x2s = 0.1;
    this.x2e = 0.1;

    this.x3 = 0.9;
    this.x3s = 0.9;
    this.x3e = 0.9;

    this.anim_speed = 250;
    this.anim_start = Date.now();
  }
  reset() {
    this.outpute = null;

    this.x2s = this.x2;
    this.x3s = this.x3;
    this.anim_start = Date.now();
  }
  update() {
    function ParametricBlend(t) {
      let sqt = t * t;
      return sqt / (2.0 * (sqt - t) + 1.0);
    }
    let cur_anim = ParametricBlend(
      min(max((Date.now() - this.anim_start) / this.anim_speed, 0), 1)
    );

    switch (this.output) {
      case null:
        this.x2e = 0;
        this.x3e = 1;
        break;
      case 0:
        this.x2e = 0;
        this.x3e = 0.25;
        break;
      case 1:
        this.x2e = 0.25;
        this.x3e = 0.525;
        break;
      case 2:
        this.x2e = 0.525;
        this.x3e = 0.75;
        break;
      case 3:
        this.x2e = 0.75;
        this.x3e = 1;
        break;
    }

    this.x2 = map(cur_anim, 0, 1, this.x2s, this.x2e);
    this.x3 = map(cur_anim, 0, 1, this.x3s, this.x3e);
  }
  draw() {
    let width = (this.w - 3 * this.boundry_offset) / 4;
    let height = this.h * (85 / 1058);
    let width2 = this.w / 2;
    let y2 =
      this.y + 4 * (height + this.boundry_offset) + this.boundry_offset * 3;
    let height2 = this.h - (y2 - this.y) - height * 0.75;
    height = (height2 - this.boundry_offset * 8) / 6;
    width = this.w;

    this.draw_mainbody(y2, width, height);
    this.draw_text(y2, width, height, (this.row - 4) * 4 + 16);
    this.draw_overlay(y2, width, height);
  }
  draw_mainbody(y2, width, height) {
    strokeWeight(2);
    stroke(color_pallet[1] - 50);
    if (dark_mode) {
      fill(bg * 0.75, 255);
    } else {
      fill(bg + 30, 255);
    }
    rectMode(CORNER);
    rect(
      this.x + this.col * (width + this.boundry_offset),
      y2 + this.row * (height + this.boundry_offset),
      width,
      height,
      7
    );
  }
  draw_overlay(y2, width, height) {
    strokeWeight(5);
    rectMode(CORNER);
    if (dark_mode) {
      fill(bg, 210);
      stroke(bg, 210);
    } else {
      fill(bg, 210);
      stroke(bg, 210);
    }
    if (this.x2 > 0) {
      rect(
        this.x + this.col * (width + this.boundry_offset) - 5,
        y2 + this.row * (height + this.boundry_offset) - 5,
        width * this.x2 + 5,
        height + 10
      );
    }
    if (this.x3 < 1) {
      rect(
        this.x + this.col * (width + this.boundry_offset) + width * this.x3,
        y2 + this.row * (height + this.boundry_offset) - 5,
        width * (1 - this.x3) + 5,
        height + 10
      );
    }
    strokeWeight(2);
    stroke(color_pallet[1] - 50);
    noFill();
    rect(
      this.x + this.col * (width + this.boundry_offset) + width * this.x2,
      y2 + this.row * (height + this.boundry_offset),
      width * (this.x3 - this.x2),
      height,
      7
    );
  }
  draw_text(y2, width, height, sel) {
    push();
    let shake = Date.now() - this.attributes[sel][3] < 250;
    if (shake) {
      translate(random(-5, 5), random(-5, 5));
    }
    textSize(min(height * 0.4, width / 10));
    noStroke();
    if (dark_mode) {
      fill(this.attributes[sel][1]);
    } else {
      fill(this.attributes[sel][2]);
    }
    textFont("Impact");
    textAlign(LEFT, CENTER);
    text(
      this.attributes[sel][0],
      this.x + this.boundry_offset,
      y2 + this.row * (height + this.boundry_offset) + height / 2,
      width
    );
    pop();

    sel++;
    push();
    shake = Date.now() - this.attributes[sel][3] < 250;
    if (shake) {
      translate(random(-5, 5), random(-5, 5));
    }
    textSize(min(height * 0.4, width / 10));
    noStroke();
    if (dark_mode) {
      fill(this.attributes[sel][1]);
    } else {
      fill(this.attributes[sel][2]);
    }
    textFont("Impact");
    textAlign(CENTER, CENTER);
    text(
      this.attributes[sel][0],
      this.x + (1.9 * this.w) / 5,
      y2 + this.row * (height + this.boundry_offset) + height / 2
    );
    pop();

    sel++;
    push();
    shake = Date.now() - this.attributes[sel][3] < 250;
    if (shake) {
      translate(random(-5, 5), random(-5, 5));
    }
    textSize(min(height * 0.4, width / 10));
    noStroke();
    if (dark_mode) {
      fill(this.attributes[sel][1]);
    } else {
      fill(this.attributes[sel][2]);
    }
    textFont("Impact");
    textAlign(CENTER, CENTER);
    text(
      this.attributes[sel][0],
      this.x + (3.2 * this.w) / 5,
      y2 + this.row * (height + this.boundry_offset) + height / 2
    );
    pop();

    sel++;
    push();
    shake = Date.now() - this.attributes[sel][3] < 250;
    if (shake) {
      translate(random(-5, 5), random(-5, 5));
    }
    textSize(min(height * 0.4, width / 10));
    noStroke();
    if (dark_mode) {
      fill(this.attributes[sel][1]);
    } else {
      fill(this.attributes[sel][2]);
    }
    textFont("Impact");
    textAlign(RIGHT, CENTER);
    text(
      this.attributes[sel][0],
      this.x - this.boundry_offset / 2,
      y2 + this.row * (height + this.boundry_offset) + height / 2,
      width
    );
    pop();
  }
}
