///////////Creación variable mapa/////////// 
var map = L.map('map', {
		zoomControl: false,
		center: [40, -3],
		zoom: 6,
		minZoom: 3,
		maxZoom: 20,
		maxBounds: [
			[20, -50],
			[50, 50]
			],
	});

///////////Funcionalidades estructura del visor///////////
//Layers on top
map.createPane('límites');
// This pane is above markers but below popups
map.getPane('límites').style.zIndex = 650;
// Layers in this pane are non-interactive and do not obscure mouse/touch events
map.getPane('límites').style.pointerEvents = 'none';
//Labels on top
map.createPane('labels');
// This pane is above markers but below popups
map.getPane('labels').style.zIndex = 800;
// Layers in this pane are non-interactive and do not obscure mouse/touch events
map.getPane('labels').style.pointerEvents = 'none';
//bindTooltip on top
map.createPane('popups');
// el popup aparece al arrastar encima de todo pero debajo del popup que aparece al clicar
map.getPane('popups').style.zIndex = 1000;
// Layers in this pane are non-interactive and do not obscure mouse/touch events
map.getPane('popups').style.pointerEvents = 'none';
//bindPopup on top
map.createPane('popups1');
// aparece por encima de todas las capas
map.getPane('popups1').style.zIndex = 1500;
// Layers in this pane are non-interactive and do not obscure mouse/touch events
map.getPane('popups1').style.pointerEvents = 'none';
//Barra de interacción de capas	tantaas sildebar como grupos de capas
var sidebar = L.control.sidebar('sidebar', { closeButton:true, position: 'left' });
	map.addControl(sidebar);
	sidebar.hide();			
	sidebar.show();
	sidebar.toggle();
var visible = sidebar.isVisible();
var button = new L.Control.Button(L.DomUtil.get('helpbutton'), { toggleButton: 'active', position: 'topleft'});
	button.addTo(map);
	button.on('click', function () {
	 if (button.isToggled()) {
			sidebar.hide();
		} else {
			sidebar.show();
		}
	});
var sidebar2 = L.control.sidebar('sidebar2', { closeButton:true, position: 'right' });
	map.addControl(sidebar2);
	sidebar2.hide();			
	sidebar2.show();
	sidebar2.toggle();
var visible2 = sidebar.isVisible();

//Buscador
var geocoder = L.Control.geocoder({ position: 'topleft',
	//defaultMarkGeocode: false
	}).addTo(map);


///////////Diseño caracteriticas basicas del visor///////////
//Título
var title2 = L.control({position: 'topright'});
	title2.onAdd = function (map) {
var div = L.DomUtil.create('div', 'info2');
	 div.innerHTML +=
	 'VISOR CARTOGRÁFICO<h3>Violencia contra la mujer en España<br>Programa PROMUJER</h3>';
	 return div;
	};
	title2.addTo(map);
//Logo Matrix	
var title1 = L.control({position: 'bottomright'});
	title1.onAdd = function (map) {
var div = L.DomUtil.create('div', 'info1');
	 div.innerHTML +=
	 '<a href="https://www.fundacionmatrix.es"><img src="images/matrix.png" width="75%" ></img></a>';
	 return div;
	};
	title1.addTo(map);
//Logo PROMUJER	
var title3 = L.control({position: 'bottomright'});
	title3.onAdd = function (map) {
var div = L.DomUtil.create('div','info3');
	 div.innerHTML +=
	 '<a><img src="images/LOGO PROMUJER.png" width="100px" height="63px" ></img></a>';
	 return div;
	};
	title3.addTo(map);  


///////////Cartografía de referencia///////////
var Mapa_fondo = L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/ {z}/{x}/{y}.png', { maxZoom: 18, opacity: 0.4, 
	attribution: '<a href="http://www.openstreetmap.org/copyright">OpenStreetMap </a>| Map data © 2018 <a href="https://www.fundacionmatrix.es"><strong>Fundación Matrix</strong></a>',
	}).addTo(map);		
//			var positron = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
//			attribution: '©OpenStreetMap, ©CartoDB'
//			}).addTo(map);
//			var positronLabels = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png', {
//			attribution: '©OpenStreetMap, ©CartoDB',
//			pane: 'labels'
//			}).addTo(map);
var osm = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	attribution: 'Map data &copy'
	});
var osm1 = L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
	maxZoom: 18,
	opacity: 0,
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
	});
var osm2 = new L.TileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
	minZoom: 0, 
	maxZoom: 13,
	});
var osm3 = L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/ {z}/{x}/{y}.png', { maxZoom: 18, opacity: 0.4, 
	attribution: '<a href="http://www.openstreetmap.org/copyright">OpenStreetMap </a>| Map data © 2018 <a href="https://www.fundacionmatrix.es"><strong>Fundación Matrix</strong></a>',
	});
//Límites
var comunidades = L.geoJson(comunidades, {
	color: "#17202A", 
	weight: 1.3,
	opacity: 0.5,
	fillOpacity: 0,
	pane: 'límites', // layer goes on top.
	attribution: '| © <a href="http://www.ign.es">Instituto Geográfico Nacional |'			
	}).addTo(map);
//Capas Google
var roadMutant = L.gridLayer.googleMutant({
	maxZoom: 24,
	type:'roadmap'
	});
var satMutant = L.gridLayer.googleMutant({
	maxZoom: 24,
	type:'satellite'
	});
var terrainMutant = L.gridLayer.googleMutant({
	maxZoom: 24,
	type:'terrain'
	});		
///////////Otras funcionalidades
//minimapa	
var miniMap = new L.Control.MiniMap(osm2, { toggleDisplay: true, position:"bottomright", width:100,height:100,}).addTo(map); 					
//zoomHome
var zoomHome = L.Control.zoomHome({ position: 'topleft', homeCoordinates:[40, -5], zoomHomeTitle:'Posición inicial'}).addTo(map);
//fullscreen						
var fsControl = new L.Control.FullScreen();
	map.addControl(fsControl);
	map.on('enterFullscreen', function(){
	if(window.console) window.console.log('enterFullscreen');
	});
	map.on('exitFullscreen', function(){
	if(window.console) window.console.log('exitFullscreen');
	});
	L.control.scale().addTo(map);

