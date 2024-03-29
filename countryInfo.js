// returns an array of country populations (1000s) indexed by ISO2 code
// ie: GB,IT
function getPopulation2010() {
//CountryName,Sovereign,GEORegion,GEOSubregion,GEOID,ISO2Code,ISO3Code,UNCode,Developed,LeastDeveloped,OECD,SubSaharan,SmallIslandDev,ArabWorld,Population
//Afghanistan,Afghanistan,Asia + Pacific,South Asia,4,AF,AFG,4,0,1,0,0,0,0,29117.5
	var iso2Pop = [];
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open('GET', 'population2010.csv', false);
	xmlhttp.send();
	var lines = xmlhttp.responseText.split('\n');
	if (lines.length < 2) {
		throw('no data found in population');
	}
	var header = [];
	for (var count in lines) {
		var values = lines[count].split(',');
		if (count == 0) {
			header = values;
		}
		else
		{
			try {
				var iso2 = values[header.indexOf('ISO2Code')];
				var population = values[header.indexOf('Population')];
				var name = values[header.indexOf('CountryName')];
				iso2Pop[iso2] = {name: name, code: iso2, population: Number(population)};
			} catch (e) {
				console.log('getPopulation2010 error at {0}:{1}'.format(count, e.message));
			}
		}
	}
	return iso2Pop;
}
