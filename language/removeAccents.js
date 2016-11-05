function removeAccents (str) {
  return str.replace(/[áéíñóúüÁÉÍÑÓÚÜ]/g, m => {
    return {
      á: 'a',
      é: 'e',
      í: 'i',
      ñ: 'n',
      ó: 'o',
      ú: 'u',
      ü: 'u',
      Á: 'A',
      É: 'E',
      Í: 'I',
      Ñ: 'N',
      Ó: 'O',
      Ú: 'U',
      Ü: 'U'
    }[m]
  })
}

module.exports = removeAccents