///////////Estilo de las capas especificas del visor///////////
//Denuncias por violencia contra la mujer por partido judicial (2017)
function getColor1(a) {
	return a > 6400 ? '#A80000' :
	a > 3200 ? '#FF5500' :
	a > 1600 ? '#FFAA00' :
	a > 800 ? '#FFD37F' :
	a > 400 ? '#FFFF73' :
	a > 200 ? '#FFFFBE' :
	a > 100 ? '#ADE8AD' :
	a > 50 ? '#89CD66' :
	'#38A800';
};
function style1(feature) {
	return {
		fillColor: getColor1(feature.properties.DV_2017),
		weight: 0.75,
		opacity: 0.60,
		color: '#0B161D',
		dashArray: '1',
		fillOpacity: 0.5
	};
};
function popup1(feature, layer) {
	if (feature.properties && feature.properties.NOMBRE) {
		// layer.bindPopup(
			// "<strong>"+feature.properties.NOMBRE+" "+"</strong>"+
			// "<br>Número denuncias: "+feature.properties.DV_2017+
			// "<br>Número habitantes: "+feature.properties.habT_17,
			// {pane: 'popups1'
			// });
		layer.bindTooltip("<strong>"+feature.properties.NOMBRE+"</strong><br>Número de denuncias: "+
		feature.properties.DV_2017.toLocaleString()+" ",{direction:"top",sticky:true, permanente:true,offset:[0,-5], pane: 'popups'});			
	};
};
var geojson1 = L.geoJson(tablaPJ, {
	style: style1,
	onEachFeature: popup1
});
	
//1.1.7.Tasa de denuncias por violencia contra la mujer por partido judicial (2007-2017)
function getColor2(a) {
	 return a > 7 ? '#A80000' :
	 a > 6 ? '#FF5500' :
	 a > 5 ? '#FFAA00' :					 
	 a > 4 ? '#FFD37F' :
	 a > 3 ? '#FFFFBE' :
	 a > 2 ? '#ADE8AD' :
	 '#89CD66';
};
function style2(feature) {
	return {
		fillColor: getColor2(feature.properties.TPDV_PT),
		weight: 0.75,
		opacity: 0.6,
		color: '#0B161D',
		dashArray: '1',
		fillOpacity: 0.5
	};
};
function popup2(feature, layer) {
	if (feature.properties && feature.properties.NOMBRE) {
		//layer.bindPopup("<h2>"+feature.properties.NOMBRE+" "+"</h2>"+"Denuncias: "+feature.properties.DVA_3+"",{pane: 'popups1'});
		layer.bindTooltip("<strong>"+feature.properties.NOMBRE+"</strong><br>Tasa de denuncias : "+
		feature.properties.TPDV_PT.toString().replace(".",",")+"‰ ",{direction:"top",sticky:true, permanente:true,offset:[0,-5], pane: 'popups'} );
	};
};
var geojson2 = L.geoJson(tablaPJ, {
	style: style2,
	onEachFeature: popup2
});												

//Evolucion de la tasa de denuncias por violencia contra la mujer
function getColor3(a) {
	return a > 120 ? '#A80000' :
	a > 80 ? '#FF5500' :
	a > 40 ? '#FFAA01' :					 
	a > 10 ? '#FFD380' :
	a > -10 ? '#CCCCCC' :
	a > -40 ? '#89CD66' :
	'#38A700';
	};
function style3(feature) {
	return {
		fillColor: getColor3(feature.properties.TPDV_DIF),
		weight: 0.75,
		opacity: 0.6,
		color: '#0B161D',
		dashArray: '1',
		fillOpacity: 0.5
	};
};
function popup3(feature, layer) {
	if (feature.properties && feature.properties.NOMBRE) {
	//layer.bindPopup("<h2>"+feature.properties.NOMBRE+" "+"</h2>"+"Edad media: "+feature.properties.EM1+" años",{pane: 'popups1'});
	layer.bindTooltip("<strong>"+feature.properties.NOMBRE+"</strong><br>Cambio relativo: "+
	feature.properties.TPDV_DIF.toString().replace(".",",")+"%",{direction:"top",sticky:true, permanente:true,offset:[0,-5], pane: 'popups'} );
	};
};
var geojson3 = L.geoJson(tablaPJ, {
style: style3,
onEachFeature: popup3
});

//Mapa lila situacioin de violencia contra la mujer
function getColor4(a) {
	return a == 'OBSERVACIÓN' ? '#BDD2FF' :
	a == 'DETERIORO' ? '#73B2FF' :
	a == 'GRAVE' ? '#874489' :					 
	'#4D0074';
	};
function style4(feature) {
	return {
		fillColor: getColor4(feature.properties.CATEG_BO),
		weight: 0.75,
		opacity: 0.6,
		color: '#0B161D',
		dashArray: '1',
		fillOpacity: 0.5
	};
};
function popup4(feature, layer) {
	if (feature.properties && feature.properties.NOMBRE) {
	//layer.bindPopup("<h2>"+feature.properties.NOMBRE+" "+"</h2>"+"Edad media: "+feature.properties.EM1+" años",{pane: 'popups1'});
	layer.bindTooltip("<strong>"+feature.properties.NOMBRE+"</strong><br>Cambio relativo de TD: "
	+feature.properties.TPDV_DIF.toString().replace(".",",")+"%<br>TD período 2013-2017: "+feature.properties.TPDV_P2.toString().replace(".",",")+"‰",{direction:"top",sticky:true, permanente:true,offset:[0,-5], pane: 'popups'} );
	};
};
var geojson4 = L.geoJson(tablaPJ, {
style: style4,
onEachFeature: popup4
});

//Comparativa de tasa promedio de denuncias violencia contra la mujer y ruralidad
function getColor5(a) {
	return a == 'Rural con tasa baja a moderado' ? '#CAEFB3' :
	a == 'Rural con tasa alta' ? '#ABCE00' :
	a == 'Rural con tasa muy alta' ? '#648C01' :					 
	a == 'Rural con tasa intensa a extrema' ? '#2F5F02' :					 
	a == 'Urbano con tasa baja a moderado' ? '#E5E5E5' :					 
	a == 'Urbano con tasa alta' ? '#A6A6A6' :					 
	a == 'Urbano con tasa muy alta' ? '#666666' :					 
	'#000000';
	};
