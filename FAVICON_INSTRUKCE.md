# Vytvoření favicon.ico

## Problém
V HTML je reference na `favicon.ico`, ale soubor neexistuje.

## Řešení

### Možnost 1: Online konvertor (nejjednodušší)
1. Otevřete https://favicon.io/favicon-converter/
2. Nahrajte logo: `assets/images/logo.png`
3. Stáhněte vygenerovaný `favicon.ico`
4. Umístěte do kořenového adresáře projektu

### Možnost 2: Použít existující PNG
Alternativně můžete změnit HTML místo vytváření .ico:

```html
<!-- Odstraňte tuto řádku: -->
<link rel="shortcut icon" href="favicon.ico">

<!-- A nechte jen: -->
<link rel="icon" type="image/png" href="assets/images/logo.png">
```

### Možnost 3: Command line (ImageMagick)
```bash
# Instalace ImageMagick
brew install imagemagick

# Vytvoření favicon.ico z logo.png
convert assets/images/logo.png -resize 16x16 -define icon:auto-resize=16,32,48,64,256 favicon.ico
```

## Doporučení
Pro nejlepší kompatibilitu vytvořte oba:
- `favicon.ico` (pro IE a staré prohlížeče)
- `assets/images/logo.png` (pro moderní prohlížeče)
