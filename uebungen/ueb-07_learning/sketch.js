/**
 * HandPose Boilerplate mit ml5.js
 * 
 * Dieses Sketch erkennt Hände über die Webcam und zeichnet die erkannten Keypoints.
 * Es dient als Ausgangspunkt für eigene Hand-Tracking-Projekte.
 * 
 * Dokumentation: https://docs.ml5js.org/#/reference/handpose
 * 
 * Jede Hand hat 21 Keypoints (0-20):
 * - 0: Handgelenk
 * - 1-4: Daumen
 * - 5-8: Zeigefinger
 * - 9-12: Mittelfinger
 * - 13-16: Ringfinger
 * - 17-20: Kleiner Finger
 */

// Globale Variablen
let handpose;           // Das ml5.js HandPose-Modell
let video;              // Die Webcam
let hands = [];         // Array mit allen erkannten Händen
let ratio;              // Skalierungsfaktor zwischen Video und Canvas
let isModelReady = false; // Flag, ob das Modell geladen und Hände erkannt wurden

// Seiten-Rects
const sideRectW = 80;
const leftRectColor = [0, 0, 255];
const rightRectColor = [150, 0, 255];

// Blauer Kreis (beweglich)
let blueCircle = {
  x: 0,
  y: 0,
  vx: 0,
  vy: 0,
  r: 40,
  speed: 6,
  touching: false,
  color: [0, 0, 255],
  defaultColor: [0, 0, 255],
  currentRect: null // 'left' | 'right' | null
};

// Lila Kreis (beweglich)
let purpleCircle = {
  x: 0,
  y: 0,
  vx: 0,
  vy: 0,
  r: 40,
  speed: 3,
  touching: false,
  color: [150, 0, 255],
  defaultColor: [150, 0, 255],
  currentRect: null // 'left' | 'right' | null
};

// Vier weiße Kreise (beweglich)
let whiteCircles = []; // wird in setup initialisiert
let prevThumbMidWhites = []; // je Kreis separater prevThumb

// Vorherige Position der Mittelachse zwischen Daumen (für Bewegungsrichtungserkennung)
let prevThumbMid = { x: 0, y: 0 };
// Vorherige Position für lila Kreis (separat, damit beide unabhängig auslösen können)
let prevThumbMidPurple = { x: 0, y: 0 };

/**
 * Lädt das HandPose-Modell vor dem Setup
 * Diese Funktion wird automatisch vor setup() ausgeführt
 */
function preload() {
  handpose = ml5.handPose();
}

/**
 * Initialisiert Canvas und Webcam
 */
function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1); // Performanceoptimierung
  
  // Webcam einrichten
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide(); // Versteckt das Standard-Video-Element
  
  // Berechne Skalierungsfaktor für Video-zu-Canvas-Anpassung
  ratio = width / video.width;
  
  // Starte Hand-Erkennung
  handpose.detectStart(video, gotHands);

  // Initialisiere Kreise in der Mitte (lila leicht versetzt)
  blueCircle.x = width / 2;
  blueCircle.y = height / 2;
  purpleCircle.x = width / 2 + 80;
  purpleCircle.y = height / 2;

  // Initialisiere 4 weiße Kreise um die Mitte verteilt
  const spacing = 70;
  for (let i = 0; i < 4; i++) {
    whiteCircles.push({
      x: width / 2 + (i - 1.5) * spacing,
      y: height / 2 + ((i % 2 === 0) ? -spacing : spacing),
      vx: 0,
      vy: 0,
      r: 30,
      speed: 4,
      touching: false,
      color: [255, 255, 255],
      defaultColor: [255, 255, 255],
      currentRect: null
    });
    prevThumbMidWhites.push({ x: 0, y: 0 });
  }
}

/**
 * Hauptzeichnungs-Loop
 */
