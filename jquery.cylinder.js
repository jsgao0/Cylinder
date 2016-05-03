/*
Version: 0.1.0
Project Name: Cylinder
Purpose: Draw the cylinders as SVG.
Date: 2016/05/03
Author: jsgao0
*/


    (function($) {
      $.fn.scenario = function scenario(config, svgData) {
        var defaultConfig = {
          width: 900
        };
        if(!config) config = {};
        
        config = {
          width: config.width || defaultConfig.width
        };
        
        var canvasSVG = $(document.createElementNS("http://www.w3.org/2000/svg", "svg")).height(240).width(config.width);
        var axes = {
          x: ['LINE1', 'LINE2', 'LINE3'],
          y: ['100.00%', '95.00%', '90.00%', '85.00%', '80.00%']
        };
        var ySVG = [].reduce.call(axes.y, function(pre, cur, idx) {
          var text = $(document.createElementNS("http://www.w3.org/2000/svg", "text"))
                      .text(cur)
                      .attr({
                        'x': 60,
                        'y': 60 + idx * 40,
                        'fill': "#000",
                        'text-anchor': "end" // Align text right.
                      });
          var line = $(document.createElementNS("http://www.w3.org/2000/svg", "polyline"))
                      .attr({
                        'points': '65,' + (55 + idx * 40) + ' 70,' + (55 + idx * 40) + ' 100,' + (35 + idx * 40) + ' ' + config.width + ',' + (35 + idx * 40),
                        'fill': 'none',
                        'stroke': '#000',
                        'stroke-width': 1
                      });
          $(pre).append(text).append(line);
          return pre;
        }, canvasSVG);
        
        var xSVG = [].reduce.call(axes.x, function(pre, cur, idx) {
          var text = $(document.createElementNS("http://www.w3.org/2000/svg", "text"))
                      .text(cur)
                      .attr({
                        'x': 150 + idx * 130,
                        'y': 240,
                        'fill': "#000",
                        'text-anchor': 'middle'
                      });
          $(pre).append(text);
          return pre;
        }, canvasSVG);
        
        canvasSVG.append(
          $(document.createElementNS("http://www.w3.org/2000/svg", "polyline"))
          .attr({
            'points': '70,55 70,215 ' + (config.width - 30) + ',215 ' + config.width + ',195',
            'fill': 'none',
            'stroke': '#000',
            'stroke-width': 1
          })
        );
        
        if(!svgData || !Array.isArray(svgData)) return this.append(canvasSVG);
        
        [].forEach.call(svgData, function(cylinder, idx) {
          var tx = 100 + idx * $(cylinder).width(),
              ty = 240 - $(cylinder).height() - 10,
              dx = Math.floor(idx / 3) * 30;
          var cylinderContainer = $(document.createElementNS("http://www.w3.org/2000/svg", "g"))
                                    .attr({
                                      'transform': 'translate('+ (tx + dx) + ',' + ty + ')'
                                    });
          cylinderContainer.append($(cylinder));
          canvasSVG.append(cylinderContainer);
        });
        return this.append(canvasSVG);
      };
      
      
      $.fn.cylinder = function cylinder(config) {
        var defaultConfig = {
          height: 30,
          width: 15,
          color: {
            head: '#669900',
            body: '#88cc00'
          }
        };
        if(!config) config = {};
        if(!config.color) config.color = {};
        
        config = {
          height: config.height || defaultConfig.height,
          width: config.width || defaultConfig.width,
          color: {
            head: config.color.head || defaultConfig.color.head,
            body: config.color.body || defaultConfig.color.body
          }
        };
        
        var topEllipseAttr = {
          rx: (config.width / 2),
          ry: 5,
          fill: '#669900'
        };
        topEllipseAttr.cx = topEllipseAttr.rx;
        topEllipseAttr.cy = topEllipseAttr.ry;
        
        var rectAttr = {
          x: 0,
          y: 5,
          height: config.height,
          width: config.width,
          fill: '#88cc00'
        }
                
        var bottomEllipseAttr = {
          rx: (config.width / 2),
          ry: 5,
          fill: '#88cc00'
        };
        bottomEllipseAttr.cx = bottomEllipseAttr.rx;
        bottomEllipseAttr.cy = (bottomEllipseAttr.ry + config.height);
        
        var topEllipse = $(document.createElementNS("http://www.w3.org/2000/svg", "ellipse")).attr(topEllipseAttr),
            rect = $(document.createElementNS("http://www.w3.org/2000/svg", "rect")).attr(rectAttr),
            bottomEllipse = $(document.createElementNS("http://www.w3.org/2000/svg", "ellipse")).attr(bottomEllipseAttr);
        
        
        var result = $(document.createElementNS("http://www.w3.org/2000/svg", "svg"))
          .height(config.height + 30)
          .width(config.width)
          .append(bottomEllipse)
          .append(rect)
          .append(topEllipse);
        
        this.append(result);
        return result;
        
      }
    }(jQuery));
