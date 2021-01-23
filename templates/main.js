var map = L.map("map").setView([51.9688414,7.5956354],10);

var osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{
    attribution: "&copy; <a href= 'https://opensteetmap.org/copyright'> Openstreet map</a> contributors"
});
osm.addTo(map);

var marker = L.marker([51.9688414,7.5956354],{draggable:true,title:"This is hover test for marker" }).addTo(map).bindPopup("<h1>IFGI , WWU, MUNSTER </h1><img src='ifgi.jpg' />").openPopup();

var OpenstreetMap_CH = L.tileLayer(
    "https://tile.osm.ch/Switzeland/{z}/{x}/{y}.png",
    {
        maxZoom: 18,
        attribution:
            "&copy; <a href= 'https://opensteetmap.org/copyright'> Openstreet map</a> contributors" ,
        bounds: [
            [45,5]
            [48,11],
        ],
    }
);

var darklayer = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
	maxZoom: 20,
	attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
});

//darklayer.addTo(map);

var watercolor = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	subdomains: 'abcd',
	minZoom: 1,
	maxZoom: 16,
	ext: 'jpg'
});

//watercolor.addTo(map);   

var nightearth = L.tileLayer('https://map1.vis.earthdata.nasa.gov/wmts-webmerc/VIIRS_CityLights_2012/default/{time}/{tilematrixset}{maxZoom}/{z}/{y}/{x}.{format}', {
	attribution: 'Imagery provided by services from the Global Imagery Browse Services (GIBS), operated by the NASA/GSFC/Earth Science Data and Information System (<a href="https://earthdata.nasa.gov">ESDIS</a>) with funding provided by NASA/HQ.',
	bounds: [[-85.0511287776, -179.999999975], [85.0511287776, 179.999999975]],
	minZoom: 1,
	maxZoom: 8,
	format: 'jpg',
	time: '',
	tilematrixset: 'GoogleMapsCompatible_Level'
});

//nightearth.addTo(map);

var bright = L.tileLayer('https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png', {
	maxZoom: 20,
	attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
});

//bright.addTo(map);

var baseLayers = { 
    osm : osm,
    "dark map": darklayer,
    "water color map": watercolor,
    "bright":bright,
};

L.control.layers(baseLayers).addTo(map);

var marker1 = L.marker([51.9688414,7.5956354]);
var marker2 = L.marker([51.92,7.55]);
var marker3 = L.marker([51.95,7.56]);

var markers = L.layerGroup([marker1,marker2,marker3]);
var overlayers = {
    markers: markers,
};

L.control.layers(baseLayers,overlayers).addTo(map);

//Geojson
var geojson = L.geoJson(munsterbound).addTo(map);

map.fitBounds(geojson.getBounds())