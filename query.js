const Contentstack = require('contentstack')

const Stack = Contentstack.Stack(
  'blt37e5d9fa4b15e084',
  'cs03fc78eabffd6082acc28070',
  'production'
)

async function index() {
  try {
    let query = Stack.ContentType('home_page').Entry('blt5c760b6ce70ae18b')
    const result = await query.fetch()
    console.log(result.toJSON().modular_blocks)
  } catch (err) {}
}

index()
