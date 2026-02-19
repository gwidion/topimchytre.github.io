# Optimalizace obrázků - Nutná akce!

## PROBLÉM
Portfoliové obrázky mají celkovou velikost **10.6 MB**, což významně zpomaluje načítání stránky.

### Aktuální velikosti:
- project-6.jpg: 3.0 MB
- project-3.jpg: 1.8 MB
- project-1.jpg: 1.7 MB
- project-5.jpg: 1.4 MB
- project-2.jpg: 1.5 MB
- project-4.jpg: 1.2 MB

## ŘEŠENÍ
Je nutné zkomprimovat všechny obrázky na **200-300 KB** každý.

### Možnost 1: Online nástroje (nejjednodušší)
1. **TinyPNG** - https://tinypng.com/
   - Podporuje JPG a PNG
   - Bezplatné pro max 20 obrázků najednou
   - Zachovává kvalitu při kompresi až 70%

2. **Squoosh** - https://squoosh.app/
   - Google nástroj, offline capable
   - Umožňuje nastavit kvalitu a formát

### Možnost 2: Command line (pro pokročilé)
```bash
# Instalace ImageMagick
brew install imagemagick  # macOS
# nebo
sudo apt-get install imagemagick  # Linux

# Komprese všech JPG na 85% kvalitu
cd assets/images/portfolio
for img in *.jpg; do
  convert "$img" -quality 85 -strip "optimized_$img"
done
```

### Možnost 3: WebP formát (nejlepší komprese)
```bash
# Instalace cwebp
brew install webp

# Konverze na WebP
for img in *.jpg; do
  cwebp -q 85 "$img" -o "${img%.jpg}.webp"
done
```

Pro WebP je nutné přidat fallback v HTML:
```html
<picture>
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="Description" loading="lazy">
</picture>
```

## DOPORUČENÉ KROKY
1. Zálohujte originální obrázky
2. Zkomprimujte je na cca 200-300 KB každý
3. Nahraďte je v `assets/images/portfolio/`
4. Otestujte stránku

## OČEKÁVANÝ VÝSLEDEK
- Původní velikost: **10.6 MB**
- Po optimalizaci: **~2 MB** (úspora 80%!)
- Rychlejší načítání stránky
- Lepší skóre ve Speed Insights
