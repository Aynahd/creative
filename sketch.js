let fireworks = []; // Array to store fireworks

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
}

function draw() {
  background(30, 30, 30, 25); // Dark background with slight transparency for trails

  // Update and display all fireworks
  for (let i = fireworks.length - 1; i >= 0; i--) {
    fireworks[i].update();
    fireworks[i].display();
    
    // Remove the firework if it is done
    if (fireworks[i].isDone()) {
      fireworks.splice(i, 1);
    }
  }
}

function mousePressed() {
  // Create a new firework at the mouse position
  fireworks.push(new Firework(mouseX, mouseY));
}

// Firework class to handle individual fireworks
class Firework {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.particles = [];
    
    // Generate multiple particles for the firework
    for (let i = 0; i < 100; i++) {
      this.particles.push(new Particle(this.x, this.y));
    }
  }

  update() {
    // Update all particles
    for (let particle of this.particles) {
      particle.update();
    }
  }

  display() {
    // Display all particles
    for (let particle of this.particles) {
      particle.display();
    }
  }

  isDone() {
    // Check if all particles are done
    return this.particles.every(p => p.isDone());
  }
}

// Particle class to create firework particles
class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = random(-3, 3); // Random horizontal velocity
    this.vy = random(-3, 3); // Random vertical velocity
    this.alpha = 255; // Initial transparency
    this.color = color(random(255), random(255), random(255)); // Random color
  }

  update() {
    // Update position
    this.x += this.vx;
    this.y += this.vy;

    // Gradually fade out
    this.alpha -= 4;
  }

  display() {
    fill(this.color.levels[0], this.color.levels[1], this.color.levels[2], this.alpha);
    ellipse(this.x, this.y, 5); // Particle size
  }

  isDone() {
    // Particle is done when it is fully transparent
    return this.alpha <= 0;
  }
}
