// beware, it's not easy to use this standalone
// dependencies to: makeClockwiseWinding()

var readOSMXAPI = (function() {

    var YARD_TO_METER = 0.9144,
        FOOT_TO_METER = 0.3048,
        INCH_TO_METER = 0.0254,
        METERS_PER_LEVEL = 3;

    function parseDimension(str) {
        var value = parseFloat(str);

        if (~str.indexOf('m')) {
            return value <<0;
        }
        if (~str.indexOf('yd')) {
            return value*YARD_TO_METER <<0;
        }
        if (~str.indexOf('ft')) {
            return value*FOOT_TO_METER <<0;
        }
        if (~str.indexOf('\'')) {
            var parts = str.split('\'');
            var res = parts[0]*FOOT_TO_METER + parts[1]*INCH_TO_METER;
            return res <<0;
        }
        return value <<0;
    }

    var namedColors = {
		black:'#000000',
		navy:'#000080',
		darkblue:'#00008b',
		mediumblue:'#0000cd',
		blue:'#0000ff',
		darkgreen:'#006400',
		green:'#008000',
		teal:'#008080',
		darkcyan:'#008b8b',
		deepskyblue:'#00bfff',
		darkturquoise:'#00ced1',
		mediumspringgreen:'#00fa9a',
		lime:'#00ff00',
		springgreen:'#00ff7f',
		aqua:'#00ffff',
		cyan:'#00ffff',
		midnightblue:'#191970',
		dodgerblue:'#1e90ff',
		lightseagreen:'#20b2aa',
		forestgreen:'#228b22',
		seagreen:'#2e8b57',
		darkslategray:'#2f4f4f',
		limegreen:'#32cd32',
		mediumseagreen:'#3cb371',
		turquoise:'#40e0d0',
		royalblue:'#4169e1',
		steelblue:'#4682b4',
		darkslateblue:'#483d8b',
		mediumturquoise:'#48d1cc',
		indigo :'#4b0082',
		darkolivegreen:'#556b2f',
		cadetblue:'#5f9ea0',
		cornflowerblue:'#6495ed',
		mediumaquamarine:'#66cdaa',
		dimgray:'#696969',
		dimgrey:'#696969',
		slateblue:'#6a5acd',
		olivedrab:'#6b8e23',
		slategray:'#708090',
		lightslategray:'#778899',
		mediumslateblue:'#7b68ee',
		lawngreen:'#7cfc00',
		chartreuse:'#7fff00',
		aquamarine:'#7fffd4',
		maroon:'#800000',
		purple:'#800080',
		olive:'#808000',
		gray:'#808080',
		skyblue:'#87ceeb',
		lightskyblue:'#87cefa',
		blueviolet:'#8a2be2',
		darkred:'#8b0000',
		darkmagenta:'#8b008b',
		saddlebrown:'#8b4513',
		darkseagreen:'#8fbc8f',
		lightgreen:'#90ee90',
		mediumpurple:'#9370db',
		darkviolet:'#9400d3',
		palegreen:'#98fb98',
		darkorchid:'#9932cc',
		yellowgreen:'#9acd32',
		sienna:'#a0522d',
		brown:'#a52a2a',
		darkgray:'#a9a9a9',
		lightblue:'#add8e6',
		greenyellow:'#adff2f',
		paleturquoise:'#afeeee',
		lightsteelblue:'#b0c4de',
		powderblue:'#b0e0e6',
		firebrick:'#b22222',
		darkgoldenrod:'#b8860b',
		mediumorchid:'#ba55d3',
		rosybrown:'#bc8f8f',
		darkkhaki:'#bdb76b',
		silver:'#c0c0c0',
		mediumvioletred:'#c71585',
		indianred :'#cd5c5c',
		peru:'#cd853f',
		chocolate:'#d2691e',
		tan:'#d2b48c',
		lightgray:'#d3d3d3',
		thistle:'#d8bfd8',
		orchid:'#da70d6',
		goldenrod:'#daa520',
		palevioletred:'#db7093',
		crimson:'#dc143c',
		gainsboro:'#dcdcdc',
		plum:'#dda0dd',
		burlywood:'#deb887',
		lightcyan:'#e0ffff',
		lavender:'#e6e6fa',
		darksalmon:'#e9967a',
		violet:'#ee82ee',
		palegoldenrod:'#eee8aa',
		lightcoral:'#f08080',
		khaki:'#f0e68c',
		aliceblue:'#f0f8ff',
		honeydew:'#f0fff0',
		azure:'#f0ffff',
		sandybrown:'#f4a460',
		wheat:'#f5deb3',
		beige:'#f5f5dc',
		whitesmoke:'#f5f5f5',
		mintcream:'#f5fffa',
		ghostwhite:'#f8f8ff',
		salmon:'#fa8072',
		antiquewhite:'#faebd7',
		linen:'#faf0e6',
		lightgoldenrodyellow:'#fafad2',
		oldlace:'#fdf5e6',
		red:'#ff0000',
		fuchsia:'#ff00ff',
		magenta:'#ff00ff',
		deeppink:'#ff1493',
		orangered:'#ff4500',
		tomato:'#ff6347',
		hotpink:'#ff69b4',
		coral:'#ff7f50',
		darkorange:'#ff8c00',
		lightsalmon:'#ffa07a',
		orange:'#ffa500',
		lightpink:'#ffb6c1',
		pink:'#ffc0cb',
		gold:'#ffd700',
		peachpuff:'#ffdab9',
		navajowhite:'#ffdead',
		moccasin:'#ffe4b5',
		bisque:'#ffe4c4',
		mistyrose:'#ffe4e1',
		blanchedalmond:'#ffebcd',
		papayawhip:'#ffefd5',
		lavenderblush:'#fff0f5',
		seashell:'#fff5ee',
		cornsilk:'#fff8dc',
		lemonchiffon:'#fffacd',
		floralwhite:'#fffaf0',
		snow:'#fffafa',
		yellow:'#ffff00',
		lightyellow:'#ffffe0',
		ivory:'#fffff0',
		white:'#ffffff'
    };
	
    function parseColor(str) {
        str = str.toLowerCase();

        if (str[0] === '#') {
            return str;
        }

//      living: '#f08060',
//      nonliving: '#cccccc',
//      worship: '#80f080'
        return namedColors[str] || null;
    }

    var baseMaterials = {
        asphalt: 'tar_paper',
        bitumen: 'tar_paper',
        block: 'stone',
        bricks: 'brick',
        glas: 'glass',
        glassfront: 'glass',
        grass: 'plants',
        masonry: 'stone',
        granite: 'stone',
        panels: 'panel',
        paving_stones: 'stone',
        plastered: 'plaster',
        rooftiles: 'roof_tiles',
        roofingfelt: 'tar_paper',
        sandstone: 'stone',
        sheet: 'canvas',
        sheets: 'canvas',
        shingle: 'tar_paper',
        shingles: 'tar_paper',
        slates: 'slate',
        steel: 'metal',
        tar: 'tar_paper',
        tent: 'canvas',
        thatch: 'plants',
        tile: 'roof_tiles',
        tiles: 'roof_tiles'
    };

    // cardboard
    // eternit
    // limestone
    // straw

    var materialColors = {
        brick: '#cc7755',
        bronze: '#ffeecc',
        canvas: '#fff8f0',
        concrete: '#999999',
        copper: '#a0e0d0',
        glass: '#e8f8f8',
        gold: '#ffcc00',
        plants: '#009933',
        metal: '#aaaaaa',
        panel: '#fff8f0',
        plaster: '#999999',
        roof_tiles: '#f08060',
        silver: '#cccccc',
        slate: '#666666',
        stone: '#996666',
        tar_paper: '#333333',
        wood: '#deb887'
    };

    function parseMaterial(str) {
        str = str.toLowerCase();

        if (str[0] === '#') {
            return str;
        }

        return materialColors[baseMaterials[str] || str] || null;
    }

    function isBuilding(data) {
        var tags = data.tags;
        return (tags &&
            !tags.landuse &&
            (tags.building || tags['building:part']) &&
            (!tags.layer || tags.layer >= 0));
    }

    function getBuildingType(tags) {
        if (tags.amenity === 'place_of_worship') {
            return 'worship';
        }

        var type = tags.building;
        if (type === 'yes' || type === 'roof') {
            type = tags['building:use'];
        }
        if (!type) {
            type = tags.amenity;
        }

        switch (type) {
            case 'apartments':
            case 'house':
            case 'residential':
            case 'hut':
                return 'living';
            case 'church':
                return 'worship';
        }

        return 'nonliving';
    }

    function getOuterWay(ways) {
        var w;
        for (var i = 0, il = ways.length; i < il; i++) {
            w = ways[i];
            if (w.type === 'way' && w.role === 'outer') {
                return w;
            }
        }
    }

    function getFootprint(points) {
        if (!points) {
            return;
        }

        var footprint = [], p;
        for (var i = 0, il = points.length; i < il; i++) {
            p = nodes[ points[i] ];
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

    function mergeTags(dst, src) {
        for (var p in src) {
            if (!dst[p]) {
                dst[p] = src[p];
            }
        }
        return dst;
    }

    function filterTags(tags) {
        var height = 0, minHeight = 0;

        if (tags.height) {
            height = parseDimension(tags.height);
        }
        if (!height && tags['building:height']) {
            height = parseDimension(tags['building:height']);
        }

        if (!height && tags.levels) {
            height = tags.levels*METERS_PER_LEVEL <<0;
        }
        if (!height && tags['building:levels']) {
            height = tags['building:levels']*METERS_PER_LEVEL <<0;
        }

        // min_height
        if (tags.min_height) {
            minHeight = parseDimension(tags.min_height);
        }
        if (!minHeight && tags['building:min_height']) {
            minHeight = parseDimension(tags['building:min_height']);
        }

        if (!minHeight && tags.min_level) {
            minHeight = tags.min_level*METERS_PER_LEVEL <<0;
        }
        if (!minHeight && tags['building:min_level']) {
            minHeight = tags['building:min_level']*METERS_PER_LEVEL <<0;
        }

        var wallColor, roofColor;

        // wall material
        if (tags['building:material']) {
            wallColor = parseMaterial(tags['building:material']);
        }
        if (tags['building:facade:material']) {
            wallColor = parseMaterial(tags['building:facade:material']);
        }
        if (tags['building:cladding']) {
            wallColor = parseMaterial(tags['building:cladding']);
        }
        // wall color
        if (tags['building:color']) {
            wallColor = parseColor(tags['building:color']);
        }
        if (tags['building:colour']) {
            wallColor = parseColor(tags['building:colour']);
        }

        // roof material
        if (tags['roof:material']) {
            roofColor = parseMaterial(tags['roof:material']);
        }
        if (tags['building:roof:material']) {
            roofColor = parseMaterial(tags['building:roof:material']);
        }
        // roof color
        if (tags['roof:color']) {
            roofColor = parseColor(tags['roof:color']);
        }
        if (tags['roof:colour']) {
            roofColor = parseColor(tags['roof:colour']);
        }
        if (tags['building:roof:color']) {
            roofColor = parseColor(tags['building:roof:color']);
        }
        if (tags['building:roof:colour']) {
            roofColor = parseColor(tags['building:roof:colour']);
        }

        return {
            height:    height,
            minHeight: minHeight,
            wallColor: wallColor,
            roofColor: roofColor
        };
    }

    function processNode(node) {
        nodes[node.id] = [node.lat, node.lon];
    }

    function processWay(way) {
        var tags, footprint;
        if (isBuilding(way)) {
            tags = filterTags(way.tags);
            if ((footprint = getFootprint(way.nodes))) {
                addResult(way.id, tags, footprint);
            }
        } else {
            tags = way.tags;
            if (tags && !tags.highway && !tags.railway && !tags.landuse) { // TODO: add more filters
                ways[way.id] = way;
            }
        }
    }

    function processRelation(relation) {
        var outerWay, way,
            tags, footprint;
        if (isBuilding(relation) && (relation.tags.type === 'multipolygon' || relation.tags.type === 'building')) {
            if ((outerWay = getOuterWay(relation.members))) {
                var relTags = filterTags(relation.tags);
                if ((way = ways[outerWay.ref])) {
                    tags = filterTags(way.tags);
                    if ((footprint = getFootprint(way.nodes))) {
                        tags = mergeTags(tags, relTags);
                        addResult(way.id, tags, footprint);
                    }
                }
            }
        }
    }

    function addResult(id, tags, footprint) {
        var item = { id:id, footprint:makeClockwiseWinding(footprint) };
        if (tags.height)    item.height    = tags.height;
        if (tags.minHeight) item.minHeight = tags.minHeight;
        if (tags.wallColor) item.wallColor = tags.wallColor;
        if (tags.roofColor) item.roofColor = tags.roofColor;
        res.push(item);
    }

    var nodes, ways, res;

    return function(data) {
        nodes = {};
        ways = {};
        res = [];

        var item;
        for (var i = 0, il = data.length; i < il; i++) {
            item = data[i];
            switch(item.type ) {
                case 'node':     processNode(item);     break;
                case 'way':      processWay(item);      break;
                case 'relation': processRelation(item); break;
            }
        }

        return res;
    };
})();
