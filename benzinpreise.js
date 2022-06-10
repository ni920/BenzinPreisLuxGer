const colorBG = Color.dynamic(new Color("#ffffff"), new Color("#1c1c1e"))
const colorText = Color.dynamic(new Color("#000000"), new Color("#fefffe"))
const colorBar = Color.dynamic(new Color("#000000"), new Color("#fefffe"))
const colorBarBG = Color.dynamic(new Color("#cccccc"), new Color("#404043"))
  
const w = new ListWidget()
w.backgroundColor = colorBG




// Benzinpreis in Luxembourg

let url = "https://www.aral.de/de_lu/luxembourg/home/kraftstoffe-und-preise/aktuelle-kraftstoffpreise.html" 
let web = new WebView()
web.loadURL(url)
await web.waitForLoad()      
let html = await web.getHTML() //console.log(html)
  

const regex = /(EuroSuper 95.*[0-9].[0-9]{2}).*([0-9].[0-9]{2}).*(Ultimate 98)/gms;

// Alternative syntax using RegExp constructor
// const regex = new RegExp('[0-9][.][0-9][0-9][0-9]', 'gm')

const str = html;
let m;

while ((m = regex.exec(str)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (m.index === regex.lastIndex) {
        regex.lastIndex++;
    }
    
    // The result can be accessed through the `m`-variable.
    //m.forEach((match, groupIndex) => {
    //    console.log(`Found match, group ${groupIndex}: ${match}`);
    //});
    //console.log(m[2])
    superLux = parseFloat(m[2])
    console.log(superLux)

}
regex.lastIndex = 0;

// Benzinpreis in Deutschland (Globus Tankstelle Saarlouis)

let url2 = "https://www.benzinpreis-aktuell.de/tanken-globus-sb-warenhaus-tankstelle-saarlouis-66740-2703.html" 
let web2 = new WebView()
web2.loadURL(url2)
await web2.waitForLoad()      
let html2 = await web2.getHTML() //console.log(html)
  
const regex2 = /(div-2 preisB).*([0-9],[0-9][0-9]).*(div-3 dt2)/mgs;

// Alternative syntax using RegExp constructor
// const regex = new RegExp('(div-2 preisB).*([0-9],[0-9][0-9]).*(strong)', 'mgs')

let m2;

while ((m2 = regex2.exec(html2)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (m2.index === regex2.lastIndex) {
        regex2.lastIndex++;
    }
    
    e10Globus = m2[2].replace(/,/g, '.')
    console.log(m2[2])
}


// Widget Konfiguration


const titlew = w.addText("Benzinpreise 🏎️").semiboldMonospacedSystemFont(20)

w.setPadding(-75, 10, 0, 0)


w.addText(`🇱🇺 Lux: ${superLux}€`)
w.addText(`🇩🇪 Ger: ${e10Globus}€`)
let wDate = w.addDate(new Date())
titlew.textColor = colorText
titlew.font = Font.boldSystemFont(13)
Script.setWidget(w)
Script.complete()
  w.presentMedium()
