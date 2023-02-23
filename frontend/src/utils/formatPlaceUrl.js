const formatPlaceUrl = function (place) {
  return `/place/${place.code}/${place.nom
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/'/g, '-').replace(/\u2019/g, '-')
    .replace(/\u0153/g, 'oe')
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')}/`
}
module.exports.formatPlaceUrl = formatPlaceUrl