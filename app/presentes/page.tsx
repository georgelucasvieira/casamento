'use client'

const gifts = [
  {
    id: 1,
    name: 'Jogo de Panelas',
    price: 300
  },
  {
    id: 2,
    name: 'Air Fryer',
    price: 500
  }
]

export default function PresentesPage() {

  async function buyGift(giftId: number) {

    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        giftId
      })
    })

    const data = await response.json()

    window.location.href = data.checkoutUrl
  }

  return (
    <div className="p-10">
      <h1 className="text-3xl mb-6">
        Lista de Presentes
      </h1>

      <div className="space-y-4">
        {gifts.map(gift => (
          <div
            key={gift.id}
            className="border p-4 rounded"
          >
            <h2>{gift.name}</h2>

            <p>R$ {gift.price}</p>

            <button
              onClick={() => buyGift(gift.id)}
              className="bg-black text-white px-4 py-2 rounded cursor-pointer"
            >
              Presentear
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}