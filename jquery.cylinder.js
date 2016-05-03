(function($) {
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
      ry: 15,
      fill: '#669900'
    };
    topEllipseAttr.cx = topEllipseAttr.rx;
    topEllipseAttr.cy = topEllipseAttr.ry;
    
    var rectAttr = {
      x: 0,
      y: 15,
      height: config.height,
      width: config.width,
      fill: '#88cc00'
    }
            
    var bottomEllipseAttr = {
      rx: (config.width / 2),
      ry: 15,
      fill: '#88cc00'
    };
    bottomEllipseAttr.cx = bottomEllipseAttr.rx;
    bottomEllipseAttr.cy = (bottomEllipseAttr.ry + config.height);
    
    var topEllipse = $(document.createElementNS("http://www.w3.org/2000/svg", "ellipse")).attr(topEllipseAttr),
        rect = $(document.createElementNS("http://www.w3.org/2000/svg", "rect")).attr(rectAttr),
        bottomEllipse = $(document.createElementNS("http://www.w3.org/2000/svg", "ellipse")).attr(bottomEllipseAttr);
    
    this.append(
      $(document.createElementNS("http://www.w3.org/2000/svg", "svg"))
      .height(config.height + 30)
      .append(bottomEllipse)
      .append(rect)
      .append(topEllipse)
    );
    console.log(this);
  }
}(jQuery));