function draw() {
  background(0);

  // Spiegle die Darstellung horizontal (für intuitivere Interaktion)
  push();
  translate(width, 0);
  scale(-1, 1);

  //Zeige das Video (optional)
  //image(video, 0, 0, video.width * ratio, video.height * ratio);
  
  // Zeichne nur, wenn das Modell bereit ist und Hände erkannt wurden
  if (isModelReady) {
    drawHandPoints();

    // HIER KÖNNEN EIGENE/ANDERE ZEICHNUNGEN Oder Interaktionen HINZUGEFÜGT WERDEN

    // Bewegung und Kollisionslogik für den blauen Kreis
    updateBlueCircleMovement();

    // Bewegung und Kollisionslogik für den lila Kreis
    updatePurpleCircleMovement();

    // Bewegung und Kollisionslogik für die weißen Kreise
    updateWhiteCirclesMovement();

    // Zeichne Kreise (blau, lila und weiß)
    drawBlueCircle();
    drawPurpleCircle();
    drawWhiteCircles();
  }
  
  pop();

  // Draw static side rectangles (not mirrored): blue on the left, purple on the right
  push();
  noStroke();
  // left blue rectangle
  fill(leftRectColor[0], leftRectColor[1], leftRectColor[2]);
  rect(0, 0, sideRectW, height);
  // right purple rectangle
  fill(rightRectColor[0], rightRectColor[1], rightRectColor[2]);
  rect(width - sideRectW, 0, sideRectW, height);
  pop();
}

/**
 * Callback-Funktion für HandPose-Ergebnisse
 * Wird automatisch aufgerufen, wenn neue Hand-Daten verfügbar sind
 * 
 * @param {Array} results - Array mit erkannten Händen
 */
function gotHands(results) {
  hands = results || [];
  
  // Setze Flag, sobald erste Hand erkannt wurde
  if (hands.length > 0) {
    isModelReady = true;
  }
}

/**
 * Zeichnet alle erkannten Hand-Keypoints
 * Jede Hand hat 21 Keypoints (siehe Kommentar oben)
 */
function drawHandPoints() {
  const thumbs = []; // sammle Daumenspitzen

  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];

    for (let j = 0; j < hand.keypoints.length; j++) {
      let keypoint = hand.keypoints[j];
      const x = keypoint.x * ratio;
      const y = keypoint.y * ratio;

      // grüner Kreis für alle Keypoints
      fill(0, 0, 0);
      noStroke();
      circle(x, y, 10);

      // blauer Kreis für die Daumenspitze (Index 4)
      if (j === 4) {
        fill(255, 255, 255);
        noStroke();
        circle(x, y, 16);
        thumbs.push({ x, y });
      }
    }
  }

  // Linie zwischen den ersten beiden Daumenspitzen zeichnen (falls vorhanden)
  if (thumbs.length >= 2) {
    stroke(255, 255, 255);
    strokeWeight(4);
    line(thumbs[0].x, thumbs[0].y, thumbs[1].x, thumbs[1].y);
    noStroke();
  }
}

/**
 * Hilfsfunktion: prüfe ob Kreis die Seiten-Rect berührt (Konvertiert Circle.x in Bildschirmkoordinaten).
 * Gibt 'left' oder 'right' oder null zurück.
 */
function checkSideRectTouch(circle) {
  // circle.x ist in gespiegeltem Koordinatensystem (wegen push/scale(-1,1)),
  // Bildschirm-x = width - circle.x
  const screenX = width - circle.x;
  if (screenX - circle.r <= sideRectW) return 'left';
  if (screenX + circle.r >= width - sideRectW) return 'right';
  return null;
}

/**
 * Setze Kreisfarbe und currentRect beim Betreten der Seiten-Rects.
 * Die Farbe wechselt sofort beim ersten Kontakt mit einem Rect
 * und bleibt so lange bestehen, bis das andere Rect berührt wird.
 * Wenn touch === null: nichts ändern.
 */
function handleSideRectColor(circle, touch) {
  if (touch === 'left' && circle.currentRect !== 'left') {
    circle.color = leftRectColor.slice();
    circle.currentRect = 'left';
  } else if (touch === 'right' && circle.currentRect !== 'right') {
    circle.color = rightRectColor.slice();
    circle.currentRect = 'right';
  }
  // touch === null -> leave as is (keep current color and currentRect)
}

