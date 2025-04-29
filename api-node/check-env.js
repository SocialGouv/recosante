// Vérificateur d'environnement pour les tests
import 'dotenv/config';
import fs from 'fs';

console.log('\nVérification des variables d\'environnement\n');

if (!fs.existsSync('.env')) {
  console.error('Erreur: fichier .env manquant à la racine du projet');
} else {
  console.log('Fichier .env trouvé');
}

// Vérification fichier .env.test
if (!fs.existsSync('.env.test')) {
  console.error('Erreur: fichier .env.test manquant');
  console.log('Créez un fichier .env.test pour les tests d\'intégration');
} else {
  console.log('Fichier .env.test trouvé');
  
  const envTestContent = fs.readFileSync('.env.test', 'utf8');
  if (!envTestContent.includes('DATABASE_URL=')) {
    console.error('Erreur: DATABASE_URL manquant dans .env.test');
    console.log('Ajoutez DATABASE_URL="postgresql://user:password@host:port/db_test"');
  } else {
    const match = envTestContent.match(/DATABASE_URL=["']?([^"'\n]+)["']?/);
    if (match && match[1]) {
      console.log(`DATABASE_URL=${match[1]}\n`);
    }
  }
}

console.log('Fin de la vérification\n'); 