function style5(feature) {
	return {
		fillColor: getColor5(feature.properties.TIPOSDEVIO),
		weight: 0.75,
		opacity: 0.6,
		color: '#0B161D',
		dashArray: '1',
		fillOpacity: 0.5
	};
};
function popup5(feature, layer) {
	if (feature.properties && feature.properties.NOMBRE) {
	//layer.bindPopup("<h2>"+feature.properties.NOMBRE+" "+"</h2>"+"Edad media: "+feature.properties.EM1+" años",{pane: 'popups1'});
	layer.bindTooltip("<strong>"+feature.properties.NOMBRE+"</strong><br>Clase de ruralidad: "
	+feature.properties.RUR_5CLAS.toString().replace(".",",")+"<br>TD: "+feature.properties.TPDV_PT.toString().replace(".",",")+"‰",{direction:"top",sticky:true, permanente:true,offset:[0,-5], pane: 'popups'} );
	};
};
var geojson5 = L.geoJson(tablaPJ, {
style: style5,
onEachFeature: popup5
});

//Tipificacion de la violencia por partido judicial
function getColor6(a) {
	return a == 1 ? '#1D9B76' :
	a == 3 ? '#7570B2' :
	a == 4 ? '#E82989' :					 
	a == 2 ? '#E88D47' :					 
	'#5DA515';
	};
function style6(feature) {
	return {
		fillColor: getColor6(feature.properties.TIPIOBJ1),
		weight: 0.75,
		opacity: 0.6,
		color: '#0B161D',
		dashArray: '1',
		fillOpacity: 0.5
	};
};
function popupTipi (a){
	return  a == 1 ? 'Pendiente de revision':
	a == 3 ? 'Pendiente de revision':
	a == 4 ? 'Pendiente de revision':
	a == 2 ? 'Pendiente de revision':
	'Pendiente de revision'; 
};
function popup6(feature, layer) {
	if (feature.properties && feature.properties.NOMBRE) {
	layer.bindPopup("<strong>"+feature.properties.NOMBRE+"</strong><br>"+popupTipi(feature.properties.TIPIOBJ1),{pane: 'popups1'});
	layer.bindTooltip("<strong>"+feature.properties.NOMBRE+"</strong><br><u>Click para más información",{direction:"top",sticky:true, permanente:true,offset:[0,-5], pane: 'popups'} );
	};
};
var geojson6 = L.geoJson(tablaPJ, {
style: style6,
onEachFeature: popup6
});

//Número de víctimas mortales 2017
function getColor7(a) {
	return a >= 7 ? '#A80000' :
	a >= 4 ? '#FF5500' :
	a >= 2 ? '#FEFF73' :					 
	a == 1 ? '#89CD66' :					 
	'#38A700';
	};
function style7(feature) {
	return {
	fillColor: getColor7(feature.properties.VM_2017),
		weight: 0.75,
		opacity: 0.6,
		color: '#0B161D',
		dashArray: '1',
		fillOpacity: 0.5
	};
};
function popup7(feature, layer) {
	if (feature.properties && feature.properties.NAMEUNIT_1) {
	//layer.bindPopup("<h2>"+feature.properties.NOMBRE+" "+"</h2>"+"Edad media: "+feature.properties.EM1+" años",{pane: 'popups1'});
	layer.bindTooltip("<strong>"+feature.properties.NAMEUNIT_1+"</strong><br>Número de victimas: "
	+feature.properties.VM_2017.toString().replace(".",","),{direction:"top",sticky:true, permanente:true,offset:[0,-5], pane: 'popups'} );
	};
};
var geojson7 = L.geoJson(tabla_prov, {
style: style7,
onEachFeature: popup7
});


//Número de víctimas mortales 2007-2017
function getColor8(a) {
	return a >= 46 ? '#A80000' :
	a >= 21 ? '#FF5500' :
	a >= 11 ? '#FEFF73' :					 
	a >= 6 ? '#89CD66' :					 
	'#38A700';
	};
function style8(feature) {
	return {
	fillColor: getColor8(feature.properties.VMA_PT2),
		weight: 0.75,
		opacity: 0.6,
		color: '#0B161D',
		dashArray: '1',
		fillOpacity: 0.5
	};
};
function popup8(feature, layer) {
	if (feature.properties && feature.properties.NAMEUNIT_1) {
	//layer.bindPopup("<h2>"+feature.properties.NOMBRE+" "+"</h2>"+"Edad media: "+feature.properties.EM1+" años",{pane: 'popups1'});
	layer.bindTooltip("<strong>"+feature.properties.NAMEUNIT_1+"</strong><br>Número de victimas: "
	+feature.properties.VMA_PT2.toString().replace(".",","),{direction:"top",sticky:true, permanente:true,offset:[0,-5], pane: 'popups'} );
	};
};
var geojson8 = L.geoJson(tabla_prov, {
style: style8,
onEachFeature: popup8
});

//Tasa promedio anual de víctimas mortales (2007 - 2017)
function getColor9(a) {
	return a >= 6 ? '#A80000' :
	a >= 4.5 ? '#FF5500' :
	a >= 3 ? '#FEFF73' :					 
	a >= 1.5 ? '#89CD66' :					 
	'#38A700';
	};
function style9(feature) {
	return {
	fillColor: getColor9(feature.properties.TPVM_PT2),
		weight: 0.75,
		opacity: 0.6,
		color: '#0B161D',
		dashArray: '1',
		fillOpacity: 0.5
	};
};
function popup9(feature, layer) {
	if (feature.properties && feature.properties.NAMEUNIT_1) {
	layer.bindPopup("<h3>"+feature.properties.NAMEUNIT_1+" </h3>"+
	"<strong>Tasa anual de víctimas:</strong> "+feature.properties.TPVM_PT2.toString().replace(".",",")+" por millón"+
	"<br><strong>Edad media de la victima:</strong> "+feature.properties.EMVM_PT2.toString().replace(".",",")+
	" años<br><strong>Edad media del agresor:</strong> "+feature.properties.EMA_PT2.toString().replace(".",",")+" años"+
	"<br><strong>Proporción de víctimas con denuncia previa</strong> "+feature.properties.PDP_PT2.toString().replace(".",",")+"%", {pane: 'popups1'});
	layer.bindTooltip("<strong>"+feature.properties.NAMEUNIT_1+"</strong><br><u>Click para más información",{direction:"top",sticky:true, permanente:true,offset:[0,-5], pane: 'popups'} );
	};
};
var geojson9 = L.geoJson(tabla_prov, {
style: style9,
onEachFeature: popup9
});

//Tipificacion de la violencia por provincia
function getColor10(a) {
	return a == 3 ? '#7570B2' :
	a == 5 ? '#5DA515' :
	a == 1 ? '#1B9C76' :					 
	a == 4 ? '#E82989' :					 
	'#E88D47';
	};