/**
 * Update-Logik für den blauen Kreis:
 * - erkennt Kollision zwischen der Linie (Daumen 0-1) und dem Kreis
 * - setzt die Kreisgeschwindigkeit entgegen der eingehenden Linie / Bewegung
 * - bewegt den Kreis und lässt ihn an den Canvas-Rändern abprallen
 * - ändert die Kreisfarbe beim Berühren der Seiten-Rects und behält sie bis zur Berührung des anderen Rects
 */
function updateBlueCircleMovement() {
  // Sammle Daumenspitzen (Index 4) aus allen Händen, skaliert auf Canvas
  const thumbs = [];
  for (let i = 0; i < hands.length; i++) {
    const hand = hands[i];
    if (hand && hand.keypoints && hand.keypoints.length > 4) {
      const kp = hand.keypoints[4];
      thumbs.push({ x: kp.x * ratio, y: kp.y * ratio });
    }
  }

  if (thumbs.length >= 2) {
    const a = thumbs[0];
    const b = thumbs[1];
    const mx = (a.x + b.x) / 2;
    const my = (a.y + b.y) / 2;

    // Bewegungsvektor der Daumenmitte seit letztem Frame
    const mvx = mx - prevThumbMid.x;
    const mvy = my - prevThumbMid.y;

    // Prüfe Kollision zwischen Segment a-b und Kreis
    const collided = segmentCircleCollision(a, b, blueCircle);

    if (collided && !blueCircle.touching) {
      // Bestimme eingehende Richtung: bevorzugt Bewegungsvektor, sonst Linienrichtung
      let dirx = mvx;
      let diry = mvy;
      let mag = sqrt(dirx * dirx + diry * diry);
      if (mag < 0.5) {
        dirx = b.x - a.x;
        diry = b.y - a.y;
        mag = sqrt(dirx * dirx + diry * diry) || 1;
      }
      // Setze die Geschwindigkeit entgegengesetzt zur eingehenden Richtung
      blueCircle.vx = -(dirx / mag) * blueCircle.speed;
      blueCircle.vy = -(diry / mag) * blueCircle.speed;
      blueCircle.touching = true;
    } else if (!collided) {
      blueCircle.touching = false;
    }

    prevThumbMid.x = mx;
    prevThumbMid.y = my;
  } else {
    // Wenn weniger als zwei Daumen vorhanden sind, reset Touch-Flag damit nächste Kollision zählt
    blueCircle.touching = false;
  }

  // Bewege Kreis
  blueCircle.x += blueCircle.vx;
  blueCircle.y += blueCircle.vy;

  // Kollision mit Canvas-Rändern (Bounce)
  if (blueCircle.x - blueCircle.r < 0) {
    blueCircle.x = blueCircle.r;
    blueCircle.vx *= -1;
  } else if (blueCircle.x + blueCircle.r > width) {
    blueCircle.x = width - blueCircle.r;
    blueCircle.vx *= -1;
  }
  if (blueCircle.y - blueCircle.r < 0) {
    blueCircle.y = blueCircle.r;
    blueCircle.vy *= -1;
  } else if (blueCircle.y + blueCircle.r > height) {
    blueCircle.y = height - blueCircle.r;
    blueCircle.vy *= -1;
  }

  // Seiten-Rect Berührungs-Check und stabiler Farbwechsel (wechsel sofort beim Kontakt,
  // behalte die neue Farbe bis Kontakt mit dem anderen Rect)
  const touch = checkSideRectTouch(blueCircle);
  handleSideRectColor(blueCircle, touch);
}

/**
 * Update-Logik für den lila Kreis (gleiche Logik wie beim blauen Kreis)
 */
