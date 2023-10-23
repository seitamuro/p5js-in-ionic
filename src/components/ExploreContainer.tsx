import './ExploreContainer.css';
import Sketch from "react-p5"
import p5Types from "p5";
import { useState } from 'react';

interface ContainerProps {
  name: string;
}

const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {
  const [_x, setX] = useState(50);
  const [_y, setY] = useState(50);
  const [_max_speed, setMaxSpeed] = useState(20);
  const [_direction_x, setDirectionX] = useState(1);
  const [_direction_y, setDirectionY] = useState(1);

  let x = _x;
  let y = _y;
  let max_speed = _max_speed;
  let direction_x = _direction_x;
  let direction_y = _direction_y;

  const save_variables = () => {
    setX(x);
    setY(y);
    setMaxSpeed(max_speed);
    setDirectionX(direction_x);
    setDirectionY(direction_y);
  }

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    const direction = p5.random(0, max_speed*100) / 100;
    p5.createCanvas(p5.windowWidth, p5.windowHeight/2).parent(canvasParentRef);
    direction_x = direction;
    direction_y = p5.sqrt(max_speed * max_speed - direction * direction);
    save_variables();
  }

  const draw = (p5: p5Types) => {
    p5.background(0);
    const theta = p5.map(x, 0, p5.width, 0, p5.PI / 2);
    p5.fill(255 * Math.cos(theta), 255 * Math.sin(theta), 255 * Math.cos(theta));
    p5.ellipse(x, y, 70, 70);
    x += direction_x;
    y += direction_y;

    if (x > p5.width) {
      direction_x *= -1;
    } else if (x < 0) {
      direction_x *= -1;
    }

    if (y > p5.height) {
      direction_y *= -1;
    } else if (y < 0) {
      direction_y *= -1;
    }
    save_variables();
  }

  const windowResized = (p5: p5Types) => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
    if (x > p5.windowHeight) { 
      y = p5.windowHeight;
    }

    if (y > p5.windowWidth) {
      x = p5.windowWidth;
    }
    save_variables();
  }

  return <>
  <Sketch setup={setup} draw={draw} windowResized={windowResized} />
  <div>↑は始めてのp5.js in ionicです．</div>
  </>;
};

export default ExploreContainer;