function style10(feature) {
	return {
	fillColor: getColor10(feature.properties.tipi_prov),
		weight: 0.75,
		opacity: 0.6,
		color: '#0B161D',
		dashArray: '1',
		fillOpacity: 0.5
	};
};
function popupTipi_prov (a){
	return  a == 1 ? 'Pendiente de revision':
	a == 3 ? 'Pendiente de revision':
	a == 4 ? 'Pendiente de revision':
	a == 2 ? 'Pendiente de revision':
	'Pendiente de revision'; 
};
function popup10(feature, layer) {
	if (feature.properties && feature.properties.NAMEUNIT_1) {
	layer.bindPopup("<strong>"+feature.properties.NAMEUNIT_1+"</strong><br>"+popupTipi_prov(feature.properties.tipi_prov),{pane: 'popups1'});
	layer.bindTooltip("<strong>"+feature.properties.NAMEUNIT_1+"</strong><br><u>Click para más información",{direction:"top",sticky:true, permanente:true,offset:[0,-5], pane: 'popups'} );
	};
};
var geojson10 = L.geoJson(tabla_prov, {
style: style10,
onEachFeature: popup10
});

//"Tipo de relación entre la víctima y el agreor (2007 - 2017)"
function getColor11(a,b,c) {
	if (a >= 45){
		return '#89CD66'
	} else if (b >= 45){
		return '#FFFF73'
	} else if (c >= 45){
		return '#FFAA00' 
	} else{
		return '#A80000'
	}
};
function style11(feature) {
	return {
	fillColor: getColor11(feature.properties.PAR_PT2,feature.properties.EXPAR_PT2,feature.properties.FS_PT2),
		weight: 0.75,
		opacity: 0.6,
		color: '#0B161D',
		dashArray: '1',
		fillOpacity: 0.5
	};
};

function popup11(feature, layer) {
	if (feature.properties && feature.properties.NAMEUNIT_1) {
	layer.bindPopup("<h3>"+feature.properties.NAMEUNIT_1+"</h3><strong>Relación entre la víctima y el agresor:</strong><br>Pareja: "+feature.properties.PAR_PT2.toString().replace(".",",")+"%<br>Expareja: "+feature.properties.EXPAR_PT2.toString().replace(".",",")+"%<br>En separación: "+feature.properties.FS_PT2.toString().replace(".",",")+"%",{pane: 'popups1'});
	layer.bindTooltip("<strong>"+feature.properties.NAMEUNIT_1+"</strong><br><u>Click para más información",{direction:"top",sticky:true, permanente:true,offset:[0,-5], pane: 'popups'} );
	};
};
var geojson11 = L.geoJson(tabla_prov, {
style: style11,
onEachFeature: popup11
});
///////////MAPA DE LAS ISOLINEAS - CONJUNTO TODO LO DE DEBAJO/////////// 
var geojson12 = L.tileLayer('Teselas/Mapnik4/{z}/{x}/{y}.png',{
	tms: true,
	attribution: 'Generated by QTiles',
	pane: 'labels',
	opacity: 0.7,
});

///////////Definicion de las capas del mapa///////////
//Capas	
var mapa1 = L.layerGroup([geojson1]).addTo(map);
var mapa2 = L.layerGroup([geojson2]);
var mapa3 = L.layerGroup([geojson3]);
var mapa4 = L.layerGroup([geojson4]);
var mapa5 = L.layerGroup([geojson5]);
var mapa6 = L.layerGroup([geojson6]);
var mapa7 = L.layerGroup([geojson7]);
var mapa8 = L.layerGroup([geojson8]);
var mapa9 = L.layerGroup([geojson9]);
var mapa10 = L.layerGroup([geojson10]);
var mapa11 = L.layerGroup([geojson11]);
var mapa12 = L.layerGroup([geojson12]);

var baseTree = [
	{ label: "<strong>Limpiar mapa", layer: osm3 },
	{
	label: '<strong>Mapas de denuncias por violencia contra la mujer – Partido judicial',
	children: [
		{ label: "Denuncias por violencia contra la mujer (2017)", layer: mapa1 },
		{ label: "Tasa de denuncias por violencia contra la mujer (2007-2017)", layer: mapa2 },
		{ label: "Cambios en la tasa de denuncias por violencia contra la mujer", layer: mapa3 },
		{ label: "Situación de violencia contra la mujer", layer: mapa4 },
		{ label: "Ruralidad y tasa de denuncias por violencia contra la mujer (2007-2017)", layer: mapa5 },
		{ label: "Tendencia de variación espacial de la tasa de denuncias por violencia contra la mujer (2007-2017)", layer: mapa12 },
		]
	},
	{
		label: '<strong>Mapas de víctimas mortales por violencia contra la mujer – Provincia',
		children : [
			{ label: "Número de víctimas mortales (2017)",layer: mapa7},
			{ label: "Número de víctimas mortales (2007-2017)",layer: mapa8},
			{ label: "Tasa anual de víctimas mortales (2007 - 2017)",layer: mapa9},
			{ label: "Relación entre la víctima mortal y el agresor (2007 - 2017)",layer: mapa11},
		]
	},
	{
		label: '<strong>Mapas de tipificación de la violencia contra la mujer',
		children: [
			{ label: "Tipificación de la violencia contra la mujer por partido judicial", layer: mapa6 },
			{ label: "Tipificación de la violencia contra la mujer  por provincia", layer: mapa10 },
		]
	},
	
	];
var overlayTree = {
	label: 'Mapas de referencia',
	children: [
		{ label: "<b>Límites de Comunidades Autónomas", layer: comunidades},
		{ label: "OpenStreetMap", layer: osm},
		{ label: "Base física (Google Terrain)", layer: terrainMutant},
		{ label: "Satélite (Google Satellite)", layer: satMutant},
	]
};	

