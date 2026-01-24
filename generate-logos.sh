#!/bin/bash

echo "🎨 Génération des logos Villa Bliss..."
echo ""

# Logo source
SOURCE="public/images/logo-villa-bliss.jpeg"

# Vérifier que le fichier source existe
if [ ! -f "$SOURCE" ]; then
    echo "❌ Erreur: Le fichier $SOURCE n'existe pas"
    exit 1
fi

# Vérifier si ImageMagick est installé
if ! command -v convert &> /dev/null; then
    echo "❌ ImageMagick n'est pas installé"
    echo ""
    echo "Pour installer ImageMagick:"
    echo "  - Ubuntu/Debian: sudo apt-get install imagemagick"
    echo "  - macOS: brew install imagemagick"
    echo "  - Windows: Téléchargez depuis https://imagemagick.org"
    echo ""
    echo "Alternative: Utilisez https://favicon.io pour générer les logos en ligne"
    exit 1
fi

echo "📦 Génération des icônes..."

# Générer le favicon 32x32
echo "  - Favicon 32x32..."
convert "$SOURCE" -resize 32x32 -background none -gravity center -extent 32x32 public/favicon-32.png
convert public/favicon-32.png public/favicon.ico
rm public/favicon-32.png

# Générer l'icône PWA 192x192
echo "  - Icône PWA 192x192..."
convert "$SOURCE" -resize 192x192 -background none -gravity center -extent 192x192 public/logo192.png

# Générer l'icône PWA 512x512
echo "  - Icône PWA 512x512..."
convert "$SOURCE" -resize 512x512 -background none -gravity center -extent 512x512 public/logo512.png

# Supprimer le logo React inutilisé
if [ -f "src/logo.svg" ]; then
    echo "  - Suppression du logo React..."
    rm -f src/logo.svg
fi

echo ""
echo "✅ Tous les logos ont été générés avec succès !"
echo ""
echo "Fichiers créés:"
echo "  ✓ public/favicon.ico (32x32)"
echo "  ✓ public/logo192.png (192x192)"
echo "  ✓ public/logo512.png (512x512)"
echo ""
echo "📝 Prochaines étapes:"
echo "  1. Videz le cache de votre navigateur (Ctrl+Shift+Delete)"
echo "  2. Redémarrez le serveur React (npm start)"
echo "  3. Rechargez l'application dans votre navigateur"
echo ""