function updatePurpleCircleMovement() {
  // Sammle Daumenspitzen (Index 4) aus allen Händen, skaliert auf Canvas
  const thumbs = [];
  for (let i = 0; i < hands.length; i++) {
    const hand = hands[i];
    if (hand && hand.keypoints && hand.keypoints.length > 4) {
      const kp = hand.keypoints[4];
      thumbs.push({ x: kp.x * ratio, y: kp.y * ratio });
    }
  }

  if (thumbs.length >= 2) {
    const a = thumbs[0];
    const b = thumbs[1];
    const mx = (a.x + b.x) / 2;
    const my = (a.y + b.y) / 2;

    // Bewegungsvektor der Daumenmitte seit letztem Frame (für lila Kreis separat)
    const mvx = mx - prevThumbMidPurple.x;
    const mvy = my - prevThumbMidPurple.y;

    // Prüfe Kollision zwischen Segment a-b und Kreis
    const collided = segmentCircleCollision(a, b, purpleCircle);

    if (collided && !purpleCircle.touching) {
      // Bestimme eingehende Richtung: bevorzugt Bewegungsvektor, sonst Linienrichtung
      let dirx = mvx;
      let diry = mvy;
      let mag = sqrt(dirx * dirx + diry * diry);
      if (mag < 0.5) {
        dirx = b.x - a.x;
        diry = b.y - a.y;
        mag = sqrt(dirx * dirx + diry * diry) || 1;
      }
      // Setze die Geschwindigkeit entgegengesetzt zur eingehenden Richtung
      purpleCircle.vx = -(dirx / mag) * purpleCircle.speed;
      purpleCircle.vy = -(diry / mag) * purpleCircle.speed;
      purpleCircle.touching = true;
    } else if (!collided) {
      purpleCircle.touching = false;
    }

    prevThumbMidPurple.x = mx;
    prevThumbMidPurple.y = my;
  } else {
    // Wenn weniger als zwei Daumen vorhanden sind, reset Touch-Flag damit nächste Kollision zählt
    purpleCircle.touching = false;
  }

  // Bewege Kreis
  purpleCircle.x += purpleCircle.vx;
  purpleCircle.y += purpleCircle.vy;

  // Kollision mit Canvas-Rändern (Bounce)
  if (purpleCircle.x - purpleCircle.r < 0) {
    purpleCircle.x = purpleCircle.r;
    purpleCircle.vx *= -1;
  } else if (purpleCircle.x + purpleCircle.r > width) {
    purpleCircle.x = width - purpleCircle.r;
    purpleCircle.vx *= -1;
  }
  if (purpleCircle.y - purpleCircle.r < 0) {
    purpleCircle.y = purpleCircle.r;
    purpleCircle.vy *= -1;
  } else if (purpleCircle.y + purpleCircle.r > height) {
    purpleCircle.y = height - purpleCircle.r;
    purpleCircle.vy *= -1;
  }

  // Seiten-Rect Berührungs-Check und stabiler Farbwechsel (wechsel sofort beim Kontakt,
  // behalte die neue Farbe bis Kontakt mit dem anderen Rect)
  const touch = checkSideRectTouch(purpleCircle);
  handleSideRectColor(purpleCircle, touch);
}

/**
 * Update-Logik für die weißen Kreise (4 Stück) - nutzt generische Logik
 */
function updateWhiteCirclesMovement() {
  for (let i = 0; i < whiteCircles.length; i++) {
    updateGenericCircleMovement(whiteCircles[i], prevThumbMidWhites[i]);
  }
}

/**
 * Generische Update-Funktion für einen Kreis (gleiches Verhalten wie blau/lila)
 */
