/**
 * Copyright (C) 2014 OSM Buildings, Jan Marsch
 * A leightweight JavaScript library for visualizing building geometry on interactive maps.
 * @osmbuildings, http://osmbuildings.org
 */
//****** file: prefix.js ******

var OSMBuildings = (function() {
  'use strict';


//****** file: shortcuts.js ******

// object access shortcuts
var
  Int32Array = Int32Array || Array,
  Uint8Array = Uint8Array || Array,
  m = Math,
  exp = m.exp,
  log = m.log,
  sin = m.sin,
  cos = m.cos,
  tan = m.tan,
  atan = m.atan,
  atan2 = m.atan2,
  min = m.min,
  max = m.max,
  sqrt = m.sqrt,
  ceil = m.ceil,
  floor = m.floor,
  round = m.round,
  win = window,
  doc = document;

if (!win.console) {
  win.console = {
    log:function() {},
    warn:function() {}
  };
}


//****** file: Color.js ******

var Color = (function() {

    var w3cColors = {
        aliceblue:'#f0f8ff',
        antiquewhite:'#faebd7',
        aqua:'#00ffff',
        aquamarine:'#7fffd4',
        azure:'#f0ffff',
        beige:'#f5f5dc',
        bisque:'#ffe4c4',
        black:'#000000',
        blanchedalmond:'#ffebcd',
        blue:'#0000ff',
        blueviolet:'#8a2be2',
        brown:'#a52a2a',
        burlywood:'#deb887',
        cadetblue:'#5f9ea0',
        chartreuse:'#7fff00',
        chocolate:'#d2691e',
        coral:'#ff7f50',
        cornflowerblue:'#6495ed',
        cornsilk:'#fff8dc',
        crimson:'#dc143c',
        cyan:'#00ffff',
        darkblue:'#00008b',
        darkcyan:'#008b8b',
        darkgoldenrod:'#b8860b',
        darkgray:'#a9a9a9',
        darkgreen:'#006400',
        darkkhaki:'#bdb76b',
        darkmagenta:'#8b008b',
        darkolivegreen:'#556b2f',
        darkorange:'#ff8c00',
        darkorchid:'#9932cc',
        darkred:'#8b0000',
        darksalmon:'#e9967a',
        darkseagreen:'#8fbc8f',
        darkslateblue:'#483d8b',
        darkslategray:'#2f4f4f',
        darkturquoise:'#00ced1',
        darkviolet:'#9400d3',
        deeppink:'#ff1493',
        deepskyblue:'#00bfff',
        dimgray:'#696969',
        dodgerblue:'#1e90ff',
        firebrick:'#b22222',
        floralwhite:'#fffaf0',
        forestgreen:'#228b22',
        fuchsia:'#ff00ff',
        gainsboro:'#dcdcdc',
        ghostwhite:'#f8f8ff',
        gold:'#ffd700',
        goldenrod:'#daa520',
        gray:'#808080',
        green:'#008000',
        greenyellow:'#adff2f',
        honeydew:'#f0fff0',
        hotpink:'#ff69b4',
        indianred :'#cd5c5c',
        indigo :'#4b0082',
        ivory:'#fffff0',
        khaki:'#f0e68c',
        lavender:'#e6e6fa',
        lavenderblush:'#fff0f5',
        lawngreen:'#7cfc00',
        lemonchiffon:'#fffacd',
        lightblue:'#add8e6',
        lightcoral:'#f08080',
        lightcyan:'#e0ffff',
        lightgoldenrodyellow:'#fafad2',
        lightgray:'#d3d3d3',
        lightgreen:'#90ee90',
        lightpink:'#ffb6c1',
        lightsalmon:'#ffa07a',
        lightseagreen:'#20b2aa',
        lightskyblue:'#87cefa',
        lightslategray:'#778899',
        lightsteelblue:'#b0c4de',
        lightyellow:'#ffffe0',
        lime:'#00ff00',
        limegreen:'#32cd32',
        linen:'#faf0e6',
        magenta:'#ff00ff',
        maroon:'#800000',
        mediumaquamarine:'#66cdaa',
        mediumblue:'#0000cd',
        mediumorchid:'#ba55d3',
        mediumpurple:'#9370db',
        mediumseagreen:'#3cb371',
        mediumslateblue:'#7b68ee',
        mediumspringgreen:'#00fa9a',
        mediumturquoise:'#48d1cc',
        mediumvioletred:'#c71585',
        midnightblue:'#191970',
        mintcream:'#f5fffa',
        mistyrose:'#ffe4e1',
        moccasin:'#ffe4b5',
        navajowhite:'#ffdead',
        navy:'#000080',
        oldlace:'#fdf5e6',
        olive:'#808000',
        olivedrab:'#6b8e23',
        orange:'#ffa500',
        orangered:'#ff4500',
        orchid:'#da70d6',
        palegoldenrod:'#eee8aa',
        palegreen:'#98fb98',
        paleturquoise:'#afeeee',
        palevioletred:'#db7093',
        papayawhip:'#ffefd5',
        peachpuff:'#ffdab9',
        peru:'#cd853f',
        pink:'#ffc0cb',
        plum:'#dda0dd',
        powderblue:'#b0e0e6',
        purple:'#800080',
        red:'#ff0000',
        rosybrown:'#bc8f8f',
        royalblue:'#4169e1',
        saddlebrown:'#8b4513',
        salmon:'#fa8072',
        sandybrown:'#f4a460',
        seagreen:'#2e8b57',
        seashell:'#fff5ee',
        sienna:'#a0522d',
        silver:'#c0c0c0',
        skyblue:'#87ceeb',
        slateblue:'#6a5acd',
        slategray:'#708090',
        snow:'#fffafa',
        springgreen:'#00ff7f',
        steelblue:'#4682b4',
        tan:'#d2b48c',
        teal:'#008080',
        thistle:'#d8bfd8',
        tomato:'#ff6347',
        turquoise:'#40e0d0',
        violet:'#ee82ee',
        wheat:'#f5deb3',
        white:'#ffffff',
        whitesmoke:'#f5f5f5',
        yellow:'#ffff00',
        yellowgreen:'#9acd32'
    };

    function hsla2rgb(hsla) { // h belongs to [0, 360]; s,l,a belong to [0, 1]
        var r, g, b;

        if (hsla.s === 0) {
            r = g = b = hsla.l; // achromatic
        } else {
            var q = hsla.l < 0.5 ? hsla.l * (1+hsla.s) : hsla.l + hsla.s - hsla.l * hsla.s,
                p = 2 * hsla.l-q;
            hsla.h /= 360;
            r = hue2rgb(p, q, hsla.h + 1/3);
            g = hue2rgb(p, q, hsla.h);
            b = hue2rgb(p, q, hsla.h - 1/3);
        }
        return new Color(
            r * 255 <<0,
            g * 255 <<0,
            b * 255 <<0,
            hsla.a
        );
    }

    function hue2rgb(p, q, t) {
        if (t < 0) {
            t += 1;
        }
        if (t > 1) {
            t -= 1;
        }
        if (t < 1 / 6) {
            return p + (q-p) * 6 * t;
        }
        if (t < 1 / 2) {
            return q;
        }
        if (t < 2 / 3) {
            return p + (q-p) * (2/3 - t) * 6;
        }
        return p;
    }

    function Color(r, g, b, a) { // r,g,b belong to [0, 255]; a belongs to [0,1]
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = arguments.length < 4 ? 1 : a;
    }

    var proto = Color.prototype;

    proto.toString = function() {
//        if (this.a === 1) {
//            return '#' + ((1 << 24) + (this.r << 16) + (this.g << 8) + this.b).toString(16).slice(1, 7);
//        }
        return 'rgba(' + [this.r <<0, this.g <<0, this.b <<0, this.a.toFixed(2)].join(',') + ')';
    };

    proto.setLightness = function(l) {
        var hsla = Color.toHSLA(this);
        hsla.l *= l;
        hsla.l = Math.min(1, Math.max(0, hsla.l));
        return hsla2rgb(hsla);
    };

    proto.setAlpha = function(a) {
        return new Color(this.r, this.g, this.b, this.a * a);
    };

    /*
     * str can be in any of the following forms:
     * "#[00-ff][00-ff][00-ff]", "#[00-ff][00-ff][00-ff][00-ff]",
     * "rgb([0-255],[0-255],[0-255])", "rgba([0-255],[0-255],[0-255],[0-1])",
     * "hsl([0-360],[0-1],[0-1])", "hsla([0-360],[0-1],[0-1],[0-1])"
     */
    Color.parse = function(str) {
        var m;
        str += '';
        str = w3cColors[str] || str;
        if (~str.indexOf('#') && (m = str.match(/^#?(\w{2})(\w{2})(\w{2})(\w{2})?$/))) {
            return new Color(
                parseInt(m[1], 16),
                parseInt(m[2], 16),
                parseInt(m[3], 16),
                m[4] ? parseInt(m[4], 16) / 255 : 1
            );
        }

        if ((m = str.match(/rgba?\((\d+)\D+(\d+)\D+(\d+)(\D+([\d.]+))?\)/))) {
            return new Color(
                parseInt(m[1], 10),
                parseInt(m[2], 10),
                parseInt(m[3], 10),
                m[4] ? parseFloat(m[5]) : 1
            );
        }

        if ((m = str.match(/hsla?\(([\d.]+)\D+([\d.]+)\D+([\d.]+)(\D+([\d.]+))?\)/))) {
            return hsla2rgb({
                h: parseInt(m[1], 10),
                s: parseFloat(m[2]),
                l: parseFloat(m[3]),
                a: m[4] ? parseFloat(m[5]) : 1
            });
        }
    };

    Color.toHSLA = function(rgba) { // r,g,b belong to [0, 255]; a belongs to [0,1]
        var r = rgba.r/255,
            g = rgba.g/255,
            b = rgba.b/255,
            max = Math.max(r, g, b), min = Math.min(r, g, b),
            h, s, l = (max+min) / 2,
            d;

        if (max === min) {
            h = s = 0; // achromatic
        } else {
            d = max-min;
            s = l > 0.5 ? d / (2-max-min) : d / (max+min);
            switch (max) {
                case r: h = (g-b) / d + (g < b ? 6 : 0); break;
                case g: h = (b-r) / d + 2; break;
                case b: h = (r-g) / d + 4; break;
            }
            h /= 6;
        }

        return { h:h*360, s:s, l:l, a:rgba.a };
    };

    return Color;

}());


//****** file: SunPosition.js ******

// calculations are based on http://aa.quae.nl/en/reken/zonpositie.html
// code credits to Vladimir Agafonkin (@mourner)

var getSunPosition = (function() {

    var m = Math,
      PI = m.PI,
      sin = m.sin,
      cos = m.cos,
      tan = m.tan,
      asin = m.asin,
      atan = m.atan2;

    var rad = PI/180,
      dayMs = 1000*60*60*24,
      J1970 = 2440588,
      J2000 = 2451545,
      e = rad*23.4397; // obliquity of the Earth

    function toJulian(date) {
      return date.valueOf()/dayMs - 0.5+J1970;
    }
    function toDays(date) {
      return toJulian(date)-J2000;
    }
    function getRightAscension(l, b) {
      return atan(sin(l)*cos(e) - tan(b)*sin(e), cos(l));
    }
    function getDeclination(l, b) {
      return asin(sin(b)*cos(e) + cos(b)*sin(e)*sin(l));
    }
    function getAzimuth(H, phi, dec) {
      return atan(sin(H), cos(H)*sin(phi) - tan(dec)*cos(phi));
    }
    function getAltitude(H, phi, dec) {
      return asin(sin(phi)*sin(dec) + cos(phi)*cos(dec)*cos(H));
    }
    function getSiderealTime(d, lw) {
      return rad * (280.16 + 360.9856235*d) - lw;
    }
    function getSolarMeanAnomaly(d) {
      return rad * (357.5291 + 0.98560028*d);
    }
    function getEquationOfCenter(M) {
      return rad * (1.9148*sin(M) + 0.0200 * sin(2*M) + 0.0003 * sin(3*M));
    }
    function getEclipticLongitude(M, C) {
      var P = rad*102.9372; // perihelion of the Earth
      return M+C+P+PI;
    }

    return function getSunPosition(date, lat, lon) {
      var lw = rad*-lon,
        phi = rad*lat,
        d = toDays(date),
        M = getSolarMeanAnomaly(d),
        C = getEquationOfCenter(M),
        L = getEclipticLongitude(M, C),
        D = getDeclination(L, 0),
        A = getRightAscension(L, 0),
        t = getSiderealTime(d, lw),
        H = t-A;

      return {
        altitude: getAltitude(H, phi, D),
        azimuth: getAzimuth(H, phi, D) - PI/2 // origin: north
      };
    };

}());


//****** file: Import.js ******

var Import = {

    YARD_TO_METER: 0.9144,
    FOOT_TO_METER: 0.3048,
    INCH_TO_METER: 0.0254,
    METERS_PER_LEVEL: 3,

    clockwise: 'CW',
    counterClockwise: 'CCW',

    // detect winding direction: clockwise or counter clockwise
    getWinding: function(points) {
      var x1, y1, x2, y2,
        a = 0,
        i, il;
      for (i = 0, il = points.length-3; i < il; i += 2) {
        x1 = points[i];
        y1 = points[i+1];
        x2 = points[i+2];
        y2 = points[i+3];
        a += x1*y2 - x2*y1;
      }
      return (a/2) > 0 ? this.clockwise : this.counterClockwise;
    },

    // enforce a polygon winding direcetion. Needed for proper backface culling.
    makeWinding: function(points, direction) {
      var winding = this.getWinding(points);
      if (winding === direction) {
        return points;
      }
      var revPoints = [];
      for (var i = points.length-2; i >= 0; i -= 2) {
        revPoints.push(points[i], points[i+1]);
      }
      return revPoints;
    },

    toMeters: function(str) {
      str = '' + str;
      var value = parseFloat(str);
      if (value === str) {
        return value <<0;
      }
      if (~str.indexOf('m')) {
        return value <<0;
      }
      if (~str.indexOf('yd')) {
        return value*this.YARD_TO_METER <<0;
      }
      if (~str.indexOf('ft')) {
        return value*this.FOOT_TO_METER <<0;
      }
      if (~str.indexOf('\'')) {
        var parts = str.split('\'');
        var res = parts[0]*this.FOOT_TO_METER + parts[1]*this.INCH_TO_METER;
        return res <<0;
      }
      return value <<0;
    },

    getRadius: function(points) {
      var minLat = 90, maxLat = -90;
      for (var i = 0, il = points.length; i < il; i += 2) {
        minLat = min(minLat, points[i]);
        maxLat = max(maxLat, points[i]);
      }

      return (maxLat-minLat) / RAD * 6378137 / 2 <<0; // 6378137 = Earth radius
    },

    materialColors: {
      brick:'#cc7755',
      bronze:'#ffeecc',
      canvas:'#fff8f0',
      concrete:'#999999',
      copper:'#a0e0d0',
      glass:'#e8f8f8',
      gold:'#ffcc00',
      plants:'#009933',
      metal:'#aaaaaa',
      panel:'#fff8f0',
      plaster:'#999999',
      roof_tiles:'#f08060',
      silver:'#cccccc',
      slate:'#666666',
      stone:'#996666',
      tar_paper:'#333333',
      wood:'#deb887'
    },

    baseMaterials: {
      asphalt:'tar_paper',
      bitumen:'tar_paper',
      block:'stone',
      bricks:'brick',
      glas:'glass',
      glassfront:'glass',
      grass:'plants',
      masonry:'stone',
      granite:'stone',
      panels:'panel',
      paving_stones:'stone',
      plastered:'plaster',
      rooftiles:'roof_tiles',
      roofingfelt:'tar_paper',
      sandstone:'stone',
      sheet:'canvas',
      sheets:'canvas',
      shingle:'tar_paper',
      shingles:'tar_paper',
      slates:'slate',
      steel:'metal',
      tar:'tar_paper',
      tent:'canvas',
      thatch:'plants',
      tile:'roof_tiles',
      tiles:'roof_tiles'
    },

    // cardboard
    // eternit
    // limestone
    // straw

    getMaterialColor: function(str) {
      str = str.toLowerCase();
      if (str[0] === '#') {
        return str;
      }
      return this.materialColors[this.baseMaterials[str] || str] || null;
    }
};


//****** file: GeoJSON.js ******

var readGeoJSON = function(collection, callback) {

  var i, il, j, jl, k, kl,
    res = [],
    feature,
    geometry, properties, coordinates,
    last,
    polygon, footprint, holes,
    lat = 1, lon = 0,
    item;

  for (i = 0, il = collection.length; i < il; i++) {
    feature = collection[i];

    if (feature.type !== 'Feature') {
      continue;
    }

    item = {};

    geometry = feature.geometry;
    properties = feature.properties;

    if (geometry.type === 'LineString') {
      last = coordinates.length-1;
      if (coordinates[0][0] === coordinates[last][0] && coordinates[0][1] === coordinates[last][1]) {
        coordinates = geometry.coordinates;
      }
    }

    if (geometry.type === 'Polygon') {
      coordinates = geometry.coordinates;
    }

    if (geometry.type === 'MultiPolygon') {
      coordinates = geometry.coordinates[0];
    }

    if (!coordinates || callback(feature) === false) {
      continue;
    }

    polygon = coordinates[0];
    footprint = [];
    for (j = 0, jl = polygon.length; j < jl; j++) {
      footprint.push(polygon[j][lat], polygon[j][lon]);
    }

    item.id = properties.id || [footprint[0], footprint[1], properties.height, properties.minHeight].join(',');
    item.footprint = Import.makeWinding(footprint, Import.clockwise);

    holes = [];
    for (j = 1, jl = coordinates.length; j < jl; j++) {
      polygon = coordinates[j];
      holes[j-1] = [];
      for (k = 0, kl = polygon.length; k < kl; k++) {
        holes[j-1].push(polygon[k][lat], polygon[k][lon]);

      }
      holes[j-1] = Import.makeWinding(holes[j-1], Import.counterClockwise);
    }

    if (holes.length) {
      item.holes = holes;
    }

    item.height = Import.toMeters(properties.height) || DEFAULT_HEIGHT;

    if (properties.minHeight) {
      item.minHeight = Import.toMeters(properties.minHeight);
    }

    if (properties.color || properties.wallColor) {
      item.wallColor = properties.color || properties.wallColor;
    }

    if (properties.roofColor) {
      item.roofColor = properties.roofColor;
    }

    res.push(item);
  }

  return res;
};


//****** file: OSMXAPI.js ******

var readOSMXAPI = (function() {

  function isBuilding(data) {
    var tags = data.tags;
    return (tags && !tags.landuse &&
      (tags.building || tags['building:part']) && (!tags.layer || tags.layer >= 0));
  }

//  living:'bricks',
//  nonliving:'tar_paper',
//  worship:'copper'

//  function getBuildingType(tags) {
//    if (tags.amenity === 'place_of_worship') {
//      return 'worship';
//    }
//
//    var type = tags.building;
//    if (type === 'yes' || type === 'roof') {
//      type = tags['building:use'];
//    }
//    if (!type) {
//      type = tags.amenity;
//    }
//
//    switch (type) {
//      case 'apartments':
//      case 'house':
//      case 'residential':
//      case 'hut':
//        return 'living';
//      case 'church':
//        return 'worship';
//    }
//
//    return 'nonliving';
//  }

  function getRelationWays(members) {
    var m, outer, inner = [];
    for (var i = 0, il = members.length; i < il; i++) {
      m = members[i];
      if (m.type !== 'way' || !_ways[m.ref]) {
        continue;
      }
      if (!m.role || m.role === 'outer') {
        outer = _ways[m.ref];
        continue;
      }
      if (m.role === 'inner' || m.role === 'enclave') {
        inner.push(_ways[m.ref]);
        continue;
      }
    }

//  if (outer && outer.tags) {
    if (outer) { // allows tags to be attached to relation - instead of outer way
      return { outer:outer, inner:inner };
    }
  }

  function getFootprint(points) {
    if (!points) {
      return;
    }

    var footprint = [], p;
    for (var i = 0, il = points.length; i < il; i++) {
      p = _nodes[ points[i] ];
      footprint.push(p[0], p[1]);
    }

    // do not close polygon yet
    if (footprint[footprint.length-2] !== footprint[0] && footprint[footprint.length-1] !== footprint[1]) {
      footprint.push(footprint[0], footprint[1]);
    }

    // can't span a polygon with just 2 points (+ start & end)
    if (footprint.length < 8) {
      return;
    }

    return footprint;
  }

  function mergeItems(dst, src) {
    for (var p in src) {
      if (!dst[p]) {
        dst[p] = src[p];
      }
    }
    return dst;
  }

  function filterItem(item, footprint) {
    var res = {},
      tags = item.tags || {};

    if (item.id) {
      res.id = item.id;
    }

    if (footprint) {
      res.footprint = Import.makeWinding(footprint, Import.clockwise);
    }

    if (tags.height) {
      res.height = Import.toMeters(tags.height);
    }
    if (!res.height && tags['building:height']) {
      res.height = Import.toMeters(tags['building:height']);
    }

    if (!res.height && tags.levels) {
      res.height = tags.levels*Import.METERS_PER_LEVEL <<0;
    }
    if (!res.height && tags['building:levels']) {
      res.height = tags['building:levels']*Import.METERS_PER_LEVEL <<0;
    }

    // min_height
    if (tags.min_height) {
      res.minHeight = Import.toMeters(tags.min_height);
    }
    if (!res.minHeight && tags['building:min_height']) {
      res.minHeight = Import.toMeters(tags['building:min_height']);
    }

    if (!res.minHeight && tags.min_level) {
      res.minHeight = tags.min_level*Import.METERS_PER_LEVEL <<0;
    }
    if (!res.minHeight && tags['building:min_level']) {
      res.minHeight = tags['building:min_level']*Import.METERS_PER_LEVEL <<0;
    }

    // wall material
    if (tags['building:material']) {
      res.wallColor = Import.getMaterialColor(tags['building:material']);
    }
    if (tags['building:facade:material']) {
      res.wallColor = Import.getMaterialColor(tags['building:facade:material']);
    }
    if (tags['building:cladding']) {
      res.wallColor = Import.getMaterialColor(tags['building:cladding']);
    }
    // wall color
    if (tags['building:color']) {
      res.wallColor = tags['building:color'];
    }
    if (tags['building:colour']) {
      res.wallColor = tags['building:colour'];
    }

    // roof material
    if (tags['roof:material']) {
      res.roofColor = Import.getMaterialColor(tags['roof:material']);
    }
    if (tags['building:roof:material']) {
      res.roofColor = Import.getMaterialColor(tags['building:roof:material']);
    }
    // roof color
    if (tags['roof:color']) {
      res.roofColor = tags['roof:color'];
    }
    if (tags['roof:colour']) {
      res.roofColor = tags['roof:colour'];
    }
    if (tags['building:roof:color']) {
      res.roofColor = tags['building:roof:color'];
    }
    if (tags['building:roof:colour']) {
      res.roofColor = tags['building:roof:colour'];
    }

    res.height = res.height || DEFAULT_HEIGHT;

    if (tags['roof:shape'] === 'dome' || tags['building:shape'] === 'cylinder' || tags['building:shape'] === 'sphere') {
      res.shape = 'cylinder';
      res.radius = Import.getRadius(res.footprint);
      if (tags['roof:shape'] === 'dome' && tags['roof:height']) {
        res.roofShape = 'cylinder';
        res.roofHeight = Import.toMeters(tags['roof:height']);
        res.height = max(0, res.height-res.roofHeight);
      }
    }

    return res;
  }

  function processNode(node) {
    _nodes[node.id] = [node.lat, node.lon];
  }

  function processWay(way) {
    if (isBuilding(way)) {
      var item, footprint;
      if ((footprint = getFootprint(way.nodes)) && _callback(way) !== false) {
        item = filterItem(way, footprint);
        _res.push(item);
      }
      return;
    }

    var tags = way.tags;
    if (!tags || (!tags.highway && !tags.railway && !tags.landuse)) { // TODO: add more filters
      _ways[way.id] = way;
    }
  }

  function processRelation(relation) {
    var relationWays, outerWay, holes = [],
      item, relItem, outerFootprint, innerFootprint;
    if (!isBuilding(relation) ||
      (relation.tags.type !== 'multipolygon' && relation.tags.type !== 'building') ||
      _callback(relation) === false) {
      return;
    }

    if ((relationWays = getRelationWays(relation.members))) {
      relItem = filterItem(relation);
      if ((outerWay = relationWays.outer)) {
        if ((outerFootprint = getFootprint(outerWay.nodes)) && _callback(outerWay) !== false) {
          item = filterItem(outerWay, outerFootprint);
          for (var i = 0, il = relationWays.inner.length; i < il; i++) {
            if ((innerFootprint = getFootprint(relationWays.inner[i].nodes))) {
              holes.push(Import.makeWinding(innerFootprint, Import.counterClockwise));
            }
          }
          if (holes.length) {
            item.holes = holes;
          }
          _res.push(mergeItems(item, relItem));
        }
      }
    }
  }

  var _nodes, _ways, _res, _callback;

  return function(data, callback) {
    _nodes = {};
    _ways = {};
    _res = [];
    _callback = callback;

    var item;
    for (var i = 0, il = data.length; i < il; i++) {
      item = data[i];
      switch(item.type ) {
        case 'node':     processNode(item);     break;
        case 'way':      processWay(item);      break;
        case 'relation': processRelation(item); break;
      }
    }
    return _res;
  };
})();


//****** file: constants.js ******

// constants, shared to all instances
var VERSION      = '0.1.9a',
  ATTRIBUTION  = '&copy; <a href="http://osmbuildings.org">OSM Buildings</a>',
  OSM_XAPI_URL = 'http://overpass-api.de/api/interpreter?data=[out:json];(way[%22building%22]({s},{w},{n},{e});node(w);way[%22building:part%22=%22yes%22]({s},{w},{n},{e});node(w);relation[%22building%22]({s},{w},{n},{e});way(r);node(w););out;',
//OSM_XAPI_URL = 'http://overpass.osm.rambler.ru/cgi/interpreter?data=[out:json];(way[%22building%22]({s},{w},{n},{e});node(w);way[%22building:part%22=%22yes%22]({s},{w},{n},{e});node(w);relation[%22building%22]({s},{w},{n},{e});way(r);node(w););out;',

  PI         = Math.PI,
  HALF_PI    = PI/2,
  QUARTER_PI = PI/4,
  RAD        = 180/PI,

  MAP_TILE_SIZE  = 256,    // map tile size in pixels
  DATA_TILE_SIZE = 0.0075, // data tile size in geo coordinates, smaller: less data to load but more requests

  MIN_ZOOM = 15,
  DEFAULT_HEIGHT = 5,

  LAT = 'latitude', LON = 'longitude',

  TRUE = true, FALSE = false;


//****** file: geometry.js ******

function getDistance(p1, p2) {
  var dx = p1.x-p2.x,
    dy = p1.y-p2.y;
  return dx*dx + dy*dy;
}

function getSquareSegmentDistance(px, py, p1x, p1y, p2x, p2y) {
  var dx = p2x-p1x, dy = p2y-p1y,
    t;
  if (dx !== 0 || dy !== 0) {
    t = ((px-p1x) * dx + (py-p1y) * dy) / (dx*dx + dy*dy);
    if (t > 1) {
      p1x = p2x;
      p1y = p2y;
    } else if (t > 0) {
      p1x += dx*t;
      p1y += dy*t;
    }
  }
  dx = px-p1x;
  dy = py-p1y;
  return dx*dx + dy*dy;
}

function simplifyPolygon(buffer) {
  var sqTolerance = 2,
    len = buffer.length/2,
    markers = new Uint8Array(len),

    first = 0, last = len-1,

    i,
    maxSqDist,
    sqDist,
    index,
    firstStack = [], lastStack  = [],
    newBuffer  = [];

  markers[first] = markers[last] = 1;

  while (last) {
    maxSqDist = 0;
    for (i = first+1; i < last; i++) {
      sqDist = getSquareSegmentDistance(
        buffer[i    *2], buffer[i    *2 + 1],
        buffer[first*2], buffer[first*2 + 1],
        buffer[last *2], buffer[last *2 + 1]
      );
      if (sqDist > maxSqDist) {
        index = i;
        maxSqDist = sqDist;
      }
    }

    if (maxSqDist > sqTolerance) {
      markers[index] = 1;

      firstStack.push(first);
      lastStack.push(index);

      firstStack.push(index);
      lastStack.push(last);
    }

    first = firstStack.pop();
    last = lastStack.pop();
  }

  for (i = 0; i < len; i++) {
    if (markers[i]) {
      newBuffer.push(buffer[i*2], buffer[i*2 + 1]);
    }
  }

  return newBuffer;
}

function getCenter(poly) {
  var minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  for (var i = 0, il = poly.length-3; i < il; i += 2) {
    minX = min(minX, poly[i]);
    maxX = max(maxX, poly[i]);
    minY = min(minY, poly[i+1]);
    maxY = max(maxY, poly[i+1]);
  }
  return { x:minX+(maxX-minX)/2 <<0, y:minY+(maxY-minY)/2 <<0 };
}

// http://en.wikibooks.org/wiki/Algorithm_Implementation/Geometry/Tangents_between_two_circles
function getTangents(c1, r1, c2, r2) {
  var dx = c1.x-c2.x,
    dy = c1.y-c2.y,
    dr = r1-r2,
    sqdist = (dx*dx) + (dy*dy);

  if (sqdist <= dr*dr) {
    return;
  }

  var dist = sqrt(sqdist),
    vx = -dx/dist,
    vy = -dy/dist,
    c  =  dr/dist,
    res = [],
    h, nx, ny;

  // Let A, B be the centers, and C, D be points at which the tangent
  // touches first and second circle, and n be the normal vector to it.
  //
  // We have the system:
  //   n * n = 1    (n is a unit vector)
  //   C = A + r1 * n
  //   D = B + r2 * n
  //   n * CD = 0   (common orthogonality)
  //
  // n * CD = n * (AB + r2*n - r1*n) = AB*n - (r1 -/+ r2) = 0,  <=>
  // AB * n = (r1 -/+ r2), <=>
  // v * n = (r1 -/+ r2) / d,  where v = AB/|AB| = AB/d
  // This is a linear equation in unknown vector n.
  // Now we're just intersecting a line with a circle: v*n=c, n*n=1

  h = sqrt(max(0, 1 - c*c));
  for (var sign = 1; sign >= -1; sign -= 2) {
    nx = vx*c - sign*h*vy;
    ny = vy*c + sign*h*vx;
    res.push({
      x1: c1.x + r1*nx <<0,
      y1: c1.y + r1*ny <<0,
      x2: c2.x + r2*nx <<0,
      y2: c2.y + r2*ny <<0
    });
  }

  return res;
}


//****** file: variables.js ******

// private variables, specific to an instance
var
  WIDTH = 0, HEIGHT = 0, // though this looks like a constant it's needed for distinguishing from local vars
  HALF_WIDTH = 0, HALF_HEIGHT = 0,
  originX = 0, originY = 0,
  zoom, size,

  activeRequest,

  defaultWallColor = new Color(200, 190, 180),
  defaultAltColor  = defaultWallColor.setLightness(0.8),
  defaultRoofColor = defaultWallColor.setLightness(1.2),

  wallColorAlpha = defaultWallColor + '',
  altColorAlpha  = defaultAltColor + '',
  roofColorAlpha = defaultRoofColor + '',

  fadeFactor = 1,
  animTimer,
  ZOOM_ALPHA = 1,

  minZoom = MIN_ZOOM,
  maxZoom = 20,
  maxHeight,

  camX, camY, camZ = 450,

  isZooming;


//****** file: functions.js ******

function pixelToGeo(x, y) {
  var res = {};
  x /= size;
  y /= size;
  res[LAT] = y <= 0  ? 90 : y >= 1 ? -90 : RAD * (2 * atan(exp(PI * (1 - 2*y))) - HALF_PI),
  res[LON] = (x === 1 ?  1 : (x%1 + 1) % 1) * 360 - 180;
  return res;
}

function geoToPixel(lat, lon) {
  var latitude  = min(1, max(0, 0.5 - (log(tan(QUARTER_PI + HALF_PI * lat / 180)) / PI) / 2)),
    longitude = lon/360 + 0.5;
  return {
    x: longitude*size <<0,
    y: latitude *size <<0
  };
}

function fromRange(sVal, sMin, sMax, dMin, dMax) {
  sVal = min(max(sVal, sMin), sMax);
  var rel = (sVal-sMin) / (sMax-sMin),
    range = dMax-dMin;
  return min(max(dMin + rel*range, dMin), dMax);
}

function xhr(url, param, callback) {
  url = url.replace(/\{ *([\w_]+) *\}/g, function(tag, key) {
    return param[key] || tag;
  });

  var req = 'XDomainRequest' in win ? new XDomainRequest() : new XMLHttpRequest();

  function changeState(state) {
    if ('XDomainRequest' in win && state !== req.readyState) {
      req.readyState = state;
      if (req.onreadystatechange) {
        req.onreadystatechange();
      }
    }
  }

  req.onerror = function() {
    req.status = 500;
    req.statusText = 'Error';
    changeState(4);
  };

  req.ontimeout = function() {
    req.status = 408;
    req.statusText = 'Timeout';
    changeState(4);
  };

  req.onprogress = function() {
    changeState(3);
  };

  req.onload = function() {
    req.status = 200;
    req.statusText = 'Ok';
    changeState(4);
  };

  req.onreadystatechange = function() {
    if (req.readyState !== 4) {
      return;
    }
    if (!req.status || req.status < 200 || req.status > 299) {
      return;
    }
    if (callback && req.responseText) {
      callback(JSON.parse(req.responseText));
    }
  };

  changeState(0);
  req.open('GET', url);
  changeState(1);
  req.send(null);
  changeState(2);

  return req;
}

//function extend(dst, src) {
//  for (var p in src) {
//    if (src.hasOwnProperty(p)) {
//      dst[p] = src[p];
//    }
//  }
//}


//****** file: Cache.js ******

var Cache = {

  time: new Date(),
  data: {},

  add: function(data, key) {
    this.data[key] = { data:data, time:Date.now() };
  },

  get: function(key) {
    return this.data[key] && this.data[key].data;
  },

  purge: function() {
    this.time.setMinutes(this.time.getMinutes()-5);
    for (var key in this.data) {
      if (this.data[key].time < this.time) {
        delete this.data[key];
      }
    }
  }
};


//****** file: Data.js ******

var Data = {

  currentItemsIndex: {}, // maintain a list of cached items in order to avoid duplicates on tile borders

  items: [],

  cropDecimals: function(num) {
    return parseFloat(num.toFixed(5));
  },

  getPixelFootprint: function(buffer) {
    var footprint = new Int32Array(buffer.length),
      px;

    for (var i = 0, il = buffer.length-1; i < il; i+=2) {
      px = geoToPixel(buffer[i], buffer[i+1]);
      footprint[i]   = px.x;
      footprint[i+1] = px.y;
    }

    footprint = simplifyPolygon(footprint);
    if (footprint.length < 8) { // 3 points & end==start (*2)
      return;
    }

    return footprint;
  },

  createClosure: function(cacheKey) {
    var self = this;
    return function(data) {
      var parsedData = self.parse(data);
      Cache.add(parsedData, cacheKey);
      self.addRenderItems(parsedData, true);
    };
  },

  parse: function(data) {
    if (!data) {
      return [];
    }
    if (data.type === 'FeatureCollection') {
      return readGeoJSON(data.features, this.each);
    }
    if (data.osm3s) { // XAPI
      return readOSMXAPI(data.elements, this.each);
    }
    return [];
  },

  resetItems: function() {
    this.items = [];
    this.currentItemsIndex = {};
  },

  addRenderItems: function(data, allAreNew) {
    var scaledItems = this.scale(data, zoom);
    for (var i = 0, il = scaledItems.length; i < il; i++) {
      if (!this.currentItemsIndex[scaledItems[i].id]) {
        scaledItems[i].scale = allAreNew ? 0 : 1;
        this.items.push(scaledItems[i]);
        this.currentItemsIndex[scaledItems[i].id] = 1;
      }
    }
    fadeIn();
  },

  scale: function(items, zoom) {
    var i, il, j, jl,
      res = [],
      item,
      height, minHeight, footprint,
      color, wallColor, altColor,
      roofColor, roofHeight,
      holes, innerFootprint,
      zoomDelta = maxZoom-zoom,
      // TODO: move this to onZoom
      centerGeo = pixelToGeo(originX+HALF_WIDTH, originY+HALF_HEIGHT),
      metersPerPixel = -40075040 * cos(centerGeo.latitude) / Math.pow(2, zoom+8); // see http://wiki.openstreetmap.org/wiki/Zoom_levels

    for (i = 0, il = items.length; i < il; i++) {
      item = items[i];

      height = item.height >>zoomDelta;

      minHeight = item.minHeight >>zoomDelta;
      if (minHeight > maxHeight) {
        continue;
      }

      if (!(footprint = this.getPixelFootprint(item.footprint))) {
        continue;
      }

      holes = [];
      if (item.holes) {
        // TODO: simplify
        for (j = 0, jl = item.holes.length; j < jl; j++) {
          if ((innerFootprint = this.getPixelFootprint(item.holes[j]))) {
            holes.push(innerFootprint);
          }
        }
      }

      wallColor = null;
      altColor  = null;
      if (item.wallColor) {
        if ((color = Color.parse(item.wallColor))) {
          wallColor = color.setAlpha(ZOOM_ALPHA);
          altColor  = ''+ wallColor.setLightness(0.8);
          wallColor = ''+ wallColor;
        }
      }

      roofColor = null;
      if (item.roofColor) {
        if ((color = Color.parse(item.roofColor))) {
          roofColor = ''+ color.setAlpha(ZOOM_ALPHA);
        }
      }

      roofHeight = item.roofHeight >>zoomDelta;

      if (height <= minHeight && roofHeight <= 0) {
        continue;
      }

      res.push({
        id:         item.id,
        footprint:  footprint,
        height:     min(height, maxHeight),
        minHeight:  minHeight,
        wallColor:  wallColor,
        altColor:   altColor,
        roofColor:  roofColor,
        roofShape:  item.roofShape,
        roofHeight: roofHeight,
        center:     getCenter(footprint),
        holes:      holes.length ? holes : null,
        shape:      item.shape, // TODO: drop footprint
        radius:     item.radius/metersPerPixel
      });
    }

    return res;
  },

  set: function(data) {
    this.isStatic = true;
    this.resetItems();
    this.addRenderItems(this.staticData = this.parse(data), true);
  },

  load: function(url) {
    this.url = url || OSM_XAPI_URL;
    this.isStatic = !/(.+\{[nesw]\}){4,}/.test(this.url);

    if (this.isStatic) {
      this.resetItems();
      xhr(this.url, {}, function(data) {
        this.addRenderItems(this.staticData = this.parse(data), true);
      });
      return;
    }

    this.update();
  },

  update: function() {
    this.resetItems();

    if (zoom < MIN_ZOOM) {
      return;
    }

    if (this.isStatic) {
      this.addRenderItems(this.staticData);
      return;
    }

    if (!this.url) {
      return;
    }

    var lat, lon,
      parsedData, cacheKey,
      nw = pixelToGeo(originX,       originY),
      se = pixelToGeo(originX+WIDTH, originY+HEIGHT),
      sizeLat = DATA_TILE_SIZE,
      sizeLon = DATA_TILE_SIZE*2;

    var bounds = {
      n: ceil( nw.latitude /sizeLat) * sizeLat,
      e: ceil( se.longitude/sizeLon) * sizeLon,
      s: floor(se.latitude /sizeLat) * sizeLat,
      w: floor(nw.longitude/sizeLon) * sizeLon
    };

    for (lat = bounds.s; lat <= bounds.n; lat += sizeLat) {
      for (lon = bounds.w; lon <= bounds.e; lon += sizeLon) {
        lat = this.cropDecimals(lat);
        lon = this.cropDecimals(lon);

        cacheKey = lat +','+ lon;
        if ((parsedData = Cache.get(cacheKey))) {
          this.addRenderItems(parsedData);
        } else {
          xhr(this.url, {
            n: this.cropDecimals(lat+sizeLat),
            e: this.cropDecimals(lon+sizeLon),
            s: lat,
            w: lon
          }, this.createClosure(cacheKey));
        }
      }
    }

    Cache.purge();
  },

  each: function() {}

};


//****** file: Buildings.js ******

var Buildings = {

  project: function(x, y, m) {
    return {
      x: (x-camX) * m + camX <<0,
      y: (y-camY) * m + camY <<0
    };
  },

  drawSolid: function(polygon, _h, _mh, color, altColor) {
    var a = { x:0, y:0 }, b = { x:0, y:0 },
      _a, _b,
      roof = [];
    for (var i = 0, il = polygon.length-3; i < il; i += 2) {
      a.x = polygon[i]  -originX;
      a.y = polygon[i+1]-originY;
      b.x = polygon[i+2]-originX;
      b.y = polygon[i+3]-originY;

      // project 3d to 2d on extruded footprint
      _a = this.project(a.x, a.y, _h);
      _b = this.project(b.x, b.y, _h);

      if (_mh) {
        a = this.project(a.x, a.y, _mh);
        b = this.project(b.x, b.y, _mh);
      }

      // backface culling check
      if ((b.x-a.x) * (_a.y-a.y) > (_a.x-a.x) * (b.y-a.y)) {
        // depending on direction, set wall shading
        if ((a.x < b.x && a.y < b.y) || (a.x > b.x && a.y > b.y)) {
          this.context.fillStyle = altColor;
        } else {
          this.context.fillStyle = color;
        }
        this.drawFace([
          b.x, b.y,
          a.x, a.y,
          _a.x, _a.y,
          _b.x, _b.y
        ]);
      }
      roof[i]   = _a.x;
      roof[i+1] = _a.y;
    }

    return roof;
  },

  drawFace: function(points, stroke, holes) {
    if (!points.length) {
      return;
    }

    var i, il, j, jl;

    this.context.beginPath();

    this.context.moveTo(points[0], points[1]);
    for (i = 2, il = points.length; i < il; i += 2) {
      this.context.lineTo(points[i], points[i+1]);
    }

    if (holes) {
      for (i = 0, il = holes.length; i < il; i++) {
        points = holes[i];
        this.context.moveTo(points[0], points[1]);
        for (j = 2, jl = points.length; j < jl; j += 2) {
          this.context.lineTo(points[j], points[j+1]);
        }
      }
    }

    this.context.closePath();
    if (stroke) {
      this.context.stroke();
    }
    this.context.fill();
  },

  drawCircle: function(c, r, stroke) {
    this.context.beginPath();
    this.context.arc(c.x, c.y, r, 0, PI*2);
    if (stroke) {
      this.context.stroke();
    }
    this.context.fill();
  },

  drawCylinder: function(c, r, h, minHeight, color, altColor) {
    var _h = camZ / (camZ-h),
      _c = this.project(c.x, c.y, _h),
      _r = r*_h,
      a1, a2, col;

    if (minHeight) {
      var _mh = camZ / (camZ-minHeight);
      c = this.project(c.x, c.y, _mh);
      r = r*_mh;
    }

    var t = getTangents(c, r, _c, _r); // common tangents for ground and roof circle

    // no tangents? roof overlaps everything near cam position
    if (t) {
      a1 = atan2(t[0].y1-c.y, t[0].x1-c.x);
      a2 = atan2(t[1].y1-c.y, t[1].x1-c.x);

      if (!altColor) {
        col = Color.parse(color);
        altColor = '' + col.setLightness(0.8);
      }

      this.context.fillStyle = color;
      this.context.beginPath();
      this.context.arc(_c.x, _c.y, _r, HALF_PI, a1, true);
      this.context.arc(c.x, c.y, r, a1, HALF_PI);
      this.context.closePath();
      this.context.fill();

      this.context.fillStyle = altColor;
      this.context.beginPath();
      this.context.arc(_c.x, _c.y, _r, a2, HALF_PI, true);
      this.context.arc(c.x, c.y, r, HALF_PI, a2);
      this.context.closePath();
      this.context.fill();
    }

    return { c:_c, r:_r };
  },

  render: function() {
    this.context.clearRect(0, 0, WIDTH, HEIGHT);

    // show on high zoom levels only and avoid rendering during zoom
    if (zoom < minZoom || isZooming) {
      return;
    }

    var i, il, j, jl,
      item,
      h, _h, mh, _mh,
      sortCam = { x:camX+originX, y:camY+originY },
      vp = {
        minX: originX,
        maxX: originX+WIDTH,
        minY: originY,
        maxY: originY+HEIGHT
      },
      footprint, roof, holes,
      isVisible,
      wallColor, altColor, roofColor,
      dataItems = Data.items;

    dataItems.sort(function(a, b) {
      return (a.minHeight-b.minHeight) || getDistance(b.center, sortCam) - getDistance(a.center, sortCam) || (b.height-a.height);
    });

    for (i = 0, il = dataItems.length; i < il; i++) {
      item = dataItems[i];

      if (Simplified.isSimple(item)) {
        continue;
      }

      isVisible = false;
      footprint = item.footprint;

      for (j = 0, jl = footprint.length - 1; j < jl; j += 2) {
        // checking footprint is sufficient for visibility
        // TODO: pre-filter by data tile position
        if (!isVisible) {
          isVisible = (footprint[j] > vp.minX && footprint[j] < vp.maxX && footprint[j+1] > vp.minY && footprint[j+1] < vp.maxY);
        }
      }

      if (!isVisible) {
        continue;
      }

      // when fading in, use a dynamic height
      h = item.scale < 1 ? item.height*item.scale : item.height;
      // precalculating projection height factor
      _h = camZ / (camZ-h);

      mh = 0;
      _mh = 0;
      if (item.minHeight) {
        mh = item.scale < 1 ? item.minHeight*item.scale : item.minHeight;
        _mh = camZ / (camZ-mh);
      }

      wallColor = item.wallColor || wallColorAlpha;
      altColor  = item.altColor  || altColorAlpha;
      roofColor = item.roofColor || roofColorAlpha;
      this.context.strokeStyle = altColor;

      if (item.shape === 'cylinder') {
        roof = this.drawCylinder(
          { x:item.center.x-originX, y:item.center.y-originY },
          item.radius,
          h, mh,
          wallColor, altColor
        );
        if (item.roofShape === 'cylinder') {
          roof = this.drawCylinder(
            { x:item.center.x-originX, y:item.center.y-originY },
            item.radius,
            h+item.roofHeight, h,
            roofColor
          );
        }
        this.context.fillStyle = roofColor;
        this.drawCircle(roof.c, roof.r, true);
      } else {
        roof = this.drawSolid(footprint, _h, _mh, wallColor, altColor);
        holes = [];
        if (item.holes) {
          for (j = 0, jl = item.holes.length; j < jl; j++) {
            holes[j] = this.drawSolid(item.holes[j], _h, _mh, wallColor, altColor);
          }
        }
        this.context.fillStyle = roofColor;
        this.drawFace(roof, true, holes);
      }
    }
  }
};


//****** file: Shadows.js ******

var Shadows = {

  enabled: true,
  color: '#666666',
  blurColor: '#000000',
  blurSize: 15,
  date: new Date(),
  direction: { x:0, y:0 },

  project: function(x, y, h) {
    return {
      x: x + this.direction.x*h,
      y: y + this.direction.y*h
    };
  },

  cylinder: function(c, r, h, mh) {
    var
      _c = this.project(c.x, c.y, h),
      a1, a2;

    if (mh) {
      c = this.project(c.x, c.y, mh);
    }

    var t = getTangents(c, r, _c, r); // common tangents for ground and roof circle

    // no tangents? roof overlaps everything near cam position
    if (t) {
      a1 = atan2(t[0].y1-c.y, t[0].x1-c.x);
      a2 = atan2(t[1].y1-c.y, t[1].x1-c.x);

      this.context.moveTo(t[1].x2, t[1].y2);
      this.context.arc(_c.x, _c.y, r, a2, a1);
      this.context.arc( c.x,  c.y, r, a1, a2);
    }
  },

  render: function() {
    var center, sun, length, alpha;

    this.context.clearRect(0, 0, WIDTH, HEIGHT);

    // show on high zoom levels only and avoid rendering during zoom
    if (!this.enabled || zoom < minZoom || isZooming) {
      return;
    }

    // TODO: at some point, calculate this just on demand
    center = pixelToGeo(originX+HALF_WIDTH, originY+HALF_HEIGHT);
    sun = getSunPosition(this.date, center.latitude, center.longitude);

    if (sun.altitude <= 0) {
      return;
    }

    length = 1 / tan(sun.altitude);
    alpha = 0.45 / length;
    this.direction.x = cos(sun.azimuth) * length;
    this.direction.y = sin(sun.azimuth) * length;

    var i, il, j, jl, k, kl,
      item,
      f, h, mh,
      x, y,
      footprint,
      mode,
      isVisible,
      ax, ay, bx, by,
      a, b, _a, _b,
      points, locPoints,
      specialItems = [],
      clipping = [],
      dataItems = Data.items;

    this.context.canvas.style.opacity = alpha / (ZOOM_ALPHA * 2);
    this.context.shadowColor = this.blurColor;
    this.context.shadowBlur = this.blurSize * (ZOOM_ALPHA / 2);
    this.context.fillStyle = this.color;
    this.context.beginPath();

    for (i = 0, il = dataItems.length; i < il; i++) {
      item = dataItems[i];

// TODO: no shadows when buildings are too flat => don't add them to this dataItems then
//    if (item.height <= Simplified.MAX_HEIGHT) {
//      continue;
//    }

      isVisible = false;
      f = item.footprint;
      footprint = [];
      for (j = 0, jl = f.length - 1; j < jl; j += 2) {
        footprint[j]   = x = f[j]  -originX;
        footprint[j+1] = y = f[j+1]-originY;

        // TODO: checking footprint is sufficient for visibility - NOT VALID FOR SHADOWS!
        if (!isVisible) {
          isVisible = (x > 0 && x < WIDTH && y > 0 && y < HEIGHT);
        }
      }

      if (!isVisible) {
        continue;
      }

      // when fading in, use a dynamic height
      h = item.scale < 1 ? item.height*item.scale : item.height;

      mh = 0;
      if (item.minHeight) {
        mh = item.scale < 1 ? item.minHeight*item.scale : item.minHeight;
      }

      if (item.shape === 'cylinder') {
        if (item.roofShape === 'cylinder') {
          h += item.roofHeight;
        }
        specialItems.push({
          shape:item.shape,
          center:{ x:item.center.x-originX, y:item.center.y-originY },
          radius:item.radius,
          h:h, mh:mh
        });
        continue;
      }

      mode = null;
      for (j = 0, jl = footprint.length-3; j < jl; j += 2) {
        ax = footprint[j];
        ay = footprint[j+1];
        bx = footprint[j+2];
        by = footprint[j+3];

        _a = this.project(ax, ay, h);
        _b = this.project(bx, by, h);

        if (mh) {
          a = this.project(ax, ay, mh);
          b = this.project(bx, by, mh);
          ax = a.x;
          ay = a.y;
          bx = b.x;
          by = b.y;
        }

        // mode 0: floor edges, mode 1: roof edges
        if ((bx-ax) * (_a.y-ay) > (_a.x-ax) * (by-ay)) {
          if (mode === 1) {
            this.context.lineTo(ax, ay);
          }
          mode = 0;
          if (!j) {
            this.context.moveTo(ax, ay);
          }
          this.context.lineTo(bx, by);
        } else {
          if (mode === 0) {
            this.context.lineTo(_a.x, _a.y);
          }
          mode = 1;
          if (!j) {
            this.context.moveTo(_a.x, _a.y);
          }
          this.context.lineTo(_b.x, _b.y);
        }
      }

      if (!mh) { // if object is hovered, there is no need to clip the footprint
        clipping.push(footprint);
      }

      if (item.holes) {
        for (j = 0, jl = item.holes.length; j < jl; j++) {
          points = item.holes[j];
          locPoints = [points[0]-originX, points[1]-originY];
          this.context.moveTo(locPoints[0], locPoints[1]);
          for (k = 2, kl = points.length; k < kl; k += 2) {
            locPoints[k]   = points[k]-originX;
            locPoints[k+1] = points[k+1]-originY;
            this.context.lineTo(locPoints[k], locPoints[k+1]);
          }
          if (!mh) { // if object is hovered, there is no need to clip a hole
            clipping.push(locPoints);
          }
        }
      }
    }

    for (i = 0, il = specialItems.length; i < il; i++) {
      item = specialItems[i];
      if (item.shape === 'cylinder') {
        this.cylinder(item.center, item.radius, item.h, item.mh);
      }
    }

    this.context.closePath();
    this.context.fill();

    this.context.shadowBlur = null;

    // now draw all the footprints as negative clipping mask
    this.context.globalCompositeOperation = 'destination-out';
    this.context.beginPath();

    for (i = 0, il = clipping.length; i < il; i++) {
      points = clipping[i];
      this.context.moveTo(points[0], points[1]);
      for (j = 2, jl = points.length; j < jl; j += 2) {
        this.context.lineTo(points[j], points[j+1]);
      }
      this.context.lineTo(points[0], points[1]);
    }

    for (i = 0, il = specialItems.length; i < il; i++) {
      item = specialItems[i];
      if (item.shape === 'cylinder' && !item.mh) {
        this.context.moveTo(item.center.x+item.radius, item.center.y);
        this.context.arc(item.center.x, item.center.y, item.radius, 0, PI*2);
      }
    }

    this.context.fillStyle = '#00ff00';
    this.context.fill();
    this.context.globalCompositeOperation = 'source-over';
  }
};


//****** file: Simplified.js ******

var Simplified = {

  isSimple: function(item) {
    return item.height+item.roofHeight <= DEFAULT_HEIGHT && !item.wallColor && !item.roofColor && !item.holes;
  },

  render: function() {
    this.context.clearRect(0, 0, WIDTH, HEIGHT);

    // show on high zoom levels only and avoid rendering during zoom
    if (zoom < minZoom || isZooming) {
      return;
    }

    var i, il, j, jl,
      item,
      f,
      x, y,
      footprint,
      isVisible,
      dataItems = Data.items;

    this.context.beginPath();

    for (i = 0, il = dataItems.length; i < il; i++) {
      item = dataItems[i];
      if (!this.isSimple(item)) {
        continue;
      }

      isVisible = false;
      f = item.footprint;
      footprint = [];
      for (j = 0, jl = f.length-1; j < jl; j += 2) {
        footprint[j]   = x = f[j]  -originX;
        footprint[j+1] = y = f[j+1]-originY;

        // checking footprint is sufficient for visibility
        if (!isVisible) {
          isVisible = (x > 0 && x < WIDTH && y > 0 && y < HEIGHT);
        }
      }

      if (!isVisible) {
        continue;
      }

      this.context.moveTo(footprint[0], footprint[1]);
      for (j = 2, jl = footprint.length-3; j < jl; j += 2) {
        this.context.lineTo(footprint[j], footprint[j+1]);
      }

      this.context.closePath();
    }

    this.context.fillStyle   = roofColorAlpha;
    this.context.strokeStyle = altColorAlpha;

    this.context.stroke();
    this.context.fill();
  }
};


//****** file: Layers.js ******

function fadeIn() {

  if (animTimer) {
    return;
  }

  animTimer = setInterval(function() {
    var dataItems = Data.items,
      isNeeded = false;

    for (var i = 0, il = dataItems.length; i < il; i++) {
      if (dataItems[i].scale < 1) {
        dataItems[i].scale += 0.5*0.2; // amount*easing
        if (dataItems[i].scale > 1) {
          dataItems[i].scale = 1;
        }
        isNeeded = true;
      }
    }

    Layers.render();

    if (!isNeeded) {
      clearInterval(animTimer);
      animTimer = null;
    }
  }, 33);
}

var Layers = {

  container: doc.createElement('DIV'),
  items: [],

  init: function() {
    this.container.style.pointerEvents = 'none';
    this.container.style.position = 'absolute';
    this.container.style.left = 0;
    this.container.style.top  = 0;

    // TODO: improve this to createContext(Layer) => layer.setContext(context)
    Shadows.context    = this.createContext();
    Simplified.context = this.createContext();
    Buildings.context  = this.createContext();
  },

  render: function() {
    Shadows.render();
    Simplified.render();
    Buildings.render();
  },

  createContext: function() {
    var canvas = doc.createElement('CANVAS');
    canvas.style.webkitTransform = 'translate3d(0,0,0)'; // turn on hw acceleration
    canvas.style.imageRendering  = 'optimizeSpeed';
    canvas.style.position = 'absolute';
    canvas.style.left = 0;
    canvas.style.top  = 0;

    var context = canvas.getContext('2d');
    context.lineCap   = 'round';
    context.lineJoin  = 'round';
    context.lineWidth = 1;

    context.mozImageSmoothingEnabled    = false;
    context.webkitImageSmoothingEnabled = false;

    this.items.push(canvas);
    this.container.appendChild(canvas);

    return context;
  },

  appendTo: function(parentNode) {
    parentNode.appendChild(this.container);
  },

  remove: function() {
    this.container.parentNode.removeChild(this.container);
  },

  setSize: function(width, height) {
    for (var i = 0, il = this.items.length; i < il; i++) {
      this.items[i].width  = width;
      this.items[i].height = height;
    }
  },

  // usually called after move: container jumps by move delta, cam is reset
  setPosition: function(x, y) {
    this.container.style.left = x +'px';
    this.container.style.top  = y +'px';
  }
};

Layers.init();

//function debugMarker(p, color, size) {
//  context.fillStyle = color || '#ffcc00';
//  context.beginPath();
//  context.arc(p.x, p.y, size || 3, 0, PI*2, true);
//  context.closePath();
//  context.fill();
//}
//
//function debugLine(a, b, color) {
//  context.strokeStyle = color || '#ff0000';
//  context.beginPath();
//  context.moveTo(a.x, a.y);
//  context.lineTo(b.x, b.y);
//  context.closePath();
//  context.stroke();
//}


//****** file: adapter.js ******

function setOrigin(origin) {
  originX = origin.x;
  originY = origin.y;
}

function setCamOffset(offset) {
  camX = HALF_WIDTH+offset.x;
  camY = HEIGHT   +offset.y;
}

function setSize(size) {
  WIDTH  = size.w;
  HEIGHT = size.h;
  HALF_WIDTH  = WIDTH /2 <<0;
  HALF_HEIGHT = HEIGHT/2 <<0;
  camX = HALF_WIDTH;
  camY = HEIGHT;
  Layers.setSize(WIDTH, HEIGHT);
  maxHeight = camZ-50;
}

function setZoom(z) {
  zoom = z;
  size = MAP_TILE_SIZE <<zoom;

  ZOOM_ALPHA = 1 - fromRange(zoom, minZoom, maxZoom, 0, 0.3);

  wallColorAlpha = defaultWallColor.setAlpha(ZOOM_ALPHA) + '';
  altColorAlpha  = defaultAltColor.setAlpha( ZOOM_ALPHA) + '';
  roofColorAlpha = defaultRoofColor.setAlpha(ZOOM_ALPHA) + '';
}

function onResize(e) {
  setSize(e.width, e.height);
  Layers.render();
  Data.update();
}

function onMoveEnd(e) {
  Layers.render();
  Data.update(); // => fadeIn() => Layers.render()
}

function onZoomStart() {
  isZooming = true;
// effectively clears because of isZooming flag
// TODO: introduce explicit clear()
  Layers.render();
}

function onZoomEnd(e) {
  isZooming = false;
  setZoom(e.zoom);
  Data.update(); // => fadeIn()
  Layers.render();
}


//****** file: Leaflet.js ******

var osmb = function(map) {
    this.offset = { x:0, y:0 };
    map.addLayer(this);
};

var proto = osmb.prototype;

proto.onAdd = function(map) {
    this.map = map;
    Layers.appendTo(map._panes.overlayPane);
    maxZoom = map._layersMaxZoom;

    var off = this.getOffset(),
        po = map.getPixelOrigin();
    setSize({ w:map._size.x, h:map._size.y });
    setOrigin({ x:po.x-off.x, y:po.y-off.y });
    setZoom(map._zoom);

    Layers.setPosition(-off.x, -off.y);

    map.on({
        move:      this.onMove,
        moveend:   this.onMoveEnd,
        zoomstart: this.onZoomStart,
        zoomend:   this.onZoomEnd,
        resize:    this.onResize,
        viewreset: this.onViewReset
    }, this);

    if (map.options.zoomAnimation) {
        map.on('zoomanim', this.onZoom, this);
    }

    if (map.attributionControl) {
        map.attributionControl.addAttribution(ATTRIBUTION);
    }

    Data.update();
};

proto.onRemove = function() {
    var map = this.map;
    if (map.attributionControl) {
        map.attributionControl.removeAttribution(ATTRIBUTION);
    }

    map.off({
        move:      this.onMove,
        moveend:   this.onMoveEnd,
        zoomstart: this.onZoomStart,
        zoomend:   this.onZoomEnd,
        resize:    this.onResize,
        viewreset: this.onViewReset
    }, this);

    if (map.options.zoomAnimation) {
        map.off('zoomanim', this.onZoom, this);
    }
    Layers.remove();
    map = null;
};

proto.onMove = function(e) {
    var off = this.getOffset();
    setCamOffset({ x:this.offset.x-off.x, y:this.offset.y-off.y });
    Buildings.render();
};

proto.onMoveEnd = function(e) {
    if (this.skipMoveEnd) { // moveend is also fired after zoom
        this.skipMoveEnd = false;
        return;
    }
    var map = this.map,
        off = this.getOffset(),
        po = map.getPixelOrigin();

    this.offset = off;
    Layers.setPosition(-off.x, -off.y);
    setCamOffset({ x:0, y:0 });

    setSize({ w:map._size.x, h:map._size.y }); // in case this is triggered by resize
    setOrigin({ x:po.x-off.x, y:po.y-off.y });
    onMoveEnd(e);
};

proto.onZoomStart = function(e) {
    onZoomStart(e);
};

proto.onZoom = function(e) {
//    var map = this.map,
//        scale = map.getZoomScale(e.zoom),
//        offset = map._getCenterOffset(e.center).divideBy(1 - 1/scale),
//        viewportPos = map.containerPointToLayerPoint(map.getSize().multiplyBy(-1)),
//        origin = viewportPos.add(offset).round();
//
//    this.container.style[L.DomUtil.TRANSFORM] = L.DomUtil.getTranslateString((origin.multiplyBy(-1).add(this.getOffset().multiplyBy(-1)).multiplyBy(scale).add(origin))) + ' scale(' + scale + ') ';
//    isZooming = true;
};

proto.onZoomEnd = function(e) {
    var map = this.map,
        off = this.getOffset(),
        po = map.getPixelOrigin();

    setOrigin({ x:po.x-off.x, y:po.y-off.y });
    onZoomEnd({ zoom:map._zoom });
    this.skipMoveEnd = true;
};

proto.onResize = function() {
};

proto.onViewReset = function() {
    var off = this.getOffset();

    this.offset = off;
    Layers.setPosition(-off.x, -off.y);
    setCamOffset({ x:0, y:0 });
};

proto.getOffset = function() {
    return L.DomUtil.getPosition(this.map._mapPane);
};


//****** file: public.js ******

proto.setStyle = function(style) {
  style = style || {};
  if (style.color || style.wallColor) {
    defaultWallColor = Color.parse(style.color || style.wallColor);
    wallColorAlpha   = ''+ defaultWallColor.setAlpha(ZOOM_ALPHA);

    defaultAltColor  = defaultWallColor.setLightness(0.8);
    altColorAlpha    = ''+ defaultAltColor.setAlpha(ZOOM_ALPHA);

    defaultRoofColor = defaultWallColor.setLightness(1.2);
    roofColorAlpha   = ''+ defaultRoofColor.setAlpha(ZOOM_ALPHA);
  }

  if (style.roofColor) {
    defaultRoofColor = Color.parse(style.roofColor);
    roofColorAlpha   = ''+ defaultRoofColor.setAlpha(ZOOM_ALPHA);
  }

  if (style.shadows !== undefined) {
    Shadows.enabled = !!style.shadows;
  }

  Layers.render();

  return this;
};

proto.setDate = function(date) {
  Shadows.date = date;
  Shadows.render();
  return this;
};

proto.loadData = function(url) {
  Data.load(url);
  return this;
};

proto.setData = function(data) {
  Data.set(data);
  return this;
};

proto.each = function(handler, scope) {
  Data.each = function(feature) {
    return handler.call(scope, feature);
  };
  return this;
};

osmb.VERSION     = VERSION;
osmb.ATTRIBUTION = ATTRIBUTION;


//****** file: suffix.js ******

  return osmb;
}());


