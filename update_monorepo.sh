
rm -rf frontend || echo "no folder"
git clone --depth 1 https://github.com/betagouv/recosante frontend
rm -rf frontend/.git

rm -rf api || echo "no folder"
git clone https://github.com/betagouv/recosante-api api
rm -rf api/.git

rm -rf mail || echo "no mail"
git clone https://github.com/betagouv/recosante-mail mail
rm -rf mail/.git

rm -rf indice_pollution || echo "no folder"
git clone https://github.com/betagouv/indice_pollution indice_pollution
rm -rf indice_pollution/.git

