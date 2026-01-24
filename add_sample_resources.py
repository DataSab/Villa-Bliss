#!/usr/bin/env python3
"""
Script pour ajouter des ressources d'exemple à Villa Bliss
Usage: python3 add_sample_resources.py
"""

import os
import sys
import django

# Configuration de Django
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'frontend.settings')
django.setup()

from core.models import Item

# Liste des ressources d'exemple
SAMPLE_RESOURCES = [
    {
        'title': 'Guide Complet des Huiles Essentielles',
        'category': 'huiles',
        'label': 'ES',
        'slug': 'guide-huiles-essentielles',
        'price': 0.00,
        'description': 'Découvrez les propriétés et utilisations de 50 huiles essentielles. Un guide pratique pour débutants et confirmés avec des recettes et conseils d\'utilisation au quotidien.',
        'discount_price': None,
    },
    {
        'title': 'Les Bases de l\'Aromathérapie',
        'category': 'aromatherapie',
        'label': 'PO',
        'slug': 'bases-aromatherapie',
        'price': 0.00,
        'description': 'Apprenez les fondamentaux de l\'aromathérapie : méthodes d\'extraction, modes d\'utilisation, précautions d\'emploi et synergies aromatiques pour votre bien-être.',
        'discount_price': None,
    },
    {
        'title': 'Méditation Quotidienne - 21 Jours',
        'category': 'meditation',
        'label': 'ES',
        'slug': 'meditation-21-jours',
        'price': 0.00,
        'description': 'Programme de méditation guidée sur 21 jours pour développer votre pratique. Inclut des exercices de respiration, visualisation et pleine conscience.',
        'discount_price': None,
    },
    {
        'title': 'Méditation pour Débutants',
        'category': 'meditation',
        'label': 'PO',
        'slug': 'meditation-debutants',
        'price': 0.00,
        'description': 'Guide complet pour commencer la méditation en douceur. Techniques simples, postures, gestion du mental et création d\'une routine quotidienne.',
        'discount_price': None,
    },
    {
        'title': 'Recettes de Tisanes Bien-Être',
        'category': 'tisanes',
        'label': 'ES',
        'slug': 'recettes-tisanes',
        'price': 0.00,
        'description': '30 recettes de tisanes et infusions pour chaque moment de la journée : détente, digestion, sommeil, énergie et immunité.',
        'discount_price': None,
    },
    {
        'title': 'Les Plantes Médicinales à Infuser',
        'category': 'tisanes',
        'label': 'PO',
        'slug': 'plantes-medicinales-infusion',
        'price': 0.00,
        'description': 'Découvrez 40 plantes médicinales et leurs bienfaits. Comment les préparer, les doser et les associer pour créer vos propres mélanges thérapeutiques.',
        'discount_price': None,
    },
    {
        'title': 'Yoga du Matin - Séquence Énergisante',
        'category': 'yoga',
        'label': 'ES',
        'slug': 'yoga-matin-energisant',
        'price': 0.00,
        'description': 'Séquence de yoga de 20 minutes pour bien commencer la journée. Postures illustrées, respirations et étirements pour réveiller le corps en douceur.',
        'discount_price': None,
    },
    {
        'title': 'Les 12 Postures Essentielles du Yoga',
        'category': 'yoga',
        'label': 'PO',
        'slug': '12-postures-yoga',
        'price': 0.00,
        'description': 'Maîtrisez les 12 postures fondamentales du yoga avec des instructions détaillées, bénéfices, contre-indications et variations pour tous niveaux.',
        'discount_price': None,
    },
    {
        'title': 'Introduction à la Naturopathie',
        'category': 'naturopathie',
        'label': 'ES',
        'slug': 'introduction-naturopathie',
        'price': 0.00,
        'description': 'Découvrez les principes de la naturopathie : alimentation vivante, cures saisonnières, gestion du stress et renforcement des défenses naturelles.',
        'discount_price': None,
    },
    {
        'title': 'Détox Naturelle - Programme 7 Jours',
        'category': 'naturopathie',
        'label': 'PO',
        'slug': 'detox-naturelle-7jours',
        'price': 0.00,
        'description': 'Programme complet de détoxification naturelle sur une semaine. Menus, recettes, exercices et techniques naturopathiques pour purifier l\'organisme.',
        'discount_price': None,
    },
    {
        'title': 'Synergie d\'Huiles pour le Sommeil',
        'category': 'huiles',
        'label': 'PO',
        'slug': 'synergie-huiles-sommeil',
        'price': 0.00,
        'description': 'Formules d\'huiles essentielles pour favoriser l\'endormissement et un sommeil réparateur. Recettes de roll-on, diffusion et application.',
        'discount_price': None,
    },
    {
        'title': 'Aromathérapie et Émotions',
        'category': 'aromatherapie',
        'label': 'ES',
        'slug': 'aromatherapie-emotions',
        'price': 0.00,
        'description': 'Guide de l\'aromathérapie émotionnelle : quelles huiles pour gérer le stress, l\'anxiété, la tristesse ou booster la confiance en soi.',
        'discount_price': None,
    },
]

def create_sample_resources():
    """Crée les ressources d'exemple dans la base de données"""
    print("🌿 Création des ressources d'exemple pour Villa Bliss...\n")

    created_count = 0
    updated_count = 0

    for resource_data in SAMPLE_RESOURCES:
        slug = resource_data['slug']

        # Vérifier si la ressource existe déjà
        item, created = Item.objects.get_or_create(
            slug=slug,
            defaults=resource_data
        )

        if created:
            created_count += 1
            print(f"✅ Créé: {resource_data['title']} ({resource_data['category']})")
        else:
            # Mettre à jour si elle existe déjà
            for key, value in resource_data.items():
                setattr(item, key, value)
            item.save()
            updated_count += 1
            print(f"🔄 Mis à jour: {resource_data['title']} ({resource_data['category']})")

    print(f"\n✨ Terminé !")
    print(f"   - {created_count} ressources créées")
    print(f"   - {updated_count} ressources mises à jour")
    print(f"   - Total: {created_count + updated_count} ressources\n")

    # Afficher le résumé par catégorie
    print("📊 Résumé par catégorie:")
    categories = Item.objects.values_list('category', flat=True).distinct()
    for category in categories:
        count = Item.objects.filter(category=category).count()
        category_name = dict(Item._meta.get_field('category').choices).get(category, category)
        print(f"   - {category_name}: {count} ressources")

if __name__ == '__main__':
    try:
        create_sample_resources()
    except Exception as e:
        print(f"❌ Erreur: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)
