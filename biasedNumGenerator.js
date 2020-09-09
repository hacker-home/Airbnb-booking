
const biasedNumGenerator = () => {
  const bias = Math.floor(Math.random() * 10 + 1)
  return (bias <= 8 ? Math.floor(Math.random() * 2000000 + 1) :
    Math.floor(Math.random() * (10000000 - 2000001) + 2000000)
  )
}

module.exports = biasedNumGenerator;