function updateGenericCircleMovement(circle, prevThumb) {
  // Sammle Daumenspitzen (Index 4) aus allen Händen, skaliert auf Canvas
  const thumbs = [];
  for (let i = 0; i < hands.length; i++) {
    const hand = hands[i];
    if (hand && hand.keypoints && hand.keypoints.length > 4) {
      const kp = hand.keypoints[4];
      thumbs.push({ x: kp.x * ratio, y: kp.y * ratio });
    }
  }

  if (thumbs.length >= 2) {
    const a = thumbs[0];
    const b = thumbs[1];
    const mx = (a.x + b.x) / 2;
    const my = (a.y + b.y) / 2;

    // Bewegungsvektor der Daumenmitte seit letztem Frame
    const mvx = mx - prevThumb.x;
    const mvy = my - prevThumb.y;

    // Prüfe Kollision zwischen Segment a-b und Kreis
    const collided = segmentCircleCollision(a, b, circle);

    if (collided && !circle.touching) {
      // Bestimme eingehende Richtung: bevorzugt Bewegungsvektor, sonst Linienrichtung
      let dirx = mvx;
      let diry = mvy;
      let mag = sqrt(dirx * dirx + diry * diry);
      if (mag < 0.5) {
        dirx = b.x - a.x;
        diry = b.y - a.y;
        mag = sqrt(dirx * dirx + diry * diry) || 1;
      }
      // Setze die Geschwindigkeit entgegengesetzt zur eingehenden Richtung
      circle.vx = -(dirx / mag) * circle.speed;
      circle.vy = -(diry / mag) * circle.speed;
      circle.touching = true;
    } else if (!collided) {
      circle.touching = false;
    }

    prevThumb.x = mx;
    prevThumb.y = my;
  } else {
    // Wenn weniger als zwei Daumen vorhanden sind, reset Touch-Flag damit nächste Kollision zählt
    circle.touching = false;
  }

  // Bewege Kreis
  circle.x += circle.vx;
  circle.y += circle.vy;

  // Kollision mit Canvas-Rändern (Bounce)
  if (circle.x - circle.r < 0) {
    circle.x = circle.r;
    circle.vx *= -1;
  } else if (circle.x + circle.r > width) {
    circle.x = width - circle.r;
    circle.vx *= -1;
  }
  if (circle.y - circle.r < 0) {
    circle.y = circle.r;
    circle.vy *= -1;
  } else if (circle.y + circle.r > height) {
    circle.y = height - circle.r;
    circle.vy *= -1;
  }

  // Seiten-Rect Berührungs-Check und stabiler Farbwechsel (wechsel sofort beim Kontakt,
  // behalte die neue Farbe bis Kontakt mit dem anderen Rect)
  const touch = checkSideRectTouch(circle);
  handleSideRectColor(circle, touch);
}

/**
 * Kollisionsabfrage: nächster Punkt auf Segment p1-p2 zur Kreis-Mitte c
 * und prüfe, ob Abstand <= Radius
 */
function segmentCircleCollision(p1, p2, c) {
  const vx = p2.x - p1.x;
  const vy = p2.y - p1.y;
  const wx = c.x - p1.x;
  const wy = c.y - p1.y;
  const len2 = vx * vx + vy * vy;
  let t = 0;
  if (len2 > 0) {
    t = (wx * vx + wy * vy) / len2;
    t = constrain(t, 0, 1);
  }
  const closestX = p1.x + vx * t;
  const closestY = p1.y + vy * t;
  const dx = c.x - closestX;
  const dy = c.y - closestY;
  return (dx * dx + dy * dy) <= (c.r * c.r);
}

function drawBlueCircle() {
  push();
  noStroke();
  fill(blueCircle.color[0], blueCircle.color[1], blueCircle.color[2]);
  circle(blueCircle.x, blueCircle.y, blueCircle.r * 2);
  pop();
}

function drawPurpleCircle() {
  push();
  noStroke();
  fill(purpleCircle.color[0], purpleCircle.color[1], purpleCircle.color[2]);
  circle(purpleCircle.x, purpleCircle.y, purpleCircle.r * 2);
  pop();
}

function drawWhiteCircles() {
  for (let i = 0; i < whiteCircles.length; i++) {
    const c = whiteCircles[i];
    push();
    noStroke();
    fill(c.color[0], c.color[1], c.color[2]);
    circle(c.x, c.y, c.r * 2);
    pop();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  ratio = width / video.width;
}