///////////Definicion del estilo de la leyenda de cada capa///////////
// leyenda mapa12		
var htmlLegend12 = L.control.htmllegend({
		position: 'bottomleft',
		legends: [{
			name: "<h3>"+'Modelo espacial de variación de la tasa anual  de denuncias por violencia contra la mujer. Promedio periodo 2007-2017'+"<\h3>",
			//style: style12,
			layer: mapa12,
			elements: [{
				label:"<h4>"+  '<img src=images/TDVM.png width="210" height ="30">'+"<h4>Unidades: ‰<\h4>"+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<h4>"+  '<img src=images/leyenda_interpolacion.png width="250" height ="50">'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<h5>"+  ''+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {	
				label:"<h5>"+  'Fuente: Elaboración propia a partir de los datos del Consejo General del Poder Judicial Programa PROMUJER (2018)'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}, 																
			}]
		}],
		collapseSimple: true,  // if true, legend entries that are from a simple renderer will use compact presentation
		detectStretched: true,  // if true, will test to see if legend entries look stretched.  These are usually in sets of 3 with the middle element having no label.
		collapsedOnInit: false,  // if true, legends will be collapsed when a new instance is initialized.
		defaultOpacity: 0.5, // default opacity for layers in specified in legends.
		visibleIcon: '',// 'leaflet-html-leg end-icon-eye',  // css class for the visible icon on opacity slider
		hiddenIcon: '',//'leaflet-html-legend-icon-eye-slash',  // css class for the hidden icon on opacity slider
		toggleIcon:'',// 'leaflet-html-legend-icon-eye-slash'  // css class for the icon on visibility toggle button
	});
	map.addControl(htmlLegend12);
