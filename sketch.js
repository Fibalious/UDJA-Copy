let mobile_aspect_ratio = 1.2;
// mobile_aspect_ratio = 0;
let mobile_mode = 0;

let loading = true;
let angle = 0;
let bg = 0;
let date = new Date();

let pasted_clipboard = null;

let debug = false;
debug = true;

dark_mode = 1;

function setup() {
  scroll_bar = new Scroll_bar();
  udjatest = new UDJATest();
  evidence_chart = new EvidenceChart();
  add_atributes_menu = new AddAtributesMenu();

  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.attribute("contenteditable", "true");
  canvas.elt.addEventListener("paste", (e) => {
    paste(e.clipboardData.getData("text"));
  });
  aspect_ratio = windowWidth / windowHeight;
  scroll_bar.scroll_max = 1 + windowHeight * (scroll_bar.scroll_pages - 1);
  mobile_mode = aspect_ratio < mobile_aspect_ratio;

  update_color_palette();

  udjatest.update_positions();
  evidence_chart.update_positions();
  add_atributes_menu.update_positions();
}

function draw() {
  if (pasted_clipboard != null) {
    udjatest.types[0][0] = pasted_clipboard;
    pasted_clipboard = null;
  }
  scroll_bar.update_scroll();

  // udjatest.types[0][0] = isMobileDevice();

  bg = map(
    scroll_bar.scroll,
    0,
    scroll_bar.scroll_max,
    color_pallet[0][0],
    color_pallet[0][1]
  );
  background(bg);
  if (Date.now() - date > 2000 && typeof loading == "boolean") {
    loading = 1;
    udjatest.update_positions();
    evidence_chart.update_positions();
    add_atributes_menu.update_positions();
  }

  if (loading > 0) {
    push();
    // TODO: Fix loading animation
    translate(
      windowWidth / 2 + Math.pow(1 - loading, 0.5) * windowWidth * 1.4,
      windowHeight / 2
    );
    rotate(angle);
    strokeWeight(4);
    stroke(color_pallet[1]);
    noFill();
    circle(0, 0, 50 * 2);
    noStroke();
    fill(bg, 255);
    rect(0, 0, 500, 500);
    pop();
    angle = angle + 0.12;
    if (typeof loading != "boolean") {
      loading -= 0.01;
    }
  }
  if (typeof loading != "boolean") {
    push();

    evidence_chart.update(scroll_bar.scroll);
    evidence_chart.draw();

    // add_atributes_menu.update(scroll_bar.scroll);
    // add_atributes_menu.draw();

    udjatest.update(scroll_bar.scroll);
    udjatest.draw();

    if (mobile_mode) {
      scroll_bar.draw(windowWidth, windowHeight / 20, 0, windowHeight);
    }

    pop();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  aspect_ratio = windowWidth / windowHeight;
  scroll_bar.scroll_max = 1 + windowHeight * (scroll_bar.scroll_pages - 1);
  if (mobile_mode != aspect_ratio < mobile_aspect_ratio) {
    mobile_mode = aspect_ratio < mobile_aspect_ratio;
    scroll_bar.update_scroll();
    scroll_bar.scroll_anim_start = Date.now();
    scroll_bar.scrolls = scroll_bar.scroll;
    scroll_bar.scrolle = 0;
  }
  udjatest.update_positions();
  evidence_chart.update_positions();
  add_atributes_menu.update_positions();
}

function keyTyped() {
  let output = key;
  switch (key) {
    case "Enter":
      output = "\n";
      break;
    case BACKSPACE:
  }
  evidence_chart.keyTyped(output);
}

function keyPressed() {
  evidence_chart.keyPressed(keyCode);
}

function keyReleased() {
  evidence_chart.keyReleased(keyCode);
}

function paste(e) {
  evidence_chart.paste(e);
}

function mouseWheel(event) {
  if (evidence_chart.detect_inside(mouseX, mouseY)) {
    evidence_chart.scroll_bar.send_mwheel_update(event.delta);
  } else if (mobile_mode) {
    scroll_bar.send_mwheel_update(event.delta);
  }
}

function mousePressed() {
  if (mouseX < 50 && mouseY < 50) {
    // fullscreen(!fullscreen());
  }
  scroll_bar.mousePressed(mouseX, mouseY);
  if (!scroll_bar.scroll_scrolling) {
    update_color_palette();
  }
  udjatest.mousePressed(mouseX, mouseY);
  evidence_chart.mousePressed(mouseX, mouseY);
  add_atributes_menu.mousePressed(mouseX, mouseY);
}

function mouseDragged() {
  scroll_bar.mouseDragged(mouseX, mouseY);
  evidence_chart.mouseDragged(mouseX, mouseY);
  add_atributes_menu.mouseDragged(mouseX, mouseY);
}

function mouseReleased() {
  scroll_bar.mouseReleased();
  evidence_chart.mouseReleased();
  add_atributes_menu.mouseReleased();
}

function update_color_palette(update = false) {
  if (update) {
    dark_mode = !dark_mode;
  }
  if (dark_mode) {
    color_pallet = [[18, 10], [255]];
  } else {
    color_pallet = [[225, 165], [100]];
  }
}

function copyToClipboard(text) {
  var dummy = document.createElement("textarea");
  document.body.appendChild(dummy);
  dummy.value = text;
  dummy.select();
  document.execCommand("copy");
  document.body.removeChild(dummy);
}

function isMobileDevice() {
  return (
    typeof window.orientation !== "undefined" ||
    navigator.userAgent.indexOf("IEMobile") !== -1
  );
}
