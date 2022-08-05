import React from 'react';
import { SVG } from '@svgdotjs/svg.js';
import css from './Playfield.module.css';


export const playfield = new class {
  create(playfieldHolder, {level}, gameData, handleGameButtonClick) {
    this.canvas = SVG()
      .attr('id', 'playfield')
      .addClass(css.playfield)
      .addTo(playfieldHolder)
    ;
    this.basisSizes = this.canvas.rbox();
    this.indexes = gameData.indexes;
    this.createControllers(gameData, handleGameButtonClick);
    this.createFigure(gameData);
    this.createScore(gameData);
    this.createInfo(level, gameData);
  }

  createControllers({figureIndex, chosenIndex, result}, handleGameButtonClick) {
    this.cLib = this.canvas.symbol();

    const width = this.basisSizes.width * 0.1,
          height = this.basisSizes.width * 0.1,
          stroke = this.basisSizes.width * 0.012
    ;
    // square
    this.cLib.rect(width, height)
    ;
    // triangle
    this.cLib.path(`M 0 ${height} H ${width} L ${width / 2} ${stroke / 2} z`)
    ;
    // circle
    this.cLib.circle(width, height)
    ;
    // cross
    this.cLib
      .path(`M 0 ${height / 2} H ${width} M ${width / 2} 0 V ${height}`)
      .stroke({linecap: 'round'})
    ;
    // square transparent / button
    this.cLib
      .rect(width + stroke, height + stroke)
      .fill('transparent')
    ;
  
    // wrapping controllers
    this.controllers = this.canvas.nested();
    const cLib = this.cLib.children();
    const lastIndex = cLib.length - 1;
    for (let i = 0; i < lastIndex; i++) {
      const index = this.indexes[i].i
      const group = this.controllers.group();
      group.use(cLib[index]);
      group.use(cLib[lastIndex])
        .move((stroke / 2 + width) * i * 2, 0)
      ;
    }

    // setting general properties
    const groups = this.controllers.children();
    
    for (let i = 0; i < groups.length; i++) {
      const controller = groups[i].children()[0];
      controller
        .stroke({color: 'grey', width: stroke, linejoin: 'round'})
        .fill('none')
        .dmove(stroke / 2 + (stroke / 2 + width) * i * 2, stroke / 2)
      ;

      if (figureIndex !== null) {
        const transRect = groups[i].children()[1];
        transRect.click(() => {
          handleGameButtonClick(i)
        })
      }
    }
    
    if (chosenIndex !== null && result.current) {
      const colors = ['#f00', '#0c0'];
      if (result.current > 0) colors.reverse();
      groups[chosenIndex].children()[0]
        .animate(250, 0, 'now').stroke(colors[0])
        .animate(250, 500, 'now').stroke('#808080')
      ;
    }

    // this complicated calculations because of firefox bug with nested svg
    // for other browsers "controllersWidth = this.controllers.rbox().width" works
    const controllersWidth = (width + stroke) * groups.length + width * (groups.length - 1);
    this.controllers
      .x((this.basisSizes.width - controllersWidth) / 2)
      .y(this.basisSizes.height - height - stroke)
    ;
  }
  
  createFigure({figureIndex}) {
    if (figureIndex === null) return null;
    
    // const index = this.indexes[figureIndex].i
    // const index = indexes[figureIndex].i
    const width = this.basisSizes.width * 0.1,
          height = this.basisSizes.width * 0.1,
          stroke = this.basisSizes.width * 0.012,
          bWidth = this.basisSizes.width,
          bHeight = this.basisSizes.height
    ;
  
    return this.controllers.children()[figureIndex]
      .clone()
      .addTo(this.canvas)
      .move((bWidth - width - stroke) / 2, (bHeight - height - stroke) / 2)
    ;
  }
  
  createScore({result}) {
    const score = this.canvas
      .text(result.total)
      .font({
        family: 'Helvetica, Arial, sans-serif',
        anchor: 'middle',
        size: this.basisSizes.width * 0.02 + 30
      })
    ;

    if (result.current) {
      const sign = result.current > 0 ? '+' : '';
      const colors = ['#f00', '#0c0'];
      if (result.current > 0) colors.reverse();

      score.build(true);
      score
        .tspan(sign + result.current).newLine()
        .font({size: this.basisSizes.width * 0.01 + 15})
        .fill(colors[0])
        .animate(250, 0, 'now').opacity(1)
        .animate(250, 500, 'now').opacity(0)
      ;
      score.build(false);
    }

    const bWidth = this.basisSizes.width;
    score.amove(bWidth / 2, 100)
    
    return score;
  }

  createInfo(level, {errors}) {
    const bWidth = this.basisSizes.width;
    const info = this.canvas.text(function(add) {
        add.tspan('Уровень: ' + level).font({anchor: 'start'}).ax(20);
        add.tspan('Ошибки: ' + errors.current).font({anchor: 'end'}).ax(bWidth - 20);
      })
      .font({
        family: 'Helvetica, Arial, sans-serif',
        size: this.basisSizes.width * 0.01 + 10
      })
      .addClass(css.info)
    ;

    info.y(20)
    
    return info;
  }
}()

