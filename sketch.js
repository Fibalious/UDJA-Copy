let mobile_aspect_ratio = 1.4;
let mobile_mode = 0;

let loading = true;
let angle = 0;
let bg = 0;
let date = new Date();

let pasted_clipboard = null;

let debug = false;
// debug = true;

dark_mode = 1;

function setup() {
  scroll_bar = new Scroll_bar();
  udjatest = new UDJATest();
  evidence_chart = new EvidenceChart();

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
    stroke(255);
    line(0, 0, 100, 0);
    rotate(-angle + angle / 12);
    line(0, 0, 75, 0);
    strokeWeight(4);
    stroke(255);
    noFill();
    circle(0, 0, 120 * 2);
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
}

function keyTyped() {
  let output = key;
  switch (key) {
    case "Enter":
      output = "\n";
      break;
    case BACKSPACE:
  }
  for (let entry of evidence_chart.entries) {
    entry.typing(output);
  }
}

function keyPressed() {
  for (let entry of evidence_chart.entries) {
    entry.keyPressed(keyCode);
  }
}

function keyReleased() {
  for (let entry of evidence_chart.entries) {
    entry.keyReleased(keyCode);
  }
}

function paste(e) {
  for (let entry of evidence_chart.entries) {
    entry.paste(e);
  }
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
    fullscreen(!fullscreen());
  }
  scroll_bar.mousePressed(mouseX, mouseY);
  if (!scroll_bar.scroll_scrolling) {
    update_color_palette();
  }
  udjatest.mousePressed(mouseX, mouseY);
  evidence_chart.mousePressed(mouseX, mouseY);
}

function mouseDragged() {
  scroll_bar.mouseDragged(mouseX, mouseY);
}

function mouseReleased() {
  scroll_scrolling = false;
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