// leyenda mapa11		
var htmlLegend11 = L.control.htmllegend({
		position: 'bottomleft',
		legends: [{
			name: "<h3>"+'Relación entre la víctima mortal y el agresor (2007-2017)'+"<\h3>",
			style: style11,
			layer: mapa11,
			elements: [{
				label:"<h4>"+  '<u>Clicar en la provincia del mapa para obtener más información de las clases'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<h4>"+  'Clase de relación predominante:'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<h4>Pareja<\h4>",html:'', style: {'background-color': '#89CD66','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>Expareja<\h4>",html: '',style: {'background-color': '#FFFF73','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {		
				label:"<h4>En fase de separación<\h4>",html: '',style: {'background-color': '#FFAA00','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>Ninguna<\h4>",html: '',style: {'background-color':'#A80000' ,'width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h5>"+  ''+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<h5>"+  'Fuente: Elaboración propia a partir de los datos de la Delegación del Gobierno para la Violencia de Género (2018)'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}, 																
			}]
		}],
		collapseSimple: true,  // if true, legend entries that are from a simple renderer will use compact presentation
		detectStretched: true,  // if true, will test to see if legend entries look stretched.  These are usually in sets of 3 with the middle element having no label.
		collapsedOnInit: false,  // if true, legends will be collapsed when a new instance is initialized.
		defaultOpacity: 0.5, // default opacity for layers in specified in legends.
		visibleIcon: '',// 'leaflet-html-legend-icon-eye',  // css class for the visible icon on opacity slider
		hiddenIcon: '',//'leaflet-html-legend-icon-eye-slash',  // css class for the hidden icon on opacity slider
		toggleIcon:'',// 'leaflet-html-legend-icon-eye-slash'  // css class for the icon on visibility toggle button
	});
	map.addControl(htmlLegend11);
// leyenda mapa10		
var htmlLegend10 = L.control.htmllegend({
		position: 'bottomleft',
		legends: [{
			name: "<h3>"+'Tipificación de la violencia contra la mujer por provincia.<br>Período 2007 - 2017'+"<\h3>",
			style: style10,
			layer: mapa10,
			elements: [{
				label:"<h4>"+  'Según tasa de denuncias, tasa y edad de víctimas mortales, relación víctima-denunciante y otras variables asociadas a la denuncia.'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<h4>Pacífica; la víctima denuncia<\h4>",html:'', style: {'background-color': '#1B9C76','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>Conflictividad intermedia<\h4>",html: '',style: {'background-color': '#E88D47','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {		
				label:"<h4>Mortalidad silenciosa; conflictividad baja, la víctima denuncia<\h4>",html: '',style: {'background-color': '#7570B2','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>Conflictividad alta; la familia denuncia<\h4>",html: '',style: {'background-color':'#E82989' ,'width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>Conflictividad extrema; la víctima denuncia poco<\h4>",html: '',style: {'background-color':'#5DA515' ,'width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h5>"+  ''+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<h5>"+  'Fuente: Elaboración propia a partir de los datos del INE, IGN, Consejo General del Poder Judicial y la Delegación del Gobierno para la Violencia de Género (2018)'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}, 																
			}]
		}],
		collapseSimple: true,  // if true, legend entries that are from a simple renderer will use compact presentation
		detectStretched: true,  // if true, will test to see if legend entries look stretched.  These are usually in sets of 3 with the middle element having no label.
		collapsedOnInit: false,  // if true, legends will be collapsed when a new instance is initialized.
		defaultOpacity: 0.5, // default opacity for layers in specified in legends.
		visibleIcon: '',// 'leaflet-html-legend-icon-eye',  // css class for the visible icon on opacity slider
		hiddenIcon: '',//'leaflet-html-legend-icon-eye-slash',  // css class for the hidden icon on opacity slider
		toggleIcon:'',// 'leaflet-html-legend-icon-eye-slash'  // css class for the icon on visibility toggle button
	});
	map.addControl(htmlLegend10);
// leyenda mapa9	
var htmlLegend9 = L.control.htmllegend({
		position: 'bottomleft',
		legends: [{
			name: "<h3>"+'Tasa anual promedio anual de víctimas mortales (2007 - 2017)'+"<\h3>",
			style: style9,
			layer: mapa9,
			elements: [{
				label:"<h4>"+  '<img src=images/TV.png width="210" height ="30">'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<h4>"+  'Número de víctimas por millón:'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<h4>0,9 - 1,5<\h4>",html:'', style: {'background-color': '#38A700','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>1,51 - 3<\h4>",html: '',style: {'background-color': '#89CD66','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {		
				label:"<h4>3.1 - 4,5<\h4>",html: '',style: {'background-color': '#FEFF73','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>4,6 - 6<\h4>",html: '',style: {'background-color':'#FF5500' ,'width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>≥ 6<\h4>",html: '',style: {'background-color':'#A80000' ,'width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h5>"+  ''+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<h5>"+  'Fuente: Elaboración propia a partir de los datos de la Delegación del Gobierno para la Violencia de Género (2018)'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}, 																
			}]
		}],
		collapseSimple: true,  // if true, legend entries that are from a simple renderer will use compact presentation
		detectStretched: true,  // if true, will test to see if legend entries look stretched.  These are usually in sets of 3 with the middle element having no label.
		collapsedOnInit: false,  // if true, legends will be collapsed when a new instance is initialized.
		defaultOpacity: 0.5, // default opacity for layers in specified in legends.
		visibleIcon: '',// 'leaflet-html-legend-icon-eye',  // css class for the visible icon on opacity slider
		hiddenIcon: '',//'leaflet-html-legend-icon-eye-slash',  // css class for the hidden icon on opacity slider
		toggleIcon:'',// 'leaflet-html-legend-icon-eye-slash'  // css class for the icon on visibility toggle button
	});
	map.addControl(htmlLegend9);	
// leyenda mapa8	
var htmlLegend8 = L.control.htmllegend({
		position: 'bottomleft',
		legends: [{
			name: "<h3>"+'Victimas mortales por violencia contra la mujer (2007-2017)',
			style: style8,
			layer: mapa8,
			elements: [{
				label:"<h4>"+  'Número de víctimas:'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<h4>1 - 5,1<\h4>",html:'', style: {'background-color': '#38A700','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>6 - 10,1<\h4>",html: '',style: {'background-color': '#89CD66','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {		
				label:"<h4>11 - 20,1<\h4>",html: '',style: {'background-color': '#FEFF73','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>21 - 45,1<\h4>",html: '',style: {'background-color':'#FF5500' ,'width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>46 - 77<\h4>",html: '',style: {'background-color':'#A80000' ,'width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h5>"+  ''+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<h4>"+  'Número total de víctimas mortales: 654'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<h5>"+  'Fuente: Elaboración propia a partir de los datos de la Delegación del Gobierno para la Violencia de Género (2018)'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}, 																
			}]
		}],
		collapseSimple: true,  // if true, legend entries that are from a simple renderer will use compact presentation
		detectStretched: true,  // if true, will test to see if legend entries look stretched.  These are usually in sets of 3 with the middle element having no label.
		collapsedOnInit: false,  // if true, legends will be collapsed when a new instance is initialized.
		defaultOpacity: 0.5, // default opacity for layers in specified in legends.
		visibleIcon: '',// 'leaflet-html-legend-icon-eye',  // css class for the visible icon on opacity slider
		hiddenIcon: '',//'leaflet-html-legend-icon-eye-slash',  // css class for the hidden icon on opacity slider
		toggleIcon:'',// 'leaflet-html-legend-icon-eye-slash'  // css class for the icon on visibility toggle button
	});
	map.addControl(htmlLegend8);	
// leyenda mapa7	
var htmlLegend7 = L.control.htmllegend({
		position: 'bottomleft',
		legends: [{
			name: "<h3>"+'Victimas mortales por violencia contra la mujer (2017)'+"<\h3>",
			style: style7,
			layer: mapa7,
			elements: [{
				label:"<h4>"+  'Número de víctimas:'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<h4>0<\h4>",html:'', style: {'background-color': '#38A700','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>1<\h4>",html: '',style: {'background-color': '#89CD66','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {		
				label:"<h4>2-3<\h4>",html: '',style: {'background-color': '#FEFF73','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>4-6<\h4>",html: '',style: {'background-color':'#FF5500' ,'width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>7-9<\h4>",html: '',style: {'background-color':'#A80000' ,'width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h5>"+  ''+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<h4>"+  'Número total de víctimas mortales: 51'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<h5>"+  'Fuente: Elaboración propia a partir de los datos de la Delegación del Gobierno para la Violencia de Género (2018)'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}, 																
			}]
		}],
		collapseSimple: true,  // if true, legend entries that are from a simple renderer will use compact presentation
		detectStretched: true,  // if true, will test to see if legend entries look stretched.  These are usually in sets of 3 with the middle element having no label.
		collapsedOnInit: false,  // if true, legends will be collapsed when a new instance is initialized.
		defaultOpacity: 0.5, // default opacity for layers in specified in legends.
		visibleIcon: '',// 'leaflet-html-legend-icon-eye',  // css class for the visible icon on opacity slider
		hiddenIcon: '',//'leaflet-html-legend-icon-eye-slash',  // css class for the hidden icon on opacity slider
		toggleIcon:'',// 'leaflet-html-legend-icon-eye-slash'  // css class for the icon on visibility toggle button
	});
	map.addControl(htmlLegend7);	
// leyenda mapa6		
var htmlLegend6 = L.control.htmllegend({
		position: 'bottomleft',
		legends: [{
			name: "<h3>"+'Tipificación de la violencia contra la mujer por partido judicial. Período 2007 - 2017'+"<\h3>",
			style: style6,
			layer: mapa6,
			elements: [{
				label:"<h4>"+ 'Según tasa de denuncias, tasa víctimas mortales y relación víctima-denunciante.'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<h4>Pacífico; la víctima renuncia<\h4><h4></h4>",html:'', style: {'background-color': '#1D9B76','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>Conflictividad intermedia<\h4>",html: '',style: {'background-color': '#E88D47','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {		
				label:"<h4>Mortalidad silenciosa; conflictividad baja, la víctima denuncia<\h4>",html: '',style: {'background-color': '#7570B2','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>Conflictividad alta; la familia denuncia<\h4>",html: '',style: {'background-color':'#E82989' ,'width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>Conflictividad extrema; la víctima denuncia poco<\h4>",html: '',style: {'background-color':'#5DA515' ,'width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h5>"+  'Sin datos (Comunidades Juridiccionales)'+"<\h5>",html: '',style: {'background-color': '#FFFFFF','width': '40px','height': '14px', 'border': 'black 1px solid'}}, { 
				label:"<h5>"+  ''+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<h5>"+  'Fuente: Elaboración propia a partir de los datos del INE, IGN, Consejo General del Poder Judicial y la Delegación del Gobierno para la Violencia de Género (2018)'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}, 																
			}]
		}],
		collapseSimple: true,  // if true, legend entries that are from a simple renderer will use compact presentation
		detectStretched: true,  // if true, will test to see if legend entries look stretched.  These are usually in sets of 3 with the middle element having no label.
		collapsedOnInit: false,  // if true, legends will be collapsed when a new instance is initialized.
		defaultOpacity: 0.5, // default opacity for layers in specified in legends.
		visibleIcon: '',// 'leaflet-html-legend-icon-eye',  // css class for the visible icon on opacity slider
		hiddenIcon: '',//'leaflet-html-legend-icon-eye-slash',  // css class for the hidden icon on opacity slider
		toggleIcon:'',// 'leaflet-html-legend-icon-eye-slash'  // css class for the icon on visibility toggle button
	});
	map.addControl(htmlLegend6);
// leyenda mapa5		
var htmlLegend5 = L.control.htmllegend({
		position: 'bottomleft',
		legends: [{
			name: "<h3>"+'Tasa promedio de denuncias (TD) por violencia contra la mujer del periodo 2013-2017 según clases de ruralidad'+"<\h3>",
			style: style5,
			layer: mapa5,
			elements: [{
				label:"<h4>"+  'Rural: Baja a moderado'+"<\h4>",html: '',style: {'background-color': '#CAFF6F','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  'Rural: Alta'+"<\h4>",html: '',style: {'background-color': '#BCEE67','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {		
				label:"<h4>"+  'Rural: Muy alta'+"<\h4>",html: '',style: {'background-color': '#A2CD5A','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  'Rural: Intensa a extrema'+"<\h4>",html: '',style: {'background-color':'#6E8A3D' ,'width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  'Urbano: Baja a moderado'+"<\h4>",html: '',style: {'background-color':'#E5E5E5' ,'width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  'Urbano: Alta'+"<\h4>",html: '',style: {'background-color':'#A6A6A6' ,'width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  'Urbano: Muy alta'+"<\h4>",html: '',style: {'background-color':'#666666' ,'width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  'Urbano: Intensa a extrema'+"<\h4>",html: '',style: {'background-color':'#000000' ,'width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h5>"+  'Sin datos (Comunidades Juridiccionales)'+"<\h5>",html: '',style: {'background-color': '#FFFFFF','width': '40px','height': '14px', 'border': 'black 1px solid'}}, { 
				label:"<h5>"+  ''+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<h5>"+  'Fuente: Elaboración propia a partir de los datos del INE, IGN y Consejo General del Poder Judicial (2018)'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}, 																
			}]
		}],
		collapseSimple: true,  // if true, legend entries that are from a simple renderer will use compact presentation
		detectStretched: true,  // if true, will test to see if legend entries look stretched.  These are usually in sets of 3 with the middle element having no label.
		collapsedOnInit: false,  // if true, legends will be collapsed when a new instance is initialized.
		defaultOpacity: 0.5, // default opacity for layers in specified in legends.
		visibleIcon: '',// 'leaflet-html-legend-icon-eye',  // css class for the visible icon on opacity slider
		hiddenIcon: '',//'leaflet-html-legend-icon-eye-slash',  // css class for the hidden icon on opacity slider
		toggleIcon:'',// 'leaflet-html-legend-icon-eye-slash'  // css class for the icon on visibility toggle button
	});
	map.addControl(htmlLegend5);
// leyenda mapa4		
var htmlLegend4 = L.control.htmllegend({
		position: 'bottomleft',
		legends: [{
			name: "<h3>"+'Situación de violencia contra la mujer'+"<\h3>",
			style: style4,
			layer: mapa4,
			elements: [{
				label:"<h4>"+  'Clases definidas según la tasa anual de denuncias contra la mujer (TD) y cambio relativo entre 2007-2012 y 2013-2017',html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<h4>"+  'En Observación'+"<\h4>",html: '',style: {'background-color': '#BDD2FF','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  'En Deterioro'+"<\h4>",html: '',style: {'background-color': '#73B2FF','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {		
				label:"<h4>"+  'Grave'+"<\h4>",html: '',style: {'background-color': '#874489','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  'Crítica'+"<\h4>",html: '',style: {'background-color':'#4D0074' ,'width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h5>"+  'Sin datos (Comunidades Juridiccionales)'+"<\h5>",html: '',style: {'background-color': '#FFFFFF','width': '40px','height': '14px', 'border': 'black 1px solid'}}, { 
				label:"<h5>"+  ''+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<h4>"+  'Número total de denuncias del período: 1.490.590'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<h5>"+  'Fuente: Elaboración propia a partir de los datos del Consejo General del Poder Judicial-Programa PROMUJER (2018)'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}, 																
			}]
		}],
		collapseSimple: true,  // if true, legend entries that are from a simple renderer will use compact presentation
		detectStretched: true,  // if true, will test to see if legend entries look stretched.  These are usually in sets of 3 with the middle element having no label.
		collapsedOnInit: false,  // if true, legends will be collapsed when a new instance is initialized.
		defaultOpacity: 0.5, // default opacity for layers in specified in legends.
		visibleIcon: '',// 'leaflet-html-legend-icon-eye',  // css class for the visible icon on opacity slider
		hiddenIcon: '',//'leaflet-html-legend-icon-eye-slash',  // css class for the hidden icon on opacity slider
		toggleIcon:'',// 'leaflet-html-legend-icon-eye-slash'  // css class for the icon on visibility toggle button
	});
	map.addControl(htmlLegend4);
// leyenda mapa3		
var htmlLegend3 = L.control.htmllegend({
		position: 'bottomleft',
		legends: [{
			name: "<h3>"+'Cambio en la tasa de denuncias por violencia contra la mujer'+"<\h3>",
			style: style3,
			layer: mapa3,
			elements: [{
				label:"<h4>"+  'Del periodo 2007-2012 al 2013-2017 (%)'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<h4>"+  'Decrecimiento alto'+"<\h4>",html: '',style: {'background-color': '#38A700','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  'Decrecimiento moderado'+"<\h4>",html: '',style: {'background-color': '#89CD66','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {		
				label:"<h4>"+  'Estable'+"<\h4>",html: '',style: {'background-color': '#CCCCCC','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  'Crecimiento moderado'+"<\h4>",html: '',style: {'background-color':'#FFD380' ,'width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  'Crecimiento alto'+"<\h4>",html: '',style: {'background-color': '#FFAA01','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  'Crecimiento intenso'+"<\h4>",html: '',style: {'background-color': '#FF5500','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  'Crecimiento extremo'+"<\h4>",html: '',style: {'background-color': '#A80000','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h5>"+  'Sin datos (Comunidades Juridiccionales)'+"<\h5>",html: '',style: {'background-color': '#FFFFFF','width': '40px','height': '14px', 'border': 'black 1px solid'}}, { 
				label:"<h5>"+  ''+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<h4>"+  'Número total de denuncias del período: 1.490.590'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<h5>"+  'Fuente: Elaboración propia a partir de los datos del Consejo General del Poder Judicial - Programa PROMUJER (2018)'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}, 																
			}]
		}],
		collapseSimple: true,  // if true, legend entries that are from a simple renderer will use compact presentation
		detectStretched: true,  // if true, will test to see if legend entries look stretched.  These are usually in sets of 3 with the middle element having no label.
		collapsedOnInit: false,  // if true, legends will be collapsed when a new instance is initialized.
		defaultOpacity: 0.5, // default opacity for layers in specified in legends.
		visibleIcon: '',// 'leaflet-html-legend-icon-eye',  // css class for the visible icon on opacity slider
		hiddenIcon: '',//'leaflet-html-legend-icon-eye-slash',  // css class for the hidden icon on opacity slider
		toggleIcon:'',// 'leaflet-html-legend-icon-eye-slash'  // css class for the icon on visibility toggle button
	});
	map.addControl(htmlLegend3);  
// leyenda mapa2		
var htmlLegend2 = L.control.htmllegend({
		position: 'bottomleft',
		legends: [{
			name: "<h3>"+'Tasa de denuncias por violencia contra la mujer'+"<\h3>",
			style: style2,
			layer: mapa2,
			elements: [{
				label:"<h4>"+  '<img src=images/TDVM.png width="210" height ="30">'+"<h4>Unidades: ‰<\h4>"+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<h4>"+  'Muy baja: 1,1 - 2'+"<\h4>",html: '',style: {'background-color': '#89CD66','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  'Baja: 2,1 - 3'+"<\h4>",html: '',style: {'background-color': '#ADE8AD','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  'Baja - Media: 3,1 - 4'+"<\h4>",html: '',style: {'background-color': '#FFFFBE','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  'Media: 4,1 - 5'+"<\h4>",html: '',style: {'background-color': '#FFD37F','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {		
				label:"<h4>"+  'Media - Alta: 5,1 - 6'+"<\h4>",html: '',style: {'background-color': '#FFAA00','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  'Alta: 6,1 - 7'+"<\h4>",html: '',style: {'background-color': '#FF5500','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  'Muy Alta: >7'+"<\h4>",html: '',style: {'background-color': '#A80000','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h5>"+  'Sin datos (Comunidades Juridiccionales)'+"<\h5>",html: '',style: {'background-color': '#FFFFFF','width': '40px','height': '14px', 'border': 'black 1px solid'}}, { 
				label:"<h5>"+  ''+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<h4>"+  'Número total de denuncias del período: 1.490.590'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				//label:"<h5>"+  ''+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<h5>"+  'Fuente: Elaboración propia a partir de los datos del Consejo General del Poder Judicial - Programa PROMUJER (2018)'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}, 																
			}]
		}],
		collapseSimple: true,  // if true, legend entries that are from a simple renderer will use compact presentation
		detectStretched: true,  // if true, will test to see if legend entries look stretched.  These are usually in sets of 3 with the middle element having no label.
		collapsedOnInit: false,  // if true, legends will be collapsed when a new instance is initialized.
		defaultOpacity: 0.5, // default opacity for layers in specified in legends.
		visibleIcon: '',// 'leaflet-html-leg end-icon-eye',  // css class for the visible icon on opacity slider
		hiddenIcon: '',//'leaflet-html-legend-icon-eye-slash',  // css class for the hidden icon on opacity slider
		toggleIcon:'',// 'leaflet-html-legend-icon-eye-slash'  // css class for the icon on visibility toggle button
	});
	map.addControl(htmlLegend2);
// leyenda mapa1	
var htmlLegend1 = L.control.htmllegend({
		position: 'bottomleft',
		legends: [{
			name: "<h3>"+ 'Denuncias por violencia contra la mujer por partido judicial (2017)'+"<\h3>",
			style: style1,
			layer: mapa1,
			elements: [{
				label:"<h4>"+  'Número total de denuncias:'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<h4>"+  '0 - 50'+"<\h4>",html: '',style: {'background-color': '#38A800','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  '50,1 - 100'+"<\h4>",html: '',style: {'background-color': '#89CD66','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  '100,1 - 200'+"<\h4>",html: '',style: {'background-color': '#ADE8AD','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  '200,1 - 400'+"<\h4>",html: '',style: {'background-color': '#FFFFBE','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  '400,1 - 800'+"<\h4>",html: '',style: {'background-color': '#FFFF73','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {		
				label:"<h4>"+  '800,1 - 1.600'+"<\h4>",html: '',style: {'background-color': '#FFD37F','width': '40px','height': '14px', 'border': 'black 1px solid'}}, { 
				label:"<h4>"+  '1.600,1 - 3.200'+"<\h4>",html: '',style: {'background-color': '#FFAA00','width': '40px','height': '14px', 'border': 'black 1px solid'}}, { 
				label:"<h4>"+  '3.200,1 - 6.400'+"<\h4>",html: '',style: {'background-color': '#FF5500','width': '40px','height': '14px', 'border': 'black 1px solid'}}, { 
				label:"<h4>"+  '6.400,1 - 12.937'+"<\h4>",html: '',style: {'background-color': '#A80000','width': '40px','height': '14px', 'border': 'black 1px solid'}}, { 
				label:"<h5>"+  'Sin datos (Comunidades Juridiccionales)'+"<\h5>",html: '',style: {'background-color': '#FFFFFF','width': '40px','height': '14px', 'border': 'black 1px solid'}}, { 
				label:"<h5>"+  ''+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<h4>"+  'Número total: 166.260'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {	
				//label:"<h5>"+  ''+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<h5>"+  'Fuente: Consejo General del Poder Judicial - Programa PROMUJER (2018)'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'},																
			}]
		}],
		collapseSimple: true,  // if true, legend entries that are from a simple renderer will use compact presentation
		detectStretched: true,  // if true, will test to see if legend entries look stretched.  These are usually in sets of 3 with the middle element having no label.
		collapsedOnInit: false,  // if true, legends will be collapsed when a new instance is initialized.
		defaultOpacity: 0.5, // default opacity for layers in specified in legends.
		visibleIcon: '',// 'leaflet-html-legend-icon-eye',  // css class for the visible icon on opacity slider
		hiddenIcon: '',//'leaflet-html-legend-icon-eye-slash',  // css class for the hidden icon on opacity slider
		toggleIcon:'',// 'leaflet-html-legend-icon-eye-slash'  // css class for the icon on visibility toggle button
	}).addTo(map);
	map.addControl(htmlLegend1);

//Visualizar capas
// L.control.layers(baseLayers, overlays,{collapsed:true, position: 'topright',}).addTo(map);
L.control.layers.tree(baseTree, overlayTree).addTo(map);

//boton de informacion 
var button2 = new L.Control.Button(L.DomUtil.get('helpbutton2'), { toggleButton: 'active', position: 'topright'});
	button2.addTo(map);
	button2.on('click', function () {
	 if (button2.isToggled()) {
			sidebar2.hide();
		} else {
			sidebar2.show();
		}
